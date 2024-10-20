import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth'; 
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig'; 
import { doc, setDoc } from 'firebase/firestore';

const Settings = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const handleSignOut = () => {
        Alert.alert("Sign Out", "Are you sure you want to sign out?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "OK",
                onPress: async () => {
                    setLoading(true);

                    try {
                        const user = FIREBASE_AUTH.currentUser;
                        if (!user) {
                            console.log('User is not authenticated');
                            setLoading(false);
                            return;
                        }

                        const userRef = doc(FIREBASE_DB, 'users', user.uid);
                        await setDoc(userRef, { lastSignOut: new Date().toISOString() }, { merge: true });

                        await signOut(FIREBASE_AUTH);
                        console.log('User logged out');

                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    } catch (error) {
                        Alert.alert("Error", error.message);
                    } finally {
                        setLoading(false);
                    }
                }
            }
        ]);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFF" />
                <Text style={styles.loadingText}>Logging out...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image 
                    source={require('./assets/ASPAbg.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.backButtonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={30} color="white" />
                </TouchableOpacity>
            </View>

            <Text style={styles.settingsHeader}>Settings</Text>

            <View style={styles.section}>
                <TouchableOpacity style={styles.rowWithBackground}>
                    <Icon name="person-circle-outline" size={24} color="gray" />
                    <Text style={styles.item}>My Accounts</Text>
                    <Icon name="chevron-forward-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.rowWithBackground}>
                    <Icon name="notifications" size={24} color="gray" />  
                    <Text style={styles.item}>Notifications</Text>
                    <Icon name="chevron-forward-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.rowWithBackground}>
                    <Icon name="lock-closed" size={24} color="gray" />
                    <Text style={styles.item}>Privacy & Security</Text>
                    <Icon name="chevron-forward-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.rowWithBackground}>
                    <Icon name="headset" size={24} color="gray" />  
                    <Text style={styles.item}>Help and Support</Text>
                    <Icon name="chevron-forward-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.rowWithBackground}>
                    <Icon name="information-circle" size={24} color="gray" />  
                    <Text style={styles.item}>About</Text>
                    <Icon name="chevron-forward-outline" size={24} color="gray" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#00001A',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 250,
        height: 150,
        bottom: 20,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backButton: {
        padding: 10,
    },
    settingsHeader: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginVertical: 10,
    },
    rowWithBackground: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1C1C2D',
        padding: 15,
        borderRadius: 10,
    },
    item: {
        color: '#FFF',
        fontSize: 18,
    },
    logoutButton: {
        backgroundColor: '#cc00cc',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
    },
    logoutButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00001A',
    },
    loadingText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },
});

export default Settings;
