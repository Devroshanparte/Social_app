import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
  } from 'react-native';
  import React, {useState, useEffect, useContext} from 'react';
  import axios from 'axios';
  import Footer from '../components/menu/Footer';
  import {AuthContext} from '../context/authContext';
  
  const FRNDRQT_API_URL = 'https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-request';
  const FRIEND_STATUS_API_URL = 'https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-status';
  
  const PersonalProfile = ({route, navigation}) => {
    const {user} = route.params || {};
    const [posts, setPosts] = useState([]);
    const [friendStatus, setFriendStatus] = useState({});
    const [state] = useContext(AuthContext);
  
    const userId = state?.user?._id;
    const status = friendStatus?.[user._id] || 'connect';
  
    useEffect(() => {
      const fetchFriendStatuses = async () => {
        try {
          const response = await axios.post(FRIEND_STATUS_API_URL, {userId});
          setFriendStatus(response.data);
        } catch (error) {
          console.log('Error fetching friend statuses:', error.message);
        }
      };
  
      if (userId) {
        fetchFriendStatuses();
      }
    }, [userId]);
  
    useEffect(() => {
      if (user?._id) {
        fetchUserPosts();
      }
    }, [user?._id]);
  
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(
          `https://socialmedia-app-1-o3op.onrender.com/api/posts/${user?._id}`,
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    };
  
    const sendFriendRequest = async selectedUserId => {
      try {
        if (!userId) return;
  
        const response = await fetch(FRNDRQT_API_URL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({currentUserId: userId, selectedUserId}),
        });
  
        const responseData = await response.json();
        if (response.ok && responseData.success) {
          setFriendStatus(prev => ({...prev, [selectedUserId]: 'sent'}));
        }
      } catch (error) {
        console.log('Error sending friend request:', error);
      }
    };
  
    return (
      <>
        <ScrollView style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{uri: user.profilePic || 'https://via.placeholder.com/120'}}
              style={styles.profileImg}
            />
            <Text style={styles.nameText}>{user.name}</Text>
  
            {userId !== user._id && (
              <TouchableOpacity
                style={[
                  styles.btnConnect,
                  status === 'sent' && styles.disabledButton,
                  status === 'friend' && styles.friendButton,
                ]}
                onPress={() => sendFriendRequest(user._id)}
                disabled={status !== 'connect'}>
                <Text style={styles.textConnect}>
                  {status === 'sent'
                    ? 'Request Sent'
                    : status === 'friend'
                    ? 'Friend'
                    : 'Connect'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
  
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User's Posts</Text>
            {posts.length > 0 ? (
              <FlatList
                data={posts}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                renderItem={({item}) => (
                  <View style={styles.postCard}>
                    <Image
                      source={{uri: `https://socialmedia-app-1-o3op.onrender.com${item.image}`}}
                      style={styles.postImage}
                    />
                    <Text style={styles.postTitle}>{item.title}</Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noPostsText}>No posts available</Text>
            )}
          </View>
        </ScrollView>
  
        <Footer navigation={navigation} />
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f5fc',
    },
    profileContainer: {
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 20,
      marginBottom: 20,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 3},
      elevation: 5,
    },
    profileImg: {
      height: 120,
      width: 120,
      borderRadius: 60,
      backgroundColor: '#ddd',
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: '#337799',
    },
    nameText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 10,
    },
    btnConnect: {
      marginTop: 12,
      height: 40,
      width: 160,
      backgroundColor: '#337799',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 2},
      elevation: 2,
    },
    textConnect: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    disabledButton: {
      backgroundColor: '#aaa',
    },
    friendButton: {
      backgroundColor: '#28a745',
    },
    section: {
      paddingHorizontal: 20,
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
    },
    postCard: {
      flex: 1,
      backgroundColor: 'white',
      borderRadius: 15,
      margin: 5,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      elevation: 3,
    },
    postImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2d3436',
      marginTop: 5,
    },
    noPostsText: {
      fontSize: 16,
      color: '#888',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  
  export default PersonalProfile;
  