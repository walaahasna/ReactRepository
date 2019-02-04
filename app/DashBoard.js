import React, { Component } from 'react';
import { Left, Header, Icon, Body, Title, Button, Container, Right,  Text, Thumbnail } from 'native-base';
import { View, StyleSheet ,Image} from 'react-native';
//import CountryCodePicker from 'react-native-country-code-picker';
import { loginUser } from './actions/loginAction';
import { connect } from 'react-redux';
import { blue_light,  black_light, gray_light, colorPrimary } from './constant';
import { ScrollView } from 'react-native-gesture-handler';
//import form from './component/form'
class DashBoard extends Component {


  constructor(props) {
    super(props);

    this.showMenu = this.showMenu.bind(this);

  }
  NotificationScreen=()=>{
    this.props.navigation.navigate('NotificationScreen');

  }
 
  showMenu() {
    const parent = this.props.navigation.dangerouslyGetParent();
    const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;
    if (!isDrawerOpen) {
      this.props.navigation.openDrawer();
  
    }
    else {
      this.props.navigation.closeDrawer();

    }

  }


  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'white' }}>
          <Left>
            <Button transparent>
              <Icon name='menu' onPress={this.showMenu} style={{  fontSize: 24, color: black_light }} />
            </Button>
          </Left>

        
          <Body>
            <Title style={{ fontSize: 22, color: black_light }}>DashBoard</Title>
          </Body>
          <Right  >
          <Icon name='bell'  type='FontAwesome5' onPress={this.NotificationScreen} style={{  fontSize: 22, color: black_light }} />

          </Right>
          
        </Header>

        {/* //////////////// mian content  */}
        <View style={{  flex: 1, backgroundColor: 'white', marginTop: 20 }}>

          {/* /// box 1  */}

          <View   style={{ justifyContent: 'center', alignItems: 'center' ,flexDirection:'row' }}  >
            <Image    source={require('./res/dash.png')} style={{  resizeMode:'contain' ,width: 250, height: 250 , justifyContent: 'center',
    alignItems: 'center',}} />

          </View>





          {/* /// box 2  */}

          <ScrollView  showsHorizontalScrollIndicator={false}  horizontal style={{ flex: 1, flexDirection: 'row'}} >

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}  >
            {/* /////////////item  one  */}

            <View style={{ padding: 8, width:150, height: 80, flexDirection: 'column', backgroundColor: blue_light, margin: 4, borderRadius: 4 }}>

              <Text style={{ flex: 1, fontSize: 12, color: 'white' }}>All Packges</Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                <Text style={{ flex: 1, fontSize: 18, color: 'white' }} >1</Text>
                <Thumbnail source={require('./res/box_ribbon.png')} />
              </View>


            </View>

            {/* /////////////item  tow  */}
            <View style={{ padding: 8, width:150, height: 80, backgroundColor: '#6ae197', margin: 4, borderRadius: 4 }}>
              <Text style={{ flex: 1, fontSize: 12, color: 'white' }}>Deliverd Packges</Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                <Text style={{ flex: 1, fontSize: 12, color: 'white' }} >1</Text>
                <Thumbnail source={require('./res/box_ribbon.png')} />
              </View>
            </View>


            {/* /////////////item  three  */}
            <View style={{ padding: 8, width:150, height: 80, backgroundColor: '#f5a623', margin: 4, borderRadius: 4 }}>
              <Text style={{ flex: 1, fontSize: 12, color: 'white' }}>Pending Packges</Text>

              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                <Text style={{ flex: 1, fontSize: 18, color: 'white' }} >1</Text>
                <Thumbnail source={require('./res/box_ribbon.png')} />
              </View>
            </View>




          </View>



          </ScrollView>




          {/* /// box  3 */}
          <View style={{ flex: 1,flexDirection:'row' }}  >


<View  style={{ flex: 1,flexDirection:'column' ,justifyContent:'center',alignItems:'center' ,alignSelf:'center'}}  >
<Image source={require('./res/navigation.png')}  style={{width:20,height:20}} />
<Text style={{ flex: 1, fontSize: 16, color:blue_light ,marginTop:8}} >Address</Text>
</View>


<View  style={{ flex: 1,flexDirection:'column' ,justifyContent:'center',alignItems:'center'}}  >
<Image source={ require('./res/add_order.png')} style={{width:90,height:90,  }} />
<Text style={{ flex: 1, fontSize: 16, color:gray_light }} >New Packges</Text>
</View>

<View  style={{ flex: 1,flexDirection:'column' ,justifyContent:'center',alignItems:'center',alignSelf:'center'}}  >
<Image source={require('./res/voice_record.png')} />
<Text style={{ flex: 1, fontSize: 16, color:colorPrimary ,marginTop:8}} >All Packges</Text>
</View>




          </View>




        </View>

      </Container>

    );
  }
}



export default connect('', { loginUser })(DashBoard);
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
