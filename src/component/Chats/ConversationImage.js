import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Pressable, Modal, Dimensions, ActivityIndicator } from 'react-native';
import Images from 'react-native-chat-images';
import { api } from '../Config/env';
import { SEND_MESSAGE } from './Query';
import { useMutation } from '@apollo/client';
import font from '../../constants/fonts';

const ConversationImage = ({ data }) => {
  const { message, isSending } = data || {};
  const [isLoading, setLoading] = useState(isSending)
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
    data.imagesObj?.forEach((image) => {
      formdata.append('messageContent', image);
    });
    console.log(data.imagesObj);
    await fetch(`http://34.200.187.81:8080/message/media`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',// this is a imp line
        Accept: 'application/json',
      },
      body: formdata,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        let messageObj = {
          messageId: data.messageId,
          userName: data.userName,
          senderId: data.senderId,
          receiverId: data.receiverId,
          type: 'image',
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

  return (
    <View style={{ flex: 1 }}>
      <Images images={data.content} />
      <View style={styles.imageBottom}>
        <View style={styles.loadingView}>
          {isLoading &&
            <>
              <ActivityIndicator size="small" color="black" />
              <Text style={styles.time}>sending...</Text>
            </>
          }
        </View>
        <Text style={styles.time}>time</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  imageBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  loadingView: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    // alignItems:'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    fontFamily: font.fonts.PoppinsMedium,
    fontSize: 14,
  },
})
export default ConversationImage