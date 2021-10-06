import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";

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
import { getListMovies, randomBanner } from '../../utils/movie';

import { useNavigation } from '@react-navigation/native';


import { Feather } from '@expo/vector-icons';

function Home(){
    //criando a variavel para pegar os dados da api, 
    const [nowMovies, setNowMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [bannerMovie, setBannerMovie] = useState({});
    //quando o sistema abrir peço para carregar usando o useeffect
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        let isActive = true;
        const ac = new AbortController();

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

            if(isActive){
                //utilizando o mudulo util, scrip para pegar apenas um determinado numero de filmes
                const nowList = getListMovies(10, nowData.data.results);
                const popularList = getListMovies(5, popularData.data.results);
                const topList = getListMovies(5, topData.data.results);


                setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)]);
                //colocando nas variaveis de cima dados
                setNowMovies(nowList);
                setPopularMovies(popularList);
                setTopMovies(topList);
                setLoading(false);
            }

        }   

        getMovies();

        return () => {
            isActive = false;
            ac.abort();
        }

    }, [])

    function navigateDatailPage(item){
        navigation.navigate('Detail', { id: item.id })
    }

    if(loading){
        return(
            <Container>
                <ActivityIndicator size="large" color='#FFF' />
            </Container>
        )
    }

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

                <BannerButton activeOpacity={0.9} onPress={ () => navigateDatailPage(bannerMovie)}>
                    <Banner 
                        resizeMethod="resize"
                        source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}` }}
                    />
                </BannerButton>
                <SliderMovie 
                /* puxando no data os filmes e no render enviando os filmes */
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={nowMovies}
                    renderItem={ ({item}) => <SliderItem data={item} navigatePage={ () => navigateDatailPage(item) } /> }  
                    keyExtractor={ (item) => String(item.id) }              
                />

                <Title>Populares</Title>
            
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={popularMovies}
                    renderItem={ ({item}) => <SliderItem data={item}  navigatePage={ () => navigateDatailPage(item) }/> }   
                    keyExtractor={ (item) => String(item.id) }             
                />

                <Title>Mais Votados</Title>
                
                <SliderMovie 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={topMovies}
                    renderItem={ ({item}) => <SliderItem data={item}  navigatePage={ () => navigateDatailPage(item) }/> } 
                    keyExtractor={ (item) => String(item.id) }               
                />

            </ScrollView>

        </Container>
    )
}

export default Home;