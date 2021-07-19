import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, Modal, Dimensions, ActivityIndicator } from 'react-native';
import { SEND_MESSAGE } from './Query';
import { useMutation } from '@apollo/client';
import fonts from '../../constants/fonts';
import * as AudioManager from './AudioManager';
import AudioRecorderPlayer, { } from 'react-native-audio-recorder-player';

const screenWidth = Dimensions.get('screen').width;

const ConversationAudio = ({ data }) => {
const { message, isSending } = data || {};
const [isLoading, setLoading] = useState(isSending)
const [playDuration, setPlayDuration] = useState('');
const [isPlaying, setIsPlaying] = useState(false);
const [currentPositionSec, setCurrentPos] = React.useState(0);
const [duration, setDuration] = React.useState(0);
const audioRecorderPlayer = new AudioRecorderPlayer();
const [isPause, setIsPause] = useState(true);
audioRecorderPlayer.setSubscriptionDuration(0.1);
const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (err) => console.log(err)
})
useEffect(() => {
    if (isSending) {
        uploadImageToServer()
    }
}, [])

const uploadImageToServer = async () => {

    let formdata = new FormData();
    formdata.append('messageType', data.type);
    data.message?.forEach((image) => {
        formdata.append('messageContent', image);
    });
    await fetch(`http://34.200.187.81:8080/message/media`, {
        method: 'POST',
        headers: {
            'content-type': 'multipart/form-data',
        },
        body: formdata,
    })
        .then((response) => response.json())
        .then((json) => {
            json.data[0].time = data.content[0].time
            let messageObj = {
                messageId: data.messageId,
                userName: data.userName,
                senderId: data.senderId,
                receiverId: data.receiverId,
                type: 'audio',
                content: json.data,
                sendTime: Date.now()
            };
            setLoading(false)
            sendMessageToServer(messageObj)
        })
        .catch((err) => console.log(err));
}
const sendMessageToServer = (msg) => {
    // mutation for sending the message
    sendMessage({
        variables: {
            messageId: msg.messageId,
            userName: msg.userName,
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            type: msg.type,
            content: msg.content,
        }
    })
}
const pauseAudio = async () => {
    await AudioManager.pausePlayer();
    setIsPause(true);
    setIsPlaying(false);
};

const onStartPlay = async (url) => {
    const path = Platform.select({
        ios: 'hello.m4a',
        android: url,
    });

    await AudioManager.startPlayer(path, (res) => {
        const { status } = res;
        switch (status) {
            case AudioManager.AUDIO_STATUS.begin: {
                console.log('BEGIN AUDIO');
                setIsPlaying(true);
                break;
            }
            case AudioManager.AUDIO_STATUS.play: {
                const { current_position, duration } = res.data;
                setCurrentPos(current_position);
                setDuration(duration);
                millisToMinutesAndSeconds(current_position);
                break;
            }
            case AudioManager.AUDIO_STATUS.pause: {
                console.log('PAUSE AUDIO');
                setIsPause(true);
                setIsPlaying(false);
                break;
            }
            case AudioManager.AUDIO_STATUS.resume: {
                console.log('RESUME AUDIO');
                setIsPause(false);
                setIsPlaying(true);
                break;
            }
            case AudioManager.AUDIO_STATUS.stop: {
                console.log('STOP AUDIO');
                setIsPlaying(false);
                setIsPause(false);
                break;
            }
        }
    });
};

const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    let time = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    setPlayDuration(time);
};
let playWidth = (currentPositionSec / duration) * (screenWidth - 137);

if (!playWidth) {
    playWidth = 0;
}

return (
    <View style={{ flex: 1 }}>
        <View style={styles.audioView}>
            {isLoading ? <ActivityIndicator color="black" size="small" />
                :
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        isPlaying
                            ? pauseAudio()
                            : onStartPlay(data.content[0].url)
                    }
                    style={{ width: 35, height: 35 }}>
                    <Image
                        source={
                            isPlaying
                                ? require('../../../assets/Images/pause.png')
                                : require('../../../assets/Images/play.png')
                        }
                        style={{ height: '100%', width: '100%' }}
                    />
                </TouchableOpacity>
            }

            <TouchableOpacity
                style={styles.viewBarWrapper}
                activeOpacity={0.9}>
                <View style={styles.viewBar}>
                    <View style={[styles.viewBarPlay, { width: playWidth }]} />
                </View>
            </TouchableOpacity>
        </View>
        <View style={styles.audioView}>
            <Text style={styles.duration}>
                {currentPositionSec ? playDuration : data.content[0].time}
            </Text>
            {/* <Text style={styles.time}>{moment(message.timestamp).fromNow()}</Text> */}
        </View>
    </View>
)
}
const styles = StyleSheet.create({
audioView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
viewBarWrapper: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 10,
    alignSelf: 'stretch',
},
viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
},

viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
},
time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 14,
},
duration: {
    color: 'grey',
    fontFamily: fonts.fonts.PoppinsMedium,
    fontSize: 14,
    marginLeft: 45,
},
})
export default ConversationAudio