import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../context/authContext';
import {useNavigation, useRoute} from '@react-navigation/native';

const ChatsMessageScreen = () => {
  const route = useRoute();
  const [messages, setMessages] = useState([]);
  const [recepientsData, setRecepientData] = useState();
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const {recepientId} = route.params;
  const [state] = useContext(AuthContext);
  const userId = state?.user?._id;

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://socialmedia-app-1-o3op.onrender.com/messages/${userId}/${recepientId}`,
      );
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
      } else {
        console.log('Error fetching messages:', response.status.message);
      }
    } catch (error) {
      console.log('Error in fetching messages', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const fetchRecepientData = async () => {
      try {
        const response = await fetch(
          `https://socialmedia-app-1-o3op.onrender.com/user/${recepientId}`,
        );
        const data = await response.json();
        setRecepientData(data);
      } catch (error) {
        console.log('Error retrieving user', error);
      }
    };

    fetchRecepientData();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch('https://socialmedia-app-1-o3op.onrender.com/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderId: userId,
          recepientId,
          messageType: 'text',
          message,
        }),
      });

      if (response.ok) {
        setMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.log('Error in sending message:', error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="arrow-left" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{recepientsData?.name}</Text>
        </View>
      ),
    });
  }, [recepientsData]);

  const formatTime = time => {
    if (!time) return 'Invalid Time';
    const date = new Date(time);
    if (isNaN(date.getTime())) return 'Invalid Time';
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageContainer}>
        {messages.map((item, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,
              item.senderId?._id === userId ? styles.sentMessage : styles.receivedMessage,
            ]}>
            <Text style={styles.messageText}>{item?.message}</Text>
            <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Pressable>
          <FontAwesome5 name="smile" color={'grey'} size={24} style={styles.icon} />
        </Pressable>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          style={styles.textInput}
          placeholder="Type a message..."
        />
        <FontAwesome5 name="camera" size={24} color={'grey'} style={styles.icon} />
        <FontAwesome5 name="microphone" size={24} color={'grey'} style={styles.icon} />
        <Pressable onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatsMessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  messageContainer: {
    flexGrow: 1,
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    maxWidth: '75%',
    borderRadius: 12,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
  },
  timestamp: {
    fontSize: 10,
    textAlign: 'right',
    marginTop: 5,
    color: 'grey',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 25,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  icon: {
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    marginLeft: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
