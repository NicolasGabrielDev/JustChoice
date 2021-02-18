import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: "#ffffff",
    },
    title: {
        alignSelf: 'center',
        fontSize: 56,
        fontWeight: '600',
        color: '#27a0ff',
    },
    subTitle: {
        alignSelf: 'center',
        fontSize: 18,
        color: '#27a0ff',
        fontFamily: 'sans-serif-light',
        marginBottom: 36,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#27a0ff',
        borderRadius: 12,
        marginBottom: 20,
        marginLeft: 40,
        textAlign: "center",
        width: Dimensions.get('window').width * 0.4,
    },
})