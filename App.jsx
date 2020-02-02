import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import AuthScreen from './src/screens/AuthScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    };
  }

  loadResources = () => {
    return Font.loadAsync({
      primaryFont: require('./assets/fonts/OpenSans-Regular.ttf'),
      primaryFontBold: require('./assets/fonts/OpenSans-Bold.ttf')
    });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResources}
          onError={error => console.log(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    }

    return <AuthScreen />;
  }
}
