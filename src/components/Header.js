import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'

export default function Header() {
    const [loaded] = useFonts({
        NunitoLight: require("../../assets/fonts/Nunito-Light.ttf")
    })

    if (!loaded) {
        return null;
    }

    return (
        <>
            <Text style={styles.title}>JustChoice</Text>
            <Text style={styles.subTitle}>Rápido e fácil de responder...</Text>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'NunitoLight',
        alignSelf: 'center',
        fontSize: 56,
        fontWeight: '600',
        textAlign: 'center',
        color: '#27a0ff',
    },
    subTitle: {
        fontFamily: 'NunitoLight',
        alignSelf: 'center',
        fontSize: 18,
        marginBottom: 36,
        color: '#27a0ff',
    },
})

