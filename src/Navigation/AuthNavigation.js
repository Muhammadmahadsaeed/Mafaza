import React, { Component } from 'react';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import HeaderBackButton from '../common/HeaderBackButton';
import * as AuthIndex from '../component/AuthScreens/AuthIndex';
import fonts from '../constants/fonts';
const AuthNavigator = createStackNavigator(
  {
    SelectOptionScreen: {
      screen: AuthIndex.SelectOption,
      navigationOptions: {
        headerShown: false,
      },
    },
    PatientSignUpScreen: {
      screen: AuthIndex.PatientSignUp,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Sign Up',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 22
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    PatientOtpScreen: {
      screen: AuthIndex.PatientOtp,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'OTP',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 22
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorSignUp1Screen: {
      screen: AuthIndex.DoctorSignUp1,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 1 of 6 - Create Profile',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorSignUp2Screen: {
      screen: AuthIndex.DoctorSignUp2,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 2 of 6 - About You',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorSignUp3Screen: {
      screen: AuthIndex.DoctorSignUp3,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 3 of 6 - Practice Details',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorSignUp4Screen: {
      screen: AuthIndex.DoctorSignUp4,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 4 of 6 - Online Details',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorSignUp5Screen: {
      screen: AuthIndex.DoctorSignUp5,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 5 of 6 - Upload Picture',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    DoctorOtpScreen: {
      screen: AuthIndex.DoctorOTP,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Step 6 of 6 - Confirm OTP',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 18
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    SignInScreen: {
      screen: AuthIndex.SignIn,
      navigationOptions: ({ navigation }) => ({
        headerTitle: 'Login',
        headerTitleStyle: {
          color: '#136EE3',
          fontFamily: fonts.fonts.PoppinsMedium,
          fontSize: 22
        },
        safeAreaInsets: { top: 0 },
        headerStyle: {
          backgroundColor: 'white',
          shadowOffset: {
            height: 0,
            width: 0,
          },
          shadowOpacity: 0,
          elevation: 0,
        },
        headerBackImage: () => <HeaderBackButton />,
      }),
    },
    ForgetPassNumberScreen: {
      screen: AuthIndex.ForgetPassNumber,
      navigationOptions: {
        headerShown: false,
      },
    },
    ForgetPassOTPScreen: {
      screen: AuthIndex.ForgetPassOTP,
      navigationOptions: {
        headerShown: false,
      },
    },
    UpdatePasswordScreen: {
      screen: AuthIndex.UpdatePassword,
      navigationOptions: {
        headerShown: false,
      },
    }
  },
  {
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
      
    },
    initialRouteName: 'SelectOptionScreen'
  },
);

export default AuthNavigator;
