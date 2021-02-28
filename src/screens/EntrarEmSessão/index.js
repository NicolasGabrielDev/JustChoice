import React from 'react'
import { Text,TextInput, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../../components/Header'
import api from '../../services/api'
import styles from './styles'
import { CommonActions } from '@react-navigation/native'
import { Button } from '../../components/Button'

export default function SessionLogIn({navigation}) {
    const [sessionCode, setSessionCode] = React.useState('')

    async function handleSessionLogIn() {
        const token = await AsyncStorage.getItem('userToken')
        await api.post('/api/entrar-sessao', {
            "codigo" : sessionCode
        },{ 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(async response => {
            await AsyncStorage.setItem('sessionCode', sessionCode)
            navigation.dispatch(CommonActions.reset(
                {
                    index: 0,
                    routes: [
                        { name : "SessionQuestions"}
                    ],
                    
                }
            ))
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.subTitle}>Código da sessão:</Text>
            <TextInput 
                style={styles.input}
                placeholder='Código da Sessão'
                onChangeText={sessionCode => setSessionCode(sessionCode)}
            ></TextInput>
            <Button text="ENTRAR" onPress={handleSessionLogIn} />
        </View>
    )
}