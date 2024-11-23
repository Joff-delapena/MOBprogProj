import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const RecentActivity = ({ navigation, route }) => {
    const { lastTimer, lastSession, appUsageReduced } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recent Activity</Text>
      
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
         </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 25,
    },
    backButtonText: {
        color: '#000',
        fontSize: 18,
    },
});

export default RecentActivity; 
