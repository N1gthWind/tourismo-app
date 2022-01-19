
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import HomeScreen from './components/Homescreen';
import AboutScreen from './components/Aboutscreen';
import CheckoutScreen from './components/Checkoutscreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({

  About: {
    screen: AboutScreen,
    navigationOptions: { headerShown: false }

  },
  Checkout: {
    screen: CheckoutScreen,
    navigationOptions: { headerShown: false },
  },
  Home: {
    screen: HomeScreen,
    navigationOptions: { headerShown: false }
  },
  
  
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});