//todo o react começa pela app.js tela principal
import React from "react";
//trabalhar com gestos
import 'react-native-gesture-handler';
//importando para tirar a status bar
import { StatusBar } from 'react-native';


//importando a navegação do react
import { NavigationContainer } from '@react-navigation/native'

//importando as rotas
import Routes from './src/routes'

function App(){
  return(
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Routes />
    </NavigationContainer>
  )
}

export default App;