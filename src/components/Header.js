import React from 'react'
import { Text } from 'react-native'
import Styles from './Styles'

export default function Header() {
    return (
        <>
            <Text style={Styles.title}>JustChoice</Text>
            <Text style={Styles.subTitle}>Rápido e fácil de responder...</Text>
        </>
    )
}