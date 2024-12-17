import React from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DATA = [
  { id: '1', title: 'Notification', time: '1min' },
  { id: '2', title: 'Notification', time: '1min' },
  { id: '3', title: 'Notification', time: '1min' },
  { id: '4', title: 'Notification', time: '1min' },
  { id: '5', title: 'Notification', time: '1min' },
];

const Item = ({ title, time }) => (
  <View style={styles.card}>
    <Text style={styles.text}>{title}</Text>
    <Text style={styles.time}>
      {time} <Text style={styles.dot}>●</Text>
    </Text>
  </View>
);

const Notifications = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} time={item.time} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000016',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A0DAD',
    paddingVertical: 25,
    paddingHorizontal: 30,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    top: 15,
    right: 40
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 30,
    padding: 10,
  },
  list: {
    marginTop: 25,
  },
  card: {
    backgroundColor: '#5E5E5E',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    color: '#fff',
    fontSize: 14,
    bottom: 7,
    left: 260
  },
  dot: {
    color: 'green',
    fontSize: 14,
  },
});

export default Notifications;
