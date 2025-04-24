import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const UserChat = ({item}) => {

    const navigation=useNavigation();
    console.log('Navigating with recepientId:', item?._id);

  return (

    <Pressable onPress={()=>navigation.navigate('ChatsMessageScreen',{
        recepientId:item._id
    })}
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 0.7,
        borderColor:'#d0d0d0',
        borderLeftWidth:0,
        borderRightWidth:0,
        borderTopWidth:0
      }}>
      <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: 'black',
          borderRadius: 20,
        }}></View>
      <View style={{flex:1}}>
        <Text style={{fonrSize:115,fonrWeight:"500"}}>{item?.name}</Text>
        <Text style={{morginTop:3,color:'grey',fontWeigth:"500"}}>Last message comes here</Text>
      </View>

      <View>
        <Text style={{fontSixe:10,fontWeight:'400',color:"#585858"}}>3:00 pm</Text>
      </View>
    </Pressable>
  );
};

export default UserChat;

const styles = StyleSheet.create({});
