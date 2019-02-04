import React, { Component } from 'react';
import { Left, Header, Icon, Body, Title, Button, Container, Right} from 'native-base';
import {  StyleSheet, TouchableOpacity,Text} from 'react-native';

//import CountryCodePicker from 'react-native-country-code-picker';
import { connect } from 'react-redux';
import { colorPrimary, black_light } from './constant';
import OrderList from './component/OrderList';
import NotificationList from './component/NotificationList';
//import form from './component/form'
class NotificationScreen extends Component {


  constructor(props) {
    super(props);
    this.makeIntent = this.makeIntent.bind(this);

    


  }
  


  render() {
    return (
      <Container   >
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Icon name='chevron-left'  type='FontAwesome5' onPress={this.showMenu} style={{  fontSize: 24, color: black_light }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 22, color: black_light }}>Notification</Title>
          </Body>
          <Right>
           <TouchableOpacity>
             <Text style={{ fontSize: 18, color: black_light }}> Edit </Text>
           </TouchableOpacity>
          </Right>
        </Header>



        <NotificationList  />
       
        
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




export default connect(mapStateToProps, {  })(NotificationScreen);
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
