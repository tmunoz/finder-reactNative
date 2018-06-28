import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute'
  },
  imageLogin: {
    width: 100,
    height: 130,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 110
  },
  inputText: {
    width: 300,
    height: 40,
    backgroundColor: 'transparent',
    borderBottomColor: 'rgba(255,255,255,0.3)',
    borderBottomWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    color: '#FFF',
    position: 'relative',
    flexDirection: 'row',
    textAlign: 'center'
  },
  buttonLogin: {
    width: 300,
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 20,
    position: 'relative',
    marginTop: 10
  },
  textButtonLogin: {
    color: '#578d95',
    fontWeight: 'bold'
  },
  textRecoverPassword: {
    color: '#FFF',
    position: 'relative',
    top: 180
  }
})

class Login extends Component {

  constructor() {
    super()
    this.state = {
      email    : "",
      password : ""
    }
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue)
    } catch (error) {
      console.log('AsyncStorage error:' + error.message)
    }
  }

  handleSignIn = () => {
    if (this.checkValuesForm()) {
      fetch('https://apifinder.herokuapp.com/user/login', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
            "email": this.state.email,
            "password": this.state.password
        }),
      })
      .then((response) => response.json())
      .then( (responseJSON) => {
        if (responseJSON.status == 1) {
            this.saveItem('token', responseJSON.token)
            Actions.Home();
        } else {
          Alert.alert('Incorrecto nombre de usuario y/o password')
          this.setState({
            email    : "",
            password : ""
          })
        }
      })
      .catch((error) => {
        Alert.alert('Error! vuelve a intentarlo')
      })
    } else {
      Alert.alert('Ingresar nombre de usuario y password')
    }
  }

  checkValuesForm = () => {
    if (!this.state.email || !this.state.password)
      return false
    else
      return true
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={require('../src/images/background-login.png')}
          style={styles.backgroundImage}>
        </Image>
        <Image
          source={require('../src/images/finder.png')}
          style={styles.imageLogin}
        />
        <TextInput
          editable={true}
          placeholder='Nombre de usuario'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='username'
          autoCapitalize='none'
          style={styles.inputText}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          editable={true}
          placeholder='Password'
          placeholderTextColor="rgba(255,255,255,0.7)"
          ref='password'
          secureTextEntry={true}
          style={styles.inputText}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          onPress={this.handleSignIn.bind(this)}
          style={styles.buttonLogin}
        >
          <Text
            style={styles.textButtonLogin}
          >
            Ingresar
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Login
