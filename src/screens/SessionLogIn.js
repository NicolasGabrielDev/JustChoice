import React from 'react'
import {Dimensions, StyleSheet, Text,TextInput, TouchableHighlight, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'

export default function SessionLogIn({navigation}) {
    const [codigo, setCodigo] = React.useState('')

    async function handleSessionLogIn() {
        const token = await AsyncStorage.getItem('userToken')
        await api.post('/api/entrar-sessao', {
            codigo
        },{ 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(async response => {
            const { token } = response.data
            await AsyncStorage.setItem('codigo', codigo)

            navigation.navigate('SessionQuestions')
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            
            <Text style={styles.subTitle}>Código da sessão:</Text>
            <TextInput 
                style={styles.input}
                placeholder='Digite aqui seu código!'
                onChangeText={codigo => setCodigo(codigo)}
            ></TextInput>

            <TouchableHighlight style={styles.button} onPress={handleSessionLogIn}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableHighlight>
        </View>
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
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 3,
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'left',
        width: Dimensions.get('window').width * 0.8,
        height: 40,
        paddingLeft: 8,
        marginBottom: 12,
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
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
})