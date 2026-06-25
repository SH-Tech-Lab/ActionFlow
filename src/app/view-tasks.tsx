import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { Task } from "../types/task";

export default function ViewTasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

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

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);

    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  const markCompleted = async (id: string) => {
    const updatedTasks: Task[] = tasks.map(
      (task) =>
        task.id === id
          ? {
              ...task,
              status: "Completed",
            }
          : task
    );

    setTasks(updatedTasks);

    await AsyncStorage.setItem(
      "tasks",
      JSON.stringify(updatedTasks)
    );
  };

  const viewTask = (task: Task) => {
    Alert.alert(
      task.title,
      `Description:\n${task.description}\n\nStatus: ${task.status}`
    );
  };

  const getStatusColor = (
    status: string
  ) => {
    switch (status) {
      case "Assigned":
        return "#f59e0b";

      case "In Progress":
        return "#3b82f6";

      case "Completed":
        return "#22c55e";

      default:
        return "#6b7280";
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderItem = ({
    item,
  }: {
    item: Task;
  }) => (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.taskTitle}>
          {item.title}
        </Text>

        <Text style={styles.taskDescription}>
          {item.description}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                getStatusColor(item.status),
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        {/* View */}
        <Pressable
          onPress={() => viewTask(item)}
        >
          <Ionicons
            name="eye"
            size={24}
            color="#3b82f6"
          />
        </Pressable>

        {/* Edit */}
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/update-task",
              params: {
                taskId: item.id,
              },
            })
          }
        >
          <Ionicons
            name="create"
            size={24}
            color="#f59e0b"
          />
        </Pressable>

        {/* Complete */}
        {/* <Pressable
          disabled={
            item.status === "Completed"
          }
          onPress={() =>
            markCompleted(item.id)
          }
        >
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={
              item.status === "Completed"
                ? "#94a3b8"
                : "#22c55e"
            }
          />
        </Pressable> */}

        {/* Delete */}
        <Pressable
          onPress={() =>
            confirmDelete(item.id)
          }
        >
          <Ionicons
            name="trash"
            size={24}
            color="#ef4444"
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        My Tasks 📋
      </Text>

      <Text style={styles.taskCount}>
        Total Tasks: {tasks.length}
      </Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={
          styles.listContainer
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="clipboard-outline"
              size={70}
              color="#cbd5e1"
            />

            <Text style={styles.emptyText}>
              No Tasks Available
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },

  taskCount: {
    color: "#666",
    marginBottom: 15,
  },

  searchInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },

  listContainer: {
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 3,
  },

  content: {
    flex: 1,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  taskDescription: {
    color: "#666",
    marginTop: 5,
  },

  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 10,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  actions: {
    justifyContent: "space-between",
    marginLeft: 15,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: "#999",
  },
});