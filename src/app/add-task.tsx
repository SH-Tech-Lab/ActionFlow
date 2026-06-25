import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function AddTaskScreen() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
  if (!task.trim()) {
    Alert.alert("Error", "Please enter a task title");
    return;
  }

  try {
    const existingTasks = await AsyncStorage.getItem("tasks");

    const tasks = existingTasks
      ? JSON.parse(existingTasks)
      : [];

    const newTask = {
  id: Date.now().toString(),
  title: task,
  description,
  status: "Assigned",
  createdAt: new Date().toISOString(),
};

    tasks.push(newTask);

    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

    Alert.alert("Success", "Task saved successfully");

    setTask("");
    setDescription("");

    router.back();
  } catch (error) {
    Alert.alert("Error", "Failed to save task");
    console.error(error);
  }
};
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"} 
      style={styles.container}
    >
      <Text style={styles.title}>Create New Task</Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g., Buy groceries" 
        value={task}
        onChangeText={setTask}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Add details about your task..." 
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});