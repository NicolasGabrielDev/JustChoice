import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import api from '../services/api'

export default function modalPergunta(props) {
    const [isResponding, setIsResponding] = React.useState(props.isResponding)

    async function criarResposta() {
        const token = await AsyncStorage.getItem('userToken')
        const codigo = await AsyncStorage.getItem('codigo')

        await api.post('criar-resposta', {
            resposta,
            "pergunta_id": props.pergunta_id
        })
    }
    return (
        <Modal style={styles.modalView} visible={isResponding} onDismiss={() => setVisible(false)}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>JustChoice</Text>
                <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
                <Text style={styles.subTitle}>Seja legal e responda a pergunta :)</Text>
                <Text>Pergunta {props.index}</Text>
                <Text>Qtd: {props.quantidade}</Text>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
    },
    title: {
        alignSelf: 'center',
        fontSize: 56,
        fontWeight: '600',
        color: '#27a0ff',
        paddingTop: 24,
    },
    subTitle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        marginBottom: 36,
    },
})