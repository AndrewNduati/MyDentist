/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

var Firebase =  require('firebase');
const styles = require('./styles.js');
const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');

var config = {
  authDomain:'https://dentist-directory-1c7d3.firebaseio.com' // Get to post to firebase then continue.
}
var myFirebaseRef = Firebase.initializeApp(config);
  
export default class MyDentist extends Component {
 constructor(props) {
  super(props);
  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  };
}
 _renderItem(item) {
    return (
      <ListItem item="{item}"  />
    );
  }

componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
         <StatusBar title="My Dentist" />
            <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData.title}</Text>} // Just rendering title as opposed to entire ListView
        
          />
      </View>
    );
  }
  

}



AppRegistry.registerComponent('MyDentist', () => MyDentist);
