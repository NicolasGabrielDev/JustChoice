import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import Header from '../../components/Header'
import styles from './styles'
export default function Sessoes({navigation}) {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.passText}>Bem vindo!</Text>
            <Text style={styles.passText}>Entre ou crie uma sessão:</Text>

            <TouchableOpacity style={[styles.button, {marginTop: 28}]} onPress={() => navigation.navigate('SessionLogIn')}>
                <Text style={styles.textButton}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SessionCreate')}>
                <Text style={styles.textButton}>CRIAR</Text>
            </TouchableOpacity>
        </View>
    )
}