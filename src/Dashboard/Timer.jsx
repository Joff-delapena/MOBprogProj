import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';

const Timer = ({ navigation, }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState([]);

  useEffect(() => {
    let timer;
    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => (prev <= 1 ? handleTimeUp() : prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const handleTimeUp = () => {
    setIsRunning(false);
    setSeconds(0);
    Alert.alert("Time's Up!", 'Please take a break from your smartphone.');
  };

  const startTimer = () => {
    setSeconds(3600); // 1 hour default
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <TouchableOpacity onPress={() => navigation.navigate('Homepage')}>
          <Icon name="home" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addGoalsButton} onPress={() => navigation.navigate('DailyGoals')}>
          <Text style={styles.addGoalsText}>Add Goals</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.timerContainer}>
        <AnimatedCircularProgress
          size={240}
          width={12}
          fill={(seconds / 3600) * 100}
          tintColor="#FFFFFF"
          backgroundColor="#5E2D94"
        >
          {() => <Text style={styles.timerText}>{formatTime(seconds)}</Text>}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startTimer}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.goalsContainer}>
        <Text style={styles.goalsTitle}>Your Selected Goals</Text>
        <FlatList
          data={selectedGoals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.goalItem}>{item}</Text>}
          ListEmptyComponent={<Text style={styles.noGoalsText}>No goals selected</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    position: 'absolute',
    top: 60,
  },
  addGoalsButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  
  },
  addGoalsText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  timerContainer: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#CC00CC',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goalsContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    marginBottom: 200
  },
  goalsTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  goalItem: {
    fontSize: 16,
    color: '#FFFFFF',
    padding: 5,
  },
  noGoalsText: {
    fontSize: 14,
    color: '#D1C1E0',
  },
});

export default Timer;
