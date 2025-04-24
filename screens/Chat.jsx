import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect,useState } from 'react'
import { AuthContext } from '../context/authContext'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import UserChat from '../components/UserChat';
import Footer from '../components/menu/Footer';

const Chat = () => {
  const [acceptedFriends,setAccetedFriends]=useState([]);
  const [state]=useContext(AuthContext);
  const userId=state?.user?._id;
  const navigation=useNavigation();

  useEffect(()=>{
    const acceptedFriendList=async()=>{
      try {
        const response=await fetch(`https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/freinds/${userId}`);
        const data=await response.json();

        if(response.ok){
          setAccetedFriends(data)
        }
      } catch (error) {
        console.log("Error meassge:",error)
      }
    };
    acceptedFriendList();
  },[]);
  console.log("friend",acceptedFriends)

  return (
    <>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item,index)=>(
          <UserChat key={index} item={item}/>
        ))}
      </Pressable>
    </ScrollView>
    <Footer navigation={navigation}/>
    </>
    
  )
}

export default Chat

const styles = StyleSheet.create({})