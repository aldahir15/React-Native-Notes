* We can create maps through expo using the ```MapView``` component provided for us through Expo.
* This component is heavily based off AirBnB's react-native-maps package. The nice thing with using MapView is that you don't have to install anything if you already have expo installed.
* To use MapView, import the component from expo 
```
import { MapView } from 'expo'
```
* The way we use the component is by rendering a `<MapView>` which will contain markers, polylines, or other shapes that will render on the map.
* The MapView can take in several parameters, but for basic application all you have to provide is a location object with a latitude and longitude.
* `<MapView>` can also be self closing `<MapView/>`, but we use the regular expression to add in Makers.
* Markers are sub-components of MapView, we implement them using `<MapView.Marker/>`, just like MapView, the default application of the component only needs a location object of latitude and longitude but things like titles, descriptions, or callback functions can be added as well.

```
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

export default class App extends React.Component {
  render() {
    markers = [
      {
        latlng: {
          latitude: 37.78825,
          longitude: -122.4204
        },
        title: "home",
        description: "Costs blah blah"
      },
      {
        latlng: {
          latitude: 37.78835,
          longitude: -122.4314
        },
        title: "work",
        description: "Costs2 blah blah"
      },
      {
        latlng: {
          latitude: 37.78455,
          longitude: -122.4124
        },
        title: "gym",
        description: "Costs3 blah blah"
      }
    ]
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map((marker) => (
          <MapView.Marker 
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```
