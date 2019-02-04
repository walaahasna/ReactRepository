import React, { Component } from 'react';
import { Container, Icon, Button, Header, Left, Body, Title } from 'native-base';
import {  View, Image,Text } from 'react-native';
import { black_light, colorPrimary, gray } from './constant';
import { getAbout } from './actions/AboutUsAction';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
//import form from './component/form'




class AboutScreen extends Component {


  constructor(props) {
    super(props);

    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    this.props.getAbout();
  }

  showMenu() {
    const parent = this.props.navigation.dangerouslyGetParent();
    const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;
    if (!isDrawerOpen) {
      this.props.navigation.openDrawer();
  
    }
    else {
      this.props.navigation.closeDrawer();

    }

  }



  render() {

    return (
      <Container>


        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Icon onPress={this.showMenu} ios='ios-menu' android="md-menu" style={{ fontSize: 25, color: black_light }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 20, color: black_light }}>About Us </Title>
          </Body>
        </Header>

<ScrollView>
        <View  style={{flex:1}}>
          <View style={{ flex:1,  flexDirection:'row' ,justifyContent: 'center',alignItems:'center' }}>
            <Image source={require('./res/ic_about.png')} style={{  resizeMode:'contain' ,width: 250, height: 250 , justifyContent: 'center'}}/>
          </View>

          <View style={{ justifyContent: 'center' ,flex:1 }}>
          <View style={{backgroundColor:gray,width:50}}/>
            <Text style={{ flex:1 ,textAlign:'justify',marginStart:10,marginEnd:10}}  > {this.props.dataAbout}</Text>
          </View>
        
        </View>
        </ScrollView>
      </Container>
    );
  }



}


const mapStateToProps = (state) => {
  return {
    //state.reducername.s
    //////
    //loading: state.data.loading,
    // code:state.data.code,
    dataAbout: state.about.dataAbout,
  }
}



export default connect(mapStateToProps, { getAbout })(AboutScreen);
