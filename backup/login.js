setURL('https://gruppe-06i.developerakademie.net/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem("users")) || [];
}

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get("msg");
// if (msg) {
//   msgBox.innerHtml = msg;
// } else {
//   
//       display:none;
//     ;
// }

function logIn() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let user = users.find(
        u => u.email == email.value && u.password == password.value
    );
    if (user) {
        window.location.href = "summary.html";
    }
}