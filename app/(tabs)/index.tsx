import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Appbar,
  Card,
  Text,
  TextInput,
  Button,
  Checkbox,
  IconButton,
  Dialog,
  Portal,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import TaskItem, { Task as TaskType } from '../../components/TaskItem';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export default function TasksScreen() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
      showMessage({ message: 'Task added', type: 'success', icon: 'success', duration: 1200 });
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
    showMessage({ message: 'Task completed', type: 'info', icon: 'info', duration: 1200 });
  };

  const confirmDeleteTask = (id: string) => {
    setDeleteId(id);
  };

  const handleDelete = () => {
    if (deleteId) {
      setTasks(tasks.filter(task => task.id !== deleteId));
      showMessage({ message: 'Task deleted', type: 'danger', icon: 'danger', duration: 1200 });
      setDeleteId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Task Manager" />
      </Appbar.Header>

      <View style={styles.content}>
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>Hey</Text>
          <Text style={{ color: '#64748b', fontSize: 15, marginTop: 2 }}>by Noeman for Chapterone task.</Text>
        </View>

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
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => toggleTask(task.id)}
                onDelete={() => confirmDeleteTask(task.id)}
              />
            ))
          )}
        </ScrollView>
      </View>

      {/* Delete Confirmation Dialog */}
      <Portal>
        <Dialog visible={!!deleteId} onDismiss={() => setDeleteId(null)}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this task?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteId(null)}>Cancel</Button>
            <Button onPress={handleDelete} textColor="#ef4444">Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      {/* Flash Message for feedback */}
      <FlashMessage position="top" />
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