
import { createDrawerNavigator, createAppContainer,createStackNavigator } from 'react-navigation';
import Splash from './splash';
import login from './Login';
import order from './order';
import MapAddress from './MapAddress'
import sideMenuDrawer from './component/sideMenuDrawer';
import address from './Address';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import DashBoard from './DashBoard';
import AddNewPackage from './AddNewPackage';
import settings from './settings';
import NotificationScreen from './NotificationScreen';
import AboutScreen from './AboutScreen';


  const DrawerNavigator = createDrawerNavigator({
    DashBoard:
    {
      screen: DashBoard,
      
    },
  order:
  {
    screen: order,
    

  },
  address:
  {
    screen: address,
    

  },
  ProfileScreen:
  {
    screen: ProfileScreen,
    
  },

  MapAddress:
  {
    screen: MapAddress,
  },
  
  AboutScreen:
  {
    screen: AboutScreen,
  },
  AddNewPackage:
  {
    screen: AddNewPackage,
    
  },
  settings:
  {
    screen: settings,
    
  },
 
}, {
  contentComponent: sideMenuDrawer,
  drawerWidth: 250,
  drawerPosition: 'left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});


const stackNav = createStackNavigator(
  {
    EditProfileScreen:
    {
      screen: EditProfileScreen,
    },

   

    NotificationScreen:
    {
      screen: NotificationScreen,
    },
    splash: {
      screen: Splash,
      navigationOptions: {
        header: null
    }
  },
    login:
    {
      screen: login,
      navigationOptions: {
        header: null
      }
  
    },
    /////add drawer into stack navigtor 
    Dashboard: DrawerNavigator
  },
  {
    initialRouteName: 'splash',
    headerMode: 'none'
  }
);

const App = createAppContainer(stackNav);

export default App;
