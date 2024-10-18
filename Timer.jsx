import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const Timer = ({ navigation, route }) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [inputHours, setInputHours] = useState('');
    const [inputMinutes, setInputMinutes] = useState('');
    const [inputSeconds, setInputSeconds] = useState('');
    const [selectedGoals, setSelectedGoals] = useState([]);

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

    useEffect(() => {
        if (route.params?.selectedGoals) {
            setSelectedGoals(route.params.selectedGoals);
        }
    }, [route.params?.selectedGoals]);

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

    const totalDuration = useMemo(() => {
        return (parseInt(inputHours) || 0) * 3600 +
            (parseInt(inputMinutes) || 0) * 60 +
            (parseInt(inputSeconds) || 0);
    }, [inputHours, inputMinutes, inputSeconds]);

    const progressPercentage = useMemo(() => {
        return totalDuration > 0 ? (seconds / totalDuration) * 100 : 0;
    }, [totalDuration, seconds]);

    return (
        <LinearGradient
            colors={['#6a0dad', '#4b0082', '#2b0042']}
            style={styles.container}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.backButton}>
                <Icon name="home" size={18} color="#fff" />
            </TouchableOpacity>

            <AnimatedCircularProgress
                size={240}
                width={16}
                fill={progressPercentage}
                tintColor="#cc00cc"
                backgroundColor="#cbc3e3"
                lineCap="round"
                rotation={0}
            >
                {() => (
                    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
                )}
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

            <View style={styles.goalsContainer}>
                <Text style={styles.goalsHeading}>Your Selected Goals</Text>
                {selectedGoals.length > 0 ? (
                    <FlatList
                        data={selectedGoals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.goalText}>{item}</Text>
                        )}
                        style={styles.goalsList}
                    />
                ) : (
                    <Text style={styles.noGoalsText}>No goals selected.</Text>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        right: 15    },
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
        borderRadius: 5,
        color: '#fff',
        textAlign: 'center',
        width: '30%',
        backgroundColor: '#4b0082',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
        marginBottom: 20,
    },
    button: {
        width: '45%',
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonBackground: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    goalsContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    goalsHeading: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 10,
    },
    goalsList: {
        width: '100%',
        maxHeight: 150,
    },
    goalText: {
        color: '#fff',
        fontSize: 16,
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#6a0dad',
        borderRadius: 5,
    },
    noGoalsText: {
        color: '#ccc',
    },
});

export default Timer;
