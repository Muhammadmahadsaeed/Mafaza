import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import { ChatRoom } from '../component/Chats';
import * as PatientScreen from '../component/PatientScreens'

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

},{
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  },
  initialRouteName:'PatientHomeScreen'
});

export default HomeNavigator;