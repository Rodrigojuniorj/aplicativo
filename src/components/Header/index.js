import React from "react";
//importando icones
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { Container, MenuButton, Title } from './style'

function Header({ title }){

    const navigation = useNavigation();

    return(
        <Container>
             <MenuButton onPress={() => navigation.openDrawer() }>
                <Feather name='menu' size={36} color={"#FFF"} />
             </MenuButton>
            <Title>{title}</Title>
        </Container>


    )
}

export default Header;