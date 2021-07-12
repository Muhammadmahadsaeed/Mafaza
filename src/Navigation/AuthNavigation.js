import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import * as AuthIndex from '../component/AuthScreens/AuthIndex';

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
      navigationOptions: {
        headerShown: false,
      },
    },
    PatientOtpScreen: {
      screen: AuthIndex.PatientOtp,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorSignUp1Screen: {
      screen: AuthIndex.DoctorSignUp1,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorSignUp2Screen: {
      screen: AuthIndex.DoctorSignUp2,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorSignUp3Screen: {
      screen: AuthIndex.DoctorSignUp3,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorSignUp4Screen: {
      screen: AuthIndex.DoctorSignUp4,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorSignUp5Screen: {
      screen: AuthIndex.DoctorSignUp5,
      navigationOptions: {
        headerShown: false,
      },
    },
    DoctorOtpScreen: {
      screen: AuthIndex.DoctorOTP,
      navigationOptions: {
        headerShown: false,
      },
    },
    SignInScreen: {
      screen: AuthIndex.SignIn,
      navigationOptions: {
        headerShown: false,
      },
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
