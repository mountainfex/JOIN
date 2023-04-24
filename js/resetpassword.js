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

async function resetPassword() {
    let newPassword = document.getElementById("newPassword");
    let confirmPassword = document.getElementById("confirmPassword");
    let email = getEmailUrLParameter();

    let user = users.find((u) => u.email === email);
    if (user.email === email) {
        if (newPassword.value === confirmPassword.value) {
            user.password = newPassword.value;
            await setItemToStorage('users', JSON.stringify(users));
            resetYourPassword();
            //BESTÄTIGUNGSANIMATION
            setTimeout(function() {
                window.location.href = "../../index.html";
            }, 3000);
        } else {
            PasswordNotMatch();
            newPassword.value = "";
            confirmPassword.value = "";
        }
    }
}

function getEmailURLParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}


function resetYourPassword() {
    let showMsgs = document.getElementById("showMsg");
    showMsgs.classList.add("btnEmailSend");
    passwordReset();

    setTimeout(function() {
        showMsg.classList.remove("btnEmailSend");
    }, 4000);
}

function passwordReset() {
    let massage = document.getElementById("showMsg");
    massage.innerHTML = `You reset your password`;
}

function PasswordNotMatch() {
    let showMsg = document.getElementById("showMsg");
    showMsg.classList.add("btnEmailSend");
    passwordNo();

    setTimeout(function() {
        showMsg.classList.remove("btnEmailSend");
    }, 3000);
}

function passwordNo() {
    let massage = document.getElementById("sendMailMsg");
    massage.innerHTML = `Your password not confirm`;
}