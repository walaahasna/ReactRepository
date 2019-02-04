import React, { Component } from 'react';
import { NavigationActions, DrawerActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Icon } from 'native-base';
import { black_light, colorPrimary} from '../constant';

export default class sideMenuDrawer extends Component {


  constructor(props) {
    super(props);

    this.makeIntent=this.makeIntent.bind(this);
    
  }

 
  makeIntent(text){
    
    this.props.navigation.navigate(text);
    this.props.navigation.closeDrawer()
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigsate({
      routeName: route
    });
    // eslint-disable-next-line no-invalid-this
    this.props.navigation.dispatch(navigateAction);
    // eslint-disable-next-line no-invalid-this
    this.props.navigation.dispatch(DrawerActions.closeDrawer())
  }
  render() {
    return (
      <View >
        <SafeAreaView style={{ flex: 1 }}>


          <View    style={{ marginStart: 16, height: 150, flexDirection: 'row', alignItems: 'center' }}>


          <TouchableOpacity
            
            onPress={()=>{ this.makeIntent('ProfileScreen')} }
          >
           <Image  
      
              style={{ marginEnd: 8, height: 50, width: 50, borderRadius: 75 }}
              source={require('../res/avatar.png')}
            />
          </TouchableOpacity>

           
            <Text>
              walaa abuhasna
                 </Text>

          </View>


          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
           this.makeIntent('DashBoard')}
          >
            <Icon name='home'  type='FontAwesome'  style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>DashBoard</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('order')} }
          >
            <Icon name='cube'  type='FontAwesome'  style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>packges</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('address')} }
          >
            <Icon name='info-circle' type='FontAwesome' style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>address</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('MapAddress')} }
          >
            <Icon name='info-circle'  type='FontAwesome'  style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>add Address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('AddNewPackage')} }
          >
            <Icon name='info-circle'  type='FontAwesome'  style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>add Order</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('settings')} }
          >
            <Icon name='cog'  type='FontAwesome'  style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>




          <TouchableOpacity
            style={styles.menuItem}
            onPress={()=>{ this.makeIntent('AboutScreen')} }
          >
            <Icon name='info-circle'  type='FontAwesome5' style={{fontSize:24 , color:colorPrimary,  marginStart: 15,marginTop:30,marginBottom:35,marginEnd:15 }} />
            <Text style={styles.menuText}>About Us</Text>
          </TouchableOpacity>








        </SafeAreaView>
      </View >
    );
  }


 /// 
}

sideMenuDrawer.propTypes = {
  navigation: PropTypes.object
};



const styles = StyleSheet.create({
  menuItem: {
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 16,
    marginStart: 8,
    marginBottom:15,
  
    flexDirection: 'row',
  }
  ,
  menuText: {
    fontSize:15,
    fontWeight:'300',
    margin:15,
    color: black_light
  }
  ,
 




}
);




