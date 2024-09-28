import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 

export default function Homepage({ navigation, route }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [activityVisible, setActivityVisible] = useState(false);

    const [lastTimer, setLastTimer] = useState(0);
    const [lastSession, setLastSession] = useState('No sessions yet');
    const [appUsageReduced, setAppUsageReduced] = useState(0);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleActivity = () => {
        setActivityVisible(!activityVisible);
    };

    const handleMenuItemPress = (screen) => {
        navigation.navigate(screen);
        setMenuVisible(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            if (route.params?.lastTimer) {
                setLastTimer(route.params.lastTimer);
                setLastSession(route.params.lastSession || 'No sessions yet');
                setAppUsageReduced(route.params.appUsageReduced || 0);
            }
        }, [route.params])
    );

    return (
        <LinearGradient
            colors={['#6a0dad', '#4b0082', '#2b0042']} 
            style={styles.gradientContainer}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('./assets/ASPA.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.welcomeText}>Welcome to Aspa</Text>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Timer')}>
                    <LinearGradient colors={['#cc00cc', '#a900a9']} style={styles.buttonBackground}>
                        <Text style={styles.buttonText}>Start Preventer</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.activityButton} onPress={toggleActivity}>
                    <Text style={styles.activityButtonText}>
                        {activityVisible ? 'Hide Recent Activity' : 'Show Recent Activity'}
                    </Text>
                </TouchableOpacity>

                {activityVisible && (
                    <View style={styles.recentActivity}>
                        {lastTimer > 0 ? (
                            <>
                                <Text style={styles.activityText}>Last Timer: {lastTimer} minutes</Text>
                                <Text style={styles.activityText}>Last Session: {lastSession}</Text>
                                <Text style={styles.activityText}>App Usage Reduced: {appUsageReduced}%</Text>
                            </>
                        ) : (
                            <Text style={styles.activityText}>No recent activity.</Text>
                        )}
                    </View>
                )}

                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                    <Ionicons name="menu-outline" size={30} color="#fff" />
                </TouchableOpacity>

                {menuVisible && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Profile')}>
                            <Text style={styles.dropdownText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Settings')}>
                            <Text style={styles.dropdownText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMenuItemPress('Support')}>
                            <Text style={styles.dropdownText}>Support</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        bottom: 90,
        textAlign: 'center',
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 32,
        color: '#cbc3e3',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        borderRadius: 8,
        marginBottom: 30,
        width: 200,
        alignItems: 'center',
    },
    buttonBackground: {
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    menuButton: {
        position: 'absolute',
        top: 55,
        right: 10,
        padding: 10,
        borderRadius: 50,
    },
    dropdown: {
        position: 'absolute',
        top: 100,
        right: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        width: 120,
        paddingVertical: 10,
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownText: {
        color: '#4b0082',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    activityButton: {
        marginTop: 20,
        backgroundColor: '#cc00cc',
        padding: 10,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
    },
    activityButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recentActivity: {
        backgroundColor: '#cbc3e3',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
        alignItems: 'center',
    },
    activityText: {
        color: '#4b0082',
        fontSize: 14,
        marginBottom: 5,
    },
});
