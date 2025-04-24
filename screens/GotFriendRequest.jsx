import { View, Text ,StyleSheet} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import FriendRequest from '../components/FriendRequest'

const Chat = () => {

  const [state]=useContext(AuthContext);
  const [friendRequests,setFriendReqests]=useState([]);

  const userId=state?.user?._id;

  useEffect(()=>{
    fetchFriendRequests()
  },[])


  const fetchFriendRequests=async() =>{ 
    try {
      const response=await axios.get(`https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-request/${userId}`);
      if(response.status === 200){
        const friendRequestsData=response.data.map((friendRequests)=>({
          _id:friendRequests._id,
          name:friendRequests.name,
          email:friendRequests.email
        }))

        setFriendReqests(friendRequestsData)
      }
    } catch (error) {
      console.log("error meassage",error)
    }
  }
console.log(friendRequests)
  return (
    <View style={styles.main}>
      <View style={{padding:10,marginHorizontal:12}}>
    {
      friendRequests.length > 0 && <Text>your friend request</Text>
    }
    {
      friendRequests.map((item,index)=>(
        <FriendRequest
        key={index}
        item={item}
        friendRequests={friendRequests}
        setFriendRequest={setFriendReqests}
        />
      ))
    }

      <Text>No friend request</Text>
    </View>
    </View>
    
    
  )
}

const styles=StyleSheet.create({
  main:{
    flex:1,
    justifyContent:'space-between'
  }
})

export default Chat