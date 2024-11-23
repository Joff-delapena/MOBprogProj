import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Settings({ navigation }) {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../../src/assets/malupiton.jpg')} 
                style={styles.image} 
                resizeMode="contain"
            />

            <Text style={styles.heading1}>Profile</Text>
            <Text style={styles.heading2}>Bossing!!!</Text>
    
            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000f" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 300, 
        height: 350,
        top: 40
     
    },
    heading1: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
        bottom: 370
    },
    heading2: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    backButton: {
        position: 'absolute',
        top: 50, 
        left: 20, 
    },
});
