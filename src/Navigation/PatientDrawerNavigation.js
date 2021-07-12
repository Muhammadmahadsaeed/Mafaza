import { createDrawerNavigator } from 'react-navigation-drawer';
import * as PatientScreen from '../component/PatientScreens'
import ChatNavigator from './ChatNavigation';
import CustomPatientDrawer from './CustomPatientDrawer';
import PatientHomeNavigator from './PatientHomeNavigation'
import {Dimensions} from 'react-native';

const DrawerNavigator = createDrawerNavigator({
  PatientHomeScreen: {
    screen: PatientHomeNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
    },
  },
  chat: {
    screen: ChatNavigator,
    navigationOptions: {
      drawerLabel: 'Chat History',
    },
  },
  PatientAddVitalsScreen: {
    screen: PatientScreen.PatientAddVitals,
    navigationOptions: {
      drawerLabel: 'Chat History',
    },
  },
  PatientSehduleScreen: {
    screen: PatientScreen.PatientSehdule,
    navigationOptions: {
      drawerLabel: 'Sehdule',
    },
  }
},
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomPatientDrawer,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    initialRouteName: 'PatientHomeScreen',
  },
);


export default DrawerNavigator;