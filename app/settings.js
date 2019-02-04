import React, { Component } from 'react';
import { Container, ListItem, Left, Body, Header, Button, Icon, Title, Right } from 'native-base';
import { View, Text, Image, Switch } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { gray_light, black_light } from './constant';
import { loginUser } from './actions/loginAction';
import { connect } from 'react-redux';
//import form from './component/form'
class settings extends Component {


    constructor(props) {
        super(props);
        this.navigateScreen = this.navigateScreen.bind(this);
        this.LoginUser = this.LoginUser.bind(this);
        this.state = {
            value: true
          };

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
            <Container style={{ felx: 1, backgroundColor: '#fbfbfc' }}>

                <Header style={{ backgroundColor: 'white' }}>

                    <Left>
                        <Button transparent   >
                            <Icon type='FontAwesome' name='chevron-left' style={{ fontSize: 20, color: black_light }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: 20, color: black_light }}>Settings</Title>
                    </Body>
                    <Right />
                </Header>

                <View  >

                    <View style={{ felx: 1, margin: 16 }}>
                        <Text style={{ fontSize: 16 }}> Account Settings</Text>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, marginStart: 10, marginEnd: 10, backgroundColor: 'white', borderColor: gray_light, borderRadius: 3 }}>
                        <ListItem icon style={{ marginBottom: 16 }} >
                            <Left>
                                <Image source={require('./res/speaker.png')}></Image>

                            </Left>
                            <Body style={{ borderBottomColor: 'transparent' }}>
                                <Text style={{ fontSize: 17 ,color:black_light}} >Notification Settings</Text>
                            </Body>

                            <Right>

                                <Switch
                                    onValueChange={(value)=>{this.setState({value});}}
                                    value={this.state.value} />
                            </Right>
                        </ListItem>

                        {/* /////////////////to */}
                        <ListItem style={{ marginBottom: 16 }} icon>
                            <Left>
                                <Image source={require('./res/loop_83.png')}></Image>

                            </Left>
                            <Body style={{ borderBottomColor: 'transparent' }}>
                                <Text style={{ fontSize: 17  ,color:black_light}} >Edite Profile</Text>


                            </Body>
                        </ListItem>


                    </View>
                </View>

{/* ///////////////////seond part  */}
                <View  >

                    <View style={{ felx: 1, margin: 16 }}>
                        <Text style={{ fontSize: 15 }}> Others</Text>
                    </View>

                    <View style={{ paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, marginStart: 10, marginEnd: 10, backgroundColor: 'white', borderColor: gray_light, borderRadius: 3 }}>
                        <ListItem icon style={{ marginBottom: 16 }} >
                            <Left>
                                <Image source={require('./res/speaker.png')}></Image>

                            </Left>
                            <Body style={{ borderBottomColor: 'transparent' }}>
                                <Text style={{ fontSize: 17 ,color:black_light}} >Archive Packages </Text>
                            </Body>

                          
                        </ListItem>

                        {/* /////////////////to */}
                        <ListItem style={{ marginBottom: 16 }} icon>
                            <Left>
                                <Image source={require('./res/loop_83.png')}></Image>

                            </Left>
                            <Body style={{ borderBottomColor: 'transparent' }}>
                                <Text style={{ fontSize: 17 ,color:black_light}} >Languge</Text>


                            </Body>
                        </ListItem>


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



export default connect(mapStateToProps, { loginUser })(settings);
