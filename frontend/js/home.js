const main = document.getElementById('main');
const form = document.getElementById('form');
const searchBar = document.getElementById('searchBar');
const tagsEl = document.getElementById('tags');
const yeartagsEl = document.getElementById('yeartags');
let noGanreResults = document.querySelector('.no-ganre-results');

let tagTitle;
let allTagFilms;
let tagYearTitle;
let movieData = [];

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;


function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        movieData = data;
        if (data.length !== 0) {
            showMovies(data);
            currentPage = 1;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = parseInt(data.length / 20) + 1;

            current.innerText = currentPage;

            if (currentPage <= 1 && totalPages > 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled')
            } else if (currentPage >= totalPages && totalPages > 1) {
                prev.classList.remove('disabled');
                next.classList.add('disabled')
            } else if (totalPages == 1) {
                prev.classList.add('disabled');
                next.classList.add('disabled')
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
            }

            tagsEl.scrollIntoView({ behavior: 'smooth' })
        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }
    })
}

function showMovies(data) {
    main.innerHTML = '';
    main.innerHTML += '<h1 class="no-ganre-results">No Results Found</h1>';
    for(i=0; i<data.length; i++){
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.classList.add(data[i].genre);
        movieEl.classList.add('all_genre');
        movieEl.classList.add(data[i].year);
        movieEl.classList.add('all_years');
        movieEl.innerHTML = `<img src="${data[i].poster ? IMG_URL + data[i].poster : "http://via.placeholder.com/1080x1580"}" alt="${data[i].title}">
        <div class="movie-info">
            <h3>${data[i].title}</h3>
            <span class="${getColor(data[i].description.rating)}">${data[i].description.rating}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${data[i].description.overview}
            <br/>
            <input class="film_descr-link" value="Know More" type="button" onclick="goToLink('film.html?_id=${data[i]._id}')" />
            <br/>
            <input class="delete-movie" value="Delete Movie" type="button" onclick="deleteMovie('${data[i]._id}')" />
        </div>
         `
        main.appendChild(movieEl);
    }

    let addFilm = document.querySelector('#add_film');
    let usersList = document.querySelector('#users_list');
    let deleteMovie = document.querySelectorAll('.delete-movie');
    console.log(deleteMovie);

    if(getUserData() != null){
        if(getUserData().role == "61aa0e14a058b667e986e6e2"){
            addFilm.style.display = "flex";
            usersList.style.display = "flex";
            for(i=0; i<data.length; i++){
                deleteMovie[i].style.display = "block";
            }
            
        } else {
            addFilm.style.display = "none";
            usersList.style.display = "none";
            for(i=0; i<data.length; i++){
                deleteMovie[i].style.display = "none";
            }
        }
    }    

    allTagFilms = document.querySelectorAll('.movie');
    console.log(tagTitle);
    console.log(tagYearTitle);
    console.log(allTagFilms);
 
    for(i=0; i<tagTitle.length; i++){
        tagTitle[i].addEventListener('click',
        filterFilms.bind(this, tagTitle[i]));
    }

    for(i=0; i<tagYearTitle.length; i++){
        tagYearTitle[i].addEventListener('click',
        filterFilmsYear.bind(this, tagYearTitle[i]));
    }

}

function getMoviesGenres(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        setGenre(data);
    })
}

function setGenre(data) {
    for(i=0; i<data.length; i++){
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id = data[i]._id;
        t.innerText = data[i].title;
        tagsEl.append(t);
    }

    tagTitle = document.querySelectorAll('.tag');
}

function filterFilms(item){
    changeActiveYearPosition(tagYearTitle[0]);
    changeActivePosition(item);
    let is_display = 0;
    for(i=0; i<allTagFilms.length; i++){
        if(allTagFilms[i].classList.contains(item.attributes.id.value)){
            allTagFilms[i].style.display = "block";
            noGanreResults = document.querySelector('.no-ganre-results');
            noGanreResults.style.display = "none";
            is_display++;
        } else {
            allTagFilms[i].style.display = "none";
        }
    }

    if(is_display == 0){
        noGanreResults = document.querySelector('.no-ganre-results');
        noGanreResults.style.display = "block";
    } 
}
    
function changeActivePosition(activeItem){
    for(i=0; i<tagTitle.length; i++){
        tagTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
}

function getMoviesYears(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        setYear(data);
    })
}

function setYear(data) {
    for(i=0; i<data.length; i++){
        const ty = document.createElement('div');
        ty.classList.add('tagYear');
        ty.id = data[i]._id;
        ty.innerText = data[i].year;
        yeartagsEl.append(ty);
    }

    tagYearTitle = document.querySelectorAll('.tagYear');
}

function filterFilmsYear(item){
    changeActivePosition(tagTitle[0]);
    changeActiveYearPosition(item);
    let is_display = 0;
    for(i=0; i<allTagFilms.length; i++){
        if(allTagFilms[i].classList.contains(item.attributes.id.value)){
            allTagFilms[i].style.display = "block";
            noGanreResults = document.querySelector('.no-ganre-results');
            noGanreResults.style.display = "none";
            is_display++;
        } else {
            allTagFilms[i].style.display = "none";
        }
    }

    if(is_display == 0){
        noGanreResults = document.querySelector('.no-ganre-results');
        noGanreResults.style.display = "block";
    } 
}
    
function changeActiveYearPosition(activeItem){
    for(i=0; i<tagYearTitle.length; i++){
        tagYearTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
}

window.onload = async () => {
    navbarDesign();
    getMovies('http://localhost:3000/movies');
    getMoviesGenres('http://localhost:3000/genres/');
    getMoviesYears('http://localhost:3000/years/');
}


searchBar.addEventListener('keyup', (e) => {
    e.preventDefault();
    changeActiveYearPosition(tagYearTitle[0]);
    changeActivePosition(tagTitle[0]);
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredMovies = movieData.filter((movie) => {
        return (
            movie.title.toLowerCase().includes(searchString)
        );
    });
    console.log(filteredMovies);
    
    if (searchString) {
        if(filteredMovies.length !== 0){
            showMovies(filteredMovies);
        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
        }
    } else {
        showMovies(movieData);
    }
});

function deleteMovie(movieId){
    console.log(movieId);
    fetch('http://localhost:3000/movies/' + movieId, {
        method: 'DELETE',})
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

// function pageCall(page) {
//     let urlSplit = lastUrl.split('?');
//     let queryParams = urlSplit[1].split('&');
//     let key = queryParams[queryParams.length - 1].split('=');
//     if (key[0] != 'page') {
//         let url = lastUrl + '&page=' + page
//         getMovies(url);
//     } else {
//         key[1] = page.toString();
//         let a = key.join('=');
//         queryParams[queryParams.length - 1] = a;
//         let b = queryParams.join('&');
//         let url = urlSplit[0] + '?' + b
//         getMovies(url);
//     }
// }