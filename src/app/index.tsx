import React, { useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

const QUOTES = [
  {
    id: 1,
    text: "Discipline is the bridge between goals and accomplishment.",
  },
  {
    id: 2,
    text: "The secret of getting ahead is getting started.",
  },
  {
    id: 3,
    text: "Do what you can, with what you have, where you are.",
  },
  {
    id: 4,
    text: "Believe you can and you're halfway there.",
  },
  {
    id: 5,
    text: "Don't watch the clock; do what it does. Keep going.",
  },
];

export default function HomeScreen() {
  const [tasks, setTasks] = useState<any[]>([]);

  const loadTasks = async () => {
    try {
      const data = await AsyncStorage.getItem("tasks");

      if (data) {
        setTasks(JSON.parse(data));
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const totalTasks = tasks.length;

  const assignedTasks = tasks.filter(
    (task) => task.status === "Assigned"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const productivity =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  const randomQuote =
    QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.heading}>
       Hello , Welcome Back !
      </Text>

      <Text style={styles.subtitle}>
        Manage your daily tasks efficiently.
      </Text>

      {/* Statistics */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>
            {totalTasks}
          </Text>
          <Text style={styles.cardLabel}>
            Total Tasks
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: "#f59e0b" },
          ]}
        >
          <Text style={styles.cardNumber}>
            {assignedTasks}
          </Text>
          <Text style={styles.cardLabel}>
            Assigned
          </Text>
        </View>
      </View>

      <View style={styles.cardContainer}>
        <View
          style={[
            styles.card,
            { backgroundColor: "#3b82f6" },
          ]}
        >
          <Text style={styles.cardNumber}>
            {inProgressTasks}
          </Text>
          <Text style={styles.cardLabel}>
            In Progress
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: "#22c55e" },
          ]}
        >
          <Text style={styles.cardNumber}>
            {completedTasks}
          </Text>
          <Text style={styles.cardLabel}>
            Completed
          </Text>
        </View>
      </View>

      {/* Productivity */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          Productivity Score 
        </Text>

        <Text style={styles.productivity}>
          {productivity}%
        </Text>

        <Text style={styles.tipText}>
          Keep completing tasks to improve
          your productivity.
        </Text>
      </View>

      {/* Goal Card */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          Today's Goal 
        </Text>

        <Text style={styles.tipText}>
          Complete your pending tasks and stay
          productive.
        </Text>
      </View>

      {/* Recent Tasks */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>
          Recent Tasks 📋
        </Text>

        {tasks.length === 0 ? (
          <Text style={styles.tipText}>
            No tasks available.
          </Text>
        ) : (
          tasks
            .slice(-5)
            .reverse()
            .map((task) => (
              <View
                key={task.id}
                style={styles.taskItem}
              >
                <Text style={styles.taskTitle}>
                  {task.title}
                </Text>

                <Text
                  style={styles.taskDescription}
                >
                  {task.description}
                </Text>

                <Text
                  style={{
                    color:
                      task.status ===
                      "Completed"
                        ? "#22c55e"
                        : task.status ===
                          "In Progress"
                        ? "#3b82f6"
                        : "#f59e0b",
                    fontWeight: "bold",
                  }}
                >
                  {task.status}
                </Text>
              </View>
            ))
        )}
      </View>

      {/* Motivation */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteTitle}>
          Daily Motivation 💡
        </Text>

        <Text style={styles.quoteText}>
          "{randomQuote.text}"
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#2563eb",
    borderRadius: 15,
    padding: 20,
  },

  cardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  cardLabel: {
    color: "#fff",
    marginTop: 5,
  },

  tipCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    elevation: 4,
  },

  productivity: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2563eb",
    marginVertical: 10,
  },

  tipTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  tipText: {
    fontSize: 15,
    color: "#666",
  },

  taskItem: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  taskDescription: {
    color: "#666",
    marginVertical: 5,
  },

  quoteCard: {
    backgroundColor: "#eff6ff",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#2563eb",
  },

  quoteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 8,
  },

  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    lineHeight: 22,
  },
});