import React from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import Styles from '../../components/Styles'
import styles from './styles'
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons'

export default function SessionQuestions({ navigation }) {
    const [visible, setVisible] = React.useState(false)
    const [quantidade, setQuantidade] = React.useState("2")
    const [checked, setChecked] = React.useState('numerica')
    const [isLoading, setIsLoading] = React.useState(true)
    const [activeAnswer, setActiveAnswer] = React.useState("")
    const [numberAnswers, setNumberAnswers] = React.useState([])
    const [activeData, setActiveData] = React.useState({
        id: null,
        tipo: "simnao",
        quantidade: null,
        visible: false,
        index: null,
        respondida: false,
    })
    const [codigo, setCodigo] = React.useState('')
    const [usuario, setUsuario] = React.useState('')
    const [res, setRes] = React.useState(null)
    const respostas = {
        "simnao": [
            { option: "Sim" },
            { option: "Não" }],
        "alfabetica": [
            { option: "Letra A" },
            { option: "Letra B" },
            { option: "Letra C" },
            { option: "Letra D" },
            { option: "Letra E" }],
        "numerica": [
            { option: "Opção 1" },
            { option: "Opção 2" },
            { option: "Opção 3" },
            { option: "Opção 4" },
            { option: "Opção 5" }],
        "qualidade": [
            { option: "Excelente" },
            { option: "Bom" },
            { option: "Médio" },
            { option: "Ruim" },
            { option: "Muito ruim" }],
        "dificuldade": [
            { option: "Muito difícil" },
            { option: "Difícil" },
            { option: "Normal" },
            { option: "Fácil" },
            { option: "Muito fácil" }],
    }

    const resetData = () => {
        setActiveData({
            id: null,
            tipo: "simnao",
            quantidade: null,
            visible: false,
            index: null,
        })
        setActiveAnswer("")
        setNumberAnswers([])
    }

    async function fetchAnswers() {
        const token = await AsyncStorage.getItem('userToken')

        await api.post('/api/respostas', {
            "pergunta_id": activeData.id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(response => {
            const { res } = response.data
            console.log(response.status)
            let respostas = {
                "simnao": { "Sim": 0, "Não": 0 },
                "alfabetica": { "Letra A": 0, "Letra B": 0, "Letra C": 0, "Letra D": 0, "Letra E": 0 },
                "numerica": { "Opção 1": 0, "Opção 2": 0, "Opção 3": 0, "Opção 4": 0, "Opção 5": 0 },
                "qualidade": { "Excelente": 0, "Bom": 0, "Médio": 0, "Ruim": 0, "Muito ruim": 0 },
                "dificuldade": { "Muito difícil": 0, "Difícil": 0, "Normal": 0, "Fácil": 0, "Muito fácil": 0 },
            }
            if (res == "Ninguém respondeu ainda :(") {
                setNumberAnswers(respostas[activeData.tipo])
            } else {
                res.map((resposta) => {
                    respostas[activeData.tipo][resposta.resposta] += 1
                })
                setNumberAnswers(respostas[activeData.tipo])
            }

        }).catch(error => {
            console.log(error)
        })
    }

    async function fetchData() {
        setIsLoading(true)
        const codigo = await AsyncStorage.getItem('codigo')
        const token = await AsyncStorage.getItem('userToken')

        setToken(token)
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
    }

    async function createQuestion() {
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

    async function answerQuestion() {
        const token = await AsyncStorage.getItem('userToken')

        await api.post('/api/criar-resposta', {
            "resposta": activeAnswer,
            "pergunta_id": activeData.id
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        }).then(response => {
            const { res } = response.data
            alert(response)
            resetData()
            fetchData()

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
            <Loading />
        )
    }

    {
        if (usuario == 'admin') {
            return (
                <ScrollView>
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                        <Modal
                            visible={visible}
                            onRequestClose={() => setVisible(false)}>
                            <View style={styles.modalContainer}>
                                <Header />
                                <Text style={Styles.subTitle}>Faça sua pergunta por aqui!</Text>
                                <Text style={styles.textQuestion}>Qual a opção?</Text>
                                <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                                    <RadioButton
                                        value='numerica'
                                        onPress={() => {
                                            setChecked('numerica')
                                            setQuantidade("5")
                                        }}
                                        status={checked === 'numerica' ? 'checked' : 'unchecked'}>
                                    </RadioButton>
                                    <Text>Númerica</Text>
                                </View>
                                <View style={[styles.radioContainer, { paddingLeft: 40 }]}>
                                    <RadioButton
                                        value='alfabetica'
                                        onPress={() => {
                                            setChecked('alfabetica')
                                            setQuantidade("5")
                                        }}
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
                                    editable={false}
                                    keyboardType='number-pad'
                                    onChangeText={quantidade => setQuantidade(quantidade)}
                                ></TextInput>
                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red', marginRight: 20, }]} onPress={() => setVisible(false)}>
                                        <Text style={styles.textButton2}>CANCELAR</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            createQuestion()
                                        }}>
                                        <Text style={styles.textButton2}>CRIAR</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Modal
                            visible={activeData.visible}
                            onRequestClose={() => {
                                resetData()
                                setNumberAnswers([])
                            }}
                            onShow={fetchAnswers}>
                            <View
                                style={{
                                    flex: 0.3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#27a0ff',
                                    elevation: 8
                                }}>
                                <Text style={[Styles.title, { color: '#ffffff' }]}>Pergunta {activeData.index}</Text>
                                <Text style={[Styles.subTitle, { marginBottom: 0, color: '#ffffff' }]}>Confira as respostas :0</Text>
                            </View>
                            <View style={[styles.modalContainer, { alignItems: 'center' }]}>
                                {function () {

                                    let keys = Object.keys(numberAnswers)
                                    let values = Object.values(numberAnswers)
                                    switch (activeData.tipo) {
                                        case "simnao":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>{keys[0]}: {values[0]}</Text>
                                                    <Text style={styles.textTitle}>{keys[1]}: {values[1]}</Text>
                                                </>
                                            )
                                            break
                                        case "numerica":
                                        case "alfabetica":
                                        case "qualidade":
                                        case "dificuldade":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>{keys[0]}: {values[0]}</Text>
                                                    <Text style={styles.textTitle}>{keys[1]}: {values[1]}</Text>
                                                    <Text style={styles.textTitle}>{keys[2]}: {values[2]}</Text>
                                                    <Text style={styles.textTitle}>{keys[3]}: {values[3]}</Text>
                                                    <Text style={styles.textTitle}>{keys[4]}: {values[4]}</Text>
                                                </>
                                            )
                                            break
                                        default:
                                            break

                                    }
                                }()}
                            </View>
                            <TouchableOpacity
                                style={styles.refreshButton}
                                onPress={fetchAnswers}>
                                <Icon name="refresh-outline" size={36} color="#ffffff" />
                            </TouchableOpacity>
                        </Modal>
                        {res.perguntas.map((pergunta, index) => {
                            return (
                                <TouchableOpacity
                                    key={index + 1}
                                    onPress={() =>
                                        setActiveData({
                                            id: pergunta.id,
                                            tipo: pergunta.tipo,
                                            quantidade: pergunta.quantidade,
                                            visible: true,
                                            index: index + 1,
                                        })
                                    }
                                    style={styles.perguntaContainer} >
                                    <Text>Pergunta {index + 1}</Text>
                                </TouchableOpacity>
                            )
                        })}
                        <TouchableOpacity style={styles.buttonPlus} onPress={() => setVisible(true)}>
                            <Text style={styles.textButton2}>+</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
        } else {
            return (
                <ScrollView style={{ flex: 1, }}>
                    <View style={styles.container}>
                        <Text style={styles.textTitle}>Código da Sessão: {codigo}</Text>
                        {res.perguntas.map((pergunta, index) => {
                            return (
                                <View key={index + 1}>
                                    <Modal
                                        visible={activeData.visible}
                                        onRequestClose={resetData}>
                                        <View style={{
                                            flex: 0.3,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#27a0ff',
                                            elevation: 8,
                                        }}>
                                            <Text style={[Styles.title, { color: '#ffffff' }]}>Pergunta {activeData.index}</Text>
                                            <Text style={[Styles.subTitle, { marginBottom: 0, color: '#ffffff' }]}>Pense bem antes de responder :)</Text>
                                        </View>
                                        <View style={styles.modalContainer}>
                                            <View style={styles.respostaContainer}>
                                                {respostas[activeData.tipo].map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            onPress={() => setActiveAnswer(item.option)}
                                                            style={[styles.buttonResposta, activeAnswer == item.option ? { backgroundColor: "#27a0ff" } : { backgroundColor: "#ffffff" }]}>
                                                            <Text style={[styles.textResposta, activeAnswer == item.option ? { color: "#ffffff" } : { color: "#000000" }]}>{item.option}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                                <TouchableOpacity
                                                    style={[styles.button, { backgroundColor: 'red', marginRight: 20 }]}
                                                    onPress={resetData}>
                                                    <Text style={styles.textButton2}>CANCELAR</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={answerQuestion}
                                                    style={[styles.button, { backgroundColor: 'green' }]}>
                                                    <Text style={styles.textButton2}>RESPONDER</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                                    <TouchableOpacity
                                        style={styles.perguntaContainer}
                                        onPress={() => {
                                            setActiveData({
                                                id: pergunta.id,
                                                tipo: pergunta.tipo,
                                                quantidade: pergunta.quantidade,
                                                visible: true,
                                                index: index + 1,
                                            })
                                        }}>
                                        <Text>Pergunta {index + 1}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                        <TouchableOpacity
                            style={styles.refreshButton}
                            onPress={fetchData}>
                            <Icon name="refresh-outline" size={36} color="#ffffff" />
                        </TouchableOpacity>
                    </View >
                </ScrollView>

            )
        }
    }
}