import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Homepage({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false); 

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuItemPress = (screen) => {
        navigation.navigate(screen); 
        setMenuVisible(false);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./assets/ASPA.png')} 
                style={styles.logo} 
                resizeMode="contain"
            />

            <Text style={styles.welcomeText}>Dashboard</Text>  

            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.menu} onPress={toggleMenu}>
                    <Ionicons name="menu-outline" size={30} color="#fff" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.buttonContainer} 
                    onPress={() => navigation.navigate('Timer')}
                >
                    <Text style={styles.buttonText}>Go to Preventer</Text>
                </TouchableOpacity>
            </View>

            {menuVisible && (
                <View style={styles.dropdown}>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Profile')}>
                        <Text style={styles.dropdownText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Analytics')}>
                        <Text style={styles.dropdownText}>Analytics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Settings')}>
                        <Text style={styles.dropdownText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Support')}>
                        <Text style={styles.dropdownText}>Support</Text>
                    </TouchableOpacity>
                </View>
            )}
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
            top: 30,
            left: -25,
            margin: 10,
            height: 50,
        },
        cardContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end', 
            marginBottom: 30,
            position: 'absolute', 
            right: 20, 
            top: 10, 
        },
        menu: {
            padding: 10,
            top: 40,
            left:100,
        },
        dropdown: {
            position: 'absolute',
            top: 90, 
            right: 50, 
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 3,
            width: 100,
            padding: 10,
        },
        dropdownItem: {
            padding: 10,
        },
        dropdownText: {
            color: '#4b0082',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        statusText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#cbc3e3',
            marginTop: 40,
            textAlign: 'center',
        },
        buttonContainer: {
            backgroundColor: '#cc00cc',
            borderRadius: 5,
            padding: 10,
            marginLeft: 10,
            top: 100,
            width: 80,
            height: -5
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 14,
            bottom: 3
        },
    });
    