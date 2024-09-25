import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from './UserContext';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export default function LoginScreen({ navigation }) {
  const { users } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setMessage('Please fill in all fields.');
    } else if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
    } else if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
    } else {
      const user = users.find(user => user.email === email && user.password === password);
      if (user) {
        setMessage('Login successful!');
        navigation.navigate('GetStarted'); // Navigate to GetStarted screen
      } else {
        setMessage('Invalid email or password.');
      }
    }
  };

  const handleFacebookLogin = () => {
    const fbLoginUrl = 'https://www.facebook.com/login';
    Linking.openURL(fbLoginUrl).catch(err => console.error('An error occurred', err));
  };

  const handleGoogleLogin = () => {
    const googleLoginUrl = 'https://accounts.google.com/signin';
    Linking.openURL(googleLoginUrl).catch(err => console.error('An error occurred', err));
  };

  const handleInstagramLogin = () => {
    const instagramLoginUrl = 'https://www.instagram.com/accounts/login';
    Linking.openURL(instagramLoginUrl).catch(err => console.error('An error occurred', err));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <View style={styles.passwordContainer}>
        <TextInput 
          style={styles.passwordInput} 
          placeholder="Password" 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry={!showPassword} 
          placeholderTextColor="#A9A9A9"  
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
          <Icon 
            name={showPassword ? 'visibility-off' : 'visibility'} 
            size={20} 
            color="#A9A9A9" 
          />
        </TouchableOpacity>
      </View>

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
      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={handleFacebookLogin}>
          <Image
            source={require('./assets/Facebook.png')}
            style={styles.facebookIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleGoogleLogin}>
          <Image
            source={require('./assets/google.png')} 
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={handleInstagramLogin}>
          <Image
            source={require('./assets/ig.png')} 
            style={styles.igIcon}
            resizeMode="contain"
          />  
        </TouchableOpacity>
      </View>
      <Text style={styles.statusText}>Or sign in with</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00001A', 
    borderRadius: 10, 
    color: '#fff',
  },
  logo: {
    position: 'absolute',
    top: 10,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  eyeButton: {
    paddingHorizontal: 5,
    right: 5,
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
    fontSize: 18,
  },
  linkTextBlue: {
    color: '#cc00cc',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 40,
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
  },
  facebookIcon: {
    width: 30,
    height: 30,
    top: 110,
    left: 20,
  },
  googleIcon: {
    width: 30,
    height: 30,
    top: 110,
    right: 60,         
  },
  igIcon: {
    width: 30,
    height: 30,
    top: 110,
    right: 140,
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    bottom: 10,
    textDecorationLine: 'underline',
  },
});
