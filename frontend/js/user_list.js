const tableContainer = document.querySelector('.user-table');
let allUsersData = [];
const searchUserBar = document.getElementById('searchUserBar');

function getAllUsers(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        allUsersData = data;
        if (data.length !== 0) {
            showAllUsers(data);
        } else {
            tableContainer.innerHTML = `<h1 class="no-user-results">No Results Found</h1>`
        }
    })
}

function showAllUsers(data) {
    tableContainer.innerHTML = '';
    const tableEl = document.createElement('table');
    tableEl.classList.add('users-table');
    tableEl.innerHTML = `<thead> 
                            <tr>
                                <th>User ID</th>
                                <th>User name</th>
                                <th>User email</th>
                                <th>Current status</th>
                                <th>Action</th>
                            </tr>
                        </thead>`
    tableContainer.appendChild(tableEl);

    const tbodyEl = document.createElement('tbody');
    tbodyEl.classList.add('table-body');
    
    for(i=0; i<data.length; i++){
        let currentStatus;
        let labelAction;
        const trEl = document.createElement('tr');

        if(data[i].blocked){
            currentStatus = "Blocked";
            labelAction = "Unblock";
        } else {
            currentStatus = "Active";
            labelAction = "Block";
        }

        trEl.innerHTML = `<td>${data[i]._id}</td>
            <td>${data[i].username}</td>
            <td>${data[i].email}</td>
            <td>${currentStatus}</td>
            <td><button class="user-action-btn" onclick="banUser('${data[i]._id}')">${labelAction}</button></td>
         `
        tbodyEl.appendChild(trEl);
    }
    tableEl.appendChild(tbodyEl);
}

navbarDesign();
getAllUsers('http://localhost:3000/users');


searchUserBar.addEventListener('keyup', (e) => {
    e.preventDefault();
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredUsers = allUsersData.filter((user) => {
        return (
            user.username.toLowerCase().includes(searchString)
        );
    });
    console.log(filteredUsers);
    
    if (searchString) {
        if(filteredUsers.length !== 0){
            showAllUsers(filteredUsers);
        } else {
            tableContainer.innerHTML = `<h1 class="no-user-results">No Results Found</h1>`
        }
    } else {
        showAllUsers(allUsersData);
    }
});

function banUser(userId){
    console.log(userId);
    fetch('http://localhost:3000/users/ban/' + userId).then(res => res.json()).then(data => {
        console.log(data)});
}