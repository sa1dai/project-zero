import React from 'react';
import { StyleSheet, Text } from 'react-native';

const PrimaryText = props => {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'primaryFont'
  }
});

export default PrimaryText;
