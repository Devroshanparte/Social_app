import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Footer from "../components/menu/Footer";
import { launchImageLibrary } from "react-native-image-picker";
import { AuthContext } from "../context/authContext";
import { useNavigation } from "@react-navigation/native";

const PostScreen = () => {
  const navigation = useNavigation(); // Get navigation instance
  const [state] = useContext(AuthContext);
  const userId = state?.user?._id;

  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createFormData = (photo, body = {}) => {
    const data = new FormData();
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri.startsWith("file://") ? photo.uri : "file://" + photo.uri,
    });

    data.append("title", title);
    data.append("description", description);
    data.append("userId", userId);

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    return data;
  };

  const handleChoosePhoto = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0]);
      }
    });
  };

  const handleUploadPhoto = () => {
    if (!photo) {
      Alert.alert("Error", "Please select a photo before uploading.");
      return;
    }

    fetch("https://socialmedia-app-1-o3op.onrender.com/api/upload", {
      method: "POST",
      body: createFormData(photo),
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Upload success", response);
        Alert.alert("Success", "Post uploaded successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Profile") },
        ]);
      })
      .catch((error) => {
        console.log("Upload error:", error);
        Alert.alert("Error", "Failed to upload the post. Please try again.");
      });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>Create a New Post 📸</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Enter description"
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {photo && <Image source={{ uri: photo.uri }} style={styles.imagePreview} />}

        <TouchableOpacity onPress={handleChoosePhoto} style={styles.choosePhotoBtn}>
          <Text style={styles.btnText}>📷 Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleUploadPhoto} style={styles.uploadBtn}>
          <Text style={styles.uploadText}>🚀 Upload Post</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    fontSize: 16,
    color: "#333",
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: "top",
  },
  choosePhotoBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
});
