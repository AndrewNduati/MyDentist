/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import FloatingActionButton from 'react-native-action-button';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView
} from 'react-native';

var Firebase = require('firebase');
const styles = require('./styles.js');
const StatusBar = require('./components/StatusBar');
const ListItem = require('./components/ListItem');

var config = {
  databaseURL: 'https://dentist-directory-1c7d3.firebaseio.com' // Get to post to firebase then continue.
}
var myFirebaseApp = Firebase.initializeApp(config);

export default class MyDentist extends Component {
  constructor(props) {
    super(props);
    this.docsRef = myFirebaseApp.database().ref();
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource: dataSource,
      newDoc: ""
    };
  }
  listenForDocs(docsRef) {
    docsRef.on('value', (dataSnapshot) => {
      var docs = [];
      dataSnapshot.forEach((child) => {
        docs.push({
          name: child.val().name,     
          email: child.val().email,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(docs)
      });
    });
  }

_addDoc(){
    if(this.state.newDoc === ""){ return;}

    this.docsRef.push({name: this.state.newDoc});
    this.setState({newDoc: ""});
}

  _renderItem(item) {
    return (
      <ListItem item={item} />
    );
  }

  componentDidMount() {
    this.listenForDocs(this.docsRef); // Listen for updates from Firebase...
  }

  render() {
    console.log(this.props.dataSource)
    return (
      <View style={styles.container}>
        <StatusBar title="My Dentist" />
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(item) => this._renderItem(item)} // Just rendering title as opposed to entire ListView
           />
           <TextInput
        value={this.state.newDoc}
        style={styles.textEdit}
        onChangeText={(text) => this.setState({newDoc: text})}
        placeholder="New Doc"
      />
      <FloatingActionButton 
        hideShadow={true} // this is to avoid a bug in the FAB library.
        buttonColor="rgba(231,76,60,1)" 
        onPress={this._addDoc.bind(this)}/>
      </View>
    );
  }


}



AppRegistry.registerComponent('MyDentist', () => MyDentist);
