import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UserContext } from './UserContext';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function LoginScreen({ navigation }) {
  const { users } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields.');
    } else if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
    } else {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setMessage('Login successful!');
        navigation.navigate('Homepage');
      } else {
        setMessage('Invalid email or password.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/ASPA.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.header}>Login</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
        placeholderTextColor="#A9A9A9"  
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry={true} 
        placeholderTextColor="#A9A9A9"  
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {message ? (
        <Text style={message.includes('successful') ? styles.successMessage : styles.errorMessage}>
          {message}
        </Text>
      ) : null}
      <View style={styles.link}>
        <Text style={styles.linkText}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkTextBlue}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor:'#00001A', 
    borderRadius: 10, 
    color: '#fff',
  },
  logo: {
    position: 'absolute',
    top: -10,
    left: -25,
    margin: 10,
    height: 50,

  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 60,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#FFFFFF', 
  },
  button: {
    backgroundColor: '#cc00cc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    color: '#008000',
    textAlign: 'center',
  },
  errorMessage: {
    color: '#DC3545',
    textAlign: 'center',
  },
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#FFF',
    fontSize: 16,
  },
  linkTextBlue: {
    color: '#cc00cc',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});