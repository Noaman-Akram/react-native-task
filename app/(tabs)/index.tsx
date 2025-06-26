import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  TextInput,
  Button,
  Checkbox,
  IconButton,
  Divider,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Task Manager" />
      </Appbar.Header>

      <View style={styles.content}>
        <Card style={styles.inputCard}>
          <Card.Content>
            <TextInput
              label="Add new task"
              value={newTask}
              onChangeText={setNewTask}
              mode="outlined"
              style={styles.input}
              onSubmitEditing={addTask}
            />
            <Button
              mode="contained"
              onPress={addTask}
              style={styles.addButton}
              disabled={!newTask.trim()}
            >
              Add Task
            </Button>
          </Card.Content>
        </Card>

        <ScrollView style={styles.taskList}>
          {tasks.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Card.Content>
                <Text style={styles.emptyText}>No tasks yet. Add one above!</Text>
              </Card.Content>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} style={styles.taskCard}>
                <Card.Content>
                  <View style={styles.taskRow}>
                    <Checkbox
                      status={task.completed ? 'checked' : 'unchecked'}
                      onPress={() => toggleTask(task.id)}
                    />
                    <Text
                      style={[
                        styles.taskText,
                        task.completed && styles.completedTask,
                      ]}
                    >
                      {task.text}
                    </Text>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => deleteTask(task.id)}
                    />
                  </View>
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputCard: {
    marginBottom: 16,
    elevation: 2,
  },
  input: {
    marginBottom: 12,
  },
  addButton: {
    borderRadius: 8,
  },
  taskList: {
    flex: 1,
  },
  taskCard: {
    marginBottom: 8,
    elevation: 1,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  emptyCard: {
    marginTop: 32,
    elevation: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    fontSize: 16,
  },
});