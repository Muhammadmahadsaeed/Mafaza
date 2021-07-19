import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    ImageBackground,
    FlatList,
    BackHandler,
} from 'react-native';
import { useSelector } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePicker, { clean } from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import { useMutation, gql, useLazyQuery, useSubscription, useQuery } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE, NEW_MESSAGE } from './Query';
import ConversationHeader from './ConversationHeader';
import InputBox from './InputBox';
import Conversation from './Conversation';
import { api } from '../Config/env'

const ChatRoom = ({ navigation }) => {
    const [getData, setData] = useState([])
    const [receiverId, setReceiverId] = useState('')
    const [senderId, setSenderId] = useState('')

    const flatListRef = useRef(null)
    const refRBSheet = useRef();
    const converstion = navigation.getParam('data');
    const user = useSelector((state) => state.user.user.data.user);
    const [sendMessage] = useMutation(SEND_MESSAGE, {
        onError: (err) => console.log("err from sending message===", err)
    })
    const { data, error: messageError } = useSubscription(NEW_MESSAGE, {
        variables: {
            senderId: user._id,
            receiverId: converstion._id
        }
    })

    useEffect(() => {
        setReceiverId(converstion._id)
        setSenderId(user._id)
        getMessages()
        return () => {
            setData([])
            setReceiverId('')
            setSenderId('')
            ImagePicker.clean()
        }
    }, [])

    //get previous messages 
    const getMessages = async () => {
        const senderId = user._id;
        const converstion = navigation.getParam('data');
        await fetch(`${api}patient_chat/conservation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientId: senderId, //login user id
                doctorId: converstion._id, //recvr user id
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json.data)
            })
            .catch((err) => console.log(err));
    };

    //get new messages
    useEffect(() => {
        if (messageError) console.log(messageError)
        if (data) {
            if (receiverId == data.newMessage.senderId) {
                setData([...getData, data.newMessage])
                // sendMessageToLocalDb(data.newMessage)
            }
        }
    }, [messageError, data])

    const getDataFromInput = async (msg) => {
        if (msg.type == "text") {
            setData([...getData, msg])
            sendMessage({
                variables: {
                    messageId: msg.messageId,
                    userName: msg.userName,
                    senderId: user._id,
                    receiverId: receiverId,
                    type: msg.type,
                    messageText: msg.messageText,
                }
            })
        }
        else {
            setData([...getData, msg])
        }
    };
    const openAttachmentModal = () => {
        refRBSheet.current.open();
    };
    const renderContent = () => (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-evenly',
                    alignItems: 'flex-start',
                    marginVertical: 10,
                }}>

                <TouchableOpacity style={{  padding: 20, }}
                    onPress={selectImage}
                    activeOpacity={0.8}>
                    <Image source={require('../../../assets/Images/icon-gallery.png')} />
                </TouchableOpacity>

                {/* <View>
              <TouchableOpacity
                onPress={selectDocument}
                activeOpacity={0.8}>
                <Image source={require('../../../asessts/images/doc-icon.png')} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={selectVideo}
                activeOpacity={0.8}>
                <Image source={require('../../../asessts/images/audio-icon.png')} />
              </TouchableOpacity>
            </View> */}
            </View>
        </View>
    );
    const selectImage = () => {
        refRBSheet.current.close();
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true,
            compressImageQuality: 0.8,
            maxFiles: 5,
            compressImageMaxHeight: 400,
            compressImageMaxWidth: 300,
            mediaType: 'photo',
        })
        .then((images) => {
            if (images.length > 5) {
                alert("Can't share more then 5 media items.")
            } else {
                let arrForServer = images.map((item) => {
                    const imageName = item.path.split('/').pop();
                    let img = {
                        name: imageName,
                        type: item.mime,
                        uri:
                            Platform.OS === 'android'
                                ? item.path
                                : item.path.replace('file://', ''),
                    };
                    return img;
                });
                let arrForRender = images.map((item) => {
                    let base64 = `data:${item.mime};base64,${item.data}`;
                    let image = {
                        url: base64
                    }
                    return image
                })
                let messageObj = {
                    messageId: uuid.v4(),
                    userName: "mahad",
                    senderId: senderId,
                    receiverId: receiverId,
                    type: 'image',
                    isSending: true,
                    imagesObj: arrForServer,
                    content: arrForRender,
                    sendTime: Date.now()
                };
                getDataFromInput(messageObj);
            }
        })
        .catch((err) => console.log(err));
    };
    return (
        <View style={{ flex: 1 }}>
            <ConversationHeader navigation={navigation} data={converstion}  />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.innerContainer}>
                    <FlatList style={{ flex: 1, paddingHorizontal: 10 }}
                        ref={flatListRef}
                        data={getData}
                        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animating: true })}
                        onLayout={() => flatListRef.current.scrollToEnd({ animating: true })}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Conversation
                                message={item}
                                index={index.toString()}
                                myId={senderId}
                            />
                        )}
                    />
                    <InputBox
                        getDataFromInput={getDataFromInput}
                        senderId={senderId}
                        receiverId={receiverId}
                        openAttachmentModal={openAttachmentModal}
                    />
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
                height={150}
                closeDuration={200}
                closeOnDragDown={true}
                openDuration={300}
                keyboardAvoidingViewEnabled={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'transparent',
                    },
                    draggableIcon: {
                        backgroundColor: '#000',
                    },
                    container: {
                        borderTopRightRadius: 30,
                        borderTopLeftRadius: 30,
                    },
                }}>
                {renderContent()}
            </RBSheet>
        </View>
    )
}


export default ChatRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#F2F2F2',
        // paddingHorizontal: 10,
        paddingTop: 20,
    },
});