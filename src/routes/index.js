import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Movies from '../pages/Movies';
import StackRoutes from './StackRoutes';

const Drawer = createDrawerNavigator();

function Routes(){
    return(
        //importando menu de navegação drawer
        //Drawer.Screen serve para indicar a tela que ira ser chamada
        // name (nome que quero para ela) componente (componente importado)
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                
                drawerStyle:{
                    backgroundColor: '#111212',
                    paddingTop: 20,
                },

                drawerActiveBackgroundColor: '#E72F49',
                drawerActiveTintColor: '#FFF',
                drawerInactiveTintColor: '#b0b0b0'
            }}
        >
            <Drawer.Screen
                name="HomeDrawer" 
                component={StackRoutes} 
                options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons 
                            // condicao (? significa se for verdadeira, : significa se for falsa)
                            name={focused ? 'movie-open' : 'movie-outline'}
                            size={size}
                            color={color} 
                        />
                    )
                }}
            />
            <Drawer.Screen 
                name="Movies" 
                component={Movies} 
                options={{
                    title: "Meus Filmes",
                    drawerIcon: ({ focused, size, color }) => (
                        <MaterialCommunityIcons 
                            // condicao (? significa se for verdadeira, : significa se for falsa)
                            name={focused ? 'archive' : 'archive-outline'}
                            size={size}
                            color={color} 
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

export default Routes;