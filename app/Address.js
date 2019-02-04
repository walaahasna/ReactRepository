import React, { Component } from 'react';
import { Container, Icon, Button, Header, Left, Body, Title } from 'native-base';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { black_light ,colorPrimary} from './constant';
import { getAllAddress } from './actions/AddressAction';
import { connect } from 'react-redux';
//import form from './component/form'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import AddressList from './component/AddressList';




class Address extends Component {





  constructor(props) {
    super(props);

    this.showMenu = this.showMenu.bind(this);


  }

  componentDidMount() {
    // console.log("user",this.props.user.name);
  }


  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Address' },
      { key: 'second', title: 'Contacts' },

    ],
  };







  _renderScene = SceneMap({
    first: AddressList,
    second: AddressList,

  });


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

  _renderTabBar = props => {
    return (
      <View >

        <TabBar
          {...props}
          pressColor="rgba(179,229,255, 0.5)"

          //  onPress={() => props.setState({ index: i })}
          indicatorStyle={styles.indicator}
          scrollEnabled
          style={styles.tabbar}
          // tabStyle= {[styles.tab, { width: this._getTabWidth() }]}
          tabStyle={[styles.tab]}
          useNativeDriver

          labelStyle={styles.label}
        />
      </View>


    );
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
            <Title style={{ fontSize: 20, color: black_light }}>Address</Title>
          </Body>
        </Header>
        <TabView
          style={[styles.container, this.props.style]}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index })}
        />
 <TouchableOpacity
        onPress={()=>{this.props.navigation .navigate('MapAddress')}}
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



}


const mapStateToProps = (state) => {
  return {
    //state.reducername.s
    //////
    //loading: state.data.loading,
    // code:state.data.code,
    data: state.address.data,
  }
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  tabbar: {
    // flexDirection: 'row',
    // backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },

  tab: {

    alignItems: 'center',

    backgroundColor: 'white',
    flex: 1,
    //borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, .2)',
    paddingTop: 4.5,
  },


  indicator: {

    backgroundColor: black_light,
  },
  label: {
    color: black_light,
    fontWeight: '400',
  },
});

// const mapDispatchToProps = {
//   getAllAddress,
// }

export default connect(mapStateToProps, { getAllAddress })(Address);
