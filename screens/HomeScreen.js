import React from 'react';
import Geocoder from 'react-native-geocoding';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
Geocoder.init('AIzaSyBan4uo5YcTJF6gq_cUxdTMFXCmC--ObI8');
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
 
  state = {
    adress: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View >


            <Text style={styles.getStartedText}>
              escriba dirección..
            </Text> 
            <TextInput
          style={styles.input}
          value={this.state.adress}
          onChangeText={adress => this.setState({adress})}
          ref={ref => {this._adressInput = ref}}
          placeholder="Direccion"
          autoFocus={true}
          autoCapitalize="words"
          autoCorrect={true}
          keyboardType="default"
          returnKeyType="send"
          onSubmitEditing={this._submit}
          blurOnSubmit={false}
        />
          </View>
 
      
        </ScrollView>

      </View>
    );
  }
  _submit = () => {
  Geocoder.from(this.state.adress)
    .then(json => {
      var location = json.results[0].geometry.location;
      console.log(location);
      alert(`se guardo la dirección, ${this.state.adress}! ahora pasara al mapa.`);
    })
    .catch(error => {console.warn(error)
      alert(`se guardo la dirección, ${this.state.adress}! ahora pasara al mapa.`);
      this.props.navigation.navigate('Map')
    });
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  homeScreenFilename: {
    marginVertical: 2,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  input: {
    margin: 10,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 2,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});

