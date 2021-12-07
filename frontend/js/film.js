let api_key = "14fd4993a9aad63c9047cbac216ee8d1";
let params;
const allcomments = document.querySelector('.old-comment');

let currentFilm;

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    const cast = document.querySelector('.starring');
    let trailerContainer = document.querySelector('.trailer-container');

    title.innerHTML = movieName.innerHTML = data.title;
    genres.innerHTML = data.year.year + '  |  ';
    genres.innerHTML += data.genre.title;
    genres.innerHTML += '  |  +' + data.description.ageLimitation;

    if (data.description.backdrop == null) {
        data.description.backdrop = data.poster;
    }

    des.innerHTML = data.description.overview.substring(0, 200) + '...';
    backdrop.style.backgroundImage = `url(${original_img_url}${data.description.backdrop})`;

    cast.innerHTML += data.description.actors;

    trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.movieLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;

    if (data.comment.length !== 0) {
        showComments(data);
    } else {
        allcomments.innerHTML = `<h1 class="no-results">The film has no comments yet. Write your comment first!</h1>`
    } 
}

function showComments(data) {
    allcomments.innerHTML = '';
    for(i=0; i<data.comment.length; i++){
        const commentEl = document.createElement('div');
        commentEl.classList.add('some-comment');
        commentEl.id = data.comment[i]._id;
        commentEl.innerHTML = `
            <p class="username"><span>Username:</span>${data.comment[i].username}</p>
            <p class="comment-descr">${data.comment[i].content}</p>
            <p class="comment-date">${data.comment[i].date}</p>          
          `
        allcomments.appendChild(commentEl);
    } 
}

window.onload = async () => {
    try {
        navbarDesign();
        params = (new URL(document.location)).searchParams;
        console.log(params.get('_id'));
        if (!params.has('_id')) {
            throw new Error('Movie id doesn`t provided');
        };
        const response = await fetch('http://localhost:3000/movies/' + params.get('_id'));
        const data = await response.json();
        currentFilm = data;
        console.log(data);
        setupMovieInfo(data);
    }
    catch (error) {
        console.log(error);
        goToLink('home.html');
    }
}

function postComment(event) {
    event.preventDefault();  
    const movieId = params.get('_id');
    const content = document.getElementById('comment-text').value;

    if(getUserData()== null){
        const commentAdd = document.querySelector('.add-comment');
        const errmessageEl = document.createElement('div');
        errmessageEl.classList.add('mess-unauth-user');
        errmessageEl.innerHTML = 'Error: An unauthorized user can`t send comments!';
        commentAdd.appendChild(errmessageEl);
    } else {
        const userId = getUserData().id;
        const data = {
            movieId,
            content,
            userId
        };
    
        fetch('http://localhost:3000/comments/', {
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

    
}


function getRating(event) {
    event.preventDefault();
    if(getUserData()== null){
        const ratingAdd = document.querySelector('.rating-container');
        const errmessageEl = document.createElement('div');
        errmessageEl.classList.add('mess-unauth-user');
        errmessageEl.classList.add('rating-error');
        errmessageEl.innerHTML = 'Error: An unauthorized user can`t rate the movie!';
        ratingAdd.appendChild(errmessageEl);
    } else {
        console.log(currentFilm.description._id);
        var nameRadio = document.getElementsByName('rate');
        for (var i = 0; i < nameRadio.length; i++) {
            if (nameRadio[i].type === 'radio' && nameRadio[i].checked) {
                rezultatRadio = nameRadio[i].value;
            }
        }

        const voteCount = currentFilm.description.voteCount + 1;
        const rating = parseFloat((((currentFilm.description.rating * currentFilm.description.voteCount) + parseInt(rezultatRadio)) / voteCount).toFixed(1));
        console.log(rezultatRadio);
        console.log(voteCount);
        console.log(rating);

        const data = {
            rating,
            voteCount
        };
        
        fetch('http://localhost:3000/descriptions/' + currentFilm.description._id, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
    
}

