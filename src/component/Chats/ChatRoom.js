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
import InputBox from './InputBox';
// import Conversation from './conversation';


const ChatRoom = ({ props }) => {
    const flatListRef = useRef(null)
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
                <FlatList style={{ flex: 1 }}
                    ref={flatListRef}
                />
                <InputBox />
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
        backgroundColor: '#F6F6F6',
        // paddingHorizontal: 10,
        paddingTop: 20,
    },
});