import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../../screens/SignIn'
import SignUp from '../../screens/SignUp'
import PassReset from '../../screens/PassReset'

const Stack = createStackNavigator()

const StackScreen = ({ navigation }) => (
    <Stack.Navigator initialRouteName='SignIn' headerMode='none'>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='PassReset' component={PassReset} />
    </Stack.Navigator>
)

export default StackScreen