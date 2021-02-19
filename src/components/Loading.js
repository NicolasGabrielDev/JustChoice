import React from 'react'
import Header from './Header'
import { ActivityIndicator, View, StyleSheet, Text, } from 'react-native'

export default function Loading() {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.textTitle}>Carregando...</Text>
            <ActivityIndicator size={64} color='#27a0ff' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        backgroundColor: '#ffffff'
    },
    textTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        color: '#27a0ff',
    },
})