import { createStackNavigator,TransitionPresets } from 'react-navigation-stack';
import * as DoctorScreens from '../component/DoctorScreens/DoctorIndex';

const HomeNavigator = createStackNavigator({

  DoctorHomeScreen: {
    screen: DoctorScreens.DoctorHome,
    navigationOptions: {
      headerShown: false
    }
  }
},{
  defaultNavigationOptions: {
    ...TransitionPresets.SlideFromRightIOS,
  },
  initialRouteName:'DoctorHomeScreen'
});

export default HomeNavigator;