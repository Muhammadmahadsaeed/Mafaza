import {createDrawerNavigator} from 'react-navigation-drawer';
import * as DoctorScreens from '../component/DoctorScreens/DoctorIndex';
import DoctorHomeNavigator from './DoctorHomeNavigation';
import CustomDoctorDrawer from './CustomDoctorDrawer';
import {Dimensions} from 'react-native';
import ChatNavigator from './ChatNavigation';

const DrawerNavigator = createDrawerNavigator(
  {
    DoctorHomeScreen: {
      screen: DoctorHomeNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
      },
    },
    DoctorSehduleScreen: {
      screen: DoctorScreens.DoctorSehdule,
      navigationOptions: {
        drawerLabel: 'Sehdule',
      },
    },
    chat: {
      screen: ChatNavigator,
      navigationOptions: {
        drawerLabel: 'Chat History',
      },
    },
  
  },
  {
    //For the Custom sidebar menu we have to provide our CustomSidebarMenu
    contentComponent: CustomDoctorDrawer,
    //Sidebar width
    drawerWidth: Dimensions.get('window').width,
    drawerPosition: 'left',
    initialRouteName: 'DoctorHomeScreen',
  },
);

export default DrawerNavigator;
