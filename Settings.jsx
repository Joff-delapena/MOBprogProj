import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from './FirebaseConfig'; 

export default function Settings({ navigation }) {
    const handleLogout = async () => {
        const user = FIREBASE_AUTH.currentUser;

        if (!user) {
            console.log('User is not authenticated');
            return;
        }

        try {
            const userRef = doc(FIREBASE_DB, 'users', user.uid);
            await setDoc(userRef, {
                lastSignOut: new Date().toISOString(),
            }, { merge: true });

            await signOut(FIREBASE_AUTH);
            console.log('User logged out');
            
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Settings</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000f" />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutText}>Log Out</Text>
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
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#ff4d4d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    logoutText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
