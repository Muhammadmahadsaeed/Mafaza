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
import RNFS from 'react-native-fs';
import fonts from '../../constants/fonts';
import { getAudioFolderPath } from '../utils/directory';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            recordSecs: 0,
            recordTime: '0:00',
            currentPositionSec: 0,
            currentDurationSec: 0,
            duration: '00:00:00',
            startAudio: false,
            currentTime: 0,
            recordDuration: 0,
            audioUri: ''
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
        else{
           this.sendAudio()
        }
    };
    onPressOut = () => {
        if (!this.state.msg && !this.state.startAudio) {
            console.log('do nothing from input box=========');
        } else {
            this.onStopRecord();
        }
    };
    sendAudio = () => {
        const { audioUri } = this.state
        const fileName = audioUri.split('/').pop();
        let audioArr = [];
        let audio = {
            name: fileName,
            type: 'audio/acc',
            uri: Platform.OS === 'android' ? audioUri : audioUri.replace('file://', ''),
        };
        // audio.recordTime = this.state.recordDuration;
        audioArr.push(audio);
        let messageObj = {
            messageId: uuid.v4(),
            userName: this.props.userName,
            senderId: this.props.senderId,
            receiverId: this.props.receiverId,
            type: 'audio',
            isSending: true,
            message: audioArr,
            content: [{ url: audioUri, time: this.state.recordTime }],
            isDownload: false,
            sendTime: Date.now()
        };
        this.props.getDataFromInput(messageObj);
        this.setState({
            recordSecs: 0,
            recordTime: '0:00',
            startAudio: false,
            audioUri: ''
        });
    }
    onStartRecording = async () => {
        this.setState({ startAudio: true });
        try {
            const dirAudio = await getAudioFolderPath()
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
                this.convertRecordingTimeToMinAndSec(e.currentPosition);
            });
        } catch (error) {

        }

    };
    onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({ audioUri: result })
       
    };
    convertRecordingTimeToMinAndSec(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        this.setState({ recordTime: time, recordDuration: millis });
    }
    onSendMessage = () => {
        let message = this.state.msg;
        this.setState({ msg: '' })
        this.textInput.clear();
        // this.textInput.blur();
        let messageObj = {
            messageId: uuid.v4(),
            userName: 'mahad',
            senderId: this.props.senderId,
            receiverId: this.props.receiverId,
            type: 'text',
            isDownload: false,
            messageText: message,
            sendTime: Date.now()
        };
        this.props.getDataFromInput(messageObj);

    };
    renderAudioRecorder = () => {
        return (
            <View style={styles.audioContainer}>
                <Text style={styles.audioTimerText}>{this.state.recordTime}</Text>
                <TouchableOpacity
                    style={{ padding: 5 }}
                    activeOpacity={0.8}
                    onPress={this.onCancel}>
                    <Text style={styles.cancelText}>cancel</Text>
                </TouchableOpacity>
            </View>
        );
    };
    onCancel = async () => {
        const { audioUri } = this.state
        const fileName = audioUri.split('/').pop();
        const dirAudio = await getAudioFolderPath()
        const path = `${dirAudio}/${fileName}`;
        RNFS.unlink(path)
            .then(() => {
                this.setState({
                    audioUri: '',
                    recordSecs: 0,
                    startAudio: false,
                    recordTime: '0:00',
                    audioUri: ''
                });
            })
            // `unlink` will throw an error, if the item to unlink does not exist
            .catch((err) => {
                console.log(err.message);
            });
    };
    render() {
        const { msg, startAudio, audioUri } = this.state
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                style={{ width: '100%' }}>
                <View style={styles.container}>
                    {!startAudio && <TouchableOpacity style={styles.iconContainer}
                        activeOpacity={0.8}>
                        <View style={styles.buttonContainer}>
                            <Image
                                source={require('../../../assets/Images/icon-emoji.png')}
                                style={styles.btnIcon}
                            />
                        </View>
                    </TouchableOpacity>
                    }
                    {startAudio ?
                        this.renderAudioRecorder()
                        :
                        <TextInput
                            ref={(ref) => { this.textInput = ref }}
                            placeholder={'Type a message'}
                            style={styles.textInput}
                            multiline
                            value={msg}
                            onChangeText={(text) => this.setState({ msg: text })} />
                    }
                    <View style={{ flexDirection: 'row' }}>
                        {!startAudio &&
                            <TouchableOpacity style={styles.iconContainer}
                                activeOpacity={0.8} onPress={() => this.props.openAttachmentModal()}>
                                <View style={styles.buttonContainer}>
                                    <Image source={require('../../../assets/Images/attachment.png')} style={styles.btnIcon} />
                                </View>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={styles.iconContainer}
                            onPress={this.onPressIn}
                            onLongPress={!msg.length ? this.onStartRecording : null}
                            onPressOut={this.onPressOut}
                            activeOpacity={0.8}>
                            <View style={styles.buttonContainer}>
                                <Image source={msg.length || audioUri ? require('../../../assets/Images/send.png') : require('../../../assets/Images/voice.png')}
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
    audioContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderRadius: 50,
        marginRight: 7,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    audioTimerText: {
        color: 'black',
        fontSize: 18,
        fontFamily: fonts.fonts.PoppinsMedium
    },
    cancelText: {
        color: 'red',
        fontSize: 16,
        fontFamily: fonts.fonts.PoppinsBold
    },
})

export default InputBox




