import React, { Component } from 'react';
import { Container, Content ,ListItem,Thumbnail,Left,Right,Body,Icon, Card} from 'native-base';
import {  Text, View ,TouchableOpacity,ActivityIndicator} from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { getAllAddress } from '../actions/AddressAction';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { black_light, blue_light, gray, gray_light, colorPrimary } from '../constant';

 class AddressList extends Component {

  
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
  console.log('step', 'DidMount1');
  // because redux_thux we can pass and call function in store of redux 
  this.props.getAllAddress();
  
}
  renderItem = ({ item }) => {
    return (
      <View style={{ marginStart: 8, marginEnd: 8 }}>
      <Card  style={{ marginTop: 8, marginBottom: 8 }}  >
        <ListItem    noBorder  style={{marginBottom:40,marginTop:8,borderBottomWidth: 0,borderColor:'white'}} avatar>
              <Left>
                <Thumbnail style={{width:40,height:40}}   source={require('../res/abudhabi.png')} />
              </Left>
              <Body>
                <Text style={{ marginTop:4, color:blue_light ,fontSize:15}}>{item.name}</Text>
                <Text style={{marginTop:8, color:black_light,fontSize:14}} >{item.city+item.state}</Text>
              </Body>
              <Right>
                <View style={{justifyContent:'space-around'}}>
                <Icon name='ellipsis-v'  type='FontAwesome' style={{fontSize: 20, color: gray_light}}/>
                <Text style={{marginTop:8, color:black_light,fontSize:14}} >{item.created_at}</Text>

                </View>
              </Right>
            </ListItem>
            </Card>
      </View>
    );
    // return here
  }

  // shouldComponentUpdate() {
  //   return false
  // }
  

  handleLoadMore = ()=> {
  
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.getAllAddress(this.state.page);
      }
    );
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('step', 'WillReceive3');
    if (nextProps.data !== this.props.data) {
      console.log('after', this.props.data);
      const { page, seed } = this.state;
      if(this.props.data.length > 0){
        this.setState({

          data: page === 1 ? this.props.data : [...this.state.data, ... this.props.data],
    
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
    data: state.address.data,

  }
}

// const mapDispatchToProps = {
//   getAllAddress,
// }

//connect method of react-redux
export default connect(mapStateToProps, { getAllAddress })(AddressList);
