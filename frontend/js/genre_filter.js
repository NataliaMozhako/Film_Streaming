const tagTitle = document.querySelectorAll('.tag');
const allTagFilms = document.querySelectorAll('.movie');

console.log(tagTitle);
for(i=0; i<tagTitle.length; i++){
    tagTitle[i].addEventListener('click',
    filterFilms.bind(this, tagTitle[i]));
}

function filterFilms(item){
    changeActivePosition(item);
    for(i=0; i<allTagFilms.length; i++){
        if(allTagFilms[i].classlist.contains(item.attributes.id.value)){
            allTagFilms[i].style.display = "block";
        } else {
            allTagFilms[i].style.display = "none";
        }
    }
}

function changeActivePosition(activeItem){
    for(i=0; i<tagTitle.length; i++){
        tagTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
}