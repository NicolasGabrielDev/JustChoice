import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

export default function RespostaButton(props) {
    return (
        <TouchableOpacity style={styles.buttonResposta}>
            <Text style={styles.textResposta}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    textResposta: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
    },
    buttonResposta: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#27a0ff',
        borderWidth: 1,
        borderRadius: 36,
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.08,
        margin: 8,
    },
})