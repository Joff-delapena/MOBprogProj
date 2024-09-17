import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomepageScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/ASPA.png')} 
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.welcomeText}>Dashboard</Text>
      <Text style={styles.aText}>"wapa nahuman ni sir</Text>
      <Text style={styles.aText}>kay wapa na finalize ang design"</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'#4b0082', 
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 50,
    top: -200,
    left: 0,
    margin: 0,
    height: 50,
    fontWeight: 'bold',
    color: '#cbc3e3',
  },
  logo:{
    top: -250,
    left: 0,
    margin: 0,
    height: 50,
  },

  aText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d517f',
  },
});