import React from 'react'
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import RespostaButton from '../../components/RespostaButton'
import Styles from '../../components/Styles'
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler'
import Loading from '../../components/Loading';
import Header from '../../components/Header';

export default function SessionQuestions({ navigation }) {
    const [visible, setVisible] = React.useState(false)
    const [quantidade, setQuantidade] = React.useState("2")
    const [checked, setChecked] = React.useState('numerica')
    const [isLoading, setIsLoading] = React.useState(true)
    const [activeAnswer, setActiveAnswer] = React.useState("")
    const [numberAnswers, setNumberAnswers] = React.useState([])
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
            switch (activeData.tipo) {
                case "simnao":
                    let simnao = { "Sim": 0, "Não": 0 }
                    {
                        res.map((resposta) => {
                            simnao[resposta.resposta] = simnao[resposta.resposta] + 1
                        })
                    }
                    setNumberAnswers(simnao)
                    setActiveData(activeData.visible(true))
                    break;
                case "qualidade":
                    let qualidade = { "Excelente": 0, "Bom": 0, "Médio": 0, "Ruim": 0, "Muito ruim": 0 }
                    {
                        res.map((resposta) => {
                            qualidade[resposta.resposta] = qualidade[resposta.resposta] + 1
                        })
                    }
                    setNumberAnswers(qualidade)
                    setActiveData(activeData.visible(true))
                    break;
                case "dificuldade":
                    let dificuldade = { "Muito difícil": 0, "Difícil": 0, "Normal": 0, "Fácil": 0, "Muito fácil": 0 }
                    {
                        res.map((resposta) => {
                            dificuldade[resposta.resposta] = dificuldade[resposta.resposta] + 1
                        })
                    }
                    setNumberAnswers(dificuldade)
                    setActiveData(activeData.visible(true))
                    break;
                case "numerica":
                    let numerica = { "Opção 1": 0, "Opção 2": 0, "Opção 3": 0, "Opção 4": 0, "Opção 5": 0 }
                    {
                        res.map((resposta) => {
                            numerica[resposta.resposta] = numerica[resposta.resposta] + 1
                        })
                    }
                    setNumberAnswers(numerica)
                    setActiveData(activeData.visible(true))
                    break;
                case "alfabetica":
                    let alfabetica = { "Opção A": 0, "Opção B": 0, "Opção C": 0, "Opção D": 0, "Opção E": 0 }
                    {
                        res.map((resposta) => {
                            alfabetica[resposta.resposta] = alfabetica[resposta.resposta] + 1
                        })
                    }
                    setNumberAnswers(alfabetica)
                    setActiveData(activeData.visible(true))
                    break;
                default:
                    break;
            }
        }).catch(error => {
            console.log(error)
        })
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

    async function createQuestion() {
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
            alert(res)
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
                <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: 'flex-start', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                    <Text style={styles.textTitle}>Código da Sessão: {codigo} </Text>
                    <ScrollView>
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
                            <View style={[styles.modalContainer, { alignItems: 'center'}]}>
                                {function () {
                                    switch (activeData.tipo) {
                                        case "simnao":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>Sim: {numberAnswers["Sim"]}</Text>
                                                    <Text style={styles.textTitle}>Não: {numberAnswers["Não"]}</Text>
                                                </>
                                            )
                                            break
                                        case "qualidade":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>Excelente: {numberAnswers["Excelente"]}</Text>
                                                    <Text style={styles.textTitle}>Bom: {numberAnswers["Bom"]}</Text>
                                                    <Text style={styles.textTitle}>Médio: {numberAnswers["Médio"]}</Text>
                                                    <Text style={styles.textTitle}>Ruim: {numberAnswers["Ruim"]}</Text>
                                                    <Text style={styles.textTitle}>Muito ruim: {numberAnswers["Muito ruim"]}</Text>
                                                </>
                                            )
                                            break
                                        case "dificuldade":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>Muito difícil: {numberAnswers["Muito difícil"]}</Text>
                                                    <Text style={styles.textTitle}>Difícil: {numberAnswers["Difícil"]}</Text>
                                                    <Text style={styles.textTitle}>Normal: {numberAnswers["Normal"]}</Text>
                                                    <Text style={styles.textTitle}>Fácil: {numberAnswers["Fácil"]}</Text>
                                                    <Text style={styles.textTitle}>Muito fácil: {numberAnswers["Muito fácil"]}</Text>
                                                </>
                                            )
                                            break
                                        case "numerica":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>Opção 1: {numberAnswers["Opção 1"]}</Text>
                                                    <Text style={styles.textTitle}>Opção 2: {numberAnswers["Opção 2"]}</Text>
                                                    <Text style={styles.textTitle}>Opção 3: {numberAnswers["Opção 3"]}</Text>
                                                    <Text style={styles.textTitle}>Opção 4: {numberAnswers["Opção 4"]}</Text>
                                                    <Text style={styles.textTitle}>Opção 5: {numberAnswers["Opção 5"]}</Text>
                                                </>
                                            )
                                            break
                                        case "simnao":
                                            return (
                                                <>
                                                    <Text style={styles.textTitle}>Opção A: {numberAnswers["Opção A"]}</Text>
                                                    <Text style={styles.textTitle}>Opção B: {numberAnswers["Opção B"]}</Text>
                                                    <Text style={styles.textTitle}>Opção C: {numberAnswers["Opção C"]}</Text>
                                                    <Text style={styles.textTitle}>Opção D: {numberAnswers["Opção D"]}</Text>
                                                    <Text style={styles.textTitle}>Opção E: {numberAnswers["Opção E"]}</Text>
                                                </>
                                            )
                                            break
                                        default:
                                            break
                                    }
                                }()}
                            </View>
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
                    </ScrollView>
                    <TouchableOpacity style={styles.buttonPlus} onPress={() => setVisible(true)}>
                        <Text style={styles.textButton2}>+</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: "#ffffff", justifyContent: 'flex-start', alignItems: 'center', paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
                    <Text style={styles.textTitle}>Código da Sessão: {codigo}</Text>
                    <ScrollView>
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
                                            {function () {
                                                switch (activeData.tipo) {
                                                    case "simnao":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton
                                                                    onPress={() => setActiveAnswer("Sim")}
                                                                    activeAnswer={activeAnswer}
                                                                    text="Sim" />
                                                                <RespostaButton
                                                                    onPress={() => setActiveAnswer("Não")}
                                                                    activeAnswer={activeAnswer}
                                                                    text="Não" />
                                                            </View>
                                                        )
                                                        break
                                                    case "qualidade":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Excelente")}
                                                                    text="Excelente" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Bom")}
                                                                    text="Bom" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Médio")}
                                                                    text="Médio" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Ruim")}
                                                                    text="Ruim" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Muito ruim")}
                                                                    text="Muito ruim" />
                                                            </View>
                                                        )
                                                        break
                                                    case "dificuldade":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Muito difícil")}
                                                                    text="Muito difícil" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Difícil")}
                                                                    text="Difícil" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Normal")}
                                                                    text="Normal" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Fácil")}
                                                                    text="Fácil" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Muito fácil")}
                                                                    text="Muito fácil" />
                                                            </View>
                                                        )
                                                        break
                                                    case "numerica":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Opção 1")}
                                                                    text="Opção 1" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Opção 2")}
                                                                    text="Opção 2" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Opção 3")}
                                                                    text="Opção 3" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Opção 4")}
                                                                    text="Opção 4" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Opção 5")}
                                                                    text="Opção 5" />
                                                            </View>
                                                        )
                                                        break
                                                    case "alfabetica":
                                                        return (
                                                            <View style={styles.respostaContainer}>
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Letra A")}
                                                                    text="Letra A" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Letra B")}
                                                                    text="Letra B" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Letra C")}
                                                                    text="Letra C" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Letra D")}
                                                                    text="Letra D" />
                                                                <RespostaButton
                                                                    activeAnswer={activeAnswer}
                                                                    onPress={() => setActiveAnswer("Letra E")}
                                                                    text="Letra E" />
                                                            </View>
                                                        )
                                                        break
                                                }
                                            }()}
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
                                    <TouchableOpacity style={styles.perguntaContainer} onPress={() => {
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
                    </ScrollView>
                </View >
            )
        }
    }
}