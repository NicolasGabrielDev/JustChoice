import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

export default function History({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>CRIADAS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>PARTICIPADAS</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}