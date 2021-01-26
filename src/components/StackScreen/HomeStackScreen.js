import React from 'react'
import Icon from 'react-native-vector-icons//FontAwesome'
import { createStackNavigator } from '@react-navigation/stack'
import Sessoes from '../../screens/Sessoes'
import SessionCreate from '../../screens/SessionCreate'
import SessionLogIn from '../../screens/SessionLogIn'
import SessionQuestions from '../../screens/SessionQuestions'


export function HomeStackScreen({ navigation }) {
    const HomeStack = createStackNavigator()
    return (
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#27a0ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <HomeStack.Screen name="Home" component={Sessoes} options={{
                title: 'Menu',
                headerLeft: () => (
                    <Icon.Button name="navicon" size={25} backgroundColor="#27a0ff" onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
        </HomeStack.Navigator>
    )
}
export function SessionCreateSC({ navigation }) {
    const SessionCreateStack = createStackNavigator()
    return (
        <SessionCreateStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#27a0ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: "bold",
            }
        }}>
            <SessionCreateStack.Screen name='SessionCreate' component={SessionCreate} options={{
                title: 'Voltar',
                headerLeft: () => (
                    <Icon.Button name='arrow-left' size={20} backgroundColor="#27a0ff" onPress={() => navigation.goBack()}></Icon.Button>
                )
            }} />
        </SessionCreateStack.Navigator>
    )
}

export function SessionLogInSC({ navigation }) {
    const SessionLogInStack = createStackNavigator()
    return (
        <SessionLogInStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#27a0ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: "bold",
            }
        }}>
            <SessionLogInStack.Screen name='SessionLogIn' component={SessionLogIn} options={{
                title: 'Voltar',
                headerLeft: () => (
                    <Icon.Button name='arrow-left' size={20} backgroundColor="#27a0ff" onPress={() => navigation.goBack()}></Icon.Button>
                )
            }} />
        </SessionLogInStack.Navigator>
    )
}

export function SessionQuestionsSC({ navigation }) {
    const SessionQuestionsStack = createStackNavigator()
    return (
        <SessionQuestionsStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#27a0ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: "bold",
            }
        }}>
            <SessionQuestionsStack.Screen name='SessionQuestions' component={SessionQuestions} options={{ headerTitle: ''}}/>
        </SessionQuestionsStack.Navigator>
    )
}

export function HistoryStackScreen({ navigation }) {
    const HistoryStack = createStackNavigator()
    return (
        <HistoryStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#27a0ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }}>
            <HistoryStack.Screen name="History" component={History} options={{
                title: 'Histórico',
                headerLeft: () => (
                    <Icon.Button name="navicon" size={25} backgroundColor="#27a0ff" onPress={() => navigation.openDrawer()}></Icon.Button>
                )
            }} />
        </HistoryStack.Navigator>
    )
}
export default HomeStackScreen