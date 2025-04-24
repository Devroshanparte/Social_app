import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Footer from '../components/menu/Footer';
import {AuthContext} from '../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useState([]); // Store user posts

  const userId = state?.user?._id;

  useEffect(() => {
    if (userId) {
      fetchUserPosts();
    }
  }, [userId]);

  // Fetch all posts of a user
  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `https://socialmedia-app-1-o3op.onrender.com/api/posts/${userId}`,
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={styles.profileImgCont}>
        <Image
            source={{
              uri: 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png',
            }}
            style={styles.profileImg}

          />
          <Text style={styles.usernameText}>{state?.user?.name}</Text>
        </View>

        <View style={styles.content}>
          {/* <Text style={styles.usernameText}>{state?.user?.name}</Text> */}
          <View style={styles.editOptionCont}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.editText}>Edit Profile</Text>
            </TouchableOpacity>
            <FontAwesome5 name="grip-lines-vertical" />
            <TouchableOpacity onPress={() => navigation.navigate('PostScreen')}>
              <Text style={styles.editText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Posts Grid */}

        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // 3 images per row (like Instagram)
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('PostListScreen')}>
              <Image
                source={{uri: `https://socialmedia-app-1-o3op.onrender.com${item.image}`}}
                style={styles.postImage}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.grid}
        />

        <Footer navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 3,
  },
  profileImgCont: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    height: 110,
    width: 110,
    borderWidth: 3,
    borderRadius: '50%',
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#337799',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    alignItems: 'center',
  },
  editOptionCont: {
    flexDirection: 'row',
    marginTop: 40,
    height: 50,
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 3,
    borderColor: '#337799',
  },
  editText: {
    color: 'black',
    fontSize: 15,
  },
  grid: {
    padding: 5,
    // alignItems: 'center',
    marginTop: 20,
  },
  postImage: {
    width: 120, // Adjust to fit 3 images per row
    height: 170,
    margin: 2,
  },
});

export default Profile;



