import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HamburgerMenu from './HamburgerMenu';

export default function MyHeader() {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.header}>
      <Text style={styles.appName}>ActionFlow</Text>
      <Pressable onPress={() => setMenuVisible(!menuVisible)}>
        <Ionicons name="menu" size={32} color="black" />
      </Pressable>

      {menuVisible && <HamburgerMenu onClose={() => setMenuVisible(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { marginTop: 50, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appName: { fontSize: 26, fontWeight: 'bold' },
});