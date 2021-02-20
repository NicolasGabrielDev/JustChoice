import React from 'react'
import { Text, View } from 'react-native';
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import styles from './styles'

export default function Sessoes({ navigation }) {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.passText}>Bem vindo!</Text>
            <Text style={[styles.passText, { marginBottom: 24,}]}>Entre ou crie uma sessão:</Text>
            <Button text="ENTRAR" onPress={() => navigation.navigate("SessionLogIn")} />
            <Button text="CRIAR" onPress={() => navigation.navigate("SessionCreate")} />
        </View>
    )
}