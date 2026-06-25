import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";

export default function UpdateTaskScreen() {
  const { taskId } = useLocalSearchParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");

      if (!data) {
        setLoading(false);
        return;
      }

      const tasks = JSON.parse(data);

      const task = tasks.find(
        (item: any) =>
          item.id === String(taskId)
      );

      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!title.trim()) {
        Alert.alert(
          "Error",
          "Task title is required"
        );
        return;
      }

      const data = await AsyncStorage.getItem(
        "tasks"
      );

      if (!data) return;

      const tasks = JSON.parse(data);

      const updatedTasks = tasks.map(
        (item: any) =>
          item.id === String(taskId)
            ? {
                ...item,
                title,
                description,
              }
            : item
      );

      await AsyncStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
      );

      Alert.alert(
        "Success",
        "Task updated successfully"
      );

      router.back();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Failed to update task"
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Edit Task
      </Text>

      <Text style={styles.label}>
        Task Title
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.textArea,
        ]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
      />

      <Pressable
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.buttonText}>
          Save Changes
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },

  textArea: {
    height: 120,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});