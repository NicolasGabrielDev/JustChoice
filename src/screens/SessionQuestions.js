import React from 'react'
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, ActivityIndicator, SafeAreaView, Touchable } from 'react-native'
import { RadioButton } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import api from '../services/api'
import RespostaButton from '../components/RespostaButton'
import Styles from '../components/Styles'
import { ScrollView } from 'react-native-gesture-handler'

export default function SessionQuestions({ navigation }) {
    const [visible, setVisible] = React.useState(false)
    const [quantidade, setQuantidade] = React.useState("2")
    const [checked, setChecked] = React.useState('numerica')
    const [isLoading, setIsLoading] = React.useState(true)
    const [activeData, setActiveData] = React.useState({
        id: null,
        tipo: null,
        quantidade: null,
        visible: false,
        index: null,
    })
    const [codigo, setCodigo] = React.useState('')
    const [usuario, setUsuario] = React.useState('')
    const [res, setRes] = React.useState(null)

    const resetData = () => {
        setActiveData({
            id: null,
            tipo: null,
            quantidade: null,
            visible: false,
            index: null,
        })
    }

    const listarOpcoes = () => {
        for (let i = 0; i < 5; i++) {
            return (
                <Text>{i}</Text>
            )
        }
    }

    async function fetchData() {
        setIsLoading(true)
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

    async function responderPergunta() {
        const token = await AsyncStorage.getItem('userToken')

        await api.post('/api/criar-resposta', {
            "resposta": resposta,
            "pergunta_id": activeData.id
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: '#ffffff' }}>
                <ActivityIndicator size={64} color='#27a0ff' />
            </View>
        )
    }

    {
        if (usuario == 'admin') {
            return (
                <View style={Styles.container}>
                    <ScrollView>
                        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
                            <View style={styles.modalContainer}>
                                <Text style={Styles.title}>JustChoice</Text>
                                <Text style={Styles.subTitle}>Rápido e fácil de responder...</Text>
                                <Text style={Styles.subTitle}>Faça sua pergunta por aqui!</Text>
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
                                        onPress={() => {
                                            setChecked('dificuldade')
                                            setQuantidade("5")
                                        }}
                                        status={checked === 'dificuldade' ? 'checked' : 'unchecked'}>
                                    </RadioButton>
                                    <Text>Níveis de Dificuldade</Text>
                                </View>
                                <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                                    <RadioButton
                                        value='qualidade'
                                        onPress={() => {
                                            setChecked('qualidade')
                                            setQuantidade("5")
                                        }}
                                        status={checked === 'qualidade' ? 'checked' : 'unchecked'}>
                                    </RadioButton>
                                    <Text>Níveis de Qualidade</Text>
                                </View>
                                <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                                    <RadioButton
                                        value='"simnao'
                                        onPress={() => {
                                            setChecked('simnao')
                                            setQuantidade("2")
                                        }}
                                        status={checked === 'simnao' ? 'checked' : 'unchecked'}>
                                    </RadioButton>
                                    <Text>Sim ou Não</Text>
                                </View>
                                <Text style={styles.textQuestion}>E a quantidade?</Text>
                                <TextInput
                                    style={Styles.input}
                                    value={quantidade}
                                    editable={((checked === 'dificuldade') ||
                                        (checked === 'qualidade') ||
                                        (checked === 'simnao')) ? false : true}
                                    keyboardType='number-pad'
                                    onChangeText={quantidade => setQuantidade(quantidade)}
                                ></TextInput>
                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                    <TouchableOpacity style={[Styles.button, { backgroundColor: 'red', marginRight: 20, }]} onPress={() => setVisible(false)}>
                                        <Text style={styles.textButton2}>CANCELAR</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={() => {
                                            criarPergunta()
                                        }}>
                                        <Text style={styles.textButton2}>CRIAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                        {res.perguntas.map((pergunta, index) => {
                            return (
                                <TouchableOpacity key={index + 1}>
                                    <View style={styles.perguntaContainer}>
                                        <Text>Pergunta {index + 1}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                    <TouchableOpacity style={styles.buttonPlus} onPress={() => setVisible(true)}>
                        <Text style={styles.textButton}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <ScrollView>
                    <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: 'flex-start', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                        <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                        {res.perguntas.map((pergunta, index) => {
                            return (
                                <View key={index + 1}>
                                    <Modal visible={activeData.visible} onRequestClose={resetData}>
                                        <View style={{
                                            flex: 0.3,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#27a0ff',
                                            elevation: 8,
                                        }}>
                                            <Text style={[Styles.title, { color: '#ffffff' }]}>Pergunta {activeData.index}</Text>
                                            <Text style={[Styles.subTitle, { marginBottom: 0, color: '#ffffff' }]}>Pense bem antes de responder!</Text>
                                        </View>
                                        <View style={styles.modalContainer}>
                                            {function () {
                                                switch (activeData.tipo) {
                                                    case "simnao":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton text="Sim" />
                                                                <RespostaButton text="Não" />
                                                            </View>
                                                        )
                                                        break
                                                    case "qualidade":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton text="Excelente" />
                                                                <RespostaButton text="Bom" />
                                                                <RespostaButton text="Médio" />
                                                                <RespostaButton text="Ruim" />
                                                                <RespostaButton text="Muito ruim" />
                                                            </View>
                                                        )
                                                        break
                                                    case "dificuldade":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton text="Muito difícil" />
                                                                <RespostaButton text="Difícil" />
                                                                <RespostaButton text="Normal" />
                                                                <RespostaButton text="Fácil" />
                                                                <RespostaButton text="Muito fácil" />
                                                            </View>
                                                        )
                                                        break
                                                    case "numerica":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton text="Opção 1" />
                                                                <RespostaButton text="Opção 2" />
                                                                <RespostaButton text="Opção 3" />
                                                                <RespostaButton text="Opção 4" />
                                                                <RespostaButton text="Opção 5" />
                                                            </View>
                                                        )
                                                        break
                                                    case "alfabetica":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton text="Letra A" />
                                                                <RespostaButton text="Letra B" />
                                                                <RespostaButton text="Letra C" />
                                                                <RespostaButton text="Letra D" />
                                                                <RespostaButton text="Letra E" />
                                                            </View>
                                                        )
                                                        break
                                                }
                                            }()}
                                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                                <TouchableOpacity
                                                    style={[Styles.button, { backgroundColor: 'red', marginRight: 20, }]}
                                                    onPress={resetData}>
                                                    <Text style={styles.textButton2}>CANCELAR</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[Styles.button, { backgroundColor: 'green' }]}
                                                    onPress={() => {
                                                        criarPergunta()
                                                    }}>
                                                    <Text style={styles.textButton2}>RESPONDER</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <TouchableOpacity onPress={() => {
                                        setActiveData({
                                            id: pergunta.id,
                                            tipo: pergunta.tipo,
                                            quantidade: pergunta.quantidade,
                                            visible: true,
                                            index: index + 1,
                                        })
                                    }}>
                                        <View style={styles.perguntaContainer}>
                                            <Text>Pergunta {index + 1}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                    </View >
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    buttonPlus: {
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
        alignItems: "center",
        backgroundColor: "white",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    perguntaContainer: {
        borderColor: '#27a0ff',
        borderRadius: 8,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.8,
    },
    textQuestion: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'sans-serif-light',
        marginVertical: 20,
        paddingLeft: 20,
    },
    textResposta: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
    },
    respostaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    textPergunta: {
        color: '#27a0ff',
        fontWeight: 'bold',
        fontSize: 32,
    },
})