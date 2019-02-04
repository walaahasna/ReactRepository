import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

import { Container, Content, Item, Icon, Input, Button } from 'native-base';
import { Image, View, Text, ActivityIndicator, AsyncStorage } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { colorPrimary } from './constant';
import { loginUser } from './actions/loginAction';
import { connect } from 'react-redux';
//import form from './component/form'
class Login extends Component {
  constructor(props) {
    super(props);
    this.LoginUser = this.LoginUser.bind(this);
    this.state = {
      username: '',
      password: '',
      usernameError: '',
      paswordError: ''
    };

  }

  UNSAFE_CD(nextProps) {
    if (nextProps.user !== this.props.user) {
      // console.log('before', this.props.user.name);
    }

  }

  renderView() {
    console.log('loading', this.props.loading)
    if (this.props.loading) {
      return <ActivityIndicator animating={this.props.loaing} size="large" color="red" />
    }
    return null;
  }


  LoginUser() {

    if ((this.state.username.trim === '' || (this.state.username.trim().length === 0))) {
      this.setState({ usernameError: "user name is required" });
    }


    else if ((this.state.password.trim === '' || (this.state.password.trim().length === 0))) {
      this.setState({ usernameError: null });
      this.setState({ paswordError: "password is required" });
    }

    else {
      this.setState({ usernameError: null, paswordError: null });
      const { username, password } = this.state;
      this.props.loginUser({ username, password });

    }

  }



  hideLoader() { this.setState({ showLoader: false }); }


  componentDidMount() {
    AsyncStorage.getItem("app_token").then((value) => {
      if (!value.startsWith('_')) {
        console.log('token', value);
        this.props.navigation.navigate('DashBoard');
      }

    })
      .then(res => {
        console.log('error', res);
        //do something else
      });

  }

  openDashboard = () => {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'DashBoard' })],
    });
    this.props.navigation.dispatch(resetAction);
  }



  render() {
    if (this.props.code === 0) {
      // console.log('code', this.props.code);
      this.props.navigation.navigate('DashBoard');
      //  this.openDashboard();
    }

    return (
      <Container style={{ backgroundColor: 'white', flex: 1 }}>

        <Content>

          <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>

            {this.renderView()}
          </View>

          <View style={{ paddingTop: 25, paddingBottom: 8, marginStart: 16 }} >
            <Text style={{ fontSize: 25, color: "black" }}>Login</Text>
          </View>
          <View style={{ marginTop: 32, justifyContent: 'center', alignItems: 'center' }} >
            <Image source={require('./res/ic_login.png')} ></Image>
          </View>




          {/* //////////////main content */}
          <View style={{ marginEnd: 32, marginStart: 32, marginTop: 32 }}>
            <Item >
              <Icon name='person' />
              <Input placeholder='Phone Number' style={{ fontSize: 12 }} onChangeText={(username) => this.setState({ username })}>

              </Input>
            </Item>
            <Text style={{ fontSize: 12, color: "red" }}>{this.state.usernameError
            }</Text>

            <Item style={{ marginTop: 8 }}>
              <Icon name='open' />
              <Input placeholder='Password' style={{ fontSize: 12 }} secureTextEntry onChangeText={(password) => this.setState({ password })} />

            </Item>
            <Text style={{ fontSize: 12, color: "red" }}>{this.state.paswordError
            }</Text>

          </View>
          <View style={{ alignItems: 'flex-end', marginEnd: 32, marginTop: 16 }}>
            <Text>  Forget Password  </Text>
          </View>

          <View style={{ marginStart: 32, marginEnd: 32 }}>
            <Button full light style={{
              marginTop: 10, backgroundColor: colorPrimary, borderRadius: 5,
              borderWidth: 1,
              borderColor: '#fff'
            }}

              onPress={this.LoginUser}
            >
              <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
            </Button>

          </View>

        </Content>

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



export default connect(mapStateToProps, { loginUser })(Login);
