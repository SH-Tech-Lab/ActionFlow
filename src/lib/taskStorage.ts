import AsyncStorage from "@react-native-async-storage/async-storage";

const TASK_KEY = "tasks";

export const saveTasks = async (tasks: any[]) => {
  await AsyncStorage.setItem(
    TASK_KEY,
    JSON.stringify(tasks)
  );
};

export const getTasks = async () => {
  const data = await AsyncStorage.getItem(TASK_KEY);

  return data ? JSON.parse(data) : [];
};