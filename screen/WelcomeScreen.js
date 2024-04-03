import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const WelcomeScreen = ({navigation}) => {
  const handleLogin = () => {
    // Navigasi ke halaman login
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    // Navigasi ke halaman signup
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WANI OBAH</Text>
      <Image
        source={require('../assets/logos.png')} // Replace with the path to your image
        style={styles.featuredImage}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 48,
    marginBottom: 20,
    fontWeight: '900',
    color: '#800080',
  },
  button: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    marginBottom: 10,
  },
  buttons: {
    width: 400,
    height: 200,
    backgroundColor: '#512b69',
    alignItems: 'center',
    paddingTop: 50,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  featuredImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default WelcomeScreen;
