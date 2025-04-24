import { View, Text, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Headremenu = ({navigation}) => {
    
  return (
    <View>
    <TouchableOpacity onPress={()=>navigation.navigate('GotFriendRequest')}>
        <FontAwesome5 name="user-friends" size={20}></FontAwesome5>
    </TouchableOpacity>
    </View>
  )
}

export default Headremenu