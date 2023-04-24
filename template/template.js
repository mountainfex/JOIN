/**
 * This function is used to generate side navbar and header
 * @returns HTML code of navbar and header
 */
function getNavbarTemplate() {
    return `
        <div class="sideMenu">
            <div class="logo">
                <img src="./img/logo-white.svg">
            </div>
            <div class="menu">
                <a href="summary.html"><img src="./img/icon-summary.svg" alt="">Summary</a>
                <a href="board.html"><img src="./img/Icon-board.svg" alt="">Board</a>
                <a href="add_task.html"><img src="./img/icon-add-task.svg" alt="">Add Task</a>
                <a href="contacts.html"><img src="./img/icon-contacts.svg" alt="">Contacts</a>
            </div>
            <div class="legal">
                <a href="impressum.html"><img src="./img/icon-legal.svg" alt="">Legal notice</a>
                <a href="datenschutz.html" class="dNone"><img src="./img/icon-legal.svg" alt="">Privacy statement</a>
            </div>
        </div>
        <div class="header">
            <div class="mobileLogo"><img src=./img/join-logo.svg></div>
            <div class="subheadline">Kanban Project Management Tool</div>
            <div class="headerProfile">
                <a href="help.html"><img src="./img/icon-help-head.svg" alt=""></a>
                <div onclick="showProfileMenu()"><img src="./img/christina-wocintechchat-com-0Zx1bDv5BNY-unsplash 1.png" alt=""></div>
            </div>
            <div class="profileMenu dNone" id="profileMenu">
                <div onclick="goToHelp()" class="mobileProfileMenu">Help</div>
                <div onclick="goToLegalNotice()" class="mobileProfileMenu">Legal notice</div>
                <div class="mobileProfileMenu dNone">Privacy statement</div>
                <div onclick="logout()">Log Out</div>
            </div>
        </div>`;
}

/**
 * This function is used to create one task at board
 * @param {array} task - This is the task that you want to show
 * @returns HTML code of one task
 */
function createTaskOnBoard(task) {
    return `
    <div draggable="true" ondragstart="startDragging(${task["id"]})" onclick="showBigTask(${task["id"]})" class="task" id="task${task["id"]}">
        <div>
            <div class="taskDepartment ${task["department"]}">${task["department"]}</div>
        </div>
        <div class="taskTitle">${task["title"]}</div>
        <div class="taskDescription">${task["description"]}</div>
        <div class="taskSubtask" id="taskSubtask${task["id"]}"></div>
        <div class="taskBottom">
            <div class="taskAssignedTo" id="taskAssignedTo${task["id"]}">
                <div class="green">JH</div>
            </div>
            <div class="taskPriority"><img src="./img/prio-${task["priority"]}.svg" alt=""></div>
        </div>
    </div>
    `;
}

/**
 * This function creates progress bar on task
 * @param {number} amountCheckedSubtasks - This is the amount of all checked subtasks
 * @param {number} amountSubtasks - This is the total amount of all subtasks
 * @param {number} percentCheckedSubtasks - This is the percentage of checked subtasks
 * @returns HTML code of progress bar
 */
function createProgressBarOnTask(
    amountCheckedSubtasks,
    amountSubtasks,
    percentCheckedSubtasks
) {
    return `<div class="subtaskProgressBar">
                <div class="innerProgressBar" style="width: ${percentCheckedSubtasks}%;"></div>
            </div>
            <span>${amountCheckedSubtasks}/${amountSubtasks} Done</span>
    `;
}

/**
 * This function is used to create empty task container
 * @param {string} id - This is the task status, where the container should be build
 * @returns HTML code of empty task container
 */
function createOnDragTask(id) {
    return `<div class="onDrag dNone" id="onDragTask${id}"></div>`;
}

/**
 * This function creates initials on task
 * @param {string} initials - These are the initials you want to show
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createAssignedTo(initials, colorId) {
    return `<div class="profileColor-${colorId}">${initials}</div>`;
}

/**
 * This function is used to create amount of more users
 * @param {number} moreUsers - This is the amount you want to show
 * @returns HTML code
 */
function createAssignedToMoreUsers(moreUsers) {
    return `<div class="profileColorMoreUsers">+${moreUsers}</div>`;
}

