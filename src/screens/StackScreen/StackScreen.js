import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../SignIn'
import SignUp from '../SignUp'
import PassReset from '../PassReset'

const Stack = createStackNavigator()

const StackScreen = ({ navigation }) => (
    <Stack.Navigator initialRouteName='SignIn' headerMode='none'>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='PassReset' component={PassReset} />
    </Stack.Navigator>
)

export default StackScreen