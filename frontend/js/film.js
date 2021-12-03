let movieData;
let api_key = "14fd4993a9aad63c9047cbac216ee8d1";
let params;
const allcomments = document.querySelector('.old-comment');

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

}


window.onload = async () => {
    try {
        //params = (new URL(document.location)).searchParams;
        //console.log(params)
        //if (!params.has('movie_id')) {
            //throw new Error('Movie id doesn`t provided');
        //};
        const movie_id = '61aa75964d6580537aa7a88e';
        //const response = await fetch(`${movie_detail_http}/${params.get('movie_id')}?` + new URLSearchParams({
        //    api_key: api_key
        //})) 
        const response = await fetch('http://localhost:3000/movies/61aa75964d6580537aa7a88e');
        const data = await response.json();
        console.log(data);
        setupMovieInfo(data);
    }
    catch (error) {
        console.log(error);
        //goToLink('home.html');
    }
}

function postComment(event) {
    event.preventDefault();  
    //const movieId = params.get('movie_id');
    const movieId = '61aa75964d6580537aa7a88e';
    const content = document.getElementById('comment-text').value;
    const userId = "User1";

    const data = {
        movieId,
        content,
        userId
    };

    fetch('http://localhost:3000/movies/comment/', {
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

function getComments(url) {
    const movieId = params.get('movie_id');
    fetch('http://localhost:3000/movies/comment').then(res => res.json()).then(data => {
        console.log(data.results)
        if (data.results.length !== 0) {
            showComments(data.results);
        } else {
            allcomments.innerHTML = `<h1 class="no-results">The film has no comments yet. Write your comment first!</h1>`
        }
    })
}

function showComments(data) {
    allcomments.innerHTML = '';
    data.forEach(comment => {
        const { id, movieId, content, userId, date } = comment;
        const commentEl = document.createElement('div');
        commentEl.classList.add('some-comment');
        commentEl.id = id;
        commentEl.innerHTML = `
            <p class="username"><span>Username:</span>${userId}</p>
            <p class="comment-descr">${content}</p>
            <p class="comment-date">${date}</p>          
          `
        allcomments.appendChild(commentEl);
    })

}


// fetch recommendations

fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        let container = document.querySelector('.recommendations-container');
        for (let i = 0; i < 16; i++) {
            if (data.results[i].backdrop_path == null) {
                i++;
            }
            container.innerHTML += `
        <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <img src="${IMG_URL}${data.results[i].backdrop_path}" alt="">
            <p class="movie-title">${data.results[i].title}</p>
        </div>
        `;
        }
    })


function getRating(event) {
    event.preventDefault();
    var nameRadio = document.getElementsByName('rate');
    for (var i = 0; i < nameRadio.length; i++) {
        if (nameRadio[i].type === 'radio' && nameRadio[i].checked) {
            rezultatRadio = nameRadio[i].value;
        }
    }
}

