import React, { Component } from 'react';
import { Container ,ListItem,Thumbnail,Left,Right,Body,Icon, Card} from 'native-base';
import {  Text, View ,TouchableOpacity,ActivityIndicator} from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { getAllNotification } from '../actions/NotificationAction';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { black_light, blue_light, gray_light, colorPrimary, gray } from '../constant';

 class NotificationList extends Component {

  
constructor(props){
  super(props);
//this.handleLoadMore=this.handleLoadMore.bind(this);
  this.state = {
    loading: false,
    data:[],

      page: 1,
      refreshing: false,
      siteTitle: '',
      scrollBegin:false
    //Loading state used while loading the data for the first time
    //Data Source for the FlatList
    //Loading state used while loading more data
    
  };
 
  //Index of the offset to load from web API
}


componentDidMount() {
  // because redux_thux we can pass and call function in store of redux 
  this.props.getAllNotification();
  
}



  renderItem = ({ item }) => {
    return (
      <View style={{ marginStart: 8, marginEnd: 8 }}>
  
        <ListItem     avatar>
              <Left>
                <Thumbnail  square source={require('../res/notification.png')} />
              </Left>
              <Body>
                <Text style={{ marginTop:4, color:black_light ,fontSize:14}}>{item.title}  <Text style={{marginTop:8, color:gray,fontSize:13}} >{item.text}</Text></Text>
          
              </Body>
              <Right>
            
              </Right>
            </ListItem>
            <View  style={{}}>

            </View>
          
      </View>
    );
    // return here
  }

  // shouldComponentUpdate() {
  //   return false
  // }
  


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      const { page, seed } = this.state;
      if(nextProps.data.length > 0){
        this.setState({
          data: page === 1 ? nextProps.data : [...this.state.data, ... nextProps.data],
    
        });
      }
    
      // console.log('before', this.props.user.name);
    }

  }

  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };


  render() {
    console.log('step', 'render2');
    return (
      <Container> 
           <FlatList style={{ paddingTop:10}}
             data={this.state.data}
             renderItem={this.renderItem}
             keyExtractor = { (item, index) => index.toString()}
           // ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
             ListFooterComponent={this.renderFooter}
             onRefresh={this.handleRefresh}
             refreshing={this.state.refreshing}
             onEndReached={this.handleLoadMore}
            // onEndReachedThreshold={50}
         //  initialNumToRender={8}   // how many item to display first 
           onEndReachedThreshold={50} /// when arriave the last item in list then call endReached 
      
          /> 


      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    //state.reducername.
    //////
    //loading: state.data.loading,
    // code:state.data.code,
    data: state.notification.data,

  }
}


//connect method of react-redux
export default connect(mapStateToProps, { getAllNotification })(NotificationList);
