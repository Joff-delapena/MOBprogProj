import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { UserContext } from './UserContext';
import DropDownPicker from 'react-native-dropdown-picker';
import { FIREBASE_AUTH } from '../../src/Database/FirebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
  return re.test(email);
};

export default function RegisterScreen({ navigation }) {
  const { addUser } = useContext(UserContext);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [terms, setTerms] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState('');
  const [countryItems, setCountryItems] = useState([
    { label: 'Philippines', value: 'Philippines', icon: () => <Image source={require('../../src/assets/ph.png')} style={styles.flagIcon} /> },
    { label: 'USA', value: 'USA', icon: () => <Image source={require('../../src/assets/us.png')} style={styles.flagIcon} /> },
    { label: 'Japan', value: 'Japan', icon: () => <Image source={require('../../src/assets/jp.png')} style={styles.flagIcon} /> },
  ]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState('');
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male', icon: () => <Image source={require('../../src/assets/male_icon.png')} style={styles.genderIcon} /> },
    { label: 'Female', value: 'Female', icon: () => <Image source={require('../../src/assets/female_icon.png')} style={styles.genderIcon} /> },
  ]);

  const handleRegister = async () => {
    if (!fullname || !email || !password || !confirmPassword || !terms || !countryValue || !genderValue) {
      setMessage('Please fill in all fields and agree to the terms.');
    } else if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
    } else if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match, please try again.');
    } else {
      try {

        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        addUser({ fullname, email, password, country: countryValue, gender: genderValue });
        setMessage('Registration successful!');
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1500);
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  const getMessageStyle = () => {
    if (message.includes('successful')) {
      return styles.successMessage;
    } else {
      return styles.errorMessage;
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../src/assets/ASPAbg.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.header}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullname}
        placeholderTextColor="#A9A9A9"
      />
      <DropDownPicker
        open={countryOpen}
        value={countryValue}
        items={countryItems}
        setOpen={setCountryOpen}
        setValue={setCountryValue}
        setItems={setCountryItems}
        placeholder="Select Country"
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        arrowIconStyle={styles.dropDownArrow}
        zIndex={1000}
        zIndexInverse={1000}
      />
      <DropDownPicker
        open={genderOpen}
        value={genderValue}
        items={genderItems}
        setOpen={setGenderOpen}
        setValue={setGenderValue}
        setItems={setGenderItems}
        placeholder="Select Gender"
        style={styles.dropDown}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        arrowIconStyle={styles.dropDownArrow}
        zIndex={999}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={true}
        placeholderTextColor="#A9A9A9"
      />

      <View style={styles.termsContainer}>
        <Switch
          value={terms}
          onValueChange={(value) => setTerms(value)}
          style={styles.switch}
        />
        <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {message ? <Text style={getMessageStyle()}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#00001A',
  },
  logo: {
    bottom: 80,
    right: 130,
    margin: 10,
    height: 65,
  },
  header: {
    fontSize: 30,
    bottom: 50,
    fontWeight: 'bold',
    color: '#fff'
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff'
  },
  dropDown: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#00001A'
  },
  dropDownContainer: {
    borderColor: '#ccc',
    backgroundColor: '#00001A'
  },
  dropDownText: {
    fontSize: 16,
    color: '#fff'
  },
  dropDownArrow: {
    width: 20,
    height: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switch: {
    marginRight: 10,
    right: 20
  },
  termsText: {
    fontSize: 16,
    color: 'green',
    right: 30
  },
  button: {
    backgroundColor: '#cc00cc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
  },
  successMessage: {
    color: 'green',
    marginTop: 10,
  },
  flagIcon: {
    width: 20,
    height: 20,
  },
  genderIcon: {
    width: 20,
    height: 20,
  },
});