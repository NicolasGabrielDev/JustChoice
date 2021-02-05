import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

export default function RespostaButton(props) {
    return (
        <TouchableOpacity  onPress={props.onPress} style={[styles.buttonResposta, props.activeAnswer == props.text ? {backgroundColor: "#27a0ff"} : {backgroundColor: "#ffffff"}]}>
            <Text style={[styles.textResposta, props.activeAnswer == props.text ? {color: "#ffffff"} : {color: "#000000"}]}>{props.text}</Text>
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