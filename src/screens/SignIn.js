import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../services/api'
import { AuthContext } from '../components/context'

export default function SignIn({navigation}) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const { Login } = React.useContext(AuthContext)

    function handleSignIn() {
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
                style={styles.input} 
                value={email} 
                onChangeText={email => setEmail(email)} 
                placeholder='E-mail' 
            />
            <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                onChangeText={password => setPassword(password)}
                placeholder='Senha'
            />

            <TouchableHighlight onPress={handleSignIn} style={styles.button}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('SignUp')} >
                <Text style={styles.textLink}>Faça seu cadastro!</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('PassReset')} >
                <Text style={styles.textLink}>Esqueceu sua senha?</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 24,
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
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 24,
    },
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
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
    textLink: {
        fontSize: 16,
        textAlign: "center",
        color: '#27a0ff',
    }

})