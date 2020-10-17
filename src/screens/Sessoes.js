import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import api from '../services/api'

export default function sessoes({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            
            <Text style={styles.passText}>Bem vindo!</Text>
            <Text style={styles.passText}>Entre ou crie uma sessão:</Text>

            <TouchableHighlight style={[styles.button, {marginTop: 28}]} onPress={() => navigation.navigate('SessionLogIn')}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('SessionCreate')}>
                <Text style={styles.textButton}>CRIAR</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 56,
        fontWeight: '600',
        color: '#27a0ff',
    },
    subTitle: {
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        marginBottom: 36,
    },
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
    },
    passText: {
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
    },

})