/**
 * This function is used to create big task
 * @param {array} task - This is the task you want to show
 * @returns HTML code
 */
function createBigTask(task) {
    return `
    <div class="bigTaskCancel">
        <img class="cancelDesktop" src="./img/icons-cancel.svg" onclick="closeBigTask()">
        <img class="cancelMobile" src="./img/arrow-left-black.svg" onclick="closeBigTask()">
    </div>
    <div class="bigTaskEdit" onclick="showTaskEdit(${task["id"]})"><img src="./img/pencil-white.svg"></div>
    <div class="bigTaskScroll">
    <div>
        <div class="bigTaskDepartment ${task["department"]}">${task["department"]}</div>
    </div>
    <div class="bigTaskTitle">${task["title"]}</div>
    <div class="bigTaskDescription">${task["description"]}</div>
    <div class="bigTaskDate" id="bigTaskDate">
    </div>
    <div class="bigTaskPriority">
        <div class="bigTaskSubtitle">Priority:</div>
        <div class="bigTaskPriorityChild ${task["priority"]}">
            <span>${task["priority"]}</span>
            <img src="./img/prio-white-${task["priority"]}.svg">
        </div>
    </div>
    <div class="bigTaskSubtask dNone" id="bigTaskSubtasks">
        <div class="bigTaskSubtitle">Subtasks:</div>
        <div id="bigTaskSubtask"></div>
    </div>
    <div class="bigTaskBottom">
        <div class="bigTaskSubtitle">Assigned To:</div>
        <div class="bigTaskAssignedTo" id="bigTaskAssignedTo${task["id"]}">
        </div>
    </div>
    </div>
`;
}

/**
 * This function is used to create date on big task
 * @param {string} date - This is the date in german format you want to show
 * @returns HTML code
 */
function createBigTaskDate(date) {
    return `<div class="bigTaskSubtitle">Due date:</div><div>${date}</div>`;
}

/**
 * This function is used to create one assigned user
 * @param {string} name - This is the name of user
 * @param {string} initials - These are the initials of user
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createBigTaskAssignedTo(name, initials, colorId) {
    return `
    <div>
        <div class="bigTaskInitials profileColor-${colorId}">${initials}</div>
        <div>${name}</div>
    </div>
    `;
}

/**
 * This function is used to create task editor
 * @param {array} task - This is the task you want to edit
 * @returns HTML code
 */
function createTaskEdit(task) {
    return `
    <form onsubmit="saveTaskEdit(${task["id"]}); return false;">
    <div class="bigTaskCancel"><img src="./img/icons-cancel.svg" onclick="closeBigTask()"></div>
    <button class="bigTaskEditSubmit">
        <span>Ok</span>
        <img src="./img/icon-edit-ok.svg">
    </button>
    <div class="taskEditScroll"> 
        <label>
            Title
            <input type="text" required id="taskTitleEdit" value="${task["title"]}">
        </label>
        <label>
            Description
            <textarea required id="taskDescriptionEdit">${task["description"]}</textarea>
        </label>
        <label>
            Due date
            <input type="date" required id="taskDateEdit" value="${task["date"]}">
        </label>
        <label>
            Prio
            <div class="taskEditPriority" id="taskEditPriority">
            </div>
        </label>
        <div class="dropdownRel">
            <label>
                Assigned To
                <div class="taskEditContacts" id="taskEditContacts" onclick="openTaskContacts(${task["id"]})"> 
                    <span>Select contacts to assign</span>
                    <img src="./img/icon-arrow-down.svg">
                    </div>
                    </label>
            <div class="taskContactsDropdown dNone" id="taskContactsDropdown" onclick="stopCloseContacts(event)"></div>
            <div class="taskEditInitials" id="taskEditInitials"></div>
        </div>
    </div>
    </form>
`;
}

/**
 * This function is used to create priority on editor
 * @param {string} taskId - This is the Id of task you want to edit
 * @returns HTML code
 */
