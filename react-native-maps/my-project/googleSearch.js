import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 37.78825, lng: -122.4204 } } };
const workPlace = { description: 'Work', geometry: { location: { lat: 37.78835, lng: -122.4314 } } };

export default class GoogleSearch extends React.Component {
	constructor(){
		super()
		this.state = {
			height: 700
		}
	}

	render(){
		if (this.search){
			console.log("PROPS", Object.getOwnPropertyNames(this.search))
			console.log("PROPS2", this.search.buildRowsFromResults)

		}
		return (
		<TouchableOpacity style={{height: this.state.height, zIndex: 99999}} onPress={() => console.log("DOG")}>
		<GooglePlacesAutocomplete
		placeholder='Enter Location'
		ref={ref => (this.search = ref)}
		minLength={2}
		autoFocus={false}
		returnKeyType={'search'}
		listViewDisplayed='auto'
		fetchDetails={true}
		query={{
				// available options: https://developers.google.com/places/web-service/autocomplete
				key: 'AIzaSyB1x89gzC1tdNlSFvHmS-za9bWa1QuMruM',
				language: 'en', // language of the results
				types: '(cities)' // default: 'geocode'
		}}
		onPress={(data, details = null) => ( // 'details' is provided when fetchDetails = true
				this.props.animateTo({
					latitude: details.geometry.viewport.southwest.lat,
					longitude: details.geometry.viewport.northeast.lng,
					latitudeDelta: details.geometry.viewport.northeast.lat - details.geometry.viewport.southwest.lat,
					longitudeDelta: details.geometry.viewport.northeast.lng - details.geometry.viewport.southwest.lng
				})
		)}
		styles={{
				textInputContainer: {
						backgroundColor: 'rgba(0,0,0,0)',
						borderTopWidth: 0,
						borderBottomWidth: 0
				},
				textInput: {
						marginLeft: 0,
						marginRight: 0,
						height: 38,
						color: '#5d5d5d',
						fontSize: 16,
						position: 'relative',
						top: 20
				},
				predefinedPlacesDescription: {
						color: '#1faadb'
				},
				container: {
						backgroundColor: 'transparent'
				},
				listView: {
					position: 'relative',
					top: 20,
					backgroundColor: 'white',
					opacity: 0.7
				},
				poweredContainer: {
					display: "none"
				}
		}}
		/>
		</TouchableOpacity>
		)
	}
}