import React from 'react';
import { StyleSheet, TextInput, Alert } from 'react-native';
import Card from '../components/Card';
import Container from '../components/Container';
import PrimaryButtonBold from '../components/PrimaryButtonBold';
import PrimaryText from '../components/PrimaryText';
import { isValidEmail } from '../lib/string';

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test@test.ru',
      password: '1234'
    };
  }

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
      return;
    }

    const responseData = await response.json();
    console.log(responseData);
  };

  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <Card style={styles.card}>
          <PrimaryText>Email</PrimaryText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
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
          <PrimaryButtonBold style={styles.button} title="Войти" />
          <PrimaryButtonBold
            style={styles.button}
            title="Зарегистрироваться"
            onPress={this.signUp}
          />
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
