import React, { Component } from 'react';
import { Container, Thumbnail, Icon, Card } from 'native-base';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { getAllPackages } from '../actions/OrderAction';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { blue_light, gray_light, colorPrimary } from '../constant';



class OrderList extends Component {


  constructor(props) {
    super(props);
    this.makeIntent = this.makeIntent.bind(this);

    //this.handleLoadMore=this.handleLoadMore.bind(this);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      refreshing: false,
      siteTitle: '',
      scrollBegin: false
      //Loading state used while loading the data for the first time
      //Data Source for the FlatList
      //Loading state used while loading more data

    };

    //Index of the offset to load from web API
  }
  makeIntent() {
    console.log('onPress','yes');
    //this.props.navigation.navigate('address');
  }
 
  componentDidMount() {
    // because redux_thux we can pass and call function in store of redux 
    this.props.getAllPackages();

  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log('step', 'WillReceive3');
    if (nextProps.data !== this.props.data) {
      console.log('after', this.props.data);
      const { page, seed } = this.state;
      if(this.props.data.length ){
        this.setState({
          data: page === 1 ? this.props.data : [...this.state.data, ... this.props.data],
        });
      }
      // console.log('before', this.props.user.name);
  }}
  renderItem = ({ item }) => {

    return (
      <View style={{ marginStart: 8, marginEnd: 8 }}>
        <Card style={{ margin: 8 }}  >

          <View style={{ flexDirection: 'row', margin: 16 }}>
            <Thumbnail source={require('../res/add_1.png')} />
            {/* data inside card  */}
            <View style={{ flexDirection: 'column', flex: 1, marginStart: 10 }}>
              {/* //first row */}
              <View style={{ marginTop:10, flexDirection: 'row', justifyContent: 'space-between', marginEnd: 20 }} >
                <Text style={{ fontSize: 19, fontStyle: 'normal', color: 'black' }}  >#{item.id}</Text>
                <Text style={{ fontSize: 16, fontStyle: 'normal', color: gray_light, }}  >{item.status}</Text>

              </View>
              {/* //second row */}
              <Text style={{ fontSize: 16, fontStyle: 'normal', color: blue_light }}  >{item.weight}KG</Text>
              {/* /third row  */}


              <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', marginEnd: 20 }} >
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 16, fontStyle: 'normal', color: 'black' }}  >From</Text>
                  <Text style={{ fontSize: 16, fontStyle: 'normal', color: gray_light }}  >walaa hasna</Text>

                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{ fontSize: 16, fontStyle: 'normal', color: 'black' }}  >to</Text>
                  <Text style={{ fontSize: 16, fontStyle: 'normal', color: gray_light, }}  >maram syma</Text>

                </View>

              </View>
            </View>
            <Icon name='ellipsis-v' type='FontAwesome' style={{ fontSize: 25, color: gray_light }} />


          </View>




          {/* /////////part 2 */}

          <View style={{ marginEnd:8,    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' ,marginBottom:16 }}>
            <Icon name='calendar' type='FontAwesome' style={{ fontSize: 15, color: gray_light, marginTop: 20 }} />

            <Text style={{ marginStart: 10, color: gray_light }} >22_2_2019</Text>


          </View>
        </Card>
      </View>
    );
    // return here
  }

  // shouldComponentUpdate() {
  //   return false
  // }

  handleLoadMore = () => {
    // this.setState(
    //   {
    //     page: this.state.page + 1
    //   },
    //   () => {
    //     this.props.getAllPackages(this.state.page);
    //   }
    // );
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
  
    return (
      <Container  style={{ marginBottom:16 }}>
        <FlatList  visible={false}   style={{ paddingTop: 10 }}
          data={this.props.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponessnt={this.renderFooter}
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
    code: state.order.code,
    data: state.order.data,

  }
}

// const mapDispatchToProps = {
//   getAllAddress,
// }

//connect method of react-redux
export default connect(mapStateToProps, { getAllPackages })(OrderList);
