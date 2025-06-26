import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';

interface TaskInputProps {
  value: string;
  onChange: (text: string) => void;
  onAdd: () => void;
  disabled?: boolean;
}

export default function TaskInput({ value, onChange, onAdd, disabled }: TaskInputProps) {
  return (
    <Card style={{ marginBottom: 16, elevation: 2 }}>
      <Card.Content>
        <TextInput
          label="Add new task"
          value={value}
          onChangeText={onChange}
          mode="outlined"
          style={{ marginBottom: 12 }}
          onSubmitEditing={onAdd}
        />
        <Button
          mode="contained"
          onPress={onAdd}
          style={{ borderRadius: 8 }}
          disabled={disabled}
        >
          Add Task
        </Button>
      </Card.Content>
    </Card>
  );
} 