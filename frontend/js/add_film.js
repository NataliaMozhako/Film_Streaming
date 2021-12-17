const selectMovieGanre = document.querySelector('#movie_ganre');
const selectMovieYear = document.querySelector('#movie_year');

function addGanresToSelect(data) {
    selectMovieGanre.innerHTML = '';
    data.forEach(ganre => {
        const { _id, movie, title,  } = ganre;
        const ganreEl = document.createElement('option');
        ganreEl.classList.add('some-ganre');
        ganreEl.value = _id;
        ganreEl.innerHTML = `${title}`
        selectMovieGanre.appendChild(ganreEl);
    })
}

function getAllGenres(){
    fetch('http://localhost:3000/genres/').then(res => res.json()).then(data => {
        console.log(data)
        addGanresToSelect(data);
    })
}

function addYearsToSelect(data) {
    selectMovieYear.innerHTML = '';
    data.forEach(years => {
        const { _id, movie, year } = years;
        const yearEl = document.createElement('option');
        yearEl.classList.add('some-year');
        yearEl.value = _id;
        yearEl.innerHTML = `${year}`
        selectMovieYear.appendChild(yearEl);
    })
}

function getAllYears(){
    fetch('http://localhost:3000/years/').then(res => res.json()).then(data => {
        console.log(data)
        addYearsToSelect(data);
    })
}

navbarDesign();
getAllYears();
getAllGenres();


function onSubmit(event) {
    event.preventDefault();  
    const title = document.getElementById('movie_title').value;
    const movieLink = document.getElementById('movie_link').value;
    const poster = document.getElementById('movie_poster').value;
    const backdrop = document.getElementById('movie_image').value;
    const rating = +(document.getElementById('movie_rating').value);
    const actors = document.getElementById('movie_actors').value;
    const ageLimitation = +(document.getElementById('movie_age_limitation').value);
    const voteCount = +(document.getElementById('movie_vote_count').value);
    const overview = document.getElementById('movie_overview').value;
    const yearId = selectMovieYear.value;
    const genreId = selectMovieGanre.value;

    const data = {
        poster,
        movieLink,
        title,
        voteCount,
        rating,
        actors,
        ageLimitation,
        overview,
        backdrop,
        yearId,
        genreId
    };

    fetch('http://localhost:3000/movies/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            //'Authorization': 'Bearer ' + this.state.clientToken,
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });  
}