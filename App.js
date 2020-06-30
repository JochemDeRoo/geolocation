import React, { Component } from 'react';
import { Alert } from 'react-native';
import { styles } from './style';
import MapView, { Marker } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      longitudeCoords: 0,
      latitudeCoords: 0
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === 'granted') {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            longitudeCoords: position.coords.longitude,
            latitudeCoords: position.coords.latitude
          });
        },
        error => {
          Alert.alert(
            "Er is een fout opgetreden", error
          );
        }
      )
    }
    else {
      Alert.alert(
        "Geen permissies verkregen", "accepteer locatie permissies in uw instellingen"
      );
    }
  }

  render() {
    return (
      <MapView
        style={styles.container}
        region={{
          latitude: this.state.latitudeCoords,
          longitude: this.state.longitudeCoords,
          latitudeDelta: 0.0043,
          longitudeDelta: 0.0034,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: this.state.latitudeCoords,
            longitude: this.state.longitudeCoords,
          }}
          title={"Hier bevind u zich"}
        />
      </MapView>
    );
  }
}
