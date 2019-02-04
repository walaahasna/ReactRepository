import React, { Component } from 'react';
import { Text,StyleSheet,View,AsyncStorage} from 'react-native';


export default class Splash extends Component {
  render() {
    return (
      <View style ={styles.container}>
      <Text style={styles.loadingText}> loading....</Text>
      </View>
    );
  }
  

navigat(screen){
  setTimeout(() => {
     this.props.navigation.navigate(screen);
   }, 2000 );

}

  componentDidMount() {
    AsyncStorage.getItem("app_token").then((value) => {

      if(value===null){
  
        this.props.navigation.navigate('login'); 
      }
      else{
        this.props.navigation.navigate('DashBoard'); 

      }
        
  })
  .then(res => {

    console.log('notfoundtoken',res);
      //do something else
  });
     
    }}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(42, 55, 68)',
    },
    loadingText: {
      color: '#fff',
      fontSize: 20,
      paddingTop: 10
    }



});
