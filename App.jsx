import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Card from './src/components/Card';
import Container from './src/components/Container';
import PrimaryButtonBold from './src/components/PrimaryButtonBold';
import PrimaryText from './src/components/PrimaryText';

export const signUp = async (email, password) => {
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
  const response = await fetch(
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB4-n0unJ0E6YEg8UrdN2MK4UKgoXI7Pu0',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    }
  );

  if (!response.ok) {
    throw new Error('Ошибка. Что-то пошло не так...');
  }

  const responseData = await response.json();
  console.log(responseData);
};

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

    return (
      <Container>
        <Card style={styles.card}>
          <PrimaryText>Email</PrimaryText>
          <TextInput style={styles.input} autoCapitalize="none" />
          <PrimaryText style={styles.passwordText}>Пароль</PrimaryText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
          />
          <PrimaryButtonBold style={styles.button} title="Войти" />
          <PrimaryButtonBold style={styles.button} title="Зарегистрироваться" />
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    fontFamily: 'primaryFont'
  },
  passwordText: {
    marginTop: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: '80%',
    padding: 10
  },
  button: {
    marginTop: 10
  }
});
