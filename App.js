import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native'
import {
  Router,
  Scene
} from 'react-native-router-flux'

import Login from './routes/Login'
import Home from './routes/Home'

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      page:'Home'
    }
  }

  render() {
    if (AsyncStorage.getItem('token') == null) {
      return (
        <Router>
          <Scene key="root">
            <Scene
              component={Login}
              hideNavBar={true}
              initial={true}
              key="Login"
              title="Login"
            />
          </Scene>
        </Router>
      )
    } else {
      return (
        <Router>
          <Scene key="root">
            <Scene
              component={Home}
              hideNavBar={true}
              initial={true}
              key="Home"
              title="Inicio"
            />
          </Scene>
        </Router>
      )
    }
  }
}
