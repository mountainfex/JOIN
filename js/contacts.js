let contacts = [];

async function initContacts() {
    await loadTasks();
    await loadContacts();

    loadContactList();
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItemFromStorage('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}
async function loadTasks() {
    try {
        tasks = JSON.parse(await getItemFromStorage('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}
/**
 * This function is used to open the Popup
 */
function open_popup() {
    document.getElementById("cont_popup_id").innerHTML = "";
    loadOverlay();
}

/**
 * This function is used to close the Popup
 */

function closePopup() {
    document.getElementById("animationId").classList.add("animationSlideOut");
    document.getElementById("animationId").classList.remove("animationSlideIn");
    setTimeout(timeOut, 1050);
}

function timeOut() {
    document.getElementById("cont_popup_id").classList.add(`d-none`);
}

function stopClosing(event) {
    event.stopPropagation();
}

/**
 * This function is used to load the overlay
 */
function loadOverlay() {
    let element = document.getElementById("cont_popup_id");
    element.classList.remove(`d-none`);
    element.innerHTML = "";
    element.innerHTML = addContactHTML();
}

/**
 * This function is used to add a new contact
 */
async function addContact() {
    let name = greatLetter(document.getElementById("inputName").value);
    let firstname = name.split(" ")[0];
    let surname = greatLetterSurname(
        name.slice(name.indexOf(" ") + 1, name.length)
    );
    let mail = document.getElementById("inputMail").value;
    let phone = document.getElementById("inputPhone").value;
    let seachId = contacts.length;
    let id = checkId(seachId).toString();

    let data = {
        id: id,
        name: firstname,
        surname: surname,
        email: mail,
        phone: phone,
    };


    contacts.push(data);
    saveContact();
    loadContactList();
    console.log(contacts);
    document.getElementById(`inputName`).value = ``;
    document.getElementById(`inputMail`).value = ``;
    document.getElementById(`inputPhone`).value = ``;
    closePopup();
}
/**
 *This function ensures that the initial letter is always displayed in capital letters
 * 
 */

function greatLetter(name) {
    let surname = name.slice(name.indexOf(" ") + 1, name.length);
    let greatName =
        name.charAt(0).toUpperCase() +
        name.slice(1, name.indexOf(" ")) +
        " " +
        surname.charAt(0).toUpperCase() +
        surname.slice(1, surname.length);
    return greatName;
}

/**
 * This function ensures that the initial letter is always displayed in capital letters
 * 
 */
function greatLetterSurname(surname) {
    let greateSurname =
        surname.charAt(0).toUpperCase() + surname.slice(1, surname.length);
    return greateSurname;
}
/**
 * This function lists the names of the contacts alphabetically
 */


function loadContactList() {
    let contactList = document.getElementById(`contactsList`);
    contactList.innerHTML = ``;
    // Sortierung alphabetisch
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    // Überprüfung, ob Anfangsbuchstabe schon vorhanden
    let previousLetter = "";

    for (let index = 0; index < contacts.length; index++) {
        const element = contacts[index];
        let contact = contacts[index];
        let initials = fktName(contact) + fktSurname(contact);
        let letter = fktName(contact)[0];

        if (letter != previousLetter) {
            contactList.innerHTML += /*html*/ `
        <div class= "contactListContainer colmn" id="contactListContainer">
            <div>
                <h4>${letter}</h4>
                <div class="sepLine">
            </div>
        </div>`;
            previousLetter = letter;
        }
        let colorId = generateColorId(element['id']);
        contactList.innerHTML += loadContactListHTML(element, initials, index, colorId);
    }
}

/**
 * This function is used to generate the first letter
 */
function fktName(contact) {
    iniName = contact.name.toLowerCase().split(" ");
    iniName = iniName.map((word) => word.charAt(0).toUpperCase());
    iniName = iniName.join("");
    return iniName;
}
/**
 * This function is used to generate the second letter
 */
function fktSurname(contact) {
    iniSurname = contact.surname.toLowerCase().split(" ");
    iniSurname = iniSurname.map((word) => word.charAt(0).toUpperCase());
    iniSurname = iniSurname.join("");
    return iniSurname;
}
/**
 * This function is used to load the Details of contacts
 *
 */

function loadContactDetail(index, initials, colorId) {
    let contactDetail = document.getElementById("contDisplay");
    contactDetail.innerHTML = "";
    contactDetail.innerHTML += contactDetailHTML(index, initials, colorId);
}

/**
 * This function is used to save the new contact in the backend
 */
async function saveContact() {
    await setItemToStorage('contacts', JSON.stringify(contacts));
    backTo();
}

/**
 * This function is used to delete a contact
 */
async function deleteContact(email) {
    let display = document.getElementById(`contDisplay`);
    let detail = document.getElementById(`contDetail`);
    let index = getContactIndexForEmail(email);
    await deleteContInArray(index);
    display.innerHTML = "";
    detail.innerHTML = "";
    initContacts();
}

/**
 * This function is used to delete an object in the array
 */
async function deleteContInArray(index) {
    if (index !== parseInt(index, 10)) {}

    if (index >= contacts.length || index < 0) {} //Zu hoch oder zu gering
    else if (index == 0 && contacts.length == 1) {
        deleteAllUsers();
    } //Löscht gesamten Array
    else {
        contacts.splice(index, 1);
        await setItemToStorage('contacts', JSON.stringify(contacts));
    }
}
/**
 * This function checks the assigned ID in the array
 *
 */
function checkId(searchId) {
    if (contacts.find((elem) => elem.id == searchId)) {
        searchId++;
        newSearchId = checkId(searchId);
        return newSearchId;
    } else {
        return searchId;
    }
}

/**
 * This function is used to open the diplay for editing
 *
 */
function openEditDisplay(initials, index, colorId) {
    let element = document.getElementById("cont_popup_id");
    element.classList.remove("d-none");
    element.innerHTML = "";
    element.innerHTML = editContactHTML(initials, index, colorId);
}
/**
 * This function is used for editing the contact details
 *
 */
async function contactEdit(index) {
    let name = greatLetter(document.getElementById("editName").value);
    let firstname = name.split(" ")[0];
    let surname = greatLetterSurname(name.slice(name.indexOf(" ") + 1, name.length));
    let mail = document.getElementById("editMail").value;
    let phone = document.getElementById("editPhone").value;
    let id = contacts[index][`id`];
    let changedData = {
        id: id,
        name: firstname,
        surname: surname,
        email: mail,
        phone: phone,
    };
    document.getElementById("cont_popup_id").innerHTML = "";
    document.getElementById("contDisplay").innerHTML = "";
    contacts.splice(index, 1, changedData);
    await saveContact();
    init();
    loadContactList();
    await initContacts();
}
/**
 * This function is used to turning back
 *
 */
function backTo() {
    window.location.href = "contacts.html";
}