function createTaskEditPrio(taskId) {
    return `
        <div class="editPrio" id="urgentEditPrio" onclick="changePrio('urgent', ${taskId})">
            <span>urgent</span>
            <img src="./img/prio-urgent.svg" id="urgentEditPrioImg">
        </div>
        <div class="editPrio" id="mediumEditPrio"  onclick="changePrio('medium', ${taskId})">
            <span>medium</span>
            <img src="./img/prio-medium.svg" id="mediumEditPrioImg">
        </div>
        <div class="editPrio" id="lowEditPrio" onclick="changePrio('low', ${taskId})">
            <span>low</span> 
            <img src="./img/prio-low.svg" id="lowEditPrioImg">
        </div>
    
    `;
}

/**
 * This function creates initials on task editor
 * @param {string} initials - These are the initials you want to show
 * @param {string} colorId - This is the color you want to show
 * @returns HTML code
 */
function createTaskEditAssignedTo(initials, colorId) {
    return `<div class="profileColor-${colorId}">${initials}</div>`;
}

function createTaskEditContactsDropdown(name, n, taskId) {
    return `<label>
            ${name}
            <input type="checkbox" id="inputContacts${n}" onclick="changeTaskEditContacts(${taskId})">
        </label>`;
}

function createTaskContactsDropdown(name, n) {
    return `<label>
            ${name}
            <input type="checkbox" id="inputContacts${n}" onclick="changeAddTaskContacts()">
        </label>`;
}


function createTaskCategoryDropdown(category, n) {
    return `<label>
    <span>${category}</span>
            <div class="categoryColor ${category}"></div>
            <input class="dNone" type="checkbox" id="inputCategory${n}" onclick="addCategory(${n})">
        </label>`;
}

function createSelectedCategory(category) {
    return `<span>${category}</span>
            <div class="categoryColor ${category}"></div>
            `;
}

function createEmptyCategory() {
    return `<span>Select task category</span>
            <img src="./img/icon-arrow-down.svg"></img>
            `;
}

function createAddTask() {
    return `
    <form onsubmit="addTask(); return false">
    <div class="bigTaskCancel dNone" id="cancelIcon"><img src="./img/icons-cancel.svg" onclick="closeAddTaskOnBoard()"></div>
    <div class="addTaskScroll">
        <div class="addTaskHead">
            <span class="sectionHeadline">Add Task</span>
        </div>
        <div class="addTaskBody" >
                <div class="addTaskBodyLeft">
                    <label for="">
                        <span>Title</span>
                        <input type="text" id="addTaskTitle" placeholder="Enter a title" required>
                    </label>
                    <label>
                        <span>Description</span>
                        <textarea id="addTaskDescription" placeholder="Enter a Description" required></textarea>
                    </label>
                    <div class="dropdownRel">
                        <label>
                            <span>Category</span>
                            <div class="addTaskDropdown" id="addTaskCategory" onclick="openAddTaskCategory()">
                                <span>Select task category</span>
                                <img src="./img/icon-arrow-down.svg">
                            </div>
                        </label>
                        <div class="addTaskDropdownMenu dNone" id="addTaskCategoryMenu"></div>
                    </div>
                    <div class="dropdownRel">
                        <label>
                            <span>Assigned to</span>
                            <div class="addTaskDropdown" id="addTaskContacts" onclick="openAddTaskContacts()"> 
                                <span>Select contacts to assign</span>
                                <img src="./img/icon-arrow-down.svg">
                            </div>
                        </label>
                        <div class="addTaskDropdownMenu dNone" id="addTaskContactsMenu" onclick=""></div>
                    </div>

                </div>
                <div class="addTaskBodyRight">
                    <label>
                        <span>Due date</span>
                        <input type="date" required id="addTaskDate" required>
                    </label>
                    <label>
                        <span>Prio</span>
                        <div class="addTaskPrioSec" id="addTaskPrioSec">
                            <div class="addTaskPrio" id="urgentAddTaskPrio" onclick="changeAddTaskPrio('urgent')">
                                <span>urgent</span>
                                <img src="./img/prio-urgent.svg" id="urgentAddTaskPrioImg">
                            </div>
                            <div class="addTaskPrio" id="mediumAddTaskPrio"  onclick="changeAddTaskPrio('medium')">
                                <span>medium</span>
                                <img src="./img/prio-medium.svg" id="mediumAddTaskPrioImg">
                            </div>
                            <div class="addTaskPrio" id="lowAddTaskPrio" onclick="changeAddTaskPrio('low')">
                                <span>low</span> 
                                <img src="./img/prio-low.svg" id="lowAddTaskPrioImg">
                            </div>
                        </div>
                    </label>
                    <label>
                        <span>Subtasks</span>
                        <div class="addTaskSubtask">
                            <input type="text" id="addTaskSubtasks" placeholder="Add new subtask" onkeyup="showAddSubtasksIcons()">
                            <div id="addSubtasksIcons"><div class="addIcon"><img  src="./img/icon-add-plus-dark.svg"></div>
                            </div>
                        </div>
                    </label>
                    <div id="addedSubtasks">

                    </div>
                </div>
            </div>
                <div class="addTaskSubmitButtons">
                    <div class="addTaskClear" id="addTaskClear" onclick="clearValues()">
                        <span>Clear</span>
                        <img src="./img/icons-cancel.svg">
                    </div>
                    <button class="addTaskSubmit">
                        <span>Create Task</span>
                        <img src="./img/icon-edit-ok.svg">
                    </button>
                </div>
                </div>
                </form>
    
    `;
}

