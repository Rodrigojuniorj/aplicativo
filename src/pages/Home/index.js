import React from "react";
import { ScrollView } from "react-native";

//acessando estilos criados
import { Container,
         SearchButton, 
         SearchContainer, 
         Input, 
         Title, 
         BannerButton, 
         Banner,
         SliderMovie, 
} from './style'
//acesando components
import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import { Feather } from '@expo/vector-icons';

function Home(){
    return(
        <Container>
            <Header title="React Prime"/>

            <SearchContainer>
                <Input 
                    placeholder="Ex: Vingadores"
                    placeholderTextColor="#ddd"
                />
                <SearchButton>
                    <Feather name='search' size={30} color='#FFF' />
                </SearchButton>
            </SearchContainer>

            <ScrollView showsVerticalScrollIndicator={false}> 
                <Title>Em Cartaz</Title>

                <BannerButton activeOpacity={0.9} onPress={ () => alert('teste')}>
                    <Banner 
                        resizeMethod="resize"
                        source={{ uri: 'https://images.unsplash.com/photo-1618249608049-bce3784b6a4b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80' }}
                    />
                </BannerButton>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1, 2, 3, 4]}
                    renderItem={ ({item}) => <SliderItem/> }                
                />

                <Title>Populares</Title>

                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1, 2, 3, 4]}
                    renderItem={ ({item}) => <SliderItem/> }                
                />

                <Title>Mais Votados</Title>
                
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[1, 2, 3, 4]}
                    renderItem={ ({item}) => <SliderItem/> }                
                />

            </ScrollView>

        </Container>
    )
}

export default Home;