import React, { Component } from "react";
import { View, AsyncStorage,  ActivityIndicator ,Text} from "react-native";
import { SearchBar } from "react-native-elements";
import { Container, Content ,ListItem,Thumbnail,Left,Right,Body,Icon} from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

import axios from 'axios';
import { black_light } from "./constant";

class FlatListDemo extends Component {
  constructor(props) {
    super(props);


    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false
    };
  }
  
ui90u09u90


  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
   // const url='https://apidev.wasel.biz/v1/user/addresses?page=${page}';
    //const url = `https://apidev.wasel.biz/v1/user/addresses?page=${page}`;
    this.setState({ loading: true });


    AsyncStorage.getItem("app_token").then((value) => {
        console.log('addresstoken', value);
        const url = `https://apidev.wasel.biz/v1/user/addresses?page=${page}`;
  
        console.log('url', url);
        axios.get(url, // This is the body part
          {
            headers: {
              'Authorization': value
              //other header fields
            }
          }
        )
          .then((response) => {
            this.setState({
                data: page === 1 ? response.data.body.data : [...this.state.data, ...response.data.body.data],
                error: response.error || null,
                loading: false,
                refreshing: false



              });
          })
          .catch((error) => {
            console.log(error);
          });
      })
        .then(res => {
          console.log('error', res);
          //do something else
        });
  
      console.log('token', AsyncStorage.getItem('app_token'))
    }

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

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
    
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
         // ItemSeparatorComponent={this.renderSeparator}
         // ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
    
    );
  }
  renderItem = ({ item }) => {
    return (
      <View style={{ marginStart: 8, marginEnd: 8 }}>
        <ListItem avatar>
              <Left>
                <Thumbnail source={require('./res/add_1.png')} />
              </Left>
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.city+item.state}</Text>
              </Body>
              <Right>
              <Icon name='ellipsis-v'  type='FontAwesome' style={{fontSize: 25, color: black_light}}/>
              </Right>
            </ListItem>
      </View>
    );
    // return here
  }
}

export default FlatListDemo;