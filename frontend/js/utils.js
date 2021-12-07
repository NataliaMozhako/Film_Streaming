function getUserData(){
    if(localStorage.getItem('usertoken') == null){
        return null;
    } else {
        var encode = localStorage.getItem('usertoken').split(".");
        var decode = window.atob(encode[1]);
        return JSON.parse(decode)
    }
    
}

function goToLink(href){
    location.href = href;
}

function toLogOut(){
    localStorage.removeItem('usertoken');
    goToLink('form.html');
}

function navbarDesign(){
    const navbarEl = document.querySelector('.navbar');
    const divEl = document.createElement('div');
    divEl.classList.add('join-box');
    const userInfo = getUserData();

    navbarEl.innerHTML = ` <img src='https://i.postimg.cc/W4wxQkBb/logo.png' class="logo" alt='logo'/>`

    if (userInfo == null){
        divEl.innerHTML = `
        <p class="join-msg">Watch movies without limits</p>
        <button class="btn join-btn" onclick="goToLink('form.html')">Join now</button>
        <button class="btn" onclick="goToLink('form.html')">Sign in</button>
        `
        navbarEl.appendChild(divEl);
    } else {
        divEl.innerHTML = `
        <button class="btn profile-btn" onclick="goToLink('profile.html')">User Profile</button>
        <button class="btn logout-btn onclick="toLogOut()">Log out</button>
        `
        navbarEl.appendChild(divEl);
    }

   
}