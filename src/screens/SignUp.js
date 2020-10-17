import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Dimensions } from 'react-native';

export default function SignUp({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            <TextInput style={styles.input} placeholder='Nome completo'></TextInput>
            <TextInput style={styles.input} placeholder='E-mail'></TextInput>
            <TextInput style={styles.input} placeholder='Senha'></TextInput>
            <TextInput style={styles.input} placeholder='Confirme a senha'></TextInput>
            <TouchableHighlight style={styles.button}>
                <Text style={styles.textButton}>CADASTRE-SE</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.textLink}>Faça seu login!</Text>
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