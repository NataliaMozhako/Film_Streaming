const signinBtn = document.querySelector('.signinBtn');
const signupBtn = document.querySelector('.signupBtn');
const formBx = document.querySelector('.formBx');
const body = document.querySelector('body');

let tokenReg;

window.onload = async () => {
    navbarDesign();
}

function toSignUp(){
    formBx.classList.add('active')
    body.classList.add('active')
}

function toSignIn(){
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

function toRegistrate(event){
    event.preventDefault(); 
    const username = document.getElementById('username_signup').value;
    const email = document.getElementById('email_signup').value;
    const phoneNumber = document.getElementById('phone_signup').value;
    const password = document.getElementById('password_signup').value;
    const passwordSignup = document.getElementById('cpassword_signup').value;

    if(password === passwordSignup){
        const data = {
            username,
            email,
            phoneNumber,
            password
        };
    
        fetch('http://localhost:3000/auth/registration', {
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
            tokenReg = result;
            localStorage.removeItem('usertoken');
            localStorage.setItem('usertoken', tokenReg.token.toString());
            goToLink('profile.html');
        })
        .catch(error => {
            console.error('Error:', error);
        });          
    }    
}
