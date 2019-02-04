import React, { Component } from 'react';
import { Container, Content, Item, Icon, Input, Button, Thumbnail } from 'native-base';
import { Image, View, Text, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { colorPrimary, gray, black_light } from './constant';
import { loginUser } from './actions/loginAction';
import { connect } from 'react-redux';
//import form from './component/form'
class ProfileScreen extends Component {


  constructor(props) {
    super(props);
    this.navigateScreen = this.navigateScreen.bind(this);
    this.LoginUser = this.LoginUser.bind(this);


  }
  navigateScreen(text) { 



    this.props.navigation.navigate(text)
  }




  LoginUser() {

    if ((this.state.username.trim === '' || (this.state.username.trim().length === 0))) {
      this.setState({ usernameError: "user name is required" });
      console.log("state is null", "yes");
    }

    else {
      console.log("state is null", "no");
      this.setState({ usernameError: null });
      const { username, password } = this.state;
      this.props.loginUser({ username, password });

    }
  }
ioulouu
  render() {
    return (

      <Container style={{ backgroundColor: 'white' }}>

        <View style={{ flex: 1 }}>
          <View style={{ height: 200, backgroundColor: colorPrimary, }}>

            <TouchableOpacity style={{ padding: 10 }} onPress={() => this.navigateScreen("home")}
            >
              <Icon name='chevron-left' type='FontAwesome' style={{ fontSize: 20, color: 'white', marginTop: 12, marginStart: 12, justifyContent: 'flex-start', alignItems: 'flex-start' }}></Icon>

            </TouchableOpacity>
          </View>
          <View style={{ flexGrow: 1, backgroundColor: 'white' }}>



            <TouchableOpacity style={{ padding: 20 }} onPress={() => this.navigateScreen('EditProfileScreen')}
            >
              <Image style={{
                zIndex: 1,

                alignSelf: 'center',
                borderRadius: 75,
                position: 'absolute',
                top: -40,
                height: 90,
                width: 90
              }}

                source={require('./res/avatar.png')}
              />
            </TouchableOpacity>

            {/* ////// first item in second part of screen */}
            <View style={{ flexDirection: 'row', marginTop: 50, marginStart: 24, marginBottom: 30 }}>
              <Icon name='mobile' type='FontAwesome' style={{ fontSize: 24, color: gray, justifyContent: 'flex-start', alignItems: 'flex-start' }}></Icon>
              <View style={{ flexDirection: 'column', marginStart: 12 }}>
                <Text style={{ color: black_light }} >Mobile Number </Text>
                <Text style={{ color: gray }}>0597845896 </Text>

              </View>
            </View>

            <View style={{ flexDirection: 'row', marginStart: 24 }}>
              <Icon name='unlock-alt' type='FontAwesome' style={{ fontSize: 24, color: gray, justifyContent: 'flex-start', alignItems: 'flex-start' }}></Icon>
              <View style={{ flexDirection: 'column', marginStart: 12 }}>
                <Text style={{ color: black_light }} >Change password</Text>
                <Text style={{ color: gray }}>0597845896 </Text>

              </View>

            </View>


          </View>
        </View>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
    code: state.auth.code
  }
}


// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//   NavigationActions.navigate({ routeName: 'ScreenThree' })],
//   });
//   this.props.navigation.dispatch(resetAction);



export default connect(mapStateToProps, { loginUser })(ProfileScreen);
