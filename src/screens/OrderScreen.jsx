import React from 'react';
import Container from '../components/Container';
import {
  ActivityIndicator,
  Alert,
  AsyncStorage,
  Picker,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryText from '../components/PrimaryText';
import { THEME } from '../constants/theme';
import PrimaryButton from '../components/PrimaryButton';
import Card from '../components/Card';
import PrimaryTextBold from '../components/PrimaryTextBold';

export default class OrderScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientName: '',
      clientPhone: '',
      service: 'manicure',
      isWaitingResponse: false
    };
  }

  logout = async () => {
    await AsyncStorage.removeItem('isLoggedIn');
    this.props.setLoggedIn(false);
  };

  order = async () => {
    const clientNameTrim = this.state.clientName.trim();
    const clientPhoneTrim = this.state.clientPhone.trim();

    if (clientNameTrim.length === 0 || clientPhoneTrim.length === 0) {
      Alert.alert(
        'Ошибка оформления заявки',
        'Имя или телефон не могут быть пустыми'
      );
      return;
    }

    this.setState({ isWaitingResponse: true });

    // TODO передавать токен в запросе
    const response = await fetch(
      `https://project-zero-f13b0.firebaseio.com/orders.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: clientNameTrim,
          phone: clientPhoneTrim,
          service: this.state.service
        })
      }
    );

    if (!response.ok) {
      Alert.alert(
        'Ошибка оформления заявки',
        'Извините, оформить заявку невозможно. Попробуйте позже.'
      );
      this.setState({ isWaitingResponse: false });
      return;
    }

    Alert.alert(
      'Поздравляем!',
      'Ваша заявка успешно создана, мы свяжемся с вами в ближайшее время.'
    );
    this.setState({ isWaitingResponse: false });
  };

  render() {
    const { clientName, clientPhone, service, isWaitingResponse } = this.state;

    return (
      <Container>
        <SecondaryButton
          style={styles.logoutButton}
          title="Выход"
          onPress={this.logout}
        />
        <Card style={styles.card}>
          <View style={styles.title}>
            <PrimaryTextBold style={styles.title}>Форма заявки</PrimaryTextBold>
          </View>
          <PrimaryText>Ваше имя</PrimaryText>
          <TextInput
            style={styles.input}
            onChangeText={newClientName =>
              this.setState({ clientName: newClientName })
            }
            value={clientName}
          />
          <PrimaryText style={styles.text}>Ваш телефон</PrimaryText>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry
            onChangeText={newClientPhone =>
              this.setState({ clientPhone: newClientPhone })
            }
            keyboardType="phone-pad"
            value={clientPhone}
          />
          <PrimaryText style={styles.text}>Выберите услугу</PrimaryText>
          <Picker
            selectedValue={service}
            onValueChange={itemValue => this.setState({ service: itemValue })}
          >
            <Picker.Item label="маникюр" value="manicure" />
            <Picker.Item label="педикюр" value="pedicure" />
          </Picker>
          {isWaitingResponse ? (
            <ActivityIndicator
              style={styles.button}
              color={THEME.PRIMARY_COLOR}
            />
          ) : (
            <PrimaryButton
              style={styles.button}
              title="Записаться"
              onPress={this.order}
            />
          )}
        </Card>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    marginBottom: 10
  },
  innerContainer: {
    width: '100%'
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  input: {
    borderBottomWidth: 1,
    fontFamily: 'primaryFont'
  },
  text: {
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
