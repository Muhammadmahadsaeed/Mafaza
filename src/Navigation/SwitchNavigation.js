import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import * as AuthIndex from '../component/AuthScreens/AuthIndex';
import AuthNavigation from './AuthNavigation';
import PatientNavigator from './PatientDrawerNavigation';
import DoctorNavigatior from './DoctorDrawerNavigation'

const RootNavigator = createSwitchNavigator({
<<<<<<< HEAD
  SplashScreen: AuthIndex.Splash,
  AuthScreens: AuthNavigation,
  PatientNavigation: PatientNavigator,
  DoctorDrawer: DoctorNavigatior
=======
  // SplashScreen: AuthIndex.Splash,
  // AuthScreens: AuthNavigation,
  PatientNavigation: PatientNavigator,
  // DoctorDrawer: DoctorNavigatior
>>>>>>> 9bc0f185502852f369b29131404d86ef16dc5cd5
});

const Navigator = createAppContainer(RootNavigator);

export default Navigator;
