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
import fonts from '../../constants/fonts';

const ConversationHeader = ({ navigation }) => {
    const goToBack = () => {
        navigation.goBack()
    }
    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.leftIcon} activeOpacity={0.8} onPress={() => goToBack()}>
                        <Image source={require('../../../assets/Images/Back.png')}
                            style={styles.leftIconImg} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.profileView}>
                        <View style={styles.profileIcon}>
                            <Image source={require('../../../assets/Images/doctor.png')} style={styles.profileIconImg} />
                        </View>
                        <View style={styles.userDetail}>
                            <Text style={styles.name} numberOfLines={1}>Mahad Ahmed khan qureshi hhhhhhhhhh</Text>
                            <Text style={styles.num} numberOfLines={1}>number</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.right}>
                <TouchableOpacity style={styles.icon}>
                    <Image source={require('../../../assets/Images/video-call.png')}
                        style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                    <Image source={require('../../../assets/Images/audio-call.png')}
                        style={styles.img} />
                </TouchableOpacity>
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
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    leftIcon: {
        paddingRight: 10,
        width: 40,
        marginRight: 5,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    leftIconImg: {
        height: '50%',
        width: '80%',
        resizeMode: 'contain',
    },
    profileView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#136EE3',
        backgroundColor: 'white'
    },
    profileIconImg: {
        height: '100%',
        width: '100%',
        borderRadius: 10,
        resizeMode:'contain'
    },
    userDetail: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center'
    },
    name: {
        fontFamily: fonts.fonts.PoppinsMedium,
        fontSize: 14
    },
    num: {
        fontFamily: fonts.fonts.PoppinsMedium,
        color: '#2020635C',
        fontSize: 13
    },
    right: {
        flexDirection: 'row',
    },

    icon: {
        paddingHorizontal: 5,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: '80%',
        width: '80%',
        resizeMode: 'contain',
    }

});
