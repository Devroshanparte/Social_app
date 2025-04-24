import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Footer from '../components/menu/Footer';

const PostListScreen = () => {
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useState([]); 
  const userId = state?.user?._id;

  useEffect(() => {
    let isMounted = true;
    if (userId) {
      fetchUserPosts();
    }
    return () => { isMounted = false; }; // Cleanup to prevent memory leaks
  }, [userId]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`https://socialmedia-app-1-o3op.onrender.com/api/posts/${userId}`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error.response ? error.response.data : error.message);
    }
  };

  const deletePost = async (postId) => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: async () => {
            try {
              await axios.delete(`https://socialmedia-app-1-o3op.onrender.com/api/posts/${postId}`);
              await fetchUserPosts(); // Refresh posts list
              console.log("Post deleted successfully");
            } catch (error) {
              console.error("Error deleting post:", error.response ? error.response.data : error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.noPosts}>No posts available</Text>}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <View style={styles.userInfo}>
              <Image
                source={{ uri: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' }}
                style={styles.profilePic}
              />
              <Text style={styles.userName}>{state?.user?.name}</Text>
              <TouchableOpacity onPress={() => deletePost(item._id)} style={styles.deleteButton}>
                <FontAwesome5 name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: `https://socialmedia-app-1-o3op.onrender.com${item.image}` }}
              style={styles.postImage}
            />
            <Text style={styles.caption}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 8,
    paddingBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    marginLeft: 'auto',
    marginRight: 10,
  },
  postImage: {
    width: '100%',
    height: 450,
    borderRadius: 8,
  },
  caption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  noPosts: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});
