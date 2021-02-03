import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import api from '../services/api'

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
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
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
        textAlign: 'center',
    },
    passText: {
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        textAlign: 'center',
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
        marginTop: 20,
        marginBottom: 12,
    },
    textLink: {
        fontSize: 16,
        textAlign: "center",
        color: '#27a0ff',
    }

})