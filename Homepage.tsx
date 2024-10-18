import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import Swiper from 'react-native-swiper';

const image1 = require('./assets/Track screen time.png');
const image2 = require('./assets/Goals.png');
const image3 = require('./assets/reminder.png');

export default function Homepage({ navigation, route }) {
    const [goals, setGoals] = useState([]);

    const handleAddGoal = (goal) => {
        setGoals((prevGoals) => [...prevGoals, goal]);
    };

    return (
        <LinearGradient colors={['#6a0dad', '#4b0082', '#2b0042']} style={styles.gradientContainer}>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.aboutButton} onPress={() => navigation.navigate('About')}>
                    <Ionicons name="information-circle-outline" size={20} color="#fff" />
                </TouchableOpacity>

                <Image source={require('./assets/ASPAbg.png')} style={styles.logo} resizeMode="contain" />

                <View style={styles.swiperContainer}>
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={true}
                        dot={<View style={styles.dot} />}
                        activeDot={<View style={styles.activeDot} />}
                        autoplay={true}
                        autoplayTimeout={3}
                    >
                        <View style={styles.slide}>
                            <Image source={require('./assets/Track screen time.png')} style={styles.slideImage} resizeMode="cover" />
                            <View style={styles.overlay} />
                            <Text style={styles.slideText}>Track Screen Time</Text>
                        </View>
                        
                        <View style={styles.slide}>
                            <Image source={require('./assets/Goals.png')} style={styles.slideImage} resizeMode="cover" />
                            <View style={styles.overlay} />
                            <Text style={styles.slideText}>Set Goals</Text>
                        </View>
                        <View style={styles.slide}>
                            <Image source={require('./assets/reminder.png')} style={styles.slideImage} resizeMode="cover" />
                            <View style={styles.overlay} />
                            <Text style={styles.slideText}>Get Reminders</Text>
                        </View>
                    </Swiper>
                </View>

                <TouchableOpacity style={styles.goalsButton} onPress={() => navigation.navigate('DailyGoals', { onAddGoal: handleAddGoal })}>
                    <Text style={styles.goalsButtonText}>Manage Time</Text>
                </TouchableOpacity>
            </ScrollView>

            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Homepage')}>
                    <Ionicons name="home-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Support')}>
                    <Ionicons name="help-circle-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Timer', { goals })}>
                    <Ionicons name="timer-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Timer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Settings</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-outline" size={24} color="#fff" />
                    <Text style={styles.navText}>Profile</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 30,
    },
    aboutButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
        left: 310,
        bottom: 70
    },
    logo: {
        textAlign: 'center',
        width: 250,
        height: 180,
        bottom: 100,
        right: 10,
    },
    swiperContainer: {
        height: 200,
        width: '100%',
        marginTop: 100,
        bottom: 200,
    },
    wrapper: {
        height: '100%',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(000,000,000,.5)',
    },
    slideText: {
        position: 'absolute',
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        bottom: 80,
    },
    slideImage: {
        width: '100%', 
        height: '100%', 
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    dot: {
        backgroundColor: 'rgba(255,255,255,.5)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        top: 20
    },
    activeDot: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
        marginLeft: 3,
        marginRight: 3,
        top: 20
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#4b0082',
        paddingVertical: 5,
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
    goalsButton: {
        backgroundColor: '#cc00cc',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        bottom: 90
    },
    goalsButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
