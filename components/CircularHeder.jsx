import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CircularHeder = ({text}) => {
  return (
    <View style={styles.hederWrapper}>
        <TouchableOpacity style={styles.prev}>
            <FontAwesome5 name="arrow-left" size={25} color='#023047' />
        </TouchableOpacity>
        <Text style={styles.hederText}>{text}</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    hederWrapper:{
        height:'25%',
        width:'100%',
        backgroundColor:'#337799',
        borderBottomRightRadius:'100%',
        borderBottomLeftRadius:'100%',
    },
    prev:{
        height:45,
        width:45,
        backgroundColor:'#3344',
        borderRadius:25,
        marginTop:'5%',
        marginLeft:'3%',
        justifyContent:'center',
        alignItems:'center'
    },
    hederText:{
        color:'#fff',
        fontSize:30,
        textAlign:'center',
        marginTop:'10%'
    },
})
export default CircularHeder