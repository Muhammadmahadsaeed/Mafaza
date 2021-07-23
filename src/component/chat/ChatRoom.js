import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
    PermissionsAndroid,
    TouchableWithoutFeedback,
} from 'react-native';
import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputBox';
import InputBox from '../Chats/InputBox';

const ChatRoom = ({ }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'second message',
                createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'First message',
                createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                user: {
                    _id: 1,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const CustomInputBox = (props) => {
        return (
           <InputBox {...props} />
        )
    }
  
    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
            // renderInputToolbar={CustomInputBox}
            // renderActions={renderActions}
            renderComposer={CustomInputBox}
            // alwaysShowSend
            // renderSend={renderSend}
        />
    )
}

export default ChatRoom;
