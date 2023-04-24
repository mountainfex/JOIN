async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) {
        mailSend();
    } else {
        mailNotSend();
    }
}

function action(formData) {
    const input = "https://gruppe-06i.developerakademie.net/join/php/send_mail.php"
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
    );
}

function mailSend() {
    let showMsg = document.getElementById("sendMailMsg");
    showMsg.classList.add("btnEmailSend");
    mailSendTo();

    setTimeout(function() {
        showMsg.classList.remove("btnEmailSend");
    }, 4000);
}

function mailSendTo() {
    let massage = document.getElementById("sendMailMsg");
    massage.innerHTML = `
    <img src="/src/img/icon-mail-flight.svg" alt="" />
    An E-Mail has been sent to you `;
}

function mailNotSend() {
    let showMsg = document.getElementById("sendMailMsg");
    showMsg.classList.add("btnEmailSend");
    mailSendNotTo();

    setTimeout(function() {
        showMsg.classList.remove("btnEmailSend");
    }, 3000);
}

function mailSendNotTo() {
    let massage = document.getElementById("sendMailMsg");
    massage.innerHTML = `An E-Mail has not been sent to you`;
}