import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';


class HomeScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Button
              onPress={() => this.props.navigation.navigate('Notifications')}
              title="Go to notifications"
          />
        </View>
    );
  }
}

class NotificationsScreen extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Button
              onPress={() => this.props.navigation.navigate('Home')}
              title="Go back home"
          />
        </View>
    );
  }
}

class LoginScreen extends Component {
  openDashboard = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Dashboard'})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
        <View style={styles.container}>
          <Button
              onPress={this.openDashboard}
              title={'Login'}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  menu: {
    marginRight: 8,
  }
});

const renderMenu = (navigation) => (
    <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
      <Image
          source={require('./menu.png')}
          style={[styles.icon, styles.menu]}
      />
    </TouchableWithoutFeedback>
)

const Home = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerRight: renderMenu(navigation)
    }),
  }
})

const Notifications = createStackNavigator({
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Notifications',
      headerRight: renderMenu(navigation)
    })
  }
})

const Dashboard = createDrawerNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          drawerLabel: 'Home',
          drawerIcon: (
              <Image
                  source={require('./chats-icon.png')}
                  style={styles.icon}
              />
          ),
        }
      },
      Notifications: {
        screen: Notifications,
        navigationOptions: {
          drawerLabel: 'Notifications',
          drawerIcon: (
              <Image
                  source={require('./notif-icon.png')}
                  style={styles.icon}
              />
          ),
        }
      },
    },
    {
      drawerPosition: 'right'
    }
);

const App = createStackNavigator(
    {
      Login: LoginScreen,
      Dashboard: Dashboard
    },
    {
      initialRouteName: 'DashBoard',
      headerMode: 'none'
    }
)

export default App;