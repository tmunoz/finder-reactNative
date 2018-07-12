import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Map from './screens/map';
import AddLocation from './screens/addlocation';
import List from './screens/list';
import Settings from './screens/settings';

export default TabNavigator(
  {
    Map: { screen: Map },
    Add: { screen: AddLocation },
    List: { screen: List },
    Settings: { screen: Settings },
  }
);
