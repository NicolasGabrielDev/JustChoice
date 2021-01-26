import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer'
import { AuthContext } from './context'
import api from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function DrawerScreen(props) {
    const { Logout } = React.useContext(AuthContext)
    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props} >
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="user"
                            color='#27a0ff'
                            size={size}
                        />
                    )}
                    label="Meu Perfil"

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="folder"
                            color='#27a0ff'
                            size={size}
                        />
                    )}
                    label="Histórico"
                    onPress={() => props.navigation.navigate('History')}

                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="arrow-right"
                            color='#27a0ff'
                            size={size}
                        />
                    )}
                    label="Sessões"
                    onPress={() => props.navigation.navigate('Sessoes')}

                />
            </DrawerContentScrollView>
            {/* <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="gears"
                        color='#27a0ff'
                        size={size}
                    />
                )}
                label="Configurações"
            /> */}
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="sign-out"
                        color='#27a0ff'
                        size={size}
                    />
                )}
                label="Sair"
                onPress={async()  => {
                    try {
                        const token = await AsyncStorage.getItem('userToken')
                        await api.post('/api/auth/logout', null, {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer " + token,
                            },
                            
                        }).then(response => {
                            const { res } = response.data
                            console.log(res)
                        }).catch(error => {
                            console.log(error.response)
                        })
                        Logout()
                    } catch(error) {
                        console.log(error)
                    }
                }}
            />
        </View>
    )
}