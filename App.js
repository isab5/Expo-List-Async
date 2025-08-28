import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from './components/Card';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefaSalva, setTarefaSalva] = useState('');
  const [novaTarefa, setNovaTarefa] = useState('');
  const [limparTarefas, setLimparTarefas] = useState('');

  const tasks = [
    { id: '1', descricao: 'Dar banho no cachorro' },
    { id: '2', descricao: 'Limpar o banheiro' },
    { id: '3', descricao: 'Estudar React Native' },
  ];

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / 2;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Lista de Tarefas 📝</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua tarefa..."
          value={tarefa}
          onChangeText={setTarefa}
        />
        <SafeAreaView style={styles.cards}>
          <FlatList
            style={styles.verticalList}
            data={tasks}
            scrollEnabled={false}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Card task={item} onPress={() => navigation.navigate("Details", { task: item })} />
              </View>
            )}
          />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  cards: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
  },
  cardContainer: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },

});
