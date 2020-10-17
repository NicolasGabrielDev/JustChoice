import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'

import StackScreen from './screens/StackScreen/StackScreen'
import HomeStackScreen from './screens/StackScreen/HomeStackScreen'
import HistoryStackScreen from './screens/StackScreen/HistoryStackScreen'
import { SessionCreateSC } from './screens/StackScreen/HomeStackScreen'
import { SessionLogInSC } from './screens/StackScreen/HomeStackScreen'
import { DrawerScreen } from './screens/Drawer'


export default function Routes() {
  
  const Drawer = createDrawerNavigator()

  const [userToken, setUserToken] = React.useState('null')

  return (
    <NavigationContainer>
      {userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerScreen {...props} />}>
          <Drawer.Screen  name='Sessoes' component={HomeStackScreen}></Drawer.Screen>
          <Drawer.Screen  name='History' component={HistoryStackScreen}></Drawer.Screen>
          <Drawer.Screen  name='SessionCreate' component={SessionCreateSC}></Drawer.Screen>
          <Drawer.Screen  name='SessionLogIn' component={SessionLogInSC}></Drawer.Screen>
        </Drawer.Navigator>
      ) : (
          <StackScreen />
        )}
    </NavigationContainer>
  )
}


