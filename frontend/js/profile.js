let editUsername = document.querySelector('#edit-username');
let newUsername = document.querySelector('#new-username');
let updateUsername = document.querySelector('#update-username');
let cancelUsername = document.querySelector('#username-cancel-btn');
let editEmail = document.querySelector('#edit-email');
let newEmail = document.querySelector('#new-email');
let updateEmail = document.querySelector('#update-email');
let cancelEmail = document.querySelector('#email-cancel-btn');
let editPhone = document.querySelector('#edit-phone');
let newPhone = document.querySelector('#new-phone');
let updatePhone = document.querySelector('#update-phone');
let cancelPhone = document.querySelector('#phone-cancel-btn');
let editPassword = document.querySelector('#edit-password');
let oldPassword = document.querySelector('#old-password'); 
let newPassword = document.querySelector('#new-password');
let confnewPassword = document.querySelector('#c-new-password');
let updatePassword = document.querySelector('#update-password');
let cancelPassword = document.querySelector('#password-cancel-btn');
let confirmDelete = document.querySelector('.confirm-delete-account-btn');
let cancelDelete = document.querySelector('.cancel-delete-account-btn');
let buySubscr = document.querySelector('.subscription-info');
let curSubscr = document.querySelector('.cur-subscription');
let curSubscrInfo = document.querySelector('.current-subscr'); 


let currentUser = [];

window.onload = async () => {
    navbarDesign();
    if (getUserData().role == "61aa0e14a058b667e986e6e2"){
        curSubscr.style.display = "none";
        buySubscr.style.display = "none";
    } else {
        if(getPriceId() === null){
            curSubscr.style.display = "none";
            buySubscr.style.display = "block";
        }
        else{
            curSubscrInfo.innerHTML = getSubcLabel();
            curSubscr.style.display = "block";
            buySubscr.style.display = "none";
        }
    }
    
    try {
        navbarDesign();
        const userData = getUserData();
        const response = await fetch('http://localhost:3000/users/' + userData.id);
        const data = await response.json();
        console.log(data);
        currentUser = data;
        setupUserInfo(data);
    }
    catch (error) {
        console.log(error);
        goToLink('form.html');
    }
}

const setupUserInfo = (data) => {
    const userName = document.querySelector('.username');
    const email = document.querySelector('.email');
    const phone = document.querySelector('.phone');

    userName.innerHTML += '   '+ data.username;
    email.innerHTML += '   '+ data.email;
    phone.innerHTML += '   +' + data.profile.phoneNumber;
}

function hideElem(){
    editUsername.style.display = "block";
    newUsername.style.display = "none";
    updateUsername.style.display = "none";
    cancelUsername.style.display = "none";
    editEmail.style.display = "block";
    newEmail.style.display = "none";
    updateEmail.style.display = "none";
    cancelEmail.style.display = "none";
    editPhone.style.display = "block";
    newPhone.style.display = "none";
    updatePhone.style.display = "none";
    cancelPhone.style.display = "none";
    editPassword.style.display = "block";
    oldPassword.style.display = "none";
    newPassword.style.display = "none";
    confnewPassword.style.display = "none";
    updatePassword.style.display = "none";
    cancelPassword.style.display = "none";
    confirmDelete.style.display = "none";
    cancelDelete.style.display = "none";
}

function toEditUsername(){
    hideElem();
    editUsername.style.display = "none";
    newUsername.style.display = "block";
    updateUsername.style.display = "block";
    cancelUsername.style.display = "block";
}

function toEditEmail(){
    hideElem();
    editEmail.style.display = "none";
    newEmail.style.display = "block";
    updateEmail.style.display = "block";
    cancelEmail.style.display = "block";
}

function toEditPhone(){
    hideElem();
    editPhone.style.display = "none";
    newPhone.style.display = "block";
    updatePhone.style.display = "block";
    cancelPhone.style.display = "block";
}

function toEditPassword(){
    hideElem();
    editPassword.style.display = "none";
    oldPassword.style.display = "block";
    newPassword.style.display = "block";
    confnewPassword.style.display = "block";
    updatePassword.style.display = "block";
    cancelPassword.style.display = "block";
}

function showDeleteAccountOptions(){
    hideElem();
    confirmDelete.style.display = "block";
    cancelDelete.style.display = "block";
}

function putUsername(event){
    event.preventDefault();
    const username = document.getElementById('new-username').value;
    const data = {
        username
    };
    
    fetch('http://localhost:3000/users/' + currentUser._id, {
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
        if(result.message === undefined){
            alert("The username has been successfully changed!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function putEmail(event){
    event.preventDefault();
    const email = document.getElementById('new-email').value;
    const data = {
        email
    };
    
    fetch('http://localhost:3000/users/' + currentUser._id, {
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
        if(result.message === undefined){
            alert("The email has been successfully changed!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

function putPhone(event){
    event.preventDefault();
    const phoneNumber = document.getElementById('new-phone').value;
    const data = {
        phoneNumber
    };
    
    fetch('http://localhost:3000/profiles/' + currentUser.profile._id, {
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
        if(result.message === undefined){
            alert("The phone number has been successfully changed!");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
}

function putPassword(event){
    event.preventDefault();
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confnewPassword = document.getElementById('c-new-password').value;

    if (newPassword.length < 6 || newPassword.length > 16){
        alert("The password must be between 6 and 16 characters long!");
    }
    else{
        if (newPassword === confnewPassword){
            const data = {
                oldPassword,
                newPassword
            };
            
            fetch('http://localhost:3000/users/password/' + currentUser._id, {
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
                if(result.message === undefined){
                    alert("The password has been successfully changed!");
                } else {
                    alert(result.message);
                }
                
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else{
            alert("The new password and the confirmed new password must match!");
        }
    }   
    
}

function toDeleteAccount(){
    fetch('http://localhost:3000/users/' + currentUser._id, {
        method: 'DELETE',})
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            localStorage.removeItem('usertoken');
            goToLink('form.html');
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

function toPaymentForm(priceIdProfile, subscLabel){
    localStorage.removeItem('priceId');
    localStorage.setItem('priceId', priceIdProfile.toString());
    localStorage.removeItem('subscLabel');
    localStorage.setItem('subscLabel', subscLabel.toString());
    console.log(getPriceId());
    console.log(getSubcLabel());
    goToLink('payment.html')
}