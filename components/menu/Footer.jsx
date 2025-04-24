import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const onClickHandle = (screenName) => {
    if (route.name !== screenName) {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.container}>
      {/* Home Button */}
      <TouchableOpacity onPress={() => onClickHandle('Home')}>
        <View style={route.name === 'Home' ? styles.iconCont : null}>
          <FontAwesome5 name="home" color={route.name === 'Home' ? 'black' : 'gray'} size={25} />
        </View>
      </TouchableOpacity>

      {/* Search Button */}
      <TouchableOpacity onPress={() => onClickHandle('Search')}>
        <View style={route.name === 'Search' ? styles.iconCont : null}>
          <FontAwesome5 name="search" color={route.name === 'Search' ? 'black' : 'gray'} size={25} />
        </View>
      </TouchableOpacity>

      {/* Connect Button */}
      {/* <TouchableOpacity onPress={() => onClickHandle('Coonect')}>
        <View style={route.name === 'Coonect' ? styles.iconCont : null}>
          <FontAwesome5 name="plus-square" color={route.name === 'Coonect' ? 'black' : 'gray'} size={25} />
        </View>
      </TouchableOpacity> */}

      {/* Chat Button */}
      <TouchableOpacity onPress={() => onClickHandle('Chat')}>
        <View style={route.name === 'Chat' ? styles.iconCont : null}>
          <FontAwesome5 name="comment-dots" color={route.name === 'Chat' ? 'black' : 'gray'} size={25} />
        </View>
      </TouchableOpacity>

      {/* Profile Button */}
      <TouchableOpacity onPress={() => onClickHandle('Profile')}>
        <View style={route.name === 'Profile' ? styles.iconCont : null}>
          <FontAwesome5 name="user-alt" color={route.name === 'Profile' ? 'black' : 'gray'} size={25} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    padding: 10,
    backgroundColor: 'white',
  },
  iconCont: {
    backgroundColor: '#ffb703', // Highlight active button
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Corrected borderRadius
  },
});

export default Footer;
