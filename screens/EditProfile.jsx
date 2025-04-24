import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [caption, setCaption] = useState('');

    const handleSubmit = async () => {
        if (!name || !caption) {
            Alert.alert('Error', 'Both fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('caption', caption);

        try {
            const response = await axios.post('https://socialmedia-app-1-o3op.onrender.com/api/updateProfile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Edit Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter Caption"
                value={caption}
                onChangeText={setCaption}
            />
            <Button title="Update Profile" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, alignItems: 'center' },
    input: { width: '100%', padding: 10, borderBottomWidth: 1, marginBottom: 10 },
});

export default EditProfile;
