import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

const PersoanlInput = ({plcetext,value,onChangeText}) => {
  return (
    <View>
      <TextInput
        style={styles.nameInput}
        placeholder={plcetext}
        placeholderTextColor="grey"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  nameInput: {
    height: 50,
    width: '90%',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    color: '#000',
    paddingLeft: 10
  },
});

export default PersoanlInput;
