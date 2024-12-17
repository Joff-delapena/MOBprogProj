import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DailyGoals = ({ navigation, route }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);

  const goals = [
    'Writing',
    'Study',
    'Outdoor Activities',
    'Exercise',
  ];

  // Function to toggle goal selection
  const toggleGoalSelection = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((item) => item !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  // Function to navigate back to the Timer screen with selected goals
  const handleSaveGoals = () => {
    navigation.navigate('Timer', { selectedGoals });
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and "Add Goals" Text */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Goals</Text>
      </View>

      {/* Goal List */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {goals.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.goalItem, selectedGoals.includes(goal) && styles.selectedGoal]}
            onPress={() => toggleGoalSelection(goal)}
          >
            <Text style={styles.goalText}>{goal}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveGoals}>
        <Text style={styles.saveButtonText}>Save Goals</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
    top: 15
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    top: 15
  },
  listContainer: {
    padding: 20,
  },
  goalItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  selectedGoal: {
    backgroundColor: '#C000D5',
  },
  goalText: {
    fontSize: 16,
    color: '#000000',
  },
  saveButton: {
    backgroundColor: '#6A0DAD',
    padding: 15,
    alignItems: 'center',
    margin: 20,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DailyGoals;
