import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';

export default class Map extends React.Component {
  constructor(){
    super();
    this.addInfo = this.addInfo.bind(this)
    this.state = { bottomInfo: [], backgroundColor: "white", isModalVisible: false}
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  addInfo(description){
    if (this.state.bottomInfo[0]) {
      bottomInfo = [description]
    } else {
      bottomInfo = this.state.bottomInfo
      bottomInfo.push(description)
    }
    this.setState({bottomInfo: bottomInfo})
    this._showModal();
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({ backgroundColor: 'white' });
        break;
      case SWIPE_DOWN:
      this._hideModal();
        this.setState({ backgroundColor: 'white' });
        break;
      case SWIPE_LEFT:
        this.setState({ backgroundColor: 'white' });
        break;
      case SWIPE_RIGHT:
        this.setState({ backgroundColor: 'white' });
        break;
    }
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    const markers = [
      {
        latlng: {
          latitude: 37.78825,
          longitude: -122.4204
        },
        title: "home",
        description: "THIS IS MY HOME"
      },
      {
        latlng: {
          latitude: 37.78835,
          longitude: -122.4314
        },
        title: "work",
        description: "THIS IS MY WORK"
      },
      {
        latlng: {
          latitude: 37.78455,
          longitude: -122.4124
        },
        title: "gym",
        description: "THIS IS MY GYM"
      }
    ]
    return (
      <View>
        <MapView
          style={{ height: 700 }}
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
              onPress={() => this.addInfo(marker.description)}
              key={marker.latlng.latitude}
            />
          ))}
        </MapView>
        {this.state.bottomInfo.map((i) => (
          <View >
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}
            >
            <Modal isVisible={this.state.isModalVisible} 
              backdropOpacity={0.2}
              onBackdropPress={() => { this._hideModal();}}
              onBackButtonPress={() => { this._hideModal();}}
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                margin: 0
                }} >
              <View
                style={{
                  backgroundColor: this.state.backgroundColor,
                  margin: 0,
                  padding: 70,
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}>
                  <Text>Hello!</Text>
                </View>
              </Modal>
            </GestureRecognizer>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
