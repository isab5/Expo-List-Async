import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './components/Card';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await AsyncStorage.getItem('@tasks');
      if (data) setTasks(JSON.parse(data));
    };
    loadTasks();
  }, []);

  const saveTasks = async (newTasks) => {
    await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const handleAddTask = async () => {
    if (!tarefa.trim()) return;
    const newTask = { id: Date.now().toString(), descricao: tarefa };
    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
    setTarefa('');
  };

  const handleDeleteTask = async (id) => {
    const filtered = tasks.filter(task => task.id !== id);
    await saveTasks(filtered);
  };

  const handleClearAll = async () => {
    await AsyncStorage.removeItem('@tasks');
    setTasks([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas 📝</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua tarefa..."
        value={tarefa}
        onChangeText={setTarefa}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleAddTask}>
        <Text style={styles.addBtnText}>Adicionar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
        <Text style={styles.clearBtnText}>Limpar Tudo</Text>
      </TouchableOpacity>

      <SafeAreaView style={{ flex: 1, width: '100%' }}>
        {tasks.length === 0 ? (
          <Text style={styles.noTasksText}>Nenhuma tarefa por aqui!😎</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card task={item} onDelete={handleDeleteTask} />
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9CDC5',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  addBtn: {
    width: '100%',
    backgroundColor: '#022619',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearBtn: {
    width: '100%',
    backgroundColor: '#8A1C1B',
    borderRadius: 8,
    padding: 13,
    alignItems: 'center',
    marginBottom: 20,
  },
  addBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  clearBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noTasksText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
    marginTop: 50,
  },
});