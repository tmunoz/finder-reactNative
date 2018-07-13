import React, { Component } from 'react';
import { Text, View, Alert, AsyncStorage, SectionList } from 'react-native';
import jwtDecode from 'jwt-decode';

const parseJwt = (cosa) => {
    var base64Url = cosa.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

class List extends Component {
  constructor(){
    super();
    this.state = {
      token: "",
      locations: []
    }
  }

  _getTokenData = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token){
      this.setState({token});
    }
  }
  componentDidMount() {
    this._getTokenData()
    .then(() => {
      const email = parseJwt(this.state.token)
      fetch('https://apifinder.herokuapp.com/user/info/'+ email.admin)
      .then(response => response.json())
      .then(responseJSON => {
        fetch('https://apifinder.herokuapp.com/location/user/'+ responseJSON.data.id)
        .then(res => res.json())
        .then(resJSON => {
          this.setState({
            locations: resJSON.data
          });
        })
      })
    })
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        {
          this.state.locations.map((location) => {
            return(
              <View style={styles.viewStyle}>
                <Text>
                  Lugar: {location.name}
                </Text>
                <Text>
                  Dirección: {location.address}
                </Text>

              </View>
            )
          })
        }
      </View>
    );
  }
}
const styles = {
  viewStyle: {
    paddingTop: 30,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  locationDiv: {
    backgroundColor: 'F8F8F8',
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: {width:0, height: 2},
    shadowOpacity: 0.2
  }
};

export default List;
