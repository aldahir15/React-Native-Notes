import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { MapView } from 'expo';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Modal from 'react-native-modal';
import { Animated, LayoutAnimation} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Keyboard } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GoogleSearch from './googleSearch';

export default class Map extends React.Component {
  constructor(){
    super();
    this.addInfo = this.addInfo.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
    this.state = { bottomInfo: [], 
                  backgroundColor: "white", 
                  isModalVisible: false,
                  modalHeight: 150,
                  region: {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  addInfo(marker){
    if (this.state.bottomInfo[0]) {
      bottomInfo = [{marker: {
          title: marker.title,
          price: marker.price,
          rating: marker.rating,
          description: marker.description,
          image_url: marker.image_url
        }}]
    } else {
      bottomInfo = this.state.bottomInfo
      newInfo = {
        marker: {
          title: marker.title,
          price: marker.price,
          rating: marker.rating,
          description: marker.description,
          image_url: marker.image_url
        }
      }
      bottomInfo.push(newInfo)
    }
    this.setState({bottomInfo: bottomInfo})
    this._showModal();
  }

  onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ modalHeight: 500 })
        this.setState({ backgroundColor: 'white' });
        break;
      case SWIPE_DOWN:
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ modalHeight: 0 })
        setTimeout(this._hideModal, 250)
        this.setState({ modalHeight: 150 })
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

  onRegionChange(region){
    this.setState({region})
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
        image_url: "http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_179/v1507653351/garage-spot_bcnnyu.jpg",
        rating: 5,
        price: 5.0,
        description: "THIS IS MY HOME"
      },
      {
        latlng: {
          latitude: 37.78835,
          longitude: -122.4314
        },
        title: "work",
        image_url: "",
        rating: 4,
        price: 10.0,
        description: "THIS IS MY WORK"
      },
      {
        latlng: {
          latitude: 37.78455,
          longitude: -122.4124
        },
        title: "gym",
        image_url: "",
        rating: 3,
        price: 7.0,
        description: "THIS IS MY GYM"
      }
    ]
    console.log("YUP!!!!!!!!!", this.state.region)
    return (
      <View>
        <MapView
          onPress={Keyboard.dismiss}
          style={{ height: 700 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.reloadEntities}>
          <GoogleSearch parent={this}/>
          {markers.map((marker) => (
            <MapView.Marker 
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              onPress={() => this.addInfo(marker)}
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
                <Animated.View
                style={{
                  backgroundColor: this.state.backgroundColor,
                  margin: 0,
                  height: this.state.modalHeight,
                  flexDirection: 'column',
                  alignItems: 'center', 
                  paddingLeft: 50,
                  paddingRight: 50
                }}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={{ uri: "http://res.cloudinary.com/ddgt25kwb/image/upload/c_scale,w_20/v1507654233/hamburger_qf7mub.png" }} />
                  <View style={{ flexDirection: 'row', paddingTop: 20 }}>
                    <Image 
                      style={{ width: 140, height: 80}}
                      source={{ uri: i.marker.image_url }}/>
                    <View style={{flexDirection: 'column', paddingLeft: 100}}>
                      <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={i.marker.rating}
                        selectedStar={(rating) => {
                          let bottomInfo = this.state.bottomInfo
                          bottomInfo[0].marker.rating = rating
                          this.setState({bottomInfo: bottomInfo})
                        }}
                        starSize={20}
                      />
                      <Text style={{fontSize: 18}}>${i.marker.price}.00/hr</Text>
                    </View>
                  </View>
                </Animated.View>
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
