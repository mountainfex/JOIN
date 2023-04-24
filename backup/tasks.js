let tasks = [{
    id: '0',
    title: 'Call potential clients',
    description: 'Make the product presentation to prospective buyers',
    date: '2023-08-03',
    priority: 'urgent',
    assignedTo: [{
        id: '0',
        name: 'David Eisenberg',
        email: 'david@eisenberg.de',
        phone: '0170 123456',
    }, {
        id: '1',
        name: 'Benedikt Ziegler',
        email: 'benedikt@ziegler.de',
        phone: '0170 133476',
    }, {
        id: '2',
        name: 'Stefanie Farber',
        email: 'stefanie@farber.de',
        phone: '0170 163486',
    }, {
        id: '3',
        name: 'Marcel Bauer',
        email: 'marcel@bauer.de',
        phone: '0170 1694861',
    }],
    department: 'sales',
    taskStatus: 'toDo',
    subtasks: [{
            subtask: 'Call customer A',
            subtaskDone: 'unchecked'
        },
        {
            subtask: 'Call customer B',
            subtaskDone: 'checked'
        }
    ],
}, {
    id: '1',
    title: 'Accounting invoices',
    description: 'Write open invoices for customer',
    date: '2023-03-01',
    priority: 'medium',
    assignedTo: [{
        id: '0',
        name: 'David Eisenberg',
        email: 'david@eisenberg.de',
        phone: '0170 123456'
    }],
    department: 'backoffice',
    taskStatus: 'awaitingFeedback',
    subtasks: [],
    subtasksDone: []
}, {
    id: '2',
    title: 'Video Cut',
    description: 'Edit the new company video',
    date: '2023-03-01',
    priority: 'low',
    assignedTo: [{
        id: '0',
        name: 'David Eisenberg',
        email: 'david@eisenberg.de',
        phone: '0170 123456'
    }],
    department: 'media',
    taskStatus: 'inProgress',
    subtasks: [],
    subtasksDone: []
}, {
    id: '3',
    title: 'Social media strategy',
    description: 'Develop an ad campaign for brand positioning',
    date: '2023-03-01',
    priority: 'low',
    assignedTo: [{
        id: '0',
        name: 'David Eisenberg',
        email: 'david@eisenberg.de',
        phone: '0170 123456',
    }],
    department: 'marketing',
    taskStatus: 'done',
    subtasks: [{
            subtask: 'FB',
            subtaskDone: 'checked'
        },
        {
            subtask: 'Insta',
            subtaskDone: 'checked'
        },
        {
            subtask: 'Tiktok',
            subtaskDone: 'checked'
        }
    ],
}];