import React , {Component ,}from "react";
import { StyleSheet, Text, View , Container,Platform} from "react-native";
import { MapView,Constants, Location, Permissions } from "expo";
import { Marker } from 'react-native-maps';
import { TabNavigator } from "react-navigation";

class LocationA extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error:null,
    };
  }

  componentDidMount() {console.log(Permissions);
    if (Platform.OS === 'android' && !Constants.isDevice) {
      
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      //this._getLocationAsync();
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("wokeeey");
          console.log(position);
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          console.log(error);
          this.setState({ error: error.message })},
        { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 },
      );
    }

   }
   _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    console.log("antes de pedir ubicacion");
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({ location });
  };

  render() {
    return (
      <View>
        <Text> {this.state.latitude} </Text>
        <Text> {this.state.longitude} </Text>
        <Text> {this.state.error} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default LocationA;