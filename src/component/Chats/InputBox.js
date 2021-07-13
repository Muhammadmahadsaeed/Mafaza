import React, { createRef, useEffect, useState } from 'react';
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
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';


class InputBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: '',
            isLoggingIn: false,
            recordSecs: 0,
            recordTime: '0:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            playTime: '00:00:00',
            duration: '00:00:00',
            startAudio: false,
            currentTime: 0,
            recordDuration: 0,
        };
        this.timer = null;
        this.audioRecorderPlayer = new AudioRecorderPlayer();
        this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
    }

    render() {
        const { msg } = this.state
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={{ width: '100%' }}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.iconContainer}
                        activeOpacity={0.8}>
                        <View style={styles.buttonContainer}>
                            <Image
                                source={require('../../../assets/Images/icon-emoji.png')}
                                style={styles.btnIcon}
                            />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        ref={(ref) => { this.textInput = ref }}
                        placeholder={'Type a message'}
                        style={styles.textInput}
                        multiline
                        value={msg}
                        onChangeText={(text) => this.setState({ msg: text })}
                    />
                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={styles.iconContainer}
                            activeOpacity={0.8}>
                            <View style={styles.buttonContainer}>
                                <Image
                                    source={require('../../../assets/Images/attachment.png')}
                                    style={styles.btnIcon}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconContainer}
                            activeOpacity={0.8}>
                            <View style={styles.buttonContainer}>
                                <Image
                                    source={require('../../../assets/Images/voice.png')}
                                    style={styles.btnIcon}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderRadius: 50,
        height: 40,
        paddingHorizontal:10,
        backgroundColor: 'white'
    },
    iconContainer: {
        paddingHorizontal: 2,
        paddingVertical: 4,
    },
    buttonContainer: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnIcon: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
})

export default InputBox