import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const dominantColor = '#800080';

const AccountScreen = ({navigation}) => {
  const navigateTo = screen => {
    navigation.navigate(screen);
  };
  const handleLogout = () => {
    // Perform logout logic (clear session, reset state, etc.)
    // Redirect the user to the login screen
    navigation.navigate('Welcome');
  };

  const handleEditProfile = () => {
    // Navigate to the profile editing screen
    navigation.navigate('Edit Profile');
  };

  return (
    <View style={styles.container}>
      <Icon name="user-circle" size={100} color="#333" />
      <Text style={styles.username}>Admin</Text>
      {/* <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Home')}>
          <Icon name="home" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('History')}>
          <Icon name="history" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('News')}>
          <Icon name="newspaper-o" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Compost')}>
          <Icon name="tree" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigateTo('Account')}>
          <Icon name="user" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  button: {
    backgroundColor: dominantColor,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    position: 'absolute', // Position the footer absolutely
    bottom: 0, // Align the footer to the bottom
    left: 0,
    right: 0,
  },
  footerButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default AccountScreen;
