import React from 'react'
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'

export function Button(props){
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={styles.textButton}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export function LinkButton(props){
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.textLink}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 8,
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    textLink: {
        fontSize: 16,
        textAlign: "center",
        color: '#27a0ff',
    }
})