import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'
import { AuthContext } from '../../components/context'
import styles from './styles'

export default function SignIn({navigation}) {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")

    const { Login } = React.useContext(AuthContext)

    function handleSignIn() { // Função responsável pela autenticação do usuário
        api.post('/api/auth/login', {
            email,
            password
        }).then(response => {
            const { token } = response.data
            console.log(response)
            Login(token)
            console.log(token)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>

            <TextInput 
                onChangeText={email => setEmail(email)} 
                placeholder='E-mail' 
                style={styles.input}
                value={email} 
            />
            <TextInput
                onChangeText={password => setPassword(password)}
                placeholder='Senha'
                secureTextEntry={true}
                style={styles.input}
                value={password}
            />

            <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} >
                <Text style={styles.textLink}>Faça seu cadastro!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('PassReset')} >
                <Text style={styles.textLink}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
        </View>
    )
}