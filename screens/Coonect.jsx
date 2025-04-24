// import React, { useState, useEffect } from "react";
// import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";
// import Geolocation from "react-native-geolocation-service";
// import axios from "axios";

// const Connect = () => {
//   const [nearbyUsers, setNearbyUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(""); // New state for handling errors

//   useEffect(() => {
//     // Get user's location and fetch nearby users
//     const fetchNearbyUsers = async () => {
//       try {
//         Geolocation.getCurrentPosition(
//           async (position) => {
//             const { latitude, longitude } = position.coords;

//             // Send location to backend
//             await axios.post("http://192.168.0.101:8080/update-location", {
//               userId: "USER_123", // Replace with actual user ID
//               latitude,
//               longitude,
//             });

//             // Fetch nearby users
//             const response = await axios.post("http://192.168.0.101:8080/find-nearby", {
//               latitude,
//               longitude,
//             });

//             setNearbyUsers(response.data);
//             setIsLoading(false);
//           },
//           (error) => {
//             console.error("Location Error:", error);
//             setErrorMessage("Failed to get location. Please enable GPS.");
//             setIsLoading(false);
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
//         );
//       } catch (err) {
//         setErrorMessage("Error fetching users. Please try again.");
//         setIsLoading(false);
//       }
//     };

//     fetchNearbyUsers();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🔍 Finding Nearby Users...</Text>

//       {isLoading && <ActivityIndicator size="large" color="#ff9500" />}
      
//       {!isLoading && errorMessage !== "" && <Text style={styles.error}>{errorMessage}</Text>}
      
//       {!isLoading && nearbyUsers.length === 0 && errorMessage === "" && (
//         <Text style={styles.noUser}>No users nearby 😔</Text>
//       )}

//       <FlatList
//         data={nearbyUsers}
//         keyExtractor={(item) => item.userId}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.name}>{item.name}</Text>
//             <Text style={styles.distance}>Distance: {item.distance.toFixed(2)} meters</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: "center", padding: 20 },
//   title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
//   error: { color: "red", fontSize: 16, marginTop: 10 },
//   noUser: { fontSize: 16, color: "#555", marginTop: 10 },
//   card: { backgroundColor: "#fff", padding: 15, borderRadius: 10, marginVertical: 8 },
//   name: { fontSize: 18, fontWeight: "bold" },
//   distance: { fontSize: 14, color: "#555" },
// });

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Coonect = () => {
  return (
    <View>
      <Text>Coonect</Text>
    </View>
  )
}

export default Coonect

const styles = StyleSheet.create({})