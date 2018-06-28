import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Header from './Header'
import { Actions } from 'react-native-router-flux'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class Home extends Component {
  render(){
    return(
      <View>
        <Header />
        <View style={styles.container}>
          <Text>Home</Text>
        </View>        
      </View>
    )
  }
}

export default Home
