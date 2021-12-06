const API_KEY = 'api_key=14fd4993a9aad63c9047cbac216ee8d1';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
let original_img_url = "https://image.tmdb.org/t/p/original";
let genres_list_http = BASE_URL + "/genre/movie/list?";
let movie_genres_http = BASE_URL + "/discover/movie?";
let movie_detail_http = BASE_URL + "/movie";