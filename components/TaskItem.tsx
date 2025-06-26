import React from 'react';
import { View } from 'react-native';
import { Card, Checkbox, Text, IconButton } from 'react-native-paper';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <Card style={{ marginBottom: 8, elevation: 1 }}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Checkbox
            status={task.completed ? 'checked' : 'unchecked'}
            onPress={onToggle}
          />
          <Text
            style={[
              { flex: 1, fontSize: 16, marginLeft: 8 },
              task.completed && { textDecorationLine: 'line-through', color: '#64748b' },
            ]}
          >
            {task.text}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={onDelete}
          />
        </View>
      </Card.Content>
    </Card>
  );
} 