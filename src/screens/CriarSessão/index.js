import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Image, Modal, Text, TextInput, View } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import api from '../../services/api'
import styles from './styles'
import Confirmation from '../../../assets/confirmation.png'

export default function SessionCreate({ navigation }) {
    const [name, setName] = React.useState('')
    const [sessionCode, setSessionCode] = React.useState('')
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
                const { codigo } = response.data
                setSessionCode(codigo)
                await AsyncStorage.setItem('sessionCode', sessionCode)
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
                        <Image source={Confirmation} style={{ width: 180, height: 180, }} />
                        <Button text="CANCELAR" onPress={() => setModalVisible(false)} />
                        <Button text="CONFIRMAR" onPress={handleSessionCreate} />
                    </View>
                </View>
            </Modal>
            <Header />
            <Text style={styles.subTitle}>Nome da sessão:</Text>
            <TextInput style={styles.input} onChangeText={name => setName(name)}></TextInput>
            <Button text="CRIAR" onPress={() => setModalVisible(true)} />
        </View>
    )
}