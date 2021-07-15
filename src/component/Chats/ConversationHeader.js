import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  UIManager,
  findNodeHandle,
} from 'react-native';
const ConversationHeader = ({navigation}) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.leftIcon}
            activeOpacity={0.8}
            onPress={() => goToBack()}>
            <Image
              source={require('../../../assets/Images/Back.png')}
              style={styles.leftIconImg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../../../assets/Images/video-call.png')}
            style={styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <Image
            source={require('../../../assets/Images/audio-call.png')}
            style={styles.img}
          />
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
    backgroundColor: '#FBFBFB',
  },
  left: {
    // backgroundColor: 'red'
  },
  leftIcon: {
    paddingHorizontal: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconImg: {
    height: '50%',
    width: '80%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
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
  },
});
