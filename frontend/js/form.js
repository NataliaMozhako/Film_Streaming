const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');


function toSignUp(){
    formBx.classList.add('active')
    body.classList.add('active')
}

signinBtn.onclick = function(){
    formBx.classList.remove('active')
    body.classList.add('active')
}

function goToSignUp(href) {
    goToLink(href);
    toSignUp();    
}


function validate(){
    var email = document.getElementById("email_login").value;
    var password = document.getElementById("password_login").value;

    if(email == "r@mail.ru" && password == "r"){
        alert("login succesfully");
        
        return false;
    }
    else{
        alert("login faild");
    }
}

