import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import CircularHeder from '../../components/CircularHeder';
import RLinputes from '../../components/RLinputes';
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const onClick = async () => {
    console.log('Login button is pressed!!');
    try {
      if (!email || !password) {
        Alert.alert('Incomplete Data', 'Please fill in both email and password.');
        return;
      }
      const { data } = await axios.post('https://socialmedia-app-1-o3op.onrender.com/api/v1/auth/login', {
        email,
        password,
      });

      console.log('API response:', data);
      if (data) {
        setState(data);
        await AsyncStorage.setItem('@auth', JSON.stringify(data));
        console.log('Stored in AsyncStorage:', data);

        const storedData = await AsyncStorage.getItem('@auth');
        console.log('Retrieved after storing:', storedData);

        Alert.alert('Login Successful', data.message);
      }
    } catch (error) {
      Alert.alert('Login Failed', error?.response?.data?.message || 'Something went wrong');
      console.error('Login Error:', error);
    }
  };

  useEffect(() => {
    const getLocalStorageData = async () => {
      try {
        let data = await AsyncStorage.getItem('@auth');
        console.log('Local Storage Data:', data);
      } catch (error) {
        console.error('Error fetching local storage data:', error);
      }
    };
    getLocalStorageData();
  }, [state]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.main}>
          <CircularHeder text="Create An Account" />

          <View style={styles.container}>
            <RLinputes
              placeholder="email"
              value={email}
              onChangeText={setEmail}
            />
            <RLinputes
              placeholder="password"
              sec={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.getStartedButton} onPress={onClick}>
            <Text style={styles.nextButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  getStartedButton: {
    width: 300,
    height: 60,
    backgroundColor: '#ffb703',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  container: {
    height: '50%',
    width: '90%',
    marginTop: 50,
  },
});

export default Login;
