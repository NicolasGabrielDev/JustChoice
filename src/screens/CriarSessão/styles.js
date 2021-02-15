import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
export default StyleSheet.create({
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})