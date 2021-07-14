import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, Modal, Dimensions, } from 'react-native';
import fonts from '../../constants/fonts';

const Conversation = ({ message, myId }) => {
    const { type } = message

    return (
        <TouchableOpacity activeOpacity={0.9}
            style={[
                styles.messageBox,
                {
                    backgroundColor: myId ? '#FFFFFF' : '#136EE3',
                    marginLeft: myId ? 50 : 0,
                    marginRight: myId ? 0 : 50,
                    marginVertical: myId ? 5 : 5,
                },
            ]}
        >
            {type == 'text' && (
                <View>
                    <Text style={styles.message}>{message.messageText}</Text>
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
        fontFamily: fonts.fonts.PoppinsMedium,
        fontSize: 18,
        color: '#212121',
    },
})