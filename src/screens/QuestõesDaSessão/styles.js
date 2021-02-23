import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#ffffff", 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    buttonPlus: {
        alignSelf: "flex-end",
        justifyContent: 'center',
        backgroundColor: '#27a0ff',
        width: 54,
        height: 54,
        borderRadius: 60,
        margin: 16,
    },
    textButton2: {
        fontFamily: 'sans-serif-light',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    textTitle: {
        fontFamily: 'sans-serif-light',
        fontSize: 24,
        color: '#696969',
        textAlign: "center",
        alignSelf: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    perguntaContainer: {
        borderColor: '#27a0ff',
        borderRadius: 8,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12,
        height: Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width * 0.8,
    },
    textQuestion: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'sans-serif-light',
        marginVertical: 20,
        paddingLeft: 20,
    },
    textResposta: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
    },
    respostaContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    textPergunta: {
        color: '#27a0ff',
        fontWeight: 'bold',
        fontSize: 32,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: 40,
        backgroundColor: '#27a0ff',
        borderRadius: 3,
        marginBottom: 8,
    },
    refreshButton: {
        alignSelf: 'flex-end',
        backgroundColor: "#27a0ff",
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 100,
        margin: 16,
        elevation: 8,
    }
})