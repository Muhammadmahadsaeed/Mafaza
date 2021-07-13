import React from 'react';
import { Image, TextInput, View, Text } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';

export const renderInputToolbar = (props) => (
    <InputToolbar
        {...props}
        containerStyle={{
            backgroundColor:'none',
            paddingTop: 3,
            borderTopColor:'white'
        }}
        primaryStyle={{ alignItems: 'center' }}
    />
);

export const renderActions = (props) => (
    <Actions
        {...props}
        containerStyle={{
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
            marginRight: 4,
            marginBottom: 0,
        }}
        icon={() => (
            <Image
                style={{ width: 35, height: 35 }}
                source={require('../../../assets/Images/addmore.png')}
            />
        )}
        options={{
            'Choose From Library': () => {
                console.log('Choose From Library');
            },
            'Camera': () => {
                console.log('Choose From Library');
            },
            Cancel: () => {
                console.log('Cancel');
            },
        }}
        optionTintColor="#222B45"
    />
);

export const renderComposer = (props) => {
    return (
        <View style={{ flexDirection: 'row',width:'70%' }}>
            <Composer {...props}
                textInputStyle={{
                    color: '#222B45',
                    backgroundColor: 'white',
                    borderRadius: 50,
                    borderColor: '#E4E9F2',
                    paddingTop: 8.5,
                    paddingHorizontal: 12,
                    marginLeft: 0,
                }}
            />
        </View>
    );
}
export const renderSend = (props) => {
    return (
        <Send
            {...props}
            containerStyle={{
                width: 44,
                height: 44,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4,
            }}
        >
            {props.text ?
                <Image
                    style={{ width: 35, height: 35 }}
                    source={{
                        uri: 'https://placeimg.com/32/32/any',
                    }}
                />
                :
                <Image
                    style={{ width: 35, height: 35 }}
                    source={require('../../../assets/Images/voice.png')}
                />
            }

        </Send>

    )
}
