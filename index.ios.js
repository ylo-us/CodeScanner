/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import states from './components/states.js'
import Main from './components/main.js';
import Add from './components/addProduct.js';
import Msg from './components/message.js';

class codeScanner extends Component {

  render() {
    return (
      <Provider store={states.store}>
        <Navigator 
          initialRoute={{title: 'main', component: Main, info: ''}} 
          renderScene={(route, navigator) => {
            if (route.title === 'main') {
              return <Main navigator={navigator}/>
            }
            if (route.title === 'add') {
              return <Add navigator={navigator}/>
            }
            if (route.title === 'message') {
              return <Msg info={route.info} navigator={navigator}/>
            }
          }}
        />
      </Provider>
    ); 
  }
}

AppRegistry.registerComponent('codeScanner', () => codeScanner);
