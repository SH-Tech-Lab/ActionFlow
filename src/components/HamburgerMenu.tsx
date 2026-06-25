import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface MenuProps {
  onClose: () => void;
}

export default function HamburgerMenu({ onClose }: MenuProps) {
  const menuItems = [
    { label: 'Dashboard', route: '/' },
    { label: 'Add New Task', route: '/add-task' },
    { label: 'View All Tasks', route: '/view-tasks' },
    
  ];

  return (
    <View style={styles.dropdown}>
      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          style={styles.menuItem}
          onPress={() => {
            onClose();
            router.push(item.route as any);
          }}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 200,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    zIndex: 1000,
  },
  menuItem: { padding: 18, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  menuText: { fontSize: 16, color: "#333" },
});