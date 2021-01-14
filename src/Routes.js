import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from './components/context'

import StackScreen from './screens/StackScreen/StackScreen'
import HomeStackScreen from './screens/StackScreen/HomeStackScreen'
import HistoryStackScreen from './screens/StackScreen/HistoryStackScreen'
import { SessionCreateSC } from './screens/StackScreen/HomeStackScreen'
import { SessionLogInSC } from './screens/StackScreen/HomeStackScreen'
import { SessionQuestionsSC } from './screens/StackScreen/HomeStackScreen'
import { DrawerScreen } from './screens/Drawer'


export default function Routes() {
  const Drawer = createDrawerNavigator()

  const initialLoginState = {
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userToken: action.token,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userToken: null,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    Login: async (userToken) => {
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: userToken });
    },
    Logout: async () => {
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'LOGOUT' });
    },
  }), []);

  React.useEffect(() => {
    setTimeout(async () => {
      let userToken
      userToken = null

      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
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
    </AuthContext.Provider>
  )
}


