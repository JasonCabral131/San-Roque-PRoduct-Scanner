import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="2000"
            source={require('../image/homeScreen.jpg')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.title}>
              Cloud Based Groceries Sales And Customer Credit Account Information System With QR Code Technology
          </Text>
        </View>
      </View>
    );
  }
}
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderTopRightRadius: 400,
    borderTopLeftRadius: 400,
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 30,
  },
});
