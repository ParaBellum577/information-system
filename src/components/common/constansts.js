export const priorities = [
    { id: 1, priority: 'High priority', color: '#dd2c00'},
    { id: 2, priority: 'Medium priority', color: '#ff9e30'},
    { id: 3, priority: 'Low priority', color: '#a0abba'},
];

export const statuses = [
    { id: 1, status: 'Open', BColor: '#e8ecf2', color: '#7f8fa4' },
    { id: 2, status: 'In progress', BColor: '#d1e9fb', color: '#1991eb' },
    { id: 3, status: 'Testing', BColor: '#e7e4f7', color: '#8777d9' },
    { id: 4, status: 'Done', BColor: '#e3f3da', color: '#33af13' }
];

export const project_statuses = [
    { id: 1, status: 'accepted', color: '#ff9e30'},
    { id: 2, status: 'inProgress', color:'#73c546'},
    { id: 3, status: 'finished', color: '#dd2c00'},
];
// 1 accepted (default status after confirmation stakeholder request)
// 2 inProgress (after click start)
// 3 finished (after click stop)

export const users_roles = [
    { id: 1, role: 'stakeholder'},
    { id: 2, role: 'user'},
    { id: 3, role: 'staff'},
    { id: 4, role: 'manager'},
    { id: 5, role: 'admin'},
    { id: 6, role: 'root'},
];