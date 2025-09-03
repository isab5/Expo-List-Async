import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Card({ task, onDelete }) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{task.descricao}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(task.id)}>
                <Text style={styles.deleteBtnText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E8E1DA',
        borderRadius: 10,
        padding: 18,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#555',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardText: {
        fontSize: 18,
        color: '#333',
        flex: 1,
    },
    deleteBtn: {
        backgroundColor: '#8A1C1B',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 12,
    },
    deleteBtnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});