import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

const LoginForm = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    // Di sini Anda dapat menambahkan logika autentikasi, misalnya, memanggil API untuk memeriksa kredensial
    console.log('Username:', username);
    console.log('Password:', password);
    if (username == 'Admin' && password == 'Admin') {
      setUsername('');
      setPassword('');
      navigation.navigate('Home');
    } else {
      setError('Invalid username or password');
    }
    // Contoh sederhana: membersihkan input setelah login
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image
        source={require('../assets/logo.png')} // Replace with the path to your image
        style={styles.featuredImage}
      />
      <Text style={styles.heading}>Masukan Username dan Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#707070"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#707070"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    width: 70,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  featuredImage: {
    width: 230,
    height: 300,
    borderRadius: 10,
    marginBottom: 50,
  },
});

export default LoginForm;
