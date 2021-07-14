import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    UIManager,
    findNodeHandle,
} from 'react-native';
const ConversationHeader = ({ props }) => {
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <View style={styles.row}>
                    <View>
                        <Text>back icon</Text>
                    </View>
                    <View>
                        <Text>profile</Text>
                    </View>
                </View>

            </View>
            <View style={styles.right}>
                <View style={styles.row}>
                    <TouchableOpacity>
                        <View style={styles.icon}>
                            <Image source={require('../../../assets/Images/video-call.png')} 
                            style={styles.img}/>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text>profile</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ConversationHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 65,
        paddingHorizontal: 10,
        backgroundColor: '#FBFBFB'
    },
    left: {
        backgroundColor: 'red'
    },
    row: {
        flexDirection: 'row',

    },
    right: {
        backgroundColor: 'blue'
    },
    icon: {
        height: 100,
        width: 100,
        backgroundColor: 'black'
    },
    img: {
        height: '100%',
        width: '100%',
        resizeMode:'cover',
        backgroundColor:'green'
    }

});
