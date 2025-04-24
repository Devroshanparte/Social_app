import {View, Text} from 'react-native';
import React, {Profiler, useState} from 'react';
import { useContext } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import GetStarted from '../../screens/auth/GetStarted';
import Login from '../../screens/auth/Login';
import CreateAnAcc from '../../screens/auth/CreateAnAcc';
import {AuthContext} from '../../context/authContext';
import Headremenu from './Headremenu';
import Profile from '../../screens/Profile';
import Chat from '../../screens/Chat';
import Coonect from '../../screens/Coonect';
import Search from '../../screens/Search';
import EditProfile from '../../screens/EditProfile';
// import ChatScreen from '../../screens/ChatScreen';
// import SearchScreen from '../../screens/Search';
import PersonalProfile from '../../screens/PersonalProfile';
import PostScreen from '../../screens/PostScreen';
// import PersonalChatScreen from '../../screens/PersonalChatScreen';
import GotFriendRequest from '../../screens/GotFriendRequest';
import ChatMenu from '../menu/ChatMenu'
import { useNavigation } from '@react-navigation/native';
import ChatsMessageScreen from '../../screens/ChatsMessageScreen';
import PostListScreen from '../../screens/PostListScreen';




const ScreenMenus = () => {
 
  const navigation=useNavigation();

  //global state
  const [ state ] = useContext(AuthContext);

  const authenticatedUser = state?.user && state?.token;
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator>
        {authenticatedUser ? (
          <>
             <Stack.Screen name='Home' component={Home} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            <Stack.Screen name='Profile' component={Profile} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            <Stack.Screen name='Chat' component={Chat} options={{
              title:'GeoSocialApp',
              headerRight:()=><ChatMenu navigation={navigation}/>
            }}/>
            <Stack.Screen name='Coonect' component={Coonect} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            <Stack.Screen name='Search' component={Search} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            <Stack.Screen name='EditProfile' component={EditProfile} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            {/* <Stack.Screen name='ChatScreen' component={ChatScreen} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/> */}
            <Stack.Screen name='GotFriendRequest' component={GotFriendRequest} options={{
              title:'GeoSocialApp',
              headerRight:()=><ChatMenu/>
            }}/>
            {/* <Stack.Screen name='PersonalChatScreen' component={PersonalChatScreen} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/> */}
            <Stack.Screen name='ChatsMessageScreen' component={ChatsMessageScreen} />
            <Stack.Screen name='PersonalProfile' component={PersonalProfile} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/> 
            <Stack.Screen name='PostScreen' component={PostScreen} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>
            <Stack.Screen name='PostListScreen' component={PostListScreen} options={{
              title:'GeoSocialApp',
              headerRight:()=><Headremenu/>
            }}/>  
          </>
        ) : (
          <>
            <Stack.Screen
              name="GetStarted"
              component={GetStarted}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreateAnAcc"
              component={CreateAnAcc}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
  );
};

export default ScreenMenus;
