import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, Modal, Dimensions, } from 'react-native';
import fonts from '../../constants/fonts';

const Conversation = ({ message, myId }) => {
    const { type } = message

    const isMyMessage = () => {
        return message.senderId === myId;
    };

    return (
        <TouchableOpacity activeOpacity={0.9}
            style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? '#FFFFFF' : '#136EE3',
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50,
                    marginVertical: isMyMessage() ? 5 : 5,
                },
            ]}
        >
            {type == 'text' && (
                <View>
                    <Text style={[styles.message,{color: isMyMessage() ? '#212121' : 'white'}]}>{message.messageText}</Text>
                    {/* <Text style={styles.time}>{moment(message.sendTime).fromNow()}</Text> */}
                </View>
            )}
        </TouchableOpacity>
    )
}


export default Conversation



const styles = StyleSheet.create({
    messageBox: {
        // flex:1,
        borderRadius: 5,
        padding: 5,
    },
    message: {
        fontFamily: fonts.fonts.PoppinsRegular,
        fontSize: 15,
       
    },
})