import React from 'react'
import { View, Text, StyleSheet,  } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer'

export function DrawerScreen(props) {
    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props} >
                <View style={styles.perfilView}>
                    <Icon color='white' size={48} name='user' />
                    <View style={styles.textView}>
                        <Text style={styles.perfilText}>Nicolas Gabriel</Text>
                        <Text style={styles.perfilText}>emailteste@hotmail.com</Text>
                    </View>
                </View>
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
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="gears"
                        color='#27a0ff'
                        size={size}
                    />
                )}
                label="Configurações"
            />
            <DrawerItem
                icon={({ color, size }) => (
                    <Icon
                        name="sign-out"
                        color='#27a0ff'
                        size={size}
                    />
                )}
                label="Sair"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    perfilView: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#27a0ff',
    },
    perfilText: {
        fontSize: 16,
        fontFamily: 'sans-serif-light',
        color: 'white'
    },
    textView: {
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 12,
        textAlign: 'left',
    }
})