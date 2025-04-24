import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
  } from 'react-native';
  import React, {useState} from 'react';
  import CircularHeder from '../../components/CircularHeder';
  import Form from '../../components/Form';
  import PersonalDetail from '../../components/PersonalDetail';
  import axios from 'axios';
  import { AuthContext } from '../../context/authContext';
  
  const CreateAnAcc = ({navigation}) => {
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    //personal details
    const [age, setAge] = useState('');
    const [home, setHome] = useState('');
    const [school, setSchool] = useState('');
    const [work, setWork] = useState('');
    const [language, setLanguage] = useState('');
    const [instagram, setInstagram] = useState('');
    const [hobby, setHobby] = useState('');
  
    const [btnText, setbtnText] = useState('next');
  
    const onClick = async () => {
      if (!display) {
        setDisplay(true);
        setbtnText('submit');
        return;
      } 
  
        if (
          !name ||
          !email ||
          !password ||
          !confirmPassword ||
          !age ||
          !home ||
          !school ||
          !work ||
          !language ||
          !instagram 
        ) {
          Alert.alert('Plsease fill all feilds');
          return;
        }
        if (password !== confirmPassword) {
          Alert.alert("Error", "Passwords do not match");
          return;
        }
        try {
          const {data} = await axios.post(
            'https://socialmedia-app-1-o3op.onrender.com/api/v1/auth/register',
            {
              name,
              email,
              password,
              confirmPassword,
              age,
              home,
              school,
              work,
              language,
              instagram,
              hobby,
            },
          );
  
          if (data && data.message) {
            Alert.alert('Success', data.message);
          } else {
            Alert.alert('Error', 'Something went wrong');
          }
  
          navigation.navigate('Login');
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Registration failed. Please try again.');
        }
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.main}>
            <CircularHeder text="Create An Account" />
            {display ? (
              <ScrollView style={styles.scrollCont}>
                <Form
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
              </ScrollView>
              
            ) : (
              <ScrollView style={styles.scrollCont}>
                <PersonalDetail
                age={age}
                setAge={setAge}
                home={home}
                setHome={setHome}
                school={school}
                setSchool={setSchool}
                work={work}
                setWork={setWork}
                language={language}
                setLanguage={setLanguage}
                instagram={instagram}
                setInstagram={setInstagram}
              />
              </ScrollView>
              
            )}
            {/* <Form /> */}
            {/* <PersonalDetail/> */}
            <TouchableOpacity style={styles.getStartedButton} onPress={onClick}>
              <Text style={styles.nextButtonText}>{btnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
            <Text style={{marginBottom:40,color:'grey'}}> Go Back To Login</Text>
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
    scrollCont:{
      width:'100%',
      padding:5,
    },
    getStartedButton: {
      width: 300,
      height: 60,
      backgroundColor: '#ffbe0b',
      borderRadius: 30,
      justifyContent: 'center',
    },
    nextButtonText: {
      fontSize: 20,
      color: 'black',
      textAlign: 'center',
    },
  });
  
  export default CreateAnAcc;
  