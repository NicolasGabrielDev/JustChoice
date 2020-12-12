import React from 'react'
import {Dimensions, Modal, StyleSheet, Text,TextInput, TouchableHighlight, View } from 'react-native'
import api from '../services/api'

export default function SessionCreate({navigation}) {
    const [name, setName] = React.useState('')
    const [modalVisible, setModalVisible] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    function handleSessionCreate() {
        api.post('create', { name })
        .then(response => {
            const { codigo } = response.data
        }).catch(error => {
            console.warn(error)
        })
    }

    {if(isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator color='#27a0ff' size='large'>
                </ActivityIndicator>
            </View>
        )
    }}

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible} transparent={true} onRequestClose={() => console.log('Fechado')} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text>Código da sessão: </Text>
                        <Text>ILRWZ</Text>
                        <TouchableHighlight style={styles.button} onPress={() => {
                            setModalVisible(false)
                            navigation.navigate('SessionQuestions')
                        }}>
                            <Text style={styles.textButton}>CONFIRMA</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            
            <Text style={styles.subTitle}>Nome da sessão:</Text>
            <TextInput style={styles.input} onChangeText={name => setName(name)}></TextInput>

            <TouchableHighlight style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.textButton}>CRIAR</Text>
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