import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import LoginForm from './LoginFormScreen';

const dominantColor = '#800080';

const EditProfileScreen = ({ navigation }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const handleSaveChanges = () => {
    // Implement logic to save changes to the user's profile (e.g., send data to server)
    console.log('username:', username);
    console.log('password:', password);
    // Optionally, navigate back to the profile screen after saving changes
    navigation.goBack();
  };

  const onUpdateProfile = (newUsername, newPassword) => {
    // Update the local state in EditProfileScreen with the new values
    setusername(newUsername);
    setpassword(newPassword);
    navigation.navigate('Login', { username, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setusername}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        value={password}
        onChangeText={setpassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveChanges}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  bioInput: {
    height: 120,
    textAlignVertical: 'top', // Align text to the top in multiline input
  },
  button: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
