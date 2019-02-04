import React, { Component } from 'react';
import { Container, Icon, Button, Item, Input } from 'native-base';
import { Alert,Platform, Animated, Image, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
//import { colorPrimary, gray, black_light } from './constant';
import { connect } from 'react-redux';
import MapView, { Polyline, ProviderPropType } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { colorPrimary, pale_grey_eleven, gray, black_light, gray_light } from './constant';
import { addNewAddress, getState } from './actions/AddressAction';
import SlidingUpPanel from 'rn-sliding-up-panel';

///const IOS = Platform.OS === 'ios';
//const ANDROID = Platform.OS === 'android';

const latitudeDelta = 0.0922
const longitudeDelta = 0.0421

const COORDINATES = [
  { latitude: 37.8025259, longitude: -122.4351431 },
  { latitude: 37.7896386, longitude: -122.421646 },
  { latitude: 37.7665248, longitude: -122.4161628 },
  { latitude: 37.7734153, longitude: -122.4577787 },
  { latitude: 37.7948605, longitude: -122.4596065 },
  { latitude: 37.8025259, longitude: -122.4351431 },
];

const COLORS = [
  '#7F0000',
  '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
  '#B24112',
  '#E5845C',
  '#238C23',
  '#7F0000',
];

class MapAddress extends Component {



  find_dimesions(layout) {
    const { x, y, width, height } = layout;
    console.warn(x);
    console.warn(y);
    console.warn(width);
    console.warn(height);
    this.setState({ top: width });
  }

  static defaultProps = {
    draggableRange: {
      top: 250,
      bottom: 0
    }
  }

  _draggedValue = new Animated.Value(-120)



  constructor(props) {
    super(props);
    this.state = {
      draggableRange: {
        top:280,
        bottom: 0
      },
      addressComponent: [],
      visible: false,
      showNext: false,
      mobile: '',
      name: '',
      loading: false,
      stateId: '',
      country: '',
      city: '',
      state: '',
      street: '',
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude:24.28,
        longitude: 54.22
      },
      info: '',
      stateArray: []


    };



  }


  // GradientPolylines.propTypes = {
  //   provider: ProviderPropType,
  // };


  onRegionChange = region => {

    this.setState({
      region
    })
    this.getGecoderLocation();
  }

  componentDidMount() {
    this.props.getState();
    Geocoder.init('AIzaSyAHH80Vn3QCRvfEMGr5m_W1LblSyaVKrsw'); // use a valid API key
    AsyncStorage.getItem("mobile").then((value) => {
      if(value){
        if (!value.startsWith('_')) {
          this.setState({ mobile:  value });
          console.log('mobile', value);
        }
      }
     

    });
    AsyncStorage.getItem("name").then((value) => {
      if(value){
      if (!value.startsWith('_')) {
        this.setState({ name: value });
        console.log('name', value);
      }
      }
    });
    //this.getCurrentPosition();
    navigator.geolocation.getCurrentPosition(
      position => this.setState({
        region: {
          ...this.state.region,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      }),
      
      error =>  {
        //TODO: better design
        switch (error.code) {
          case 1:
            if (Platform.OS === "ios") {
              Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
            } else {
              Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
            }
            break;
          default:
            Alert.alert("", "Error al detectar tu locación");
        }
      }
    );
  }



  loactaeAddress = () => {
    this.setState({ visible: true });

  }

  getGecoderLocation() {
    Geocoder.from(this.state.region.latitude, this.state.region.longitude)
    
      .then(json => {

        if(json.results!==[]){
 // if(json.Status==='OK'){
  this.setState({
    addressComponent: json.results[0].address_components
  });


  for (let i = 0; i < this.state.addressComponent.length; i++) {
    console.log('locality ', 'enter');
    if (this.state.addressComponent[i].types[0] === "locality") {
      const city1 = this.state.addressComponent[i].long_name;
      this.setState({ city: city1 });
    }
    else if (this.state.addressComponent[i].types[0] === "administrative_area_level_2") {
      const country1 = this.state.addressComponent[i].long_name;
      this.setState({ country: country1 });

    }
    else if (this.state.addressComponent[i].types[0] === "administrative_area_level_1") {
      const state1 = this.state.addressComponent[i].long_name;
      this.setState({ state: state1 });
    }
    else if (this.state.addressComponent[i].types[0] === "country") {
      const country1 = this.state.addressComponent[i].long_name;
      this.setState({ country: country1 });
    }
    else if (this.state.addressComponent[i].types[0] === "route") {
      const street1 = this.state.addressComponent[i].long_name;
      this.setState({ street: street1 });
    }
    else if (this.state.addressComponent[i].types[0] === "sublocality") {
      const street2 = this.state.addressComponent[i].long_name;
      //   this.setState({street:street1});
    }

  }
        }
       
        //}


      })
      .catch(error => console.warn(error));




  }

  cancel = () => {
    this.setState({ visible: false, showNext: false });

  }




  renderView() {
    // return <ActivityIndicator animating={this.state.loading} size="la" color='#46ae87' />

    if (this.props.loading) {
      return <ActivityIndicator animating={this.props.loading} size="large" color='#46ae87' />
    }
    return null;
  }

  render() {

    const { region } = this.state.region


    return (

      <Container>
        <View style={styles.map}>
          <MapView
          showsUserLocation={true}
          followsUserLocation={true}
            provider={this.props.provider}
        //    showsMyLocationButton={false}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={this.onRegionChange}

          >
            <Polyline
              coordinates={COORDINATES}
              strokeColor="#000"
              strokeColors={COLORS}
              strokeWidth={6}
            />
          </MapView>

          <View style={styles.markerFixed}>
            <Image style={styles.marker} source={require('./res/icons8-marker.png')} />

          </View>
          <SafeAreaView style={styles.footer}>
            {/* <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text> */}
            <Button full transparent style={{ marginStart: 10, marginEnd: 10, margin: 10, backgroundColor: colorPrimary }}>
              <Text style={{ color: 'white', fontSize: 18 }} onPress={this.loactaeAddress}>locating</Text>
            </Button>
          </SafeAreaView>


          <SlidingUpPanel style={{ backgroundColor: 'white', justifyContent: 'flex-end' }}
            visible={this.state.visible}
            ref={c => this._panel = c}
            draggableRange={this.state.draggableRange}


            onRequestClose={() => this.setState({ visible: false })}>

            <View style={styles.panel}>

              <View style={styles.panelHeader}>
                <TouchableOpacity onPress={this.cancel}>
                  <Text style={{ color: black_light }}>Cancel</Text>
                </TouchableOpacity>

                <Text style={{ color: black_light }}>Address Info </Text>
                <TouchableOpacity onPress={this.showNext}>
                  <Text style={{ color: black_light }} >Next</Text>
                </TouchableOpacity>

              </View>
              <View >
                {this.botomSheetContent()}
              </View>
            </View>


          </SlidingUpPanel>
        </View>


        <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>

          {this.renderView()}
        </View>
      </Container>
    );
  }


  isShowInfoText = () => {

    console.log('info', this.state.info);
    if ((this.state.info.trim !== '') || (this.state.info.trim().length !== 0)) {
      return (
        <View>
          <Icon name='edit' type='FontAwesome5' style={{ fontSize: 18, color: colorPrimary, marginEnd: 10 }} />
          <Text style={{ fontSize: 15 }} >
            {this.state.info}
          </Text>
        </View>
      );
    }
    return null;



  }
//onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
  botomSheetContent = () => {
    if (this.state.showNext === false) {
      return (
        <View  style={{ backgroundColor: 'white', margin: 10, marginStart: 12, marginEnd: 12 }} >
          <Item  >
            <Icon name='edit' type='FontAwesome' style={{ fontSize: 16, color: gray }} />
            <Input placeholder='Addtion info ' style={{ fontSize: 12 }} onChangeText={(info) => this.setState({ info })}>
            </Input>
          </Item>

        </View>
      );

    }

    return (


      <View>
        <View style={{ margin: 10 }}>


          {/* ///////////////////////////////////////////////address  */}
          <View style={{ flexDirection: 'row', marginBottom: 18, alignItems: 'center', marginEnd: 10, marginStart: 10 }}
          >
            <Icon name='map-marker-alt' type='FontAwesome5' style={{ fontSize: 18, color: colorPrimary, marginEnd: 10 }} />
            <Text style={{ fontSize: 15 }} >
              {this.state.country + ', ' + this.state.state + ', ' + this.state.city + ', ' + this.state.street}
            </Text>
          </View>
          {/* /////////////////////////name  */}

          <View style={{ flexDirection: 'row', marginBottom: 18, alignItems: 'center', marginEnd: 10, marginStart: 10 }}
          >
            <Icon name='user' type='FontAwesome5' style={{ fontSize: 18, color: colorPrimary, marginEnd: 10 }} />
            <Text style={{ fontSize: 15 }} >
              {this.state.name}         </Text>
          </View>
          {/* ///////////////////////////////////////////////phone  */}
          <View style={{ flexDirection: 'row', marginBottom: 18, alignItems: 'center', marginEnd: 10, marginStart: 10 }}
          >
            <Icon name='mobile' type='FontAwesome5' style={{ fontSize: 18, color: colorPrimary, marginEnd: 10 }} />
            <Text style={{ fontSize: 15 }} >
              {this.state.mobile}         </Text>
          </View>



          {/* //////////////////addtinal info */}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginEnd: 10, marginStart: 10 }}
          >
            {this.isShowInfoText}
          </View>





        </View>

        <Button full light style={{
          backgroundColor: colorPrimary,
          marginTop: 10
        }}

          onPress={this.addNewAddress}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Confirm</Text>
        </Button>
      </View>
    );

  }


  addNewAddress = () => {

    if (!this.state.state !== 'null') {
      for (let i = 0; i < this.state.stateArray.length > 0; i++) {
        if (this.state.state === this.state.stateArray[i].name) {
          this.setState({ stateId: String.valueOf(this.state.stateArray[i].id) });
          console.log('stateId', this.state.stateId);
        }
      }
    }
    this.props.addNewAddress(this.state.region.latitude,
      this.state.region.longitude,
      this.state.stateId,
      this.state.city,
      this.state.info,
      'sender',
      this.state.name,
      this.state.mobile,
      this.state.street

    );
  }
  showNext = () => {
    console.log('next,', 'true')
    this.setState({ showNext: true });
    // const draggableRange = { ...this.state.draggableRange }
    // draggableRange.top = 300;
    // this.setState({ draggableRange })
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.stateList !== this.props.stateList) {

      if (nextProps.stateList.length > 0) {
        this.setState({
          stateArray: nextProps.stateList,

        });
      }

      // console.log('before', this.props.user.name);
    }

    if (nextProps.code !== this.props.code) {

      if (nextProps.code === 0) {
        this.props.navigation.navigate('address');
      }

    }

  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (this.map) {
            this.map.animateToRegion({
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            })
          }},
        (error) => {
          //TODO: better design
          switch (error.code) {
            case 1:
              if (Platform.OS === "ios") {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
              } else {
                Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
              }
              break;
            default:
              Alert.alert("", "Error al detectar tu locación");
          }
        }
      );
    } catch(e) {
      Alert(e.message || "");
    }
  }
  
  
  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ready: true});
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.address.loading,
    stateList: state.address.stateList,
    code: state.address.code
  }
}


// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [
//   NavigationActions.navigate({ routeName: 'ScreenThree' })],
//   });
//   this.props.navigation.dispatch(resetAction);



const styles = StyleSheet.create({
  // map: {
  //   ...StyleSheet.absoluteFillObject,
  // },
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,

    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  },
  panelHeader: {
    height: 50,
    alignItems: 'center',
    backgroundColor: pale_grey_eleven,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: gray_light,
    borderBottomWidth: 1,
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative'
  },
});
export default connect(mapStateToProps, { addNewAddress, getState })(MapAddress);
