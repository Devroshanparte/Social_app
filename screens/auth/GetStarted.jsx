import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        source={
          require('../../images/logos/finalLogo.png')
        }
        style={{height:250,width:250}}
        />
      </View>
      <Text style={styles.caption}>
        Hey!! Connect instantly with the People around you.
      </Text>
      <Text style={styles.smallCaption}>Let's setup your profile</Text>
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('CreateAnAcc')}>
        <Text style={styles.nextButtonText}>Get Started</Text>
      </TouchableOpacity>
      <Text style={styles.accountOrNot}>
        Have an account?{' '}
        <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
          <Text style={{color: 'blue', fontWidth: '20'}}>Login</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d6e3e9',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    width: 250,
    height: 250,
    backgroundColor: '#bddff1',
    marginTop: 200,
  },
  caption: {
    marginTop: 30,
    fontSize: 30,
    marginLeft: 20,
  },
  smallCaption: {
    fontSize: 15,
    marginTop: 15,
    color: '#a29c9c',
  },
  getStartedButton: {
    width: 300,
    height: 60,
    backgroundColor: '#4093bf',
    borderRadius: 30,
    marginTop: 90,
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  accountOrNot: {
    fontSize: 15,
    marginTop: 20,
    color: 'black',
  },
});

export default GetStarted;
