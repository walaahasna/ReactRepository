import React, { Component } from 'react';
import { Container, Content, Item, Icon, Input, Button, Thumbnail } from 'native-base';
import { Image, View, Text, ActivityIndicator, AsyncStorage, TouchableOpacity } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { colorPrimary, gray, black_light, blue_light } from './constant';
import { loginUser } from './actions/loginAction';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';

//import form from './component/form'
class EditProfileScreen extends Component {
  state = {
    avatarSource: 'https://firebasestorage.googleapis.com/v0/b/wasel-b66d9.appspot.com/o/avatar.png?alt=media&token=83e9ef79-1eda-4730-963e-83a6b4a97e2a',
    videoSource: null,
  };
  constructor(props) {
    super(props);
    this.navigateScreen = this.navigateScreen.bind(this);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);


    
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


  render() {
    return (

      
      <Container style={{ backgroundColor: 'white' }}>

        <View style={{ flex: 1 }}>
          <View style={{ height: 150, backgroundColor: 'white', }}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, alignItems: 'flex-start' }}>

              <TouchableOpacity style={{ marginEnd: 10, marginTop: 5 }} onPress={() => this.navigateScreen("DashBoard")}
              >

                <Icon name='chevron-left' type='FontAwesome' style={{ fontSize: 20, color: black_light, marginStart: 12 }}></Icon>
              </TouchableOpacity>

              <Text style={{ textAlign: 'center', fontSize: 20, color: black_light }}>Edit Profile  </Text>
            </View>
          </View>
          <View style={{ flexGrow: 1, backgroundColor: 'white' }}>


            <TouchableOpacity style={{ padding: 20 }} onPress={this.selectPhotoTapped.bind(this)}
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


                source={{ uri: this.state.avatarSource }}

              />

              <Image style={{
                zIndex: 1,
                alignSelf: 'center',
                borderRadius: 75,
                position: 'absolute',
                top: -40,
                height: 90,
                width: 90
              }}

                //require('./res/avatar.png'
                source={this.state.avatarSource}
              />
            </TouchableOpacity>

            {/* ////// first item in second part of screen */}

            <View style={{ marginEnd: 32, marginStart: 32, marginTop: 32 }}>
              <Item >
                <Input placeholder='Full Name' style={{ fontSize: 12 }} onChangeText={(username) => this.setState({ username })}>

                </Input>
              </Item>

              <Text style={{ fontSize: 12, color: "red" }}>{this.state.usernameError
              }</Text>


            </View>


            <View style={{ marginStart: 32, marginEnd: 32, marginTop: 16 }}>
              <Button full light style={{
                marginTop: 10, backgroundColor: colorPrimary, borderRadius: 5,
                borderWidth: 1,
                borderColor: '#fff'
              }}
              onPress={() => this.navigateScreen("home")}

              >
                <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
              </Button>

            </View>


          </View>
        </View>
      </Container>
    );
  }


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log('User tapped custom button: ', source);
        this.setState({
          avatarSource: response.uri,
        });
      }
    });
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



export default connect(mapStateToProps, { loginUser })(EditProfileScreen);
