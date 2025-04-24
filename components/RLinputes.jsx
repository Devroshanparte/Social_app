import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const RLinputes = ({ placeholder, value, onChangeText, sec = false }) => {
  return (
    <View>
      <Text style={styles.name}>{placeholder}</Text>
      <TextInput
        style={styles.nameInput}
        placeholder={placeholder}
        placeholderTextColor="grey"
        secureTextEntry={sec}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    margin: 10,
  },
  nameInput: {
    height: 50,
    width: '90%',
    borderRadius: 10,
    margin: 10,
    color: '#000',
    backgroundColor: '#d6e3e9',
  },
});

export default RLinputes;
