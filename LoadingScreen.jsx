import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.navigate('Login'); 
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/ASPA.png')}
        style={[styles.logo, { opacity }]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.loadingText, { opacity }]}>
        Loading...
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00001A',
  },
  logo: {
    height: 100,
    width: 250,
    marginBottom: 20,
    alignItems: 'center',
    bottom: 20,
    left: 0,
  },
  loadingText: {
    textAlign: 'center',
    left: 10,
    bottom: 60,
    fontSize: 18,
    color: '#555',
  },
});

export default LoadingScreen;
