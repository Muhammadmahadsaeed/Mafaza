import React, { Component } from 'react';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { HamBurger } from '../common';
import * as ChatScreens from '../component/Chats'
import fonts from '../constants/fonts';

const ChatNavigator = createStackNavigator({

  RecentChatScreen: {
    screen: ChatScreens.RecentChats,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: { top: 0 },
      headerTitle: 'Chat History',
      headerTitleStyle: {
        color: '#136EE3',
        fontFamily: fonts.fonts.PoppinsMedium,
        fontSize: 18
      },
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#FBFBFB',
        shadowOffset: {
          height: 0,
          width: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
      },
    }),
  },
  ChatRoomScreen: {
    screen: ChatScreens.ChatRoom,
    navigationOptions: {
      headerShown: false
    }
  },
}, {
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  },

});

export default ChatNavigator;