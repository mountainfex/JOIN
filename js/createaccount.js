let users = [];

async function init() {
    await loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItemFromStorage('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function addUser() {
    let name = document.getElementById('inputName');
    let email = document.getElementById('inputEmail');
    let password = document.getElementById('inputPassword');

    users.push({ name: name.value, email: email.value, password: password.value })
    await setItemToStorage('users', JSON.stringify(users));
    //weiterleitung zu Login-Seite
    window.location.href = 'index.html?msg=Du hast dich erfolgreich registriert!'
}