import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Todo App</Text>

        <Pressable>
          <Ionicons
            name="menu"
            size={30}
            color="black"
          />
        </Pressable>
      </View>

      {/* Dynamic Content */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Pressable
          onPress={() => router.push("/add-task")}
        >
          <Text style={styles.btn}>Add</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/view-tasks")}
        >
          <Text style={styles.btn}>View</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/update-task")}
        >
          <Text style={styles.btn}>Update</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    marginTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  btn: {
    fontSize: 18,
    color: "#2563eb",
    fontWeight: "bold",
  },
});
