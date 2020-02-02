import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Card from '../components/Card';
import Container from '../components/Container';
import PrimaryButtonBold from '../components/PrimaryButtonBold';
import PrimaryText from '../components/PrimaryText';

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

export default class AuthScreen extends React.Component {
  render() {
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
