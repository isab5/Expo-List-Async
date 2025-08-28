import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Card({ task }) {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.task}>{task ? task.descricao : "Tarefa sem descrição"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        height: 60,
        width: 300,
        alignItems: "center",
        justifyContent: "center"
    },
    task: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#703e3b'
    },
});
