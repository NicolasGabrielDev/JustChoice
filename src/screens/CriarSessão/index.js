import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Modal, Text, TextInput, View } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import api from '../../services/api'
import styles from './styles'

export default function SessionCreate({ navigation }) {
    const [nome, setNome] = React.useState('')
    const [codigo, setCodigo] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false)

    async function handleSessionCreate() {
        const token = await AsyncStorage.getItem('userToken')

        await api.post('/api/sessao', { nome }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        })
            .then(async response => {
                const { codigo, res } = response.data
                setCodigo(codigo)
                await AsyncStorage.setItem('codigo', codigo)
                navigation.dispatch(CommonActions.reset(
                    {
                        index: 0,
                        routes: [
                            { name: "SessionQuestions" }
                        ]
                    }
                ))
                setModalVisible(false)
            }).catch(error => {
                console.log(error.response)
            })
    }

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Button text="CANCELAR" onPress={() => setModalVisible(false)} />
                        <Button text="CONFIRMAR" onPress={() => handleSessionCreate()} />
                    </View>
                </View>
            </Modal>
            <Header />

            <Text style={styles.subTitle}>Nome da sessão:</Text>
            <TextInput style={styles.input} onChangeText={nome => setNome(nome)}></TextInput>

            <Button text="CRIAR" onPress={() => setModalVisible(true)} />
        </View>
    )
}