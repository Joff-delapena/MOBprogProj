import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Homepage() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/ASPA.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Dashboard</Text>  

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="person-circle-outline" size={50} color="#4b0082" />
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="stats-chart-outline" size={50} color="#4b0082" />
          <Text style={styles.cardText}>Analytics</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="settings-outline" size={50} color="#4b0082" />
          <Text style={styles.cardText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card}>
          <Ionicons name="help-circle-outline" size={50} color="#4b0082" />
          <Text style={styles.cardText}>Support</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.statusText}>"Wapa nahuman ni sir kay wapa na finalize ang design"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4b0082', 
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#cbc3e3',
    marginBottom: 20,
  },
  logo: {
    position: 'absolute',
    top: -10,
    left: -25,
    margin: 10,
    height: 50,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 130,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b0082',
    marginTop: 10,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cbc3e3',
    marginTop: 40,
    textAlign: 'center',

  },
});
