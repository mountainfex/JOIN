/**
 * Startfunction
 */
async function init() {

    generateNavbar();
}


/**
 * This function is used to generate side navbar and header
 */
function generateNavbar() {
    document.getElementById('navbar').innerHTML = getNavbarTemplate();
}


/**
 * This function is used to show menu after click on own profile picture
 */
function showProfileMenu() {
    let profileMenuClass = document.getElementById('profileMenu').classList;
    if (profileMenuClass.contains('dNone')) {
        profileMenuClass.remove('dNone');
    } else {
        profileMenuClass.add('dNone');
    }
}

function logout() {
    window.location.href = `index.html?msg=Du hast dich erfolgreich ausgeloggt!`;
}

function goToLegalNotice() {
    window.location.href = `impressum.html`;
}

function goToHelp() {
    window.location.href = `help.html`;
}

function backTo() {
    window.location.href = "summary.html";
}
/**
 * This function generates last charakter.
 * @param {string} contactId - This is the Id of contact you want to show
 * @returns string of last character
 */

function generateColorId(contactId) {
    let colorId = contactId.slice(-1);
    return colorId;
}


/**
 * This function is used to generate initials of name
 * @param {string} name - This is the name
 * @returns string of initials
 */
function generateInitials(name) {
    initials = name.toLowerCase().split(' ');
    initials = initials.map(word => word.charAt(0).toUpperCase());
    initials = initials.join('');
    return initials;
}