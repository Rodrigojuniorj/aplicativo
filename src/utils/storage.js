import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os filmes salvos
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key)

    let moviesSave = JSON.parse(myMovies) || [];
    
    return moviesSave;
}


//Salvar um novo filme
export async function saveMovie(key, newMovie){
    let moviesStored = await getMoviesSave(key);

    //se tiver algum filme salvo com esse mesmo id ou duplicado precisamos ignorar
    const hasMovie = moviesStored.some( item => item.id === newMovie.id);

    if(hasMovie){
        console.log('Esse filme já existe na sua lista');
        return;
    }

    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
    console.log('Filme salvo com sucesso');
}


//Deletar algum filme especifico

export async function deleteMovie(id){
    let moviesStored = await getMoviesSave('@primereact');

    let myMovies = moviesStored.filter( item => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));
    console.log('Filme deletado com sucesso');
    return myMovies;

}


//filtrar algum filme se ja esta salvo na lista
export async function hasMovie(movie){
    let moviesStored = await getMoviesSave('@primereact');

    const hasMovie = moviesStored.find( item => item.id === movie.id);

    if(hasMovie){
        return true;
    }

    return false;

}