import axios from "axios";

//URL filmes em cartaz
// https://api.themoviedb.org/3/

// movie/now_playing &language=pt-BR&page=1

export const key = 'c5f57105dc544cfa3242cdee04982492'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})


export default api;