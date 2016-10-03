import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableHighlight, ListView, Text} from 'react-native';

import DetailView from './DetailView';

export default class SearchResults extends Component {
  constructor (props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id});

    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  rowPressed(id) {
    var property = this.props.listings.filter(item => item.id === id)[0];

    this.props.navigator.push({
      component: DetailView,
      title: 'Detail',
      passProps: {detail: property}
    });
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#dddddd' onPress={() => this.rowPressed(rowData.id)}>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: rowData.image_url }}/>
            <View style={styles.textContainer}>
              <Text style={styles.price}>¥1000</Text>
              <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView 
        dataSource={this.state.dataSource} 
        renderRow={this._renderRow.bind(this)}
      />
    )
  }
}

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
})