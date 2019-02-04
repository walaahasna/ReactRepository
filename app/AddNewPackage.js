import React, { Component } from 'react';
import { Left, Header, Icon, Body, Title, Button, Container, Right, Text, ListItem } from 'native-base';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Animated ,ActivityIndicator} from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { getAllAddress, getAllAddressReceiver } from './actions/AddressAction';
import { connect } from 'react-redux';
import { black_light, gray_light, colorPrimary, gray } from './constant';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
//import form from './component/form'
//import Swiper from 'react-native-custom-swiper';
import { NavigationActions } from 'react-navigation';

import SlidingUpPanel from 'rn-sliding-up-panel';
import { getIconType } from 'react-native-elements';
import { getAllAvailableTime, addPackageNow } from './actions/OrderAction';


//import { TouchThroughView, TouchThroughWrapper } from 'react-native-touch-through-view';
//import AddressList from './component/AddressList';
const { height } = Dimensions.get('window')

class AddNewPackage extends Component {

  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 120
    }
  }

  _draggedValue = new Animated.Value(-120)

  constructor(props) {
    super(props);
    // this.moveIndexNext=this.moveIndexNext.bind(this);
    // this.moveIndexPrevious=this.moveIndexPrevious.bind(this);



    this.state = {
      index: 0,
      indexP: 0,
      weight: 0,
      type: 'sender',
      visible: false,
      source_address: 'Address',
      target_address: 'Address',
      source_id: '0',
      target_id: '0',
      drop_transit_time: 'Drop Time ',
      pick_transit_time: 'Pick Time',
      dataReceiver: [],
      dataSender: [],
      dataDrop: [],
      dataPick: [],
      loading:true,

      currentIndex: 0,
    };
  }



  moveIndexNext = () => {

    if (this.state.dataDrop.length === 0) {
      return;
    }
    if (this.state.index + 1 === this.state.dataDrop.length) {
      //  this.setState({index:0});

    } else {
      this.setState({ index: this.state.index + 1 });
      // this.index++;

    }
    this.setState({ drop_transit_time: this.state.dataDrop[this.state.index] });

  }





  moveIndexNextPick = () => {

    if (this.state.dataPick.length === 0) {
      return;
    }
    if (this.state.indexP + 1 === this.state.dataPick.length) {
      //  this.setState({index:0});

    } else {
      this.setState({ indexP: this.state.indexP + 1 });
      // this.index++;

    }
    this.setState({ pick_transit_time: this.state.dataPick[this.state.indexP] });


  }

  moveIndexPrevious = () => {
    if (this.state.dataDrop.length === 0) {
      return;
    }
    if (this.state.index - 1 === -1) {
      this.state.index = this.state.dataDrop.length - 1;
    } else {
      // this.index--;
      this.setState({ index: this.state.index - 1 });

    }
    this.setState({ drop_transit_time: this.state.dataDrop[this.state.index] });


  }

  moveIndexPreviousPick = () => {
    if (this.state.dataPick.length === 0) {
      return;
    }
    if (this.state.indexP - 1 === -1) {
      this.state.indexP = this.state.dataPick.length - 1;
    } else {
      // this.index--;
      this.setState({ indexP: this.state.indexP - 1 });

    }


    this.setState({ pick_transit_time: this.state.dataPick[this.state.indexP] });

  }

  getCurrentItem = () => {
    //// this.setState({drop_transit_time:this.state.dataDrop[this.state.index]});
    //return this.state.dataDrop[this.state.index];
  }

  getCurrentItemPick = () => {

    //this.setState({pick_transit_time:this.state.dataPick[this.state.indexP]});
    // this.setState({pick_transit_time:this.state.dataDrop[this.state.index]});

  }


  onPressItem(item) {
    if (this.state.type === 'sender') {
      this.setState({ source_address: item.mobile });
      this.setState({ source_id: item.id });
    }
    else {
      this.setState({ target_address: item.mobile });
      this.setState({ target_id: item.id });
    }

    this.setState({ visible: false })
  }
  // alert(item.name);


  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onPressItem.bind(this, item)}
      >
        <View style={{ marginStart: 8, marginEnd: 8, marginTop: 10, marginBottom: 10 }}>
          <Text style={{ marginTop: 8, color: gray, fontSize: 14, textAlign: 'center' }} >{item.mobile + ' ,' + item.state + ' ,' + item.city}</Text>
        </View>
      </TouchableOpacity>

    );
    // return here
  }

  UNSAFE_componentWillMount(){
     // because redux_thux we can pass and call function in store of redux 
     this.props.getAllAvailableTime();

 
   
}



  UNSAFE_componentWillReceiveProps(nextProps) {

    
    if (nextProps.dataReceiver !== this.props.dataReceiver) {
      if (nextProps.dataReceiver.length>0 ) {
        this.setState({ dataReceiver: nextProps.dataReceiver });

      }

    }

    if (nextProps.dataSender !== this.props.dataSender) {
      if (nextProps.dataSender.length > 0) {
        this.setState({ dataSender: nextProps.dataSender });

      }

    }

    // console.log('datadrop',this.props.dataDrop); 
    // console.log('datapick',this.props.dataPick);
    // console.log('dataReceiver',this.props.dataReceiver);
    // console.log('dataSender',this.props.dataSender);

    if (nextProps.dataDrop !== this.props.dataDrop) {
      if (nextProps.dataDrop.length >0) {
        this.setState({ dataDrop: nextProps.dataDrop } );
        this.setState({ drop_transit_time: nextProps.dataDrop[0] });
      }
    }


    if (nextProps.dataPick !== this.props.dataPick) {
      if (nextProps.dataPick.length >0) {
        this.setState({ dataPick: nextProps.dataPick });
        this.setState({ pick_transit_time: nextProps.dataPick[0] });
        //this.setState({drop_transit_time:this.state.dataPick[this.state.index]});
      }

    }

    
  }

  componentDidMount(){
    this.props.getAllAddress();
    this.props.getAllAddressReceiver();
  }





  data() {
    if (this.state.weight > 0) {
      return <Text>{this.state.weight} </Text>
    }

    return <Text>weight </Text>



  }


  increment = () => {
    this.setState({ weight: this.state.weight + 1 });
  }

  deccrement = () => {
    if (this.state.weight > 0) {
      this.setState({ weight: this.state.weight - 1 });
    }

  }




  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: '#e4e4e4',
          marginLeft: "10%"
        }}
      />
    );
  };


  exampleContent = () => {
    if (this.state.type === 'sender') {
      return (
        <FlatList style={{ paddingTop: 10, backgroundColor: 'white' }}
          data={this.state.dataSender}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          extraData={this.state}
          // onEndReachedThreshold={50}
          //  initialNumToRender={8}   // how many item to display first 
          onEndReachedThreshold={50} /// when arriave the last item in list then call endReached 

        />
      )
    }






    return (
      <FlatList style={{ paddingTop: 10, backgroundColor: 'white' }}
        data={this.state.dataReceiver}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        ListHeaderComponent={this.renderHeader}
        onRefresh={this.handleRefresh}
        refreshing={this.state.refreshing}
        onEndReached={this.handleLoadMore}
        // onEndReachedThreshold={50}
        extraData={this.state}

        //  initialNumToRender={8}   // how many item to display first 
        onEndReachedThreshold={50} /// when arriave the last item in list then call endReached 

      />

    );


  }

  pickupPress = () => {
    this.setState({ type: 'sender' });
   // this.setState({ dataSender: this.props.dataSender });
    this.setState({ visible: true });

  }

  dropPress = () => {
    this.setState({ type: 'receiver' });
   // this.setState({ dataReceiver: this.props.dataReceiver });
    this.setState({ visible: true });
   

  }

  navigateAfterFinish= (screen) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screen })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }


  screenChange = index => {

    this.setState({ currentIndex: index });
  };
  render() {

    const { goBack } = this.props.navigation;

    if (this.props.addCode === 0) {
     // this.navigateAfterFinish('DashBoard')
     this.props .navigation.navigate('DashBoard');
    // goBack('DashBoard');
    }

    return (
      <Container  >

      
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Icon type='FontAwesome' name='chevron-left' onPress={this.showMenu} style={{ fontSize: 20, color: black_light }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ fontSize: 20, color: black_light }}>New Package</Title>
          </Body>
          <Right />
        </Header>


        {/* //////////////// mian content  below hedar */}
        <View style={{ flex: 1, backgroundColor: '#fbfbfc', paddingTop: 10 }}>
          {/* //title 1 */}
          <ListItem icon>
            <Left>

              <Icon name="archive" type='FontAwesome' style={{ fontSize: 18, color: gray_light }} />
            </Left>
            <Body style={{ borderBottomColor: 'transparent' }}>
              <Text style={{ fontSize: 14, color: gray_light }}>Package Detailes </Text>
            </Body>
          </ListItem>



          {/* //////////////////whitebox 1 */}

          <View style={{ paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, marginStart: 10, marginEnd: 10, backgroundColor: 'white', borderColor: gray_light, borderRadius: 3 }}>
            <ListItem style={{ marginBottom: 16 }} icon>
              <Left>
                <View style={styles.circlegreen}>
                  <Text style={{ fontSize: 10, color: 'white', textAlignVertical: "center", textAlign: "center", }}>fro</Text>
                </View>

              </Left>
              <Body style={{ borderBottomColor: 'transparent' }}>
                <Text style={{ fontSize: 14 }} >Pick-up location</Text>
                <TouchableOpacity title='Show panel' onPress={this.pickupPress} >
                  <Text style={{ fontSize: 13, color: gray, marginTop: 8 }} >{this.state.source_address}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>

            {/* /////////////////to */}
            <ListItem icon>
              <Left>
                <View style={styles.circle}>
                  <Text style={{ fontSize: 10, color: 'white', textAlignVertical: "center", textAlign: "center", }}>To</Text>
                </View>

              </Left>
              <Body style={{ borderBottomColor: 'transparent' }}>
                <Text style={{ fontSize: 14 }} >Drop off location </Text>
                <TouchableOpacity onPress={this.dropPress}>
                  <Text style={{ fontSize: 13, color: gray, marginTop: 8 }}  >{this.state.target_address}</Text>
                </TouchableOpacity>


              </Body>
            </ListItem>


          </View>





          {/* ///////////////////title 2 */}
          <ListItem style={{ marginTop: 5, marginBottom: 5 }} icon>
            <Left>
              <Icon name="calendar" type='FontAwesome' style={{ fontSize: 18, color: gray_light }} />
            </Left>
            <Body style={{ borderBottomColor: 'transparent' }}>
              <Text style={{ fontSize: 14, color: gray_light }}>Delivery Time </Text>
            </Body>
          </ListItem>

          {/* ///////////////////whitebox 2  */}
          <View style={{ paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, marginStart: 10, marginEnd: 10, backgroundColor: 'white', borderColor: gray_light, borderRadius: 3 }}>




            {/* //////////////////// pick time */}

            <Text style={{ color: gray_light, fontSize: 12, marginStart: 10, marginBottom: 5 }}> Pick Time </Text>
            <View style={{ marginStart: 10, marginEnd: 10, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


              <TouchableOpacity onPress={this.moveIndexPreviousPick}>
                <Icon type='FontAwesome' name='chevron-left' style={{ fontSize: 16, color: colorPrimary, marginBottom: 12 }} />
              </TouchableOpacity>

              <View>
                <Text> {
                  this.state.pick_transit_time
                }</Text>

              </View>

              <TouchableOpacity onPress={this.moveIndexNextPick}>
                <Icon type='FontAwesome' name='chevron-right' style={{ fontSize: 16, color: colorPrimary, marginBottom: 12 }} />
              </TouchableOpacity>
            </View>
            {/* /////////////////////drop time  */}

            <Text style={{ color: gray_light, fontSize: 12, marginStart: 10, marginBottom: 10 }}> Drop Time </Text>

            <View style={{ marginStart: 10, marginEnd: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


              <TouchableOpacity onPress={this.moveIndexPrevious}>
                <Icon type='FontAwesome' name='chevron-left' style={{ fontSize: 16, color: colorPrimary, marginBottom: 12 }} />
              </TouchableOpacity>

              <View>
                <Text> {
                  this.state.drop_transit_time
                }</Text>

              </View>

              <TouchableOpacity onPress={this.moveIndexNext}>
                <Icon type='FontAwesome' name='chevron-right' style={{ fontSize: 16, color: colorPrimary, marginBottom: 12 }} />
              </TouchableOpacity>
            </View>

          </View>






          {/* ///////////////////title 3 */}
          <ListItem style={{ marginTop: 5, marginBottom: 5 }} icon>
            <Left>
              <Icon name="calendar" type='FontAwesome' style={{ fontSize: 18, color: gray_light }} />
            </Left>
            <Body style={{ borderBottomColor: 'transparent' }}>
              <Text style={{ fontSize: 14, color: gray_light }}>Delivery Time </Text>
            </Body>
          </ListItem>


          {/* /////////////////whitebox 3  */}
          <View style={{ paddingTop: 20, paddingBottom: 20, borderWidth: 0.5, marginStart: 10, marginEnd: 10, backgroundColor: 'white', borderColor: gray_light, borderRadius: 3 }}>
            <View style={{ marginStart: 10, marginEnd: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>



              <TouchableOpacity onPress={this.increment}>
                <Image onPress={this.increment} source={require('./res/plus.png')} />
              </TouchableOpacity>

              <View>
                {this.data()}
              </View>

              <TouchableOpacity onPress={this.deccrement}>
                <Image onPress={this.increment} source={require('./res/minus.png')} />
              </TouchableOpacity>




            </View>


          </View>


          <Button full light style={{
            backgroundColor: colorPrimary,

            position: 'absolute',
            left: 0,
            bottom: 0,
            flex: 1,
            right: 0,

          }}

            onPress={this.addPackageNow}
          >
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name='shuttle-van' type='FontAwesome5' style={{ fontSize: 20, color: 'white' }} ></Icon>
                <Text style={{ color: 'red', fontSize: 18 }}>0 AED</Text>
              </View>


              <Text style={{ color: 'white', fontSize: 18 }}>Ship Now</Text>

            </View>

          </Button>
          <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>

{this.renderView()}
</View>
{/* //////slide up */}
          <SlidingUpPanel style={{ backgroundColor: 'white', justifyContent: 'flex-end' }}
            visible={this.state.visible}
            ref={c => this._panel = c}

            onRequestClose={() => this.setState({ visible: false })}>

            <View style={styles.panel}>

              <View style={styles.panelHeader}>
                <Text onPress={() => this.setState({ visible: false })} style={{ color: '#FFF' }}>Cancel</Text>
                <Text style={{ color: '#FFF' }}>Address</Text>
                <Text style={{ color: '#FFF' }}>+ Add</Text>
              </View>
              <View style={styles.container}>
                {this.exampleContent()}
              </View>
            </View>


          </SlidingUpPanel>

        </View>

      </Container>
    );
  }

  addPackageNow = () => {
    const { source_id, target_id, weight, pick_transit_time, drop_transit_time } = this.state;
    this.props.addPackageNow(source_id, target_id, weight, pick_transit_time, drop_transit_time);
  }



  renderView() {
   // return <ActivityIndicator animating={this.state.loading} size="la" color='#46ae87' />

    if (this.props.loading) {
      return <ActivityIndicator animating={this.props.loaing} size="large" color='#46ae87' />
    }
    return null;
  }
  
}



const mapStateToProps = (state) => {
  return {
    //state.reducername.
    //////
    loading: state.order.loading,
    addCode: state.order.addCode,
    dataSender: state.address.data,
    dataReceiver: state.address.dataReceiver,
    dataDrop: state.order.dataDrop,
    dataPick: state.order.dataPick
  }
}

export default connect(mapStateToProps, { getAllAddress, getAllAvailableTime, getAllAddressReceiver, addPackageNow })(AddNewPackage);
const styles = StyleSheet.create({

  circle: {
    textAlign: 'center',
    width: 25,
    fontSize: 12,
    color: 'white',
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'red',
    justifyContent: "center",
    alignItems: "center"
  },

  circlegreen: {
    textAlign: 'center',
    width: 25,
    fontSize: 12,
    color: colorPrimary,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: colorPrimary,
    justifyContent: "center",
    alignItems: "center"
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
  panelHeader: {
    height: 50,
    alignItems: 'center',
    backgroundColor: colorPrimary,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  }

});
