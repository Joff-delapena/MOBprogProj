import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';
import { UserContext } from './UserContext';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [countryValue, setCountryValue] = useState('Philippines');
  const [countryItems, setCountryItems] = useState([
    { label: 'Philippines', value: 'Philippines', icon: () => <Image source={require('./assets/ph.png')} style={styles.flagIcon} /> },
    { label: 'USA', value: 'USA', icon: () => <Image source={require('./assets/us.png')} style={styles.flagIcon} /> },
    { label: 'Japan', value: 'Japan', icon: () => <Image source={require('./assets/jp.png')} style={styles.flagIcon} /> },
  ]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState('Male');
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'Male', icon: () => <Image source={require('./assets/male_icon.png')} style={styles.genderIcon} /> },
    { label: 'Female', value: 'Female', icon: () => <Image source={require('./assets/female_icon.png')} style={styles.genderIcon} /> },
  ]);

  const handleRegister = () => {
    if (!fullname || !email || !password || !confirmPassword || !terms) {
      setMessage('Please fill in all fields and agree to the terms.');
    } else if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match, please try again.');
    } else {
      addUser({ fullname, email, password, country: countryValue, gender: genderValue });
      setMessage('Registration successful!');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1500);
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
        source={require('./assets/ASPA.png')} 
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
    padding: 20,
    backgroundColor: '#00001A'
  },
  logo: {
    position: 'static',
    top: -40,
    left: -45,
    margin: 10,
    height: 50,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    textAlign: 'center',
    color: '#FFF'
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    color: '#fff',
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
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  switch: {
    marginRight: 10,
  },      
  termsText: {
    fontSize: 16,
    color: '#009688',
  },
  dropDown: {
    backgroundColor: '#00001a',
    borderColor: '#A9A9A9',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropDownContainer: {
    backgroundColor: '#00001a',
    borderColor: '#A9A9A9',
  },
  dropDownText: {
    color: '#A9A9A9',
  },
  dropDownArrow: {
    tintColor: '#cc00cc',
  },
  flagIcon: {
    width: 20,
    height:10,
    marginRight: 5,
  },
  genderIcon: {
    width: 10, 
    height: 10, 
    marginRight: 5,
  },
});
