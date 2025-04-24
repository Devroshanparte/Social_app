import { View, Text, StyleSheet, TextInput ,TouchableOpacity} from 'react-native'
import React from 'react'
import RLinputes from './RLinputes'

const Form = ({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword }) => {
  return (
    <View style={styles.main}>
        <RLinputes placeholder="Name" value={name} onChangeText={setName} />
        <RLinputes placeholder="Email" value={email} onChangeText={setEmail}/>
        <RLinputes placeholder="Password" sec={true} value={password} onChangeText={setPassword} />
        <RLinputes placeholder="Confirm Password" sec={true} value={confirmPassword} onChangeText={setConfirmPassword}/>
        
    </View>
  )
}

const styles=StyleSheet.create({
    main:{
        height:'60%',
        width:'90%',
        flexDirection:'column',
        AlignItems:'center',
        justifyContent:'center',
        margin:25
    },
    
})

export default Form