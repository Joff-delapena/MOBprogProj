import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Corrected this import
import Icon from 'react-native-vector-icons/Ionicons';

export default function ManageTime() {
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [goals] = useState([
        'Exercise',
        'Read a book',
        'Meditate',
        'Sleep',
        'Outdoor Activities',
        'Studying',
    ]);
    const navigation = useNavigation();

    const toggleGoalSelection = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(item => item !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    const addGoals = () => {
        console.log('Added Time Plans:', selectedGoals);
        navigation.navigate('Timer', { selectedGoals }); 
        setSelectedGoals([]);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.heading}>Manage Your Time</Text>

            <FlatList
                data={goals}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => toggleGoalSelection(item)} 
                        style={[styles.goalItem, selectedGoals.includes(item) && styles.selectedGoal]}
                    >
                        <Text style={styles.goalText}>{item}</Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity onPress={addGoals} style={styles.button}>
                <Text style={styles.buttonText}>Save Time Plan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    goalItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 5,
        borderRadius: 5,
    },
    selectedGoal: {
        backgroundColor: '#cc00cc',
    },
    goalText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#cc00cc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    backButton: {
        marginBottom: 50,
        marginTop: 30,
        right: 5
    },
});
