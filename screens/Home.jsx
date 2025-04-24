import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import {AuthContext} from '../context/authContext';
import Footer from '../components/menu/Footer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [requestSent, setRequestSent] = useState(new Set());
  const [searchText, setSearchText] = useState('');
  const [state] = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());

  const userId = state?.user?._id;

  const API_URL = `https://socialmedia-app-1-o3op.onrender.com/api/v1/users/non-friends?userId=${userId}`;
  const FRNDRQT_API_URL = 'https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-request';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        setUsers(response.data);
      } catch (error) {
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const toggleLike = postId => {
    setLikedPosts(prev => {
      const updatedSet = new Set(prev);
      if (updatedSet.has(postId)) {
        updatedSet.delete(postId);
      } else {
        updatedSet.add(postId);
      }
      return updatedSet;
    });
  };

  const sendFriendRequest = async selectedUserId => {
    try {
      const response = await fetch(FRNDRQT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({currentUserId: userId, selectedUserId}),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setRequestSent(prev => {
          const updatedSet = new Set(prev);
          updatedSet.add(selectedUserId);
          return updatedSet;
        });
      }
    } catch (error) {
      console.log('Error sending friend request:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('https://socialmedia-app-1-o3op.onrender.com/api/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.log('Error fetching posts:', error);
    }
  };

  const renderPost = ({item}) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.profilePicSmall}></View>
        <Text style={styles.userName}>{state?.user?.name}</Text>
      </View>
      <Image
        source={{uri: `http://10.0.2.2:8080${item.image}`}}
        style={styles.postImage}
      />
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => toggleLike(item._id)}>
          <FontAwesome5
            name="heart"
            solid={likedPosts.has(item._id)}
            size={22}
            color="#ff4757"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 name="comment-dots" size={22} color="#3498db" />
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postDescription}>{item.description}</Text>
    </View>
  );

  const renderSuggestedFriends = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Suggested Friends</Text>
      <FlatList
        data={filteredUsers}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.horizontalList}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('PersonalProfile', {user: item})
            }>
            <View style={styles.friendCard}>
              <View style={styles.profilePic}></View>
              <Text style={styles.friendName}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <View style={{flex:1}}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPost}
        ListHeaderComponent={renderSuggestedFriends}
        // ListFooterComponent={<Footer />}
        contentContainerStyle={{...styles.container, paddingBottom: 100}}
        ListFooterComponentStyle={{paddingBottom: 50}}
      />
      <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f9fc',
    paddingTop: 10,
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  friendCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
    width: 100,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
  },
  friendName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    textAlign: 'center',
  },
  horizontalList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profilePicSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginVertical: 10,
  },
  postActions: {
    flexDirection: 'row',
    gap: 15,
    padding: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#2d3436',
  },
  postDescription: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 10,
  },
});

export default Home;
