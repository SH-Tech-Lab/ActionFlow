import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { Task } from "../types/task";

export default function TaskTrackerScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");

      if (data) {
        const parsedTasks: Task[] = JSON.parse(data);
        setTasks(parsedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const updateStatus = async (
    id: string,
    status:
      | "Assigned"
      | "In Progress"
      | "Completed"
  ) => {
    try {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status,
            }
          : task
      );

      setTasks(updatedTasks);

      await AsyncStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const assignedTasks = tasks.filter(
    (task) => task.status === "Assigned"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const renderTaskCard = (task: Task) => (
    <View
      key={task.id}
      style={styles.taskCard}
    >
      <Text style={styles.taskTitle}>
        {task.title}
      </Text>

      <Text style={styles.taskDescription}>
        {task.description}
      </Text>

      <Text style={styles.currentStatus}>
        Current Status: {task.status}
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={[
            styles.statusButton,
            { backgroundColor: "#f59e0b" },
          ]}
          onPress={() =>
            updateStatus(
              task.id,
              "Assigned"
            )
          }
        >
          <Text style={styles.buttonText}>
            Assigned
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.statusButton,
            { backgroundColor: "#3b82f6" },
          ]}
          onPress={() =>
            updateStatus(
              task.id,
              "In Progress"
            )
          }
        >
          <Text style={styles.buttonText}>
            Progress
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.statusButton,
            { backgroundColor: "#22c55e" },
          ]}
          onPress={() =>
            updateStatus(
              task.id,
              "Completed"
            )
          }
        >
          <Text style={styles.buttonText}>
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );

  const renderSection = (
    title: string,
    tasks: Task[],
    color: string
  ) => (
    <View style={styles.section}>
      <View
        style={[
          styles.sectionHeader,
          {
            backgroundColor: color,
          },
        ]}
      >
        <Text style={styles.sectionTitle}>
          {title} ({tasks.length})
        </Text>
      </View>

      {tasks.length === 0 ? (
        <Text style={styles.emptyText}>
          No Tasks
        </Text>
      ) : (
        tasks.map(renderTaskCard)
      )}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.header}>
        Task Tracker 📊
      </Text>

      {renderSection(
        "Assigned",
        assignedTasks,
        "#f59e0b"
      )}

      {renderSection(
        "In Progress",
        progressTasks,
        "#3b82f6"
      )}

      {renderSection(
        "Completed",
        completedTasks,
        "#22c55e"
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  section: {
    marginBottom: 25,
  },

  sectionHeader: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  taskCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  taskTitle: {
    fontSize: 17,
    fontWeight: "bold",
  },

  taskDescription: {
    color: "#666",
    marginTop: 5,
  },

  currentStatus: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  emptyText: {
    color: "#888",
    marginTop: 10,
    marginLeft: 5,
  },
});