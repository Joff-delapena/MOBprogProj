import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function Settings({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Homepage')} style={styles.backButton}>
                 <Icon name="arrow-back" size={24} color="#000f" />
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
        bottom: 370,
        right: 150
    },
});
