import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, Modal, Dimensions, } from 'react-native';

const Conversation = ({ message, myId }) => {
    const { type } = message
    return (
        <TouchableOpacity activeOpacity={0.9}
            style={[
                styles.messageBox,
                {
                    backgroundColor: myId ? '#00EBCF' : '#44D1FC',
                    marginLeft: myId ? 50 : 0,
                    marginRight: myId ? 0 : 50,
                    marginVertical: myId ? 5 : 5,
                },
            ]}
        >
            <Text>hi</Text>
        </TouchableOpacity>
    )
}

export default Conversation



const styles = StyleSheet.create({
    messageBox: {
        borderRadius: 5,
        padding: 5,
    },
})