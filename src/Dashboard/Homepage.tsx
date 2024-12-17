import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProgressCircle } from 'react-native-svg-charts';

export default function Homepage({ navigation }) {
    const [progress, setProgress] = useState(0.49);

    const getProgressColor = (progress) => {
        if (progress >= 0.9) return 'red'; 
        if (progress >= 0.5) return 'yellow';
        return 'green'; 
    };

    const progressColor = getProgressColor(progress);

    return (
        <LinearGradient colors={['#6a0dad', '#4b0082', '#2b0042']} style={styles.gradientContainer}>
            <ScrollView contentContainerStyle={styles.container}>
          
            <Image 
                    source={require('../../src/assets/ASPAbg.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                    />

                <Text style={styles.title}>Addiction Percentage</Text>

                <View style={styles.circularContainer}>
                    <ProgressCircle
                        style={styles.progressCircle}
                        progress={progress}
                        progressColor={progressColor}
                        backgroundColor={'#2b0042'}
                        strokeWidth={10}
                    />
                    <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
                </View>

                <View style={styles.iconRow}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('AppBlocker')}>
                        <Ionicons name="lock-closed-outline" size={30} color="#fff" />
                        <Text style={styles.iconText}>App Blocker</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('ScreenUnlocks')}>
                        <Ionicons name="key-outline" size={30} color="#fff" />
                        <Text style={styles.iconText}>Screen Unlocks</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                        <Ionicons name="notifications-outline" size={30} color="#fff" />
                        <Text style={styles.iconText}>Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('RecentGoals')}>
                        <Ionicons name="checkmark-done-outline" size={30} color="#fff" />
                        <Text style={styles.iconText}>Recent Goals</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.phoneUsageButton} onPress={() => navigation.navigate('PhoneUsage')}>
                    <Text style={styles.phoneUsageText}>Phone Usage</Text>
                </TouchableOpacity>

            </ScrollView>

            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Dashboard</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Timer')}>
                    <Ionicons name="timer-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Timer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 30,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        top: 200
    },
    circularContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
      position: 'absolute',
      top: 20,
      right: -30,
      margin: 10,
      height: 60,
    },
    progressCircle: {
        height: 270,
        width: 250,
    },
    progressText: {
        position: 'absolute',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        
    },
    iconRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 20,
    },
    iconButton: {
        alignItems: 'center',
        margin: 15,
        backgroundColor: 'rgba(50, 9, 79, 0.6)',
        padding: 15,
        borderRadius: 10,
    },
    iconText: {
        color: '#fff',
        fontSize: 12,
        marginTop: 5,
    },
    phoneUsageButton: {
        backgroundColor: '#cc00cc',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
    },
    phoneUsageText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#4b0082',
        paddingVertical: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        color: '#fff',
        fontSize: 10,
    },
});
