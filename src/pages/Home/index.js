import React, { useState, useEffect } from "react";
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
import api, { key } from "../../services/api";
import { getListMovies } from '../../utils/movie';


import { Feather } from '@expo/vector-icons';

function Home(){
    //criando a variavel para pegar os dados da api, 
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    //quando o sistema abrir peço para carregar usando o useeffect
    useEffect(() => {
        let isActive = true;

        async function getMovies(){
            //pegando as rotas da api, popular, mais tops e os de agora, é so passar a rota
            const [nowData, popularData, topData] = await Promise.all([
                api.get('/movie/now_playing',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/popular',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
                api.get('/movie/top_rated',{
                    params:{
                        api_key: key,
                        language: 'pt-BR',
                        page: 1,
                    }
                }),
            ])
            //utilizando o mudulo util, scrip para pegar apenas um determinado numero de filmes
            const nowList = getListMovies(10, nowData.data.results);
            const popularList = getListMovies(5, popularData.data.results);
            const topList = getListMovies(5, topData.data.results);
            //colocando nas variaveis de cima dados
            setNowMovies(nowList);
            setPopularMovies(popularList);
            setTopMovies(topList);
            
        }   

        getMovies();
    }, [])

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
                /* puxando no data os filmes e no render enviando os filmes */
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({item}) => <SliderItem data={item}  /> }  
                    keyExtractor={ (item) => String(item.id) }              
                />

                <Title>Populares</Title>
            
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={ ({item}) => <SliderItem data={item}/> }   
                    keyExtractor={ (item) => String(item.id) }             
                />

                <Title>Mais Votados</Title>
                
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={ ({item}) => <SliderItem data={item}/> } 
                    keyExtractor={ (item) => String(item.id) }               
                />

            </ScrollView>

        </Container>
    )
}

export default Home;