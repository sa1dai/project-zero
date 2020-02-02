import React from 'react';
import Container from '../components/Container';
import { AsyncStorage } from 'react-native';
import SecondaryButton from '../components/SecondaryButton';

export default class OrderScreen extends React.Component {
  logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    this.props.setLoggedIn(false);
  };

  render() {
    return (
      <Container>
        <SecondaryButton title="Выход" onPress={this.logout} />
      </Container>
    );
  }
}
