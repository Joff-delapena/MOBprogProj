import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';

const Timer = ({ navigation }) => {
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

    const totalDuration = (parseInt(inputHours) || 0) * 3600 +
                          (parseInt(inputMinutes) || 0) * 60 +
                          (parseInt(inputSeconds) || 0);

    const progressPercentage = totalDuration > 0 ? (seconds / totalDuration) * 100 : 0;
    const progressColor = '#cc00cc'; 

    return (
        <LinearGradient
            colors={['#6a0dad', '#4b0082', '#2b0042']}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <AnimatedCircularProgress
                size={240}
                width={16}
                fill={progressPercentage}
                tintColor={progressColor}  
                backgroundColor="#cbc3e3" 
                lineCap="round"
                rotation={0}
            >
                {
                    () => (
                        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                    )
                }
            </AnimatedCircularProgress>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Hours"
                    keyboardType="numeric"
                    value={inputHours}
                    onChangeText={setInputHours}
                    placeholderTextColor="#cbc3e3"
                    editable={!isRunning}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Minutes"
                    keyboardType="numeric"
                    value={inputMinutes}
                    onChangeText={setInputMinutes}
                    placeholderTextColor="#cbc3e3"
                    editable={!isRunning}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seconds"
                    keyboardType="numeric"
                    value={inputSeconds}
                    onChangeText={setInputSeconds}
                    placeholderTextColor="#cbc3e3"
                    editable={!isRunning}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={startTimer}>
                    <LinearGradient colors={['#cc00cc', '#a900a9']} style={styles.buttonBackground}>
                        <Text style={styles.buttonText}>Start</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={resetTimer}>
                    <LinearGradient colors={['#cc00cc', '#a900a9']} style={styles.buttonBackground}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 25,
    },
    backButtonText: {
        color: '#cbc3e3',
        fontSize: 18,
    },
    timerText: {
        fontSize: 48,
        color: '#fff',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginVertical: 20,
    },
    input: {
        height: 50,
        borderColor: '#cbc3e3',
        borderWidth: 1,
        color: '#fff',
        width: '30%',
        textAlign: 'center',
        fontSize: 18,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',  
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 8,
        overflow: 'hidden', 
    },
    buttonBackground: {
        paddingVertical: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Timer;
