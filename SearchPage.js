import React, { Component, PropTypes } from 'react';
import {NavigatorIOS, View, StyleSheet, TouchableOpacity, Text, TextInput, ActivityIndicator, TouchableHighlight } from 'react-native';

import YouTube from 'react-native-youtube';

import SearchResults from './SearchResults';


export default class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: 'london',
      isLoading: false,
      message: '',
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: true
    }
  }

  onSearchTextChanged(event){
    console.log('onSearchTextChanged');

    this.setState({searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }

  _executeQuery() {
    var query = 'https://dev-krpapp.e-aeon.com/api/news';

    console.log(query);
    this.setState({isLoading: true});
    fetch(query, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_version: '1.1.1',
          device_cd: '12329929282',
          os_kbn: 'ios',
          user_agent: 'ios,v5001',
          item_num: 10
        })
      })
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error => 
        this.setState({
          isLoading: false, 
          message: 'Something bad happened ' + error
        }))
  }

  _handleResponse (response) {
    console.log(response);
    this.setState({isLoading: false, message: ''});
    if (response.code === 1000) {
      console.log('Properties found: ' + response.data.news.length);
      this.props.navigator.push({
        title: 'Results',
        component: SearchResults,
        passProps: {listings: response.data.news}
      });
    }else {
      this.setState({message: 'Location not recognirzed, please try again'});
    }
  }

  onSearchPressed () {
    this._executeQuery();
  }

  _playVideo () {
    this.refs.youtubePlayer.seekTo(20);
  }

  render() {
    console.log('SearchPage.render');
      
    var spinner = this.state.isLoading ? (<ActivityIndicator size='large' />) : (<View/>)

    return (
      
      <View style={styles.container}>
        <Text style={styles.description}>
          Search food or drink!
        </Text>
        <Text style={styles.description}>
          Search near table.
        </Text>

        <View style={styles.flowRight}>
          <TextInput 
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or postcode'
            />

          <TouchableHighlight style={styles.button} onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight style={styles.button} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>

        {spinner}

        <YouTube
          videoId="KVZ-P-ZI6W4"
          play={this.state.isPlaying}
          hidden={false}
          playsInline={true}
          onReady={(e)=>{this.setState({isReady: true})}}
          onChangeState={(e)=>{this.setState({status: e.state})}}
          onChangeQuality={(e)=>{this.setState({quality: e.quality})}}
          onError={(e)=>{this.setState({error: e.error})}}
          style={{alignSelf: 'stretch', height: 300, backgroundColor: 'black', marginVertical: 10}}
        />

        <TouchableOpacity onPress={()=>{this.setState((s) => {return {isPlaying: !s.isPlaying};} )}}>
          <Text style={[styles.welcome, {color: 'blue'}]}>{this.state.status == 'playing' ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>{this.state.isReady ? 'Player is ready.' : 'Player setting up...'}</Text>
        <Text style={styles.instructions}>Status: {this.state.status}</Text>
        <Text style={styles.instructions}>Quality: {this.state.quality}</Text>
        <Text style={styles.instructions}>{this.state.error ? 'Error: ' + this.state.error : ' '}</Text>


      </View>

    )
  }
}

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button: {
    height: 36,
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius:8,
    color: '#48BBEC'
  }
})