import React, { Component } from 'react';
import { Left, Header, Icon, Body, Title, Button, Container, Right} from 'native-base';
import {  StyleSheet, TouchableOpacity} from 'react-native';

//import CountryCodePicker from 'react-native-country-code-picker';
import { connect } from 'react-redux';
import { colorPrimary, black_light } from './constant';
import OrderList from './component/OrderList';
//import form from './component/form'
class order extends Component {


  constructor(props) {
    super(props);
    this.makeIntent = this.makeIntent.bind(this);

    this.showMenu = this.showMenu.bind(this);
    this.state = {
      username: '',
      password: '',
      usernameError: ''

    };



  }
  // UNSAFE_componentWillReceiveProps(nextProps){
  //   if (nextProps.data !== this.props.data) {
  //     console.log('after', this.props.data);
     

  // }}

  showMenu() {
    const parent = this.props.navigation.dangerouslyGetParent();
    const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;
    if (!isDrawerOpen) {
      this.props.navigation.openDrawer();
      //this.props.navigation.toggleDrawer();

    }
    else {
      this.props.navigation.closeDrawer();

    }

  }


  render() {
    return (
      <Container   >
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={this.showMenu} style={{  fontSize: 24, color: black_light }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 22, color: black_light }}>Packages</Title>
          </Body>
          <Right />
        </Header>



        <OrderList  />
        <TouchableOpacity
        onPress={()=>{this.props.navigation .navigate('AddNewPackage')}}
          style={{
            
            alignSelf: 'flex-end',
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: 60,
            position: 'absolute',
            bottom: 10,
            right: 10,
            borderColor:colorPrimary,
            height: 60,
            backgroundColor: colorPrimary,
            borderRadius: 100,
          }}
         
        >
          <Icon type='FontAwesome' name="plus" style={{ color: 'white', fontSize: 16 }} />

        </TouchableOpacity>
      </Container>
    );
  }
  makeIntent() {
    this.props.navigation.navigate('address');
  }
}
const mapStateToProps = (state) => {
  return {
    //state.reducername.
    //////
    //loading: state.data.loading,
    // code:state.data.code,
    data: state.order.data,
  }
}




export default connect(mapStateToProps, {  })(order);
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
