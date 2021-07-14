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
import { useMutation, gql, useLazyQuery, useSubscription, useQuery } from '@apollo/client';
import { GET_MESSAGES, SEND_MESSAGE, NEW_MESSAGE } from './Query';
import ConversationHeader from './ConversationHeader';
import InputBox from './InputBox';
import Conversation from './Conversation';

const ChatRoom = ({ navigation }) => {
    const [getData, setData] = useState([])
    const [receiverId, setReceiverId] = useState('')
    const [senderId, setSenderId] = useState('')

    const flatListRef = useRef(null)
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
        return () => {
            setData([])
            setReceiverId('')
            setSenderId('')

        }
    }, [])
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

    return (
        <View style={{ flex: 1 }}>
            <ConversationHeader />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.innerContainer}>
                    <FlatList style={{ flex: 1, paddingHorizontal: 10 }}
                        ref={flatListRef}
                        data={getData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Conversation
                                message={item}
                                index={index.toString()}
                                myId={1}
                            />
                        )}
                    />
                    <InputBox
                        getDataFromInput={getDataFromInput}
                        senderId={senderId}
                        receiverId={receiverId}
                    />
                </View>
            </View>
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