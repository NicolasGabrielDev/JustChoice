import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Alert, Dimensions, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import api from '../services/api'

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
                        setModalVisible(true)
                        console.log(res)
                    }).catch(error => {
                        console.log(error.response)
                    })
            }).catch(error => {
                console.log(error.response)
            })
    }

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} transparent={true} onRequestClose={() => console.log('Fechado')} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text>Código da sessão: </Text>
                        <Text>{codigo}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            setModalVisible(false)
                            navigation.navigate('SessionQuestions')
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
                handleSessionCreate()
            }}>
                <Text style={styles.textButton}>CRIAR</Text>
            </TouchableOpacity>
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})