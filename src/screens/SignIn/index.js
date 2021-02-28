import React from 'react'
import { View, TextInput } from 'react-native'
import Header from '../../components/Header'
import { Button, LinkButton } from '../../components/Button'
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
            Login(token)
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <View style={styles.container}>
            <Header />

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
            <Button text="ENTRAR" onPress={handleSignIn} />
            <LinkButton text="Faça seu cadastro!" onPress={() => navigation.navigate("SignUp")} />
            <LinkButton text="Esqueceu a senha?" onPress={() => navigation.navigate("PassReset")} />
        </View>
    )
}