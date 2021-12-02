function onSubmit(event) {
    event.preventDefault();  
    const title = document.getElementById('movie_title').value;
    const movieLink = document.getElementById('movie_link').value;
    const poster = document.getElementById('movie_poster').value;
    const backdrop = document.getElementById('movie_image').value;
    const rating = document.getElementById('movie_rating').value;
    const actors = document.getElementById('movie_actors').value;
    const ageLimitation = document.getElementById('movie_age_limitation').value;
    const voteCount = document.getElementById('movie_vote_count').value;
    const overview = document.getElementById('movie_overview').value;
    const year_id = document.getElementById('movie_year').value;
    const ganre_id = document.getElementById('movie_ganre').value;

    const data = {
        title,
        movieLink,
        poster,
        year_id,
        ganre_id,
        overview,
        actors,
        ageLimitation,
        rating,
        voteCount,
        backdrop
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