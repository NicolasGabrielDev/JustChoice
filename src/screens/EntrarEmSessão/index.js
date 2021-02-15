import React from 'react'
import {Dimensions, StyleSheet, Text,TextInput, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import styles from './styles'

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

            <TouchableOpacity style={styles.button} onPress={handleSessionLogIn}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableOpacity>
        </View>
    )
}