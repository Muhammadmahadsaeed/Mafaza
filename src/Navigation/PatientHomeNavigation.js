import React, { Component } from 'react';
import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import { ChatRoom } from '../component/Chats';
import * as PatientScreen from '../component/PatientScreens'
import { HamBurger } from '../common';
import fonts from '../constants/fonts';
const HomeNavigator = createStackNavigator({
  PatientHomeScreen: {
    screen: PatientScreen.PatientHome,
    navigationOptions: {
      headerShown: false
    }
  },
  ChatScreen: {
    screen: ChatRoom,
    navigationOptions: {
      headerShown: false
    }
  },
  DoctorAppointmentScreen: {
    screen: PatientScreen.DoctorAppointment,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <HamBurger navigationProps={navigation} />
      ),
      safeAreaInsets: { top: 0 },
      headerTitle: 'Appointment',
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
  }
},{
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  },
  initialRouteName:'PatientHomeScreen'
});

export default HomeNavigator;