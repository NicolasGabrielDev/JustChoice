import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import api from '../services/api'

export default function SignUp({navigation}) {
    const [name, setName] = React.useState()
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [password_confirmation, setPassword_Confirmation] = React.useState()

    function handleSignUp() {
        fetch('http://whispering-stream-90983.herokuapp.com/api/auth/registro', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              email,
              password,
              password_confirmation
            })
          }).then(response => {
              const { res } = response.formData
              console.log(res)
              navigation.navigate('SignIn')
          }).catch(error => {
              console.log(error)
          });
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            <TextInput 
                style={styles.input} 
                value={name} 
                placeholder='Nome completo' 
                onChangeText={name => setName(name)}>
            </TextInput>
            <TextInput 
                style={styles.input} 
                value={email} 
                placeholder='E-mail' 
                onChangeText={email => setEmail(email)}>
            </TextInput>
            <TextInput 
                style={styles.input} 
                value={password} 
                placeholder='Senha' 
                onChangeText={password => setPassword(password)}>
            </TextInput>
            <TextInput 
                style={styles.input} 
                value={password_confirmation} 
                placeholder='Confirme a senha' 
                onChangeText={password_confirmation => setPassword_Confirmation(password_confirmation)}>
            </TextInput>
            
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.textButton}>CADASTRE-SE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.textLink}>Faça seu login!</Text>
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