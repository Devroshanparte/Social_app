import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../context/authContext';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const FriendRequest = ({item, friendRequests, setFriendRequest}) => {
  const navigation = useNavigation();
  const [state] = useContext(AuthContext);
  const userId = state?.user?._id;


  const acceptRequest = async (friendRequestId) => {
    try {
      console.log("Attempting to accept friend request with Id :",friendRequestId)
      const response = await fetch(
        'https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-request/accept',       {
          method: 'POST',          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: friendRequestId,
            recepientId: userId,
          }),
        },
      );

      if (response.ok) {
        setFriendRequest(
          friendRequests.filter(request => request._id !== friendRequestId),
          
        );
        navigation.navigate('ChatsMessageScreen');
      }

    } catch (error) {
      console.log('Error accepting friend request ', error);
    }
  };

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: 'red',
          borderRadius: 15,
        }}></View>
      <Text style={{fontSize: 15, fontWeight: 'bold', marginLeft: 10, flex: 1}}>
        {item?.name} sent a friend request
      </Text>
      <Pressable
        onPress={() => acceptRequest(item._id)}
        style={{backgroundColor: 'blue', padding: 10, borderRadius: 6}}>
        <Text style={{textAlign: 'center', color: 'white'}}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;

const styles = StyleSheet.create({});
