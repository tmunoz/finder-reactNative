import React, {Component} from 'react';
import { Text, View } from 'react-native';

class Header extends Component{

  render() {
    const {headerContentStyle, headerTextStyle} = styles;
    return(
      <View style = {headerContentStyle}>
        <Text style = {headerTextStyle}> Finder </Text>
      </View>
    );
  }
}

const styles = {
  headerContentStyle: {
    backgroundColor: '#578d95',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2
  },

  headerTextStyle: {
    fontSize: 20,
    color: '#FFF'
  }
}

export default Header;
