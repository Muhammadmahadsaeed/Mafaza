import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import * as AuthIndex from '../component/AuthScreens/AuthIndex';
import AuthNavigation from './AuthNavigation';
import PatientNavigator from './PatientDrawerNavigation';
import DoctorNavigatior from './DoctorDrawerNavigation'

const RootNavigator = createSwitchNavigator({
  // SplashScreen: AuthIndex.Splash,
  // AuthScreens: AuthNavigation,
  PatientNavigation: PatientNavigator,
  // DoctorDrawer: DoctorNavigatior
});

const Navigator = createAppContainer(RootNavigator);

export default Navigator;
