import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../../screens/SignIn/index'
import SignUp from '../../screens/SignUp/index'
import PassReset from '../../screens/ResetarSenha/index'

const Stack = createStackNavigator()

const StackScreen = ({ navigation }) => (
    <Stack.Navigator initialRouteName='SignIn' headerMode='none'>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='PassReset' component={PassReset} />
    </Stack.Navigator>
)

export default StackScreen