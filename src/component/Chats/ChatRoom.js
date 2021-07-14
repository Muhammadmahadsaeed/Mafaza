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
import ConversationHeader from './ConversationHeader';
import InputBox from './InputBox';
import Conversation from './Conversation';

const ChatRoom = ({ props }) => {

    const flatListRef = useRef(null)
    const data = [{
        id: 1,
        text: 'hi',
        type: 'text',
        userId: 2
    }]

    return (
        <View style={{ flex: 1 }}>
            <ConversationHeader />
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.innerContainer}>
                    <FlatList style={{ flex: 1, paddingHorizontal: 10 }}
                        ref={flatListRef}
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <Conversation
                                message={item}
                                index={index.toString()}
                                myId={1}
                            />
                        )}
                    />
                    <InputBox />
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