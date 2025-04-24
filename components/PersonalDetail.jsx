import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import PersoanlInput from './PersonalInput'

const PersonalDetail = ({age,setAge,home,setHome,school, setSchool, work, setWork, language, setLanguage, instagram, setInstagram, hobby, setHobby }) => {
  return (
    <View style={styles.main}>
        <PersoanlInput plcetext='Age e.g. 21' value={age} onChangeText={setAge}/>
        <PersoanlInput plcetext='Home e.g. INDIA, USA,...' value={home} onChangeText={setHome}/>
        <PersoanlInput plcetext='School e.g. University of Mumbai...' value={school} onChangeText={setSchool}/>
        <PersoanlInput plcetext='work e.g. Developer at Microsoft...' value={work} onChangeText={setWork}/>
        <PersoanlInput plcetext='Languages e.g. Englis, Hindi,...' value={language} onChangeText={setLanguage}/>
        <PersoanlInput plcetext='Instagram e.g. @aryan123...' value={instagram} onChangeText={setInstagram}/>
        
    </View>
  )
}

const styles=StyleSheet.create({
    main:{
        height:'60%',
        width:'90%',
        flexDirection:'column',
        AlignItems:'center',
        margin:25
    },
})

export default PersonalDetail