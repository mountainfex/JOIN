let currentDraggedElement;
let tasks = [];
let contacts = [];

/**
 * Startfunction at board
 */
async function initBoard() {
    await loadTasks();
    await loadContacts();
    renderBoard();
}

async function loadTasks() {
    try {
        tasks = JSON.parse(await getItemFromStorage('tasks'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItemFromStorage('contacts'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

/**
 * This function is used to save tasks on backend
 */
async function saveTask() {
    await setItemToStorage('tasks', JSON.stringify(tasks));
}

/**
 * This function renders all tasks on the board
 */
function renderBoard() {
    generateEmptyBoard();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        if (task['taskStatus'] != 'archive') {
            document.getElementById(`${task[`taskStatus`]}`).innerHTML += createTaskOnBoard(task);
            if(task['subtasks']){
                if(task['subtasks'].length>0){
                    generateProgressBar(task);
                }
            }
            
            generateAssignedTo(task);
        }
    }
    generateOnDragTask(); // empty task layout for dragging
}


/**
 * This function clear all tasks on the board
 */
function generateEmptyBoard() {
    document.getElementById('toDo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitingFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
}


/**
 * This function creates empty task container 
 */
function generateOnDragTask() {
    document.getElementById('toDo').innerHTML += createOnDragTask('toDo');
    document.getElementById('inProgress').innerHTML += createOnDragTask('inProgress');
    document.getElementById('awaitingFeedback').innerHTML += createOnDragTask('awaitingFeedback');
    document.getElementById('done').innerHTML += createOnDragTask('done');
}


/**
 * This function is used to calculate parameters of progress bar
 * @param {array} task - This is the task that you want to show 
 */
function generateProgressBar(task){
    let amountSubtasks = task['subtasks'].length;
    let checkedSubtasks = task['subtasks'].filter(function(element){return element.subtaskDone == "checked";});
    let amountCheckedSubtasks = checkedSubtasks.length;
    let percentCheckedSubtasks = (amountCheckedSubtasks/amountSubtasks)*100;
    document.getElementById(`taskSubtask${task['id']}`).innerHTML += createProgressBarOnTask(amountCheckedSubtasks, amountSubtasks, percentCheckedSubtasks)
    
}


/**
 * This function is used to generate shown users on task
 * @param {array} task - This is the task that you want to show 
 */
function generateAssignedTo(task){
    let assignedTo = task['assignedTo'];
    document.getElementById(`taskAssignedTo${task['id']}`).innerHTML=``;
    if(assignedTo.length<4){
        for (let n = 0; n < assignedTo.length; n++) {
            let name = assignedTo[n]['name'];
            let initials = generateInitials(name);
            let colorId = generateColorId(assignedTo[n]['id'])
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(initials, colorId);
        }
    } else {
        for (let n = 0; n < 2; n++) {
            let name = assignedTo[n]['name'];
            let initials = generateInitials(name);
            let colorId = generateColorId(assignedTo[n]['id'])
            document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedTo(initials, colorId);
        }
        let moreUsers=assignedTo.length-2
        document.getElementById(`taskAssignedTo${task['id']}`).innerHTML+=createAssignedToMoreUsers(moreUsers);
    }
}


/**
 * This function allowed the user to drag an element to other container
 * @param {number} id - This is the id of current dragged task 
 */
function startDragging(id) {
    currentDraggedElement = id;
    document.getElementById(`task${id}`).classList.add('draggedTask')
    showDropCont();
}


/**
 * This function allowed the user to drop the dragged element in current space
 *
 * @param {event} event - This event allows user to drop element in current space
 */
function allowDrop(event) {
    event.preventDefault();
}

/**
 * This function changes task status
 * @param {string} taskStatus - This is the new task status
 */
function moveTo(taskStatus) {
    tasks[currentDraggedElement]['taskStatus'] = taskStatus;
    saveTask();
    renderBoard();
}


/**
 * This function shows empty task container, where you can drop task
 */
function showDropCont(){
    let draggedTaskStatus = tasks[currentDraggedElement]['taskStatus'];
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    let taskIdPos = taskIds.indexOf(draggedTaskStatus);
    taskIds.splice(taskIdPos,1);
    for (let i = 0; i < taskIds.length; i++) {
        let id = taskIds[i];
        document.getElementById(`onDragTask${id}`).classList.remove('dNone');
    }
}


/**
 * This function shows only one empty task container
 * @param {number} n - This is the position, where container should be shown
 */
function highlightDrop(n){
    let taskIds = ['toDo','inProgress','awaitingFeedback','done'];
    if(tasks[currentDraggedElement]['taskStatus'] == taskIds[n]){
    } else {
        taskIds.splice(n,1);
        for (let i = 0; i < taskIds.length; i++) {
            let id = taskIds[i];
            document.getElementById(`onDragTask${id}`).classList.add('dNone');
        }
    }
}


/**
 * Ths function is used to show big task
 * @param {number} id - This is the Id of task you want to show
 */
function showBigTask(id){
    let task = tasks[id];
    document.getElementById('bigTaskBg').classList.remove('dNone');
    document.getElementById('bigTask').innerHTML = createBigTask(task);
    generateBigTaskDate(task['date']);
    generateBigTaskSubtasks(id);
    generateBigTaskAssignedTo(task);
}


/**
 * This function is used to change date format from english to german
 * @param {string} date - This is the date in english format you want to show 
 */
function generateBigTaskDate(date){
    germanDate = date.split('-').reverse().join('.');
    document.getElementById('bigTaskDate').innerHTML = createBigTaskDate(germanDate);
}

function generateBigTaskSubtasks(taskId){
    let subtasks = tasks[taskId]['subtasks'];
    if(subtasks.length >0){
        document.getElementById('bigTaskSubtasks').classList.remove('dNone');
        for (let s = 0; s < subtasks.length; s++) {
            subtask = subtasks[s]['subtask'];
            document.getElementById(`bigTaskSubtask`).innerHTML += createBigTaskSubtask(subtask, s, taskId);
        }
        for (let s = 0; s < subtasks.length; s++) {
            done = subtasks[s]['subtaskDone'];
            if(done == 'checked'){
               document.getElementById(`inputSubtask${s}`).checked = true; 
            }
            
        }
    }
}

function createBigTaskSubtask(subtask, s, taskId){
    return `
     <label>
         <input type="checkbox" id="inputSubtask${s}" onclick="changeBigTaskSubtaskDone(${s}, ${taskId})">
         ${subtask}
     </label>`
 }

function changeBigTaskSubtaskDone(s, taskId){
    let subtask = tasks[taskId]['subtasks'][s];
    let inputSubtask = document.getElementById(`inputSubtask${s}`)
    if(inputSubtask.checked == true) {
        subtask['subtaskDone'] = 'checked';
    } else {
        subtask['subtaskDone'] = 'unchecked';
    }
    saveTask();
    renderBoard();
}


/**
 * This function is used to generate "assigned to"-section on big task 
 * @param {array} task - This is the task you want to show
 */
function generateBigTaskAssignedTo(task){
    let assignedTo = task['assignedTo'];
    for (let n = 0; n < assignedTo.length; n++) {
        let name = assignedTo[n]['name'];
        let initials = generateInitials(name);
        let colorId = generateColorId(assignedTo[n]['id'])
        document.getElementById(`bigTaskAssignedTo${task['id']}`).innerHTML+=createBigTaskAssignedTo(name, initials, colorId);
    }
}


/**
 * This function is used to close big task
 */
function closeBigTask(){
    document.getElementById('bigTaskBg').classList.add('dNone');
}


/**
 * This function is used to cancel closing big task on clicking at task
 * @param {event} event 
 */
function doNotCloseBigTask(event){
    event.stopPropagation();
}


/**
 * This function is used to show task editor
 * @param {string} id - This is the id of task you want to edit
*/
function showTaskEdit(id){
    let task = tasks[id];
    document.getElementById('bigTask').innerHTML = createTaskEdit(task);
    generateTaskEditPrio(task, id);
    generateTaskEditAssignedTo(id);
}


/**
 * This function is used to generate priority section on editor
 * @param {array} task - This is the task you want to edit 
 * @param {string} id - This is the id of task you want to edit
 */
function generateTaskEditPrio(task, id){
    document.getElementById('taskEditPriority').innerHTML = createTaskEditPrio(id);
    document.getElementById(`${task['priority']}EditPrio`).classList.add(`editPrioActive`);
    document.getElementById(`${task['priority']}EditPrio`).classList.add(`${task['priority']}`);
    document.getElementById(`${task['priority']}EditPrioImg`).src = `./img/prio-white-${task['priority']}.svg`;
}


/**
 * This function is used to change task priority 
 * @param {*} newPrio - This is the new priority
 * @param {*} taskId - This is the id of task you want to change priority
 */
function changePrio(newPrio, taskId){
    let task = tasks[taskId];
    task['priority']=newPrio;
    generateTaskEditPrio(task, taskId);
    saveTask();
}

/**
 * This function is used to show assigned contacts on task editor
 * @param {array} task - This is the task you want to edit
 */
function generateTaskEditAssignedTo(id){
    let assignedTo = tasks[id]['assignedTo'];
    document.getElementById(`taskEditInitials`).innerHTML = ``;
    for (let n = 0; n < assignedTo.length; n++) {
        let name = assignedTo[n]['name'];
        let initials = generateInitials(name);
        let colorId = generateColorId(assignedTo[n]['id'])
        document.getElementById(`taskEditInitials`).innerHTML+=createTaskEditAssignedTo(initials, colorId);
    }
}

function changeTaskEditContacts(taskId){
    let newTaskContacts = [];
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let contactId = contacts[c]['id'];
        let contactName = generateFullName(contact);
        let assignedTo = document.getElementById(`inputContacts${c}`);
        if(assignedTo.checked == true) {
            let data = {
                "id": contactId,
                "name": contactName,
            }
            newTaskContacts.push(data);
        }
    }
    tasks[taskId]['assignedTo']=newTaskContacts;
    generateTaskEditAssignedTo(taskId);
}

/**
 * This function is used to open dropdown menu on task editor
 */
function openTaskContacts(taskId) {
    let TCClasslist = document.getElementById('taskContactsDropdown').classList;
    if (TCClasslist.contains('dNone')) {
        TCClasslist.remove('dNone');
        document.getElementById('taskEditContacts').classList.add('taskDropdown');
        showTaskEditContacts(taskId);
    } else {
        TCClasslist.add('dNone');
        document.getElementById('taskEditContacts').classList.remove('taskDropdown');
    }

}

/**
 * This function is used to save task changes
 * @param {string} taskId - This is the id of task you edited
 */
function saveTaskEdit(taskId){
    let task = tasks[taskId];
    let newTitle = document.getElementById('taskTitleEdit').value;
    let newDescription = document.getElementById('taskDescriptionEdit').value;
    let newDate = document.getElementById('taskDateEdit').value;
    task['title'] = newTitle;
    task['description'] = newDescription;
    task['date'] = newDate;

    saveTask();
    renderBoard();
    closeBigTask();
}

function showTaskEditContacts(taskId) {
    document.getElementById('taskContactsDropdown').innerHTML =``;
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById('taskContactsDropdown').innerHTML += createTaskEditContactsDropdown(name, c, taskId);
    }
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById(`inputContacts${c}`).checked = checkAssigned(taskId, name);
    }
}

function generateFullName(contact) {
    let name = [];
    name.push(contact['name']);
    name.push(contact['surname']);
    name = name.join(' ');
    return name;
}

function checkAssigned(taskId, name){
    let assignedTo = tasks[taskId]['assignedTo'];
    for (let index = 0; index < assignedTo.length; index++) {
        let assignedContact = assignedTo[index]['name'];
        if(assignedContact.includes(name) == true) {
            return true;
        }
    }
    return false;
}

function stopCloseContacts(e){
    e.stopPropagation();
}


function showAddTaskOnBoard() {
    let popUpCL = document.getElementById("addTask").classList;
    popUpCL.add(`animationSlideIn`);
    setTimeout(function() {popUpCL.remove('animationSlideIn')}, 1050);

    let popUpBg = document.getElementById("addTaskBg").classList;
    popUpBg.remove('dNone');
    popUpBg.add(`animationFadeIn`);
    setTimeout(function() {popUpBg.remove('animationFadeIn')}, 1050);
    
    document.getElementById('addTask').innerHTML = createAddTask();
    document.getElementById('cancelIcon').classList.remove('dNone');
}

function closeAddTaskOnBoard(){
    let popUpCL = document.getElementById("addTask").classList;
    popUpCL.add('animationSlideOut');
    setTimeout(function() {popUpCL.remove('animationSlideOut')}, 1050);

    let popUpBg = document.getElementById("addTaskBg").classList;
    popUpBg.add('animationFadeOut');
    setTimeout(function() {popUpBg.remove('animationFadeOut')}, 1050);

    setTimeout(function() {popUpBg.add('dNone')}, 1050);
}

// Add Task
let categories = ['design','media', 'backoffice','sales','marketing'];
let newTask = [];
async function initAddTask() {
    await loadTasks();
    await loadContacts();
    document.getElementById('addTask').innerHTML = createAddTask();
}
function openAddTaskCategory() {
    let ATCClasslist = document.getElementById('addTaskCategoryMenu').classList;
    if (ATCClasslist.contains('dNone')) {
        ATCClasslist.remove('dNone');
        document.getElementById('addTaskCategory').classList.add('taskDropdown');
        showAddTaskCategory();
    } else {
        ATCClasslist.add('dNone');
        document.getElementById('addTaskCategory').classList.remove('taskDropdown');
    }
}

function showAddTaskCategory() {
    document.getElementById('addTaskCategoryMenu').innerHTML =``;
    for (let c = 0; c < categories.length; c++) {
        let category = categories[c];
        document.getElementById('addTaskCategoryMenu').innerHTML += createTaskCategoryDropdown(category, c);
    }
}
function addCategory(catId){
    category=categories[catId];
    newTask['department']=category;
    generateSelectedCategory(category);
    openAddTaskCategory();
}
function generateSelectedCategory(category){
    document.getElementById('addTaskCategory').innerHTML = createSelectedCategory(category);
}
function generateEmptyCategory() {
    document.getElementById('addTaskCategory').innerHTML = createEmptyCategory();
}
function changeAddTaskPrio(newPrio){
    newTask['priority']=newPrio;
    generateAddTaskPrio(newPrio);
}

function generateAddTaskPrio(newPrio){
    document.getElementById(`addTaskPrioSec`).innerHTML = createAddTaskPrio();
    document.getElementById(`${newPrio}AddTaskPrio`).classList.add(`addTaskPrioActive`);
    document.getElementById(`${newPrio}AddTaskPrio`).classList.add(`${newPrio}`);
    document.getElementById(`${newPrio}AddTaskPrioImg`).src = `./img/prio-white-${newPrio}.svg`;
}

function generateEmptyPrio(){
    document.getElementById(`addTaskPrioSec`).innerHTML = createAddTaskPrio();
}

function openAddTaskContacts() {
    let ATCClasslist = document.getElementById('addTaskContactsMenu').classList;
    if (ATCClasslist.contains('dNone')) {
        ATCClasslist.remove('dNone');
        document.getElementById('addTaskContacts').classList.add('taskDropdown');
        showAddTaskContacts();
    } else {
        ATCClasslist.add('dNone');
        document.getElementById('addTaskContacts').classList.remove('taskDropdown');
    }

}
function generateEmptyAssignedTo() {
    let ATCClasslist = document.getElementById('addTaskContactsMenu').classList;
    if (ATCClasslist.contains('dNone')) {}else{
        ATCClasslist.add('dNone');
        document.getElementById('addTaskContacts').classList.remove('taskDropdown');
    }
    if (newTask['assignedTo']){
        delete newTask['assignedTo'];
    }
}

function showAddTaskContacts() {
    document.getElementById('addTaskContactsMenu').innerHTML =``;
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let name = generateFullName(contact);
        document.getElementById('addTaskContactsMenu').innerHTML += createTaskContactsDropdown(name, c);
    }
    if(newTask['assignedTo']){
    for (let c = 0; c < newTask['assignedTo'].length; c++) {
        let contact = newTask['assignedTo'][c];
        let name = generateFullName(contact);
        name = name.trim();
        document.getElementById(`inputContacts${c}`).checked = checkAssignedNewTask(name);
    }}
}

function checkAssignedNewTask(name){
    let assignedTo = newTask['assignedTo'];
    for (let index = 0; index < assignedTo.length; index++) {
        let assignedContact = assignedTo[index]['name'];
        if(assignedContact.includes(name) == true) {
            return true;
        }
    }
    return false;
}

function changeAddTaskContacts(){
    let newTaskContacts = [];
    for (let c = 0; c < contacts.length; c++) {
        let contact = contacts[c];
        let contactId = contacts[c]['id'];
        let contactName = generateFullName(contact)
        let assignedTo = document.getElementById(`inputContacts${c}`)
        if(assignedTo.checked == true) {
            let data = {
                "id": contactId,
                "name": contactName,
            }
            newTaskContacts.push(data);
        }
    }
    newTask['assignedTo']=newTaskContacts;
}

async function addTask() {
    pushValuesToNewTask();
    if(newTask['priority'] && newTask['department'] && newTask['assignedTo']){
        let data = {
            "assignedTo": newTask['assignedTo'],
            "id": newTask['id'],
            "title": newTask['title'],
            "description": newTask['description'],
            "date":newTask['date'],
            "priority": newTask['priority'],
            "department": newTask['department'],
            "taskStatus": 'toDo',
            'subtasks': [],
        }
        if(newTask['subtasks']){
            for (let index = 0; index < newTask['subtasks'].length; index++) {
                let subtask = newTask['subtasks'][index];
                data['subtasks'].push(subtask);
            }   
        }
        tasks.push(data);
        await saveTask();
        window.location.href = './board.html'
    } else {
        console.log('Nicht möglich');
    }
}

function pushValuesToNewTask(){
    newTask['title'] = document.getElementById('addTaskTitle').value;
    newTask['description'] = document.getElementById('addTaskDescription').value;
    newTask['date'] = document.getElementById('addTaskDate').value;
    newTask['id']=checkTaskId(tasks.length).toString();
}

function clearValues(){
    // newTask = [];
    document.getElementById('addTaskTitle').value =``;
    document.getElementById('addTaskDescription').value=``;
    document.getElementById('addTaskDate').value=``;
    generateEmptyCategory();
    generateEmptyPrio();
    generateEmptyAssignedTo();
    addSubtaskCancel();
    document.getElementById('addedSubtasks').innerHTML = ``;
}

function checkTaskId(searchId){
    if(tasks.find(elem => elem.id == searchId)){
        searchId++;
        newSearchId = checkTaskId(searchId)
        return newSearchId;
    } else {
        return searchId;
    }
}

function showAddSubtasksIcons() {
    let subtaskInput = document.getElementById('addTaskSubtasks');
    if(subtaskInput.value.length<1){
        document.getElementById('addSubtasksIcons').innerHTML = createAddSubtasksIconsEmpty();
    } else {
        document.getElementById('addSubtasksIcons').innerHTML = createAddSubtasksIcons();
    }
    

}
function createAddSubtasksIcons() {
    return `
        <div class="addIcon">
            <img src="./img/icons-cancel.svg" onclick="addSubtaskCancel()">
            <img src="./img/icon-separator.svg">
            <img src="./img/icon-ok-dark.svg" onclick="addSubtask()">
            </div>`
        }

function createAddSubtasksIconsEmpty() {
            return `
    <div class="addIcon"><img src="./img/icon-add-plus-dark.svg"></div>`
}
function addSubtaskCancel() {
    document.getElementById('addTaskSubtasks').value = ``;
    showAddSubtasksIcons();
}
function addSubtask(){
    let subtaskInput = document.getElementById('addTaskSubtasks');
    if(!newTask['subtasks']){
        newTask['subtasks']=[];
    }
    let data = {
        "subtask": subtaskInput.value,
        "subtaskDone": "unchecked",
    }
    newTask['subtasks'].push(data);
    generateSubtasks();
    addSubtaskCancel();
}

function generateSubtasks(){
    document.getElementById('addedSubtasks').innerHTML = ``;
    for (let s = 0; s < newTask['subtasks'].length; s++) {
        let subtask = newTask['subtasks'][s]['subtask'];
        document.getElementById('addedSubtasks').innerHTML += createSubtasks(subtask,s);
    }
    

}


function createSubtasks(subtask,s){
   return `
   <div>
   <input type="checkbox" id="inputSubtask${s}" onclick="changeSubtaskDone(${s})">
   ${subtask}
    </div>`
}

function changeSubtaskDone(n) {
    let subtask = newTask['subtasks'][n];
    let inputSubtask = document.getElementById(`inputSubtask${n}`)
    if(inputSubtask.checked == true) {
        subtask['subtaskDone'] = 'checked';
    } else {
        subtask['subtaskDone'] = 'unchecked';
    }
}

function search() {
    let search = document.getElementById('searchTask').value;
    search = search.toLowerCase();
    generateEmptyBoard();
    if(search.length == 0){
        initBoard()
    } else{
        for (let t = 0; t < tasks.length; t++) {
            let task = tasks[t];
            if(task['title'].toLowerCase().includes(search) || task['description'].toLowerCase().includes(search)) {
                document.getElementById(`${task[`taskStatus`]}`).innerHTML += createTaskOnBoard(task);
                
                if(task['subtasks']){
                    if(task['subtasks'].length>0){
                    generateProgressBar(task);
                }
                }
                generateAssignedTo(task);
            }
        }
        generateOnDragTask();
    }
}