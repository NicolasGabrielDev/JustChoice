import React from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import api from '../../services/api'
import styles from './styles'
import Header from '../../components/Header'

export default function SignIn({navigation}) {

    const [email, setEmail] = React.useState('')

    function handlePassReset(){
        api.post('password/reset', {email})
        .then(response => {
            console.warn('Deu certo desgraça')
        })
        .catch(error =>{
            console.warn(error)
        })
    }

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.passText}>Esqueceu a senha?</Text>
            <Text style={styles.passText}>Insira o e-mail vinculado à conta:</Text>

            <TextInput 
                style={styles.input} 
                value={email} 
                onChangeText={email => setEmail(email)} 
                placeholder='E-mail' 
            />

            <TouchableOpacity onPress={handlePassReset} style={styles.button}>
                <Text style={styles.textButton}>ENVIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')} >
                <Text style={styles.textLink}>Lembrou a senha? Faça seu login!</Text>
            </TouchableOpacity>
        </View>
    )
}