import { SEARCH,ADD,REMOVE,REGISTER,GET_LIST, GET_MOVIE } from "../action-types";

export function searchMoveis(movies) {
    return {
      type: SEARCH,
      payload: {
        movies: movies,
      },
    };
  }
  
  export function fetchMovies(name) {
    return function (dispatch) {
      const api = "5599a6da";
      
      fetch(`http://www.omdbapi.com/?s=${name}&apikey=${api}`)
        .then((res) => res.json())
        .then((data) => {
          if(data.Search!==undefined){
            dispatch(searchMoveis(data.Search));
          }
          
        })
        .catch((error)=> console.log(error)) ;
    };
  }
  
  export function addFavList(id) {
    return {
      type: ADD,
      payload: {
        id: id,
      },
    };
  }
  
  export function removeMovieFromFavoriteList(id) {
    return {
      type: REMOVE,
      payload: {
        id: id,
      },
    };
  }
  
  export function registerFavoriteList(listID) {
    return {
      type: REGISTER,
      payload: {
        listID: listID,
      },
    };
  }
  
  export function postList(title, favoritesIDArray) {
    return function (dispatch) {
      let savedList = {
        title: title,
        movies: favoritesIDArray,
      };
      fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(savedList),
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(registerFavoriteList(data.id));
        })
        .catch((error)=> console.log('Error occurred'));
        
    };
  }
  
  export function getListIntoState(title, movies) {
    return {
      type: GET_LIST,
      payload: {
        title: title,
        listMovies: movies,
      },
    };
  }
  
  export function getList(id) {
    return function (dispatch) {
      fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(getListIntoState(data.title, data.movies));
          dispatch(getMovieInfoByImdbID(data.movies));
        })
        .catch((error)=> console.log('Error occurred'));
    };
  }
  export function getMovieInfoToState(movieDetails) {
    return {
      type: GET_MOVIE,
      payload: {
        movieDetails: movieDetails,
      },
    };
  }
  export function getMovieInfoByImdbID(movies) {
    return function (dispatch) {
      let movieDetailsArray = [];
      movies.forEach((e) => {
        fetch(`http://www.omdbapi.com/?i=${e}&apikey=5599a6da`)
          .then((res) => res.json())
          .then((data) => {
            movieDetailsArray = [...movieDetailsArray, { ...data }];
            dispatch(getMovieInfoToState(movieDetailsArray));
          })
          .catch((error)=> console.log('Error occurred'));
      });
    };
  }
  