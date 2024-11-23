import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const About = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>About Aspa</Text>
            <Text style={styles.description}>
                Aspa is an application designed to help you reduce smartphone usage and promote healthier habits.
            </Text>

            <TouchableOpacity onPress={() => Linking.openURL('mailto:Aspa@gmail.com')}>
                <Text style={styles.contactText}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000f" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        top: 90
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        top: 110
    },
    subheading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        alignSelf: 'flex-start', 
        top: 120
    },
    listItem: {
        fontSize: 16,
        marginLeft: 10,
        alignSelf: 'flex-start', 
        top: 120
    },
    version: {
        fontSize: 16,
        marginBottom: 20,
        alignSelf: 'flex-start', 
        top: 150
    },
    contactText: {
        color: '#4b0082',
        fontSize: 18,
        marginTop: 20,
        top: 150
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 15,
    },
});

export default About;
