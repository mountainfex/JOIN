let currentUser = [];
let currentUserName = [];
let users = [];

async function init() {
    await loadUsers();
    messageBoxAnimation();
    loggedin();
}
async function loadUsers() {
    try {
        users = JSON.parse(await getItemFromStorage('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

function loggedin() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg === "Du hast dich erfolgreich ausgeloggt!") {
        //nothing happens
    } else {
        savedLogin();
    }
}

function savedLogin() {
    let currentUserAsText = localStorage.getItem("currentUser")
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    if (currentUserAsText) {
        let currentUser = JSON.parse(currentUserAsText);
        email.value = currentUser[0].email;
        password.value = currentUser[0].password;
        login();
    }
}

function messageBoxAnimation() {
    let message = document.getElementById('msgBox');
    setInterval(function() { message.classList.add('fadeout') }, 2750);
    setTimeout(function() { message.classList.add('dnone') }, 3000);
}

function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        saveLogin(user);
        window.location.href = `summary.html`;
    } else {
        shakeElement();
    }
}

function saveLogin(user) {
    let userEmail = user.email;
    let userPassword = user.password;
    let username = user.name;

    currentUserName.push(username);
    loginToLocalStorage("currentUserName", currentUserName);
    if (document.getElementById('rememberMe').checked == true) {
        currentUser.push({ email: userEmail, password: userPassword });
        loginToLocalStorage("currentUser", currentUser);
    }

}

function loginToLocalStorage(key, currentUser) {
    localStorage.setItem(key, JSON.stringify(currentUser));
}

function guestLogin() {
    localStorage.clear();
    window.location.href = 'summary.html'
}

function shakeElement() {
    let mailShake = document.getElementById("emailShake");
    let passwwordShake = document.getElementById("passwordShake");
    mailShake.classList.add("shake");
    passwwordShake.classList.add("shake")
    setTimeout(function() {
        mailShake.classList.remove("shake");
        passwwordShake.classList.remove("shake");
    }, 1000);
}

function showPasswordIcon() {
    let password = document.getElementById('password');
    let lockIMG = document.getElementById("lockIMG").classList;
    let eye = document.getElementById('eyeIMG').classList;

    if (password.value.length > 0) {
        lockIMG.add('dnone');
        eye.remove('dnone');
    } else {
        lockIMG.remove('dnone');
        eye.add('dnone');
    }
}

function showPassword() {
    let inputfield = document.getElementById('password');
    let eye = document.getElementById('eyeIMG');

    if (inputfield.type == "password") {
        inputfield.type = "text";
        eye.src = "./img/openeye.svg"
    } else {
        inputfield.type = "password";
        eye.src = "./img/closedeye.svg"
    }
}