let movieData;
let api_key = "14fd4993a9aad63c9047cbac216ee8d1";

const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' : ', ';
}

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');

    title.innerHTML = movieName.innerHTML = data.title;
    genres.innerHTML = `${data.release_date.split('-')[0]} | `;
    for (let i = 0; i < data.genres.length; i++) {
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }

    if (data.adult == true) {
        genres.innerHTML += ' | +18';
    }

    if (data.backdrop_path == null) {
        data.backdrop_path = data.poster_path;
    }

    des.innerHTML = data.overview.substring(0, 200) + '...';

    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}


window.onload = async () => {
    try {
        let params = (new URL(document.location)).searchParams;
        if (!params.has('movie_id')) {
            throw new Error('Movie id doesn`t provided');
        };

        const response = await fetch(`${movie_detail_http}/${params.get('movie_id')}?` + new URLSearchParams({
            api_key: api_key
        })) 
        
        const data = await response.json();
        console.log(data);
        setupMovieInfo(data);
    }
    catch (error) {
        console.log(error);
        //goToLink('home.html');
    }

}



fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        const cast = document.querySelector('.starring');
        for (let i = 0; i < 5; i++) {
            cast.innerHTML += data.cast[i].name + formatString(i, 5);
        }
    })

// fetching video clips

fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        let trailerContainer = document.querySelector('.trailer-container');

        let maxClips = (data.results.length > 4) ? 4 : data.results.length;

        for (let i = 0; i < maxClips; i++) {
            trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        }
    })

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

