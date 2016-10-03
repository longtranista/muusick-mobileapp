import React, { Component, PropTypes } from 'react';
import {AppRegistry,  NavigatorIOS, Text, TouchableHighlight, View } from 'react-native';

import SearchPage from './SearchPage';

class HomeView extends Component {
  render () {
    return (
      <View style={{backgroundColor: 'powderblue'}}>
        <Text style={{marginTop: 100}}>Helloo, wolrd! uuuu</Text>
      </View>

      
    )
  }
}

class AwesomeProject extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: SearchPage,
          title: 'Drunker Finder',
        }}
        style={{flex: 1}}
      />
    )
  }
}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
