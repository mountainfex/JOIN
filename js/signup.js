let users = [];
setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');

let newID = 0;

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

async function addUser() {
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');


    users.push({ id: newID, name: name.value, email: email.value, password: password.value })
    await backend.setItem('users', JSON.stringify(users));
    newID += newID + 1;
    console.log(newID);
    //weiterleitung zu Login-Seite
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!';
}