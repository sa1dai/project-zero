import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AuthScreen from './src/screens/AuthScreen';
import { AsyncStorage } from 'react-native';
import OrderScreen from './src/screens/OrderScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isLoggedIn: false
    };
  }

  setLoggedIn = value => {
    this.setState({ isLoggedIn: value });
  };

  initialization = () => {
    return Promise.all([
      Font.loadAsync({
        primaryFont: require('./assets/fonts/OpenSans-Regular.ttf'),
        primaryFontBold: require('./assets/fonts/OpenSans-Bold.ttf')
      }),
      AsyncStorage.getItem('isLoggedIn').then(value => {
        if (value !== null) {
          this.setState({ isLoggedIn: true });
        }
      })
    ]);
  };

  render() {
    const { isLoadingComplete, isLoggedIn } = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.initialization}
          onError={error => console.log(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    if (!isLoggedIn) {
      return <AuthScreen setLoggedIn={this.setLoggedIn} />;
    }

    return <OrderScreen setLoggedIn={this.setLoggedIn} />;
  }
}
