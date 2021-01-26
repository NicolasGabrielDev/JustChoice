import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableHighlight, View, Dimensions, ActivityIndicator } from 'react-native'
import { RadioButton } from 'react-native-paper'
import api from '../services/api'

export default function SessionQuestions({ navigation }) {
    const [visible, setVisible] = React.useState(false)
    const [checked, setChecked] = React.useState('numerica')
    const [codigo, setCodigo] = React.useState('')
    const [usuario, setUsuario] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function getData() {
            const codigo = await AsyncStorage.getItem('codigo')
            const token = await AsyncStorage.getItem('userToken')

            await api.post('/api/perguntas', {
                codigo,
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                }
            })
            .then(response => {
                const {res, usuario} = response.data
                console.log(res)
                console.log(usuario)
                //ca4128b6
                setUsuario(usuario)
            })
            .catch(error => {
                console.log(error.response)
            })
            setCodigo(codigo)
            setIsLoading(false)
        }
        getData()
    }, [])

    async function criarPergunta(){
        await api.post('/api/criar-pergunta', {
            tipo: checked,
            quantidade,
            sessao_id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        })
    }
    {if(isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={32} color='blue'>

                </ActivityIndicator>
            </View>
        )
    }}
    {if(usuario == 'admin') {
        return (
            <View style={styles.container}>
                <Modal style={styles.modalView} visible={visible} onDismiss={() => setVisible(false)}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>JustChoice</Text>
                        <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
                        <Text style={styles.subTitle}>Faça sua pergunta por aqui!</Text>
                        <Text style={styles.textQuestion}>Qual a opção?</Text>
                        <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                            <RadioButton
                                value='numerica'
                                onPress={() => setChecked('numerica')}
                                status={checked === 'numerica' ? 'checked' : 'unchecked'}>
                            </RadioButton>
                            <Text>Númerica</Text>
                        </View>
                        <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                            <RadioButton
                                value='alfabetica'
                                onPress={() => setChecked('alfabetica')}
                                status={checked === 'alfabetica' ? 'checked' : 'unchecked'}>
                            </RadioButton>
                            <Text>Alfabética</Text>
                        </View>
                        <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                            <RadioButton
                                value='dificuldade'
                                onPress={() => setChecked('dificuldade')}
                                status={checked === 'dificuldade' ? 'checked' : 'unchecked'}>
                            </RadioButton>
                            <Text>Níveis de Dificuldade</Text>
                        </View>
                        <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                            <RadioButton
                                value='qualidade'
                                onPress={() => setChecked('qualidade')}
                                status={checked === 'qualidade' ? 'checked' : 'unchecked'}>
                            </RadioButton>
                            <Text>Níveis de Qualidade</Text>
                        </View>
                        <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                            <RadioButton
                                value='"simnao'
                                onPress={() => setChecked('simnao')}
                                status={checked === 'simnao' ? 'checked' : 'unchecked'}>
                            </RadioButton>
                            <Text>Sim ou Não</Text>
                        </View>
                        <Text style={styles.textQuestion}>E a quantidade?</Text>
                        <TextInput style={styles.input} placeholder="2"></TextInput>
                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                            <TouchableHighlight style={[styles.button2, { backgroundColor: 'red', marginRight: 20, }]} onPress={() => setVisible(false)}>
                                <Text style={styles.textButton2}>CANCELAR</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.button2}
                                onPress={() => {
                                    setVisible(false)
                                }}>
                                <Text style={styles.textButton2}>CRIAR</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                <TouchableHighlight style={styles.button} onPress={() => setVisible(true)}>
                    <Text style={styles.textButton}>+</Text>
                </TouchableHighlight>
            </View>
        )
    } else{
        return (
            <View style={styles.container}>
                <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>

            </View>
        )
    }}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignSelf: "flex-end",
        justifyContent: 'center',
        backgroundColor: '#27a0ff',
        width: 54,
        height: 54,
        borderRadius: 60,
        margin: 16,
    },
    textButton: {
        fontWeight: "bold",
        fontSize: 32,
        textAlign: 'center',
        color: '#ffffff',
    },
    button2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 8,
    },
    textButton2: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
    },

    textTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        color: '#696969',
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    title: {
        alignSelf: 'center',
        fontSize: 56,
        fontWeight: '600',
        color: '#27a0ff',
    },
    subTitle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        marginBottom: 36,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#27a0ff',
        borderRadius: 12,
        marginBottom: 20,
        marginLeft: 40,
        textAlign: "center",
        width: Dimensions.get('window').width * 0.4,
    },
    textQuestion: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'sans-serif-light',
        marginVertical: 20,
        paddingLeft: 20,

    }
})