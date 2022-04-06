const userTable = document.querySelector("#usersTable")
const userName = document.querySelector("#userName")
const userAge = document.querySelector("#userAge")
const userID = document.querySelector("#userID")
const userUsername = document.querySelector("#userUsername")

const tableDiv = document.querySelector("#tableDiv")
const userInfo = document.querySelector("#infoDiv")
const updateDiv = document.querySelector("#updateDiv")

const newUsername = document.querySelector("#newUsername")
const newUser = document.querySelector("#newUser")
const createButton = document.querySelector("#create")
const newName = document.querySelector("#newName")
const newAge = document.querySelector("#newAge")

const changeName = document.querySelector("#changeName")
const changeAge = document.querySelector("#changeAge")
const changeID = document.querySelector("#changeID")
const updateButton = document.querySelector("#update")


function getSpecific(id){
    fetch("/api/users/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        userID.textContent = "UserID: " + data._id
        userUsername.textContent = "Username: " + data.username
        userName.textContent = "Name: " + data.name
        userAge.textContent = "Age: " + data.age
        userInfo.style.display = "block"
        updateDiv.style.display = "none"
    })
}

function updateTable(){
    fetch("/api/users", {
        method: "GET",
        headers: {
            "Conent-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        userTable.innerHTML = `
        <tr>
            <th> Username </th>
            <th> Name </th>
            <th> Age </th>
        </tr>
        `
        for (const user of data) {
            userTable.insertAdjacentHTML("beforeend",`
            <tr>
                <td>` + user.username + ` </td>
                <td>` + user.name + `</td>
                <td>` + user.age + ` </td>
                <td><button onclick="javascript:getSpecific('` + user._id + `')"> Show Details </button></td>
                <td><button onclick="javascript:openUpdate('` + user._id + `', '` + user.name +`', ` + user.age + `, '` + user.username  + `')"> Update </button></td>
                <td><button onclick="javascript:deleteOne('` + user._id + `')"> Delete </button></td>
            </tr>    
            `)
        }
    })
}

function deleteOne(id){
    fetch("/api/users/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        updateTable()
    })
}

function createUser(){
    const details = {
        username: newUsername.value,
        name: newName.value,
        age: newAge.value
    }
    fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    }).then(response => response.json())
    .then(user => {
        if(user.hasOwnProperty("error")){
            alert(user.error)
        }else{
            userTable.insertAdjacentHTML("beforeend", `
            <tr>
                <td>` + user.username + ` </td>
                <td>` + user.name + `</td>
                <td>` + user.age + ` </td>
                <td><button onclick="javascript:getSpecific('` + user._id + `')"> Show Details </button></td>
                <td><button onclick="javascript:openUpdate('` + user._id + `', '` + user.name +`', ` + user.age + `, '` + user.username  + `')"> Update </button></td>
                <td><button onclick="javascript:deleteOne('` + user._id + `')"> Delete </button></td>
            </tr>    
            `)
            newUsername.value = ""
            newName.value = ""
            newAge.value = ""
            newUser.style.display = "none"
            createButton.style.display = "block"
        }
        
    })
}

function update(id){
    const details = {
        name: changeName.value,
        age: changeAge.value
    }

    fetch("/api/users/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(details)
    })
    .then(response => response.json())
    .then(data => {
        if(data.hasOwnProperty("error")){
            alert(data.error)
        }else{
            updateDiv.style.display = "none"
            updateTable()
        }
    })
}

function openUpdate(id, name, age){

    changeAge.value = age
    changeName.value = name
    changeID.textContent = "UserID: " + id
    updateDiv.style.display = "block"
    userInfo.style.display = "none"
    updateButton.setAttribute("onClick", "javascript:update('" + id + "')")
}

function hideFields(){
    newUser.style.display = "none"
    newUsername.value = ""
    newName.value = ""
    newAge.value = ""
    createButton.style.display = "block"
}

function hideInfo(){
    userInfo.style.display = "none"
}

function hideUpdate(){
    updateDiv.style.display = "none"
}

function createNew(){
    newUser.style.display = "block"
    createButton.style.display = "none"
}





// Initiate the website
fetch("/api/users", {
    method: "GET",
    headers: {
        "Conent-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => {
    for (const user of data) {
        userTable.insertAdjacentHTML("beforeend",`
        <tr>
            <td>` + user.username + ` </td>
            <td>` + user.name + `</td>
            <td>` + user.age + ` </td>
            <td><button onclick="javascript:getSpecific('` + user._id + `')"> Show Details </button></td>
            <td><button onclick="javascript:openUpdate('` + user._id + `', '` + user.name +`', ` + user.age + `, '` + user.username  + `')"> Update </button></td>
            <td><button onclick="javascript:deleteOne('` + user._id + `')"> Delete </button></td>
        </tr>    
        `)
    }
})