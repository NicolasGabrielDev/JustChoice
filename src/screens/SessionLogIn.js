import React from 'react'
import {Dimensions, StyleSheet, Text,TextInput, TouchableHighlight, View } from 'react-native'

export default function SessionLogIn({navigation}) {
    const [codigo, setCodigo] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    {if(isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems:'center'}}>
                <ActivityIndicator color='#27a0ff' size='large'>
                </ActivityIndicator>
            </View>
        )
    }}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
            
            <Text style={styles.subTitle}>Código da sessão:</Text>
            <TextInput 
                style={styles.input}
                placeholder='Digite aqui seu código!'
                onChangeText={codigo => setCodigo(codigo)}
            ></TextInput>

            <TouchableHighlight style={styles.button}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
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
    textButton: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
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
})