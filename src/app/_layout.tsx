import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";
export default function RootLayout() {
  return (
    <View style={styles.container}>
      <MyHeader />
      
      {/* The Slot component acts as a placeholder for your child screens */}
      <View style={styles.content}>
        <Slot />
      </View>

      <MyFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  content: { flex: 1 }
});