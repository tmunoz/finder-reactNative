import React, { Component } from 'react';
import { Text, StyleSheet, View, Alert } from 'react-native';
import Mapbox from '@mapbox/react-native-mapbox-gl';

Mapbox.setAccessToken('pk.eyJ1IjoidG11bm96IiwiYSI6ImNqaWYxeGpxbDAwa3UzdmwzbjltdXpjZXEifQ.r6P1SbkxgT4C7xDgXIXA2w');

export default class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      pointInView: null,
    };
    this.onPress = this.onPress.bind(this);
  }

  async onPress(e) {
    const pointInView = await this._map.getPointInView(e.geometry.coordinates);
    this.setState({ pointInView: pointInView });
  }

  renderPointInView() {
    if (this.state.pointInView) {
      console.log(this.state.pointInView[0])
      console.log(this.state.pointInView[1])
    }

  }

  renderAnnotations () {
    return (
      <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[-70.6446400, -33.473]}>

        <View style={styles.annotationContainer}>
          <View style={styles.annotationFill} />
        </View>
        <Mapbox.Callout title='Look! An annotation!' />
      </Mapbox.PointAnnotation>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Mapbox.MapView
            styleURL={Mapbox.StyleURL.Street}
            zoomLevel={15}
            centerCoordinate={[-70.6472400, -33.4726900]}
            ref={(c) => (this._map = c)}
            style={styles.container}
            onPress={this.onPress}
            showUserLocation={true}>
            {this.renderAnnotations()}
        </Mapbox.MapView>

        <View>{this.renderPointInView()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'orange',
    transform: [{ scale: 0.6 }],
  },
});
