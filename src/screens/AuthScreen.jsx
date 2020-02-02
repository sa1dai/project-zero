import React from 'react';
import { StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import Card from '../components/Card';
import Container from '../components/Container';
import PrimaryButtonBold from '../components/PrimaryButtonBold';
import PrimaryText from '../components/PrimaryText';
import { isValidEmail } from '../lib/string';
import { THEME } from '../constants/theme';

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isWaitingSignUpResponse: false,
      isWaitingLoginResponse: false
    };
  }

  login = async () => {
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) {
      Alert.alert('Ошибка входа', 'Email или пароль не могут быть пустыми');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Ошибка входа', 'Введите корректный email');
      return;
    }

    this.setState({ isWaitingLoginResponse: true });

    // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB4-n0unJ0E6YEg8UrdN2MK4UKgoXI7Pu0',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      }
    );

    if (!response.ok) {
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      Alert.alert(
        'Ошибка входа',
        errorId === 'EMAIL_NOT_FOUND' || errorId === 'INVALID_PASSWORD'
          ? 'Не найден пользователь с таким email и паролем'
          : 'Извините, вход невозможен. Попробуйте позже'
      );
      this.setState({ isWaitingLoginResponse: false });
      return;
    }

    const responseData = await response.json();
    console.log(responseData);
    this.setState({ isWaitingLoginResponse: false });
  };

  signUp = async () => {
    const { email, password } = this.state;

    if (email.length === 0 || password.length === 0) {
      Alert.alert(
        'Ошибка регистрации',
        'Email или пароль не могут быть пустыми'
      );
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Ошибка регистрации', 'Введите корректный email');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Ошибка регистрации',
        'Пароль не может содержать меньше шести символов'
      );
      return;
    }

    this.setState({ isWaitingSignUpResponse: true });

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
      const errorResponseData = await response.json();
      const errorId = errorResponseData.error.message;
      Alert.alert(
        'Ошибка регистрации',
        errorId === 'EMAIL_EXISTS'
          ? 'Пользователь с таким email уже существует'
          : 'Извините, регистрация невозможна. Попробуйте позже.'
      );
      this.setState({ isWaitingSignUpResponse: false });
      return;
    }

    const responseData = await response.json();
    console.log(responseData);
    this.setState({ isWaitingSignUpResponse: false });
  };

  render() {
    const {
      email,
      password,
      isWaitingSignUpResponse,
      isWaitingLoginResponse
    } = this.state;
    return (
      <Container>
        <Card style={styles.card}>
          <PrimaryText>Email</PrimaryText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={newEmail => this.setState({ email: newEmail.trim() })}
            value={email}
          />
          <PrimaryText style={styles.passwordText}>Пароль</PrimaryText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={newPassword =>
              this.setState({ password: newPassword.trim() })
            }
            value={password}
          />
          {isWaitingLoginResponse ? (
            <ActivityIndicator
              style={styles.button}
              color={THEME.PRIMARY_BUTTON_COLOR}
            />
          ) : (
            <PrimaryButtonBold
              style={styles.button}
              title="Войти"
              onPress={this.login}
            />
          )}
          {isWaitingSignUpResponse ? (
            <ActivityIndicator
              style={styles.button}
              color={THEME.PRIMARY_BUTTON_COLOR}
            />
          ) : (
            <PrimaryButtonBold
              style={styles.button}
              title="Зарегистрироваться"
              onPress={this.signUp}
            />
          )}
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
