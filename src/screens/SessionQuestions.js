import React from 'react'
import { StyleSheet, Text, TextInput, TouchableHighlight, View, } from 'react-native'

export default function SessionQuestions({ navigation }) {
    const [perguntas, setPerguntas] = React.useState({})
    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Código da Sessão: ILRWZ</Text>
            <Text style={styles.textTitle}>Nenhuma pergunta criada!</Text>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.textButton}>+</Text>
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignSelf: "flex-end",
        justifyContent: 'center',
        backgroundColor: '#27a0ff',
        width: 54,
        height: 54,
        borderRadius: 60,
        margin: 16,

    },
    textButton: {
        fontWeight: "bold",
        fontSize: 32,
        textAlign: 'center',
        color: '#ffffff',
    },
    textTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        color: '#696969',
    }
})