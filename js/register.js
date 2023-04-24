let users = [];


async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItemFromStorage('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    registerBtn.disabled = true;
    users.push({
        email: email.value,
        password: password.value,
    });
    await setItemToStorage('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}