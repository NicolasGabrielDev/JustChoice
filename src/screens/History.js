import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';

export default function History({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.viewButton}>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.textButton}>CRIADAS</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.textButton}>PARTICIPADAS</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    passText: {
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.5,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 24,
        marginHorizontal: 2,
        marginTop: 8
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    viewButton: {
        flexDirection: "row",
    }
})