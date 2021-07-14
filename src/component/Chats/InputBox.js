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
import uuid from 'react-native-uuid';
import { getAudioFolderPath } from '../utils/directory';

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
    componentDidMount() {
        this.checkPermission().then(async (hasPermission) => {
            this.setState({ hasPermission });
            if (!hasPermission) return;
        });
    }
    async checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: 'Permissions for write access',
                        message: 'Give permission to your storage to write a file',
                        buttonPositive: 'ok',
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('You can use the camera');


                } else {
                    console.log('permission denied');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }
    }
    onPressIn = () => {
        if (this.state.msg) {
            this.onSendMessage();
        }
    };
    onPressOut = () => {
        if (!this.state.msg && !this.state.startAudio) {
            console.log('do nothing from input box=========');
        } else {
            this.onStopRecord();
        }
    };
    onStartRecording = async () => {
        try {
            const dirAudio = await getAudioFolderPath()
            this.setState({ startAudio: true });
            const path = `${dirAudio}/${uuid.v4()}.acc`;
            const audioSet = {
                AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
                AudioSourceAndroid: AudioSourceAndroidType.MIC,
                AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
                AVNumberOfChannelsKeyIOS: 2,
                AVFormatIDKeyIOS: AVEncodingOption.aac,
            };
            const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
            this.audioRecorderPlayer.addRecordBackListener((e) => {
                // this.millisToMinutesAndSeconds(e.current_position);
            });
        } catch (error) {

        }

    };
    onStopRecord = async () => {
        this.setState({ startAudio: false });
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        const fileName = result.split('/').pop();
        // let audioArr = [];
        // let audio = {
        //     name: fileName,
        //     type: 'audio/acc',
        //     uri: Platform.OS === 'android' ? result : result.replace('file://', ''),
        // };
        // // audio.recordTime = this.state.recordDuration;
        // audioArr.push(audio);
        // let messageObj = {
        //     messageId: uuid.v4(),
        //     userName: this.props.userName,
        //     senderId: this.props.senderId,
        //     receiverId: this.props.receiverId,
        //     type: 'audio',
        //     isSending: true,
        //     message: audioArr,
        //     content: [{ url: result, time: this.state.recordTime }],
        //     isDownload: false,
        //     sendTime: Date.now()
        // };
        // this.props.getDataFromInput(messageObj);
        // this.setState({
        //     recordSecs: 0,
        //     recordTime: '0:00',
        // });

    };
    onSendMessage = () => {
        // const {msg} = this.state;
        // console.log("msg from state=====",msg);
        // Encrypt
        // let message = CryptoJS.AES.encrypt(msg, 'secret key 123').toString();
        let message = this.state.msg;
        this.setState({ msg: '' })
        this.textInput.clear();
        console.log(message);
        // this.textInput.blur();
        // let messageObj = {
        //   messageId: uuid.v4(),
        //   userName: 'mahad',
        //   senderId: this.props.senderId,
        //   receiverId: this.props.receiverId,
        //   type: 'text',
        //   isDownload: false,
        //   messageText: message,
        //   sendTime: Date.now()
        // };
        // this.props.getDataFromInput(messageObj);
    
      };
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
                            onPress={this.onPressIn}
                            onLongPress={!msg.length ? this.onStartRecording : null}
                            onPressOut={this.onPressOut}
                            activeOpacity={0.8}>
                            <View style={styles.buttonContainer}>
                                <Image
                                    source={msg.length ? require('../../../assets/Images/Send.png') : require('../../../assets/Images/voice.png')}
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
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,

    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 6,
    },
    buttonContainer: {
        width: 40,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btnIcon: {
        height: '80%',
        width: '80%',
        resizeMode: 'contain',
    },
})

export default InputBox




