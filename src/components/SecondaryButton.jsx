import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { THEME } from '../constants/theme';
import PrimaryTextBold from './PrimaryTextBold';

const SecondaryButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ ...styles.button, ...props.style }}
      onPress={props.onPress}
    >
      <PrimaryTextBold style={styles.text}>{props.title}</PrimaryTextBold>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    backgroundColor: THEME.SECONDARY_COLOR,
    padding: 10
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase'
  }
});

export default SecondaryButton;
