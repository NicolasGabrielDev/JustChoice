import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Alert, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
                    .then(() => {
                        navigation.dispatch(CommonActions.reset(
                            {
                                index: 0,
                                routes: [
                                    { name: "SessionQuestions" }
                                ]
                            }
                        ))
                    }).catch(error => {
                        console.log(error.response)
                    })
            }).catch(error => {
                console.log(error.response)
            })
    }

    return (
        <View style={styles.container}>
            <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => console.log('Fechado')} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Atenção!</Text>
                        <Text></Text>
                        <Text>{nome}</Text>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={() => {
                            setModalVisible(false)
                        }}>
                            <Text style={styles.textButton}>CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: "green" }]} onPress={() => {
                            
                            handleSessionCreate()
                            setModalVisible(false)
                        }}>
                            <Text style={styles.textButton}>CONFIRMA</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>

            <Text style={styles.subTitle}>Nome da sessão:</Text>
            <TextInput style={styles.input} onChangeText={nome => setNome(nome)}></TextInput>

            <TouchableOpacity style={styles.button} onPress={() => {
                setModalVisible(true)
            }}>
                <Text style={styles.textButton}>CRIAR</Text>
            </TouchableOpacity>
        </View>
    )
}