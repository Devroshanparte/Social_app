import { View, Text, TouchableOpacity } from 'react-native'
import React, {useContext} from 'react';
import { AuthContext } from '../../context/authContext';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Headremenu = () => {
    const [state,setState]=useContext(AuthContext);

    //logout

    const handleLogout =async ()=>{
        setState({
            token:'',user:null
        });
        await AsyncStorage.removeItem('@auth');
        alert('log out successfull');
    }
  return (
    <View>
    <TouchableOpacity onPress={handleLogout}>
        <Text>Log Out</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Headremenu