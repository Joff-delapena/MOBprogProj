import React from 'react';
import { View, Text, TouchableOpacity, Text as RNText, StyleSheet } from 'react-native';

const GetStartedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title1}>Welcome to Aspa!</Text>
      <Text style={styles.title2}>Reduce, Prevent, and Control.</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Homepage')} 
      >
        <RNText style={styles.buttonText}>Get Started</RNText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4b0082',
  },
  title1: {
    fontSize: 45,
    marginBottom: 20,
    color: '#fff',
    fontWeight: 'bold',
    bottom: 40
  },
  title2: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  buttonContainer: {
    marginTop: 30,
    backgroundColor: '#cc00cc',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    top: 150,
    left: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GetStartedScreen;
