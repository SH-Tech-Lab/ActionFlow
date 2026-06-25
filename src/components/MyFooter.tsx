import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function Footer() {
  return (
    <View style={styles.bottomMenu}>
      {/* Removed the Home button code */}
      
      <Pressable style={styles.button} onPress={() => router.push("/add-task")}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/view-tasks")}>
        <Text style={styles.buttonText}>View</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push("/status-task")}>
        <Text style={styles.buttonText}>Tracker</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomMenu: { 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', // This centers the 3 buttons perfectly
    paddingVertical: 20, 
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee', // Adds a subtle line to separate footer from content
  },
  button: { 
    backgroundColor: '#2563eb', 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '600' 
  },
});