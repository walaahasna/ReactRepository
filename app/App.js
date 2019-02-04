import React, { Component } from 'react';

//import { Text} from 'react-native';
//call create store for redux store to collect all state in int
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RootNavigator from './RootNavigator'





export default class App extends
Component {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk) )}>
      <RootNavigator/>
      </Provider>
    );
  }
}


