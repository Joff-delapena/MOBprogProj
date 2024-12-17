import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 

const APP_DATA = [
  { id: '1', name: 'Tiktok', status: 'Blocked in 3 days', icon: require('../assets/Tiktok.png') },
  { id: '2', name: 'Mobile Legends', status: 'Blocked in 3 days', icon: require('../assets/Mobile Legends.jpg') },
  { id: '3', name: 'Call of Duty', status: 'Blocked in 3 days', icon: require('../assets/Call of Duty.jpg') },
  { id: '4', name: 'Facebook', status: 'Block', icon: require('../assets/facebook.jpg') },
  { id: '5', name: 'Instagram', status: 'Block', icon: require('../assets/Instagram.png') },
  { id: '6', name: 'Clash of Clans', status: 'Blocked in 3 days', icon: require('../assets/Clash of Clans.jpg') },
  { id: '7', name: 'Roblox', status: 'Block', icon: require('../assets/Roblox.png') },
];

const AppItem = ({ item }) => (
  <View style={styles.card}>
    <Image source={item.icon} style={styles.icon} />
    <Text style={styles.name}>{item.name}</Text>
    <TouchableOpacity
      style={[styles.button, item.status === 'Block' ? styles.buttonGreen : styles.buttonRed]}
    >
      <Text style={[styles.buttonText, item.status === 'Block' ? styles.textGreen : styles.textRed]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  </View>
);

const AppBlocker = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>App Blocker</Text>
      </View>

      {/* FlatList displaying app data */}
      <FlatList
        data={APP_DATA}
        renderItem={({ item }) => <AppItem item={item} />}
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
    backgroundColor: '#6A0DAD',
    paddingVertical: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    position: 'relative',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    top: 15,
    textAlign: 'center',
    flex: 1,
    right: 60
  },
  list: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#1E1E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    flex: 1,
    marginLeft: 15,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    
  },
  buttonGreen: {
    backgroundColor: '#00FF00',
  },
  buttonRed: {
    backgroundColor: '#FF0000',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  textGreen: {
    color: '#FFFFFF',
  },
  textRed: {
    color: '#FFFFFF',
  },
  arrow: {
    top: 20,
  },
});

export default AppBlocker;
