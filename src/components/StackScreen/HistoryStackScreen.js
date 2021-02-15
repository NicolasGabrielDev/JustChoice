import React from 'react'
import Icon from 'react-native-vector-icons//FontAwesome'
import { createStackNavigator } from '@react-navigation/stack'
import History from '../../screens/Histórico/index'

const HistoryStack = createStackNavigator()

const HistoryStackScreen = ({ navigation }) => (
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

export default HistoryStackScreen