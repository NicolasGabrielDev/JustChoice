import React from 'react'
import { View, TextInput } from 'react-native';
import Header from '../../components/Header'
import {Button, LinkButton} from '../../components/Button'
import api from '../../services/api'
import styles from './styles'

export default function SignUp({navigation}) {
    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password_confirmation, setPassword_Confirmation] = React.useState("")

    function handleSignUp() {
        api.post('/api/auth/registro', {
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        }).then(response => {
            const { res } = response.data
            console.log(res)
            navigation.navigate("SignIn")
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <View style={styles.container}>
            <Header />
            <TextInput 
                style={styles.input} 
                value={name} 
                placeholder='Nome de Usuário'
                keyboardType="email-address"
                onChangeText={name => setName(name)} />
            <TextInput 
                style={styles.input} 
                value={email} 
                placeholder='E-mail' 
                onChangeText={email => setEmail(email)} />
            <TextInput 
                style={styles.input} 
                value={password} 
                placeholder='Senha' 
                secureTextEntry={true}
                onChangeText={password => setPassword(password)} />
            <TextInput 
                style={styles.input} 
                value={password_confirmation} 
                placeholder='Confirme a senha' 
                onChangeText={password_confirmation => setPassword_Confirmation(password_confirmation)}
                secureTextEntry={true} />
            
            <Button text="CADASTRE-SE" onPress={handleSignUp} />
            <LinkButton text="Faça seu login!" onPress={() => navigation.navigate("SignIn")} />
        </View>
    )
}