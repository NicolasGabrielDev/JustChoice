import React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native'
import { RadioButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import api from '../services/api'
import { ScrollView } from 'react-native-gesture-handler'

export default function SessionQuestions({ navigation }) {
    const [visible, setVisible] = React.useState(false)
    const [quantidade, setQuantidade] = React.useState(2)
    const [checked, setChecked] = React.useState('numerica')
    const [isLoading, setIsLoading] = React.useState(true)

    const [codigo, setCodigo] = React.useState('')
    const [usuario, setUsuario] = React.useState('')
    const [res, setRes] = React.useState(null)

    async function fetchData() {
        const codigo = await AsyncStorage.getItem('codigo')
        const token = await AsyncStorage.getItem('userToken')

        setCodigo(codigo)

        await api.post('/api/perguntas', {
            codigo
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => {
            const { res, usuario } = response.data
            setUsuario(usuario)
            setRes(res)
        }).catch(error => {
            console.log(error.response)
        })
        setCodigo(codigo)
        setIsLoading(false)

        return async () => {
            AsyncStorage.removeItem('codigo')
        };
    }

    async function criarPergunta() {
        const token = await AsyncStorage.getItem('userToken')

        await api.post('/api/criar-pergunta', {
            "tipo": checked,
            "quantidade": quantidade,
            "sessao_id": res.id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(response => {
            const { res } = response.data
            alert(res)
            fetchData()
            setVisible(false)
        }).catch(error => {
            console.log(error)
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            fetchData()
        }, [])
    );

    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#ffffff'
            }}>
                <ActivityIndicator size={64} color='#27a0ff'>

                </ActivityIndicator>
            </View>
        )
    }

    {
        if (usuario == 'admin') {
            return (
                <View style={styles.container}>
                    <ScrollView>

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
                                <TextInput
                                    style={styles.input}
                                    placeholder="2"
                                    value={quantidade}
                                    keyboardType='number-pad'
                                    onChangeText={quantidade => setQuantidade(quantidade)}
                                ></TextInput>
                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                    <TouchableOpacity style={[styles.button2, { backgroundColor: 'red', marginRight: 20, }]} onPress={() => setVisible(false)}>
                                        <Text style={styles.textButton2}>CANCELAR</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button2}
                                        onPress={() => {
                                            criarPergunta()
                                        }}>
                                        <Text style={styles.textButton2}>CRIAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                        <Text style={styles.textButton}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{
                    flex: 1, justifyContent: 'flex-start', alignItems: 'center',
                    paddingTop: Platform.OS === 'android' ? 25 : 0
                }}>
                    <ScrollView>
                        <Text style={styles.textTitle}>{res.nome}</Text>
                        {res.perguntas.map((pergunta, index) => {
                            return (
                                <View style={{
                                    borderColor: '#27a0ff',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 12,
                                    height: Dimensions.get('screen').height * 0.1,
                                    width: Dimensions.get('screen').width * 0.8,
                                }}>
                                    <Text>Pergunta {index + 1}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
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
    },
})