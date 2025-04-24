import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import Footer from "../components/menu/Footer";
import { AuthContext } from "../context/authContext";

const API_URL = "https://socialmedia-app-1-o3op.onrender.com/api/v1/users/all-users";
const FRNDRQT_API_URL = "https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-request";
const FRIEND_STATUS_API_URL = "https://socialmedia-app-1-o3op.onrender.com/api/v1/chat/friend-status";

const SearchScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [friendStatus, setFriendStatus] = useState({});
  const [searchText, setSearchText] = useState("");
  const [state] = useContext(AuthContext);

  const userId = state?.user?._id;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        const filteredUsers = response.data.filter((user) => user._id !== userId);
        setUsers(filteredUsers);
      } catch (error) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchFriendStatuses = async () => {
      try {
        const response = await axios.post(FRIEND_STATUS_API_URL, { userId });
        setFriendStatus(response.data);
      } catch (error) {
        console.log("Error fetching friend statuses:", error.message);
      }
    };

    if (userId) {
      fetchUsers();
      fetchFriendStatuses();
    }
  }, [userId]);

  const sendFriendRequest = async (selectedUserId) => {
    try {
      if (!userId) return;

      const response = await fetch(FRNDRQT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentUserId: userId, selectedUserId }),
      });

      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setFriendStatus((prev) => ({ ...prev, [selectedUserId]: "sent" }));
      }
    } catch (error) {
      console.log("Error sending friend request:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
        <Footer navigation={navigation} />
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        {/* Search Input */}
        <TextInput
          placeholder="Search users..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />

        {filteredUsers.length === 0 ? (
          <Text style={styles.noUsersText}>No users found</Text>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const status = friendStatus[item._id] || "connect";

              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("PersonalProfile", { user: item })}
                  style={styles.userContainer}
                >
                  {/* Profile Picture Placeholder */}
                  <View style={styles.profileCont}>
                    <Text style={styles.profileInitial}>{item.name.charAt(0).toUpperCase()}</Text>
                  </View>

                  <Text style={styles.username}>{item.name}</Text>

                  <TouchableOpacity
                    style={[
                      styles.btnConnect,
                      status === "sent" && styles.disabledButton,
                      status === "friend" && styles.friendButton,
                    ]}
                    onPress={() => sendFriendRequest(item._id)}
                    disabled={status !== "connect"}
                  >
                    <Text style={styles.textConnect}>
                      {status === "sent" ? "Request Sent" : status === "friend" ? "Friend" : "Connect"}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
      <Footer navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fdfdfd",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingLeft: 15,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  noUsersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 20,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  profileCont: {
    height: 45,
    width: 45,
    backgroundColor: "#4093bf",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  username: {
    fontSize: 18,
    flex: 1,
    fontWeight: "500",
  },
  btnConnect: {
    height: 35,
    paddingHorizontal: 15,
    backgroundColor: "#4093bf",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4093bf",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  friendButton: {
    backgroundColor: "#28a745",
  },
  textConnect: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default SearchScreen;
