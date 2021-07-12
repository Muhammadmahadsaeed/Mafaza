import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

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
                text: 'My message',
                createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
                },
                image: 'https://placeimg.com/140/140/any',
                sent: true,
                received: true,
                pending: true,
            },
            {
                _id: 3,
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

    return (
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />
    )
}

export default ChatRoom;
