import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { Link } from 'expo-router'; 

const Timer = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputHours, setInputHours] = useState('');
    const [inputMinutes, setInputMinutes] = useState('');
    const [inputSeconds, setInputSeconds] = useState('');

    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };

        requestPermissions();

        const subscription = Notifications.addNotificationResponseReceivedListener(() => {
            setIsRunning(false);
            setSeconds(0);
        });

        let timer;
        if (isRunning && seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => {
                    if (prev <= 1) {
                        handleTimeUp();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timer);
            subscription.remove();
        };
    }, [isRunning, seconds]);

    const handleTimeUp = async () => {
        setIsRunning(false);
        setSeconds(0);
        Alert.alert("Time's Up!", 'Please take a break from your smartphone.');
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time's Up!",
                body: 'Please take a break from your smartphone.',
            },
            trigger: null,
        });
    };

    const startTimer = async () => {
        const totalSeconds =
            (parseInt(inputHours) || 0) * 3600 +
            (parseInt(inputMinutes) || 0) * 60 +
            (parseInt(inputSeconds) || 0);

        if (totalSeconds > 0) {
            const { status } = await Notifications.getPermissionsAsync();
            if (status === 'granted') {
                setSeconds(totalSeconds);
                setIsRunning(true);
                await scheduleNotification(totalSeconds);
            } else {
                Alert.alert('Permission Denied', 'Please enable notifications in settings.');
            }
        } else {
            Alert.alert('Invalid Time', 'Please enter a time greater than zero.');
        }
    };

    const scheduleNotification = async (totalSeconds) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Time's Up!",
                body: 'Please take a break from your smartphone.',
            },
            trigger: { seconds: totalSeconds },
        });
    };

    const resetTimer = () => {
        setIsRunning(false);
        setSeconds(0);
        setInputHours('');
        setInputMinutes('');
        setInputSeconds('');
        Notifications.cancelAllScheduledNotificationsAsync();
    };

    const formatTime = (secs) => {
        const h = Math.floor(secs / 3600);
        const m = Math.floor((secs % 3600) / 60);
        const s = secs % 60;
            return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.timerText}>{formatTime(seconds)}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Hours"
                    keyboardType="numeric"
                    value={inputHours}
                    onChangeText={setInputHours}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    editable={!isRunning}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Minutes"
                    keyboardType="numeric"
                    value={inputMinutes}
                    onChangeText={setInputMinutes}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    editable={!isRunning}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seconds"
                    keyboardType="numeric"
                    value={inputSeconds}
                    onChangeText={setInputSeconds}
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    editable={!isRunning}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startTimer}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>

       
            <View style={styles.linkContainer}>
                <Link href="/homepage">
                    <Text style={styles.linkText}>Back to Homepage</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4b0082',
        padding: 20,
    },
    timerText: {
        fontSize: 60,
        color: '#fff',
        marginBottom: 30,
        fontWeight: 'bold',
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: 'white',
        borderWidth: 2,
        color: 'white',
        width: '30%',
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        elevation: 3,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#4b0082',
        fontSize: 20,
        fontWeight: 'bold',
    },
    linkContainer: {
        marginTop: 20,
    },
    linkText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Timer;
