import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'

import StackScreen from './screens/StackScreen/StackScreen'
import HomeStackScreen from './screens/StackScreen/HomeStackScreen'
import HistoryStackScreen from './screens/StackScreen/HistoryStackScreen'
import { SessionCreateSC } from './screens/StackScreen/HomeStackScreen'
import { SessionLogInSC } from './screens/StackScreen/HomeStackScreen'
import { SessionQuestionsSC } from './screens/StackScreen/HomeStackScreen'
import { DrawerScreen } from './screens/Drawer'


export default function Routes() {
  const Drawer = createDrawerNavigator()

  React.useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token')
      } catch (error) {
        console.log(error)
      }
    }
  })

  const [token, setToken] = React.useState(null)

  return (
    <NavigationContainer>
      {token !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
          <Drawer.Screen name='Sessoes' component={HomeStackScreen}></Drawer.Screen>
          <Drawer.Screen name='History' component={HistoryStackScreen}></Drawer.Screen>
          <Drawer.Screen name='SessionCreate' component={SessionCreateSC}></Drawer.Screen>
          <Drawer.Screen name='SessionLogIn' component={SessionLogInSC}></Drawer.Screen>
          <Drawer.Screen name='SessionQuestions' component={SessionQuestionsSC}></Drawer.Screen>
        </Drawer.Navigator>
      ) : (
          <StackScreen />
        )}
    </NavigationContainer>
  )
}