function createAddTaskPrio() {
    return `
    <div class="addTaskPrio" id="urgentAddTaskPrio" onclick="changeAddTaskPrio('urgent')">
        <span>urgent</span>
        <img src="./img/prio-urgent.svg" id="urgentAddTaskPrioImg">
    </div>
    <div class="addTaskPrio" id="mediumAddTaskPrio"  onclick="changeAddTaskPrio('medium')">
        <span>medium</span>
        <img src="./img/prio-medium.svg" id="mediumAddTaskPrioImg">
    </div>
    <div class="addTaskPrio" id="lowAddTaskPrio" onclick="changeAddTaskPrio('low')">
        <span>low</span> 
        <img src="./img/prio-low.svg" id="lowAddTaskPrioImg">
    </div>
    `;
}

// --------------------------------------- CONTACTS  --------------------------------------------------

/**
 * This function is used to generate a HTML-Template
 */
function addContactHTML() {
    return /*html*/ `
      <div id="contAddBg" class= "contAddBg" onclick="closePopup()">
          <div id="animationId" onclick= "stopClosing(event)" class="animationSlideIn">
              <div id="mobile_contAddContainer" class="contAddContainer">
                  <div id="mobile_contAddContainerLeft" class="contAddContainerLeft">
                      <img src="/img/contacts_Logo.svg" alt="">
                      <h3>Add contact</h3>
                      <p>Task are better with a team</p>
                      <div class="contAddUnderline"></div>
                  </div>
  
                  <div id="mobile_contAddRight" class="contAddRight">
                      <div id="contAddRightClose" onclick="closePopup()" class= "contAddRightClose"> <img src="./img/contact_close.svg" alt=""></div>
                      <div class="contAddEdit">
                          <div id = "mobile_contAddEditIcon" class="contAddEditIcon"> <img src="/img/Vector.svg" alt=""></div>
  
                          <form  onsubmit="addContact(); return false" class="contAddForm">
                              <div><input required id = "inputName" type ="text" placeholder="Name Surname" class="contInputEdit"><img class="contFormImg" src="./img/contact_icon_min.svg"></div>
                              <div><input required id = "inputMail" type= "email" placeholder="EMail"class="contInputEdit"><img class="contFormImg" src="./img/contact_input_mail_mini.svg"></div>
                              <div><input required id = "inputPhone" type= "tel" placeholder="Phone"class="contInputEdit"><img class="contFormImg" src="./img/contact_inputIcon_phone.svg"></div>
                              <div style= display:flex;>
                                <button onclick="closePopup()" onmouseover="changeColor()" class="contCancelBtn" type="reset">Cancel <img  id="clear-x" src="./img/contacts_closeIcon_mini.svg" alt=""></button>
                                <button class="contCreateBtn">Create contact <img src="./img/contacts_submitIcon_mini.svg"></button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}

/**
 * This function is used to generate a HTML-Template
 */
function loadContactListHTML(element, initials, index, colorId) {
    return `
        <div id = "contactContainer-${index}"class="contactContainer" onclick="toggleActive();loadContactDetail('${index}','${initials}','${colorId}')">
            <div class="contactInitial profileColor-${colorId}">
                ${initials}
            </div>
            <div class="contactNameMail">
                <div class="contName">${element["name"]}&nbsp${
    element["surname"]
  }</div>
                <div class="contMail">${element["email"]}</div>
            </div>
        </div>`;
}

/**
 * This function marks the clicked names in the list
 */

function toggleActive() {
    let contMainRight = document.getElementById("cont_main_container_right");
    contMainRight.classList.add("d-flex");
    var containers = document.getElementsByClassName("contactContainer");
    for (let i = 0; i < containers.length; i++) {
        containers[i].classList.remove("active");
    }
}

/**
 * This function is used to generate a HTML-Template
 */
function contactDetailHTML(index, initials, colorId) {
    let contact = contacts[index];
    document.getElementById(`contactContainer-${index}`).classList.add("active");

    return /*html*/`
  
      <div class= "contDetailBg animationSlideIn" id="contDetail">
  
        <div class="contDetailTop">
          <div class="contDetailLetter profileColor-${
            colorId
          }"><p>${initials}</p></div>
          <div class="contName"><h2>${contact.name}&nbsp${
    contact.surname
  }</h2><br><a href ="add_task.html">+ Add Task</a></div>
        </div>
  
      <div class="contDetailMid"> 
        <div class="contDetailMidLeft"><p>Contact&nbspInformation</p></div>
        <div class="contDetailMidRight" onclick="openEditDisplay('${initials}','${index}', '${colorId}')">
          <img src = "./img/contacts_icon_pen.svg"> <p>Edit&nbspContact</p></div>
      </div>
  
      <div class= "contDetailBottom">
          
          <div ><p><b>Email &nbsp</b></p><a class="contMail" href="mailto:${
            contact[`email`]
          }">${contact[`email`]}</a>
          </p></div>
          <div><p><b>Phone</b></p><a class="contPhone" href= "tel:+49${
            contact[`phone`]
          }">${contact[`phone`]}</a>
          </div>
          <div class="contBasket" onclick= "deleteContact('${
            contact[`email`]
          }')"><img src="./img/contacts_icon_basket.png"></div>
        </div>
    `;
}

/**
 * This function is used to generate an index for the deleteContact function
 */
function getContactIndexForEmail(email) {
  let contactIndex = -1;
  for (i = 0; i < contacts.length; i++) {
    if (contacts[i]["email"].toLowerCase() == email.toLowerCase()) {
      contactIndex = i;
    }
  }
  return contactIndex;
}

function editContactHTML(initials, index, colorId) {
  let contact = contacts[index];
  return `
      <div id="contAddBg" class= "contAddBg" onclick="closePopup()">
          <div id="animationId" onclick= "stopClosing(event)" class="animationSlideIn">
          <div class="contAddContainer">
                  <div class="contAddContainerLeft">
                      <img src="./img/contacts_Logo.svg" alt="">
                      <h3>Edit contact</h3>
                      <div class="contAddUnderline"></div>
                  </div>
                  <div class="contAddRight">
                      <div onclick="closePopup()" class= "contAddRightClose"> <img src="./img/contact_close.svg" alt="close"></div>
                      <div class="contAddEdit">
                          <div class="contAddEditIcon profileColor-${colorId}"><p>${initials}</p></div>
  
                          <form  onsubmit="contactEdit('${index}'); return false" class="contAddForm">
                              <div><input required id = "editName" value ="${
                                contact[`name`]
                              } ${
    contact[`surname`]
  }" type= "text" placeholder="${
    contact[`name`]
  }" class="contInputEdit"><img class="contFormImg" src="./img/contact_icon_min.svg"></div>
                              <div><input required id = "editMail" value = "${
                                contact[`email`]
                              }" type= "email" placeholder="${
    contact[`email`]
  }"class="contInputEdit"><img class="contFormImg" src="./img/contact_input_mail_mini.svg"></div>
                              <div><input required id = "editPhone" value = ${
                                contact[`phone`]
                              }  type= "tel" placeholder="${
    contact[`phone`]
  }"class="contInputEdit"><img class="contFormImg" src="./img/contact_inputIcon_phone.svg"></div>
                              <div style= display:flex;>
                                <button class="contEditBtn">Save <img src="./img/contacts_submitIcon_mini.svg"></button>
                              </div>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}