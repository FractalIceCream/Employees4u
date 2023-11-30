const departments = ['Legal', 'Engineering'];
const roles = ['sales','IT'];
const managers = ['bob', 'joe'];
const employees = ['irene', 'myself'];

const nav = {
    type: 'list',
    name: 'userAction',
    message: 'What would you like to do?',
    choices: [
        'View All Employees',
        'Add employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'],
    pageSize: 8,
};
const addEmp = [{
    type: 'input',
    name: 'addEmployeeFirstName',
    message: 'What\'s the first name of the employee?',
},
{
    type: 'input',
    name: 'addEmployeeLastName',
    message: 'What\'s the last name of the employee?',
},
{
    type: 'list',
    name: 'addEmployeeRole',
    message: 'What\'s the employee\'s role?',
    choices: roles
},
{
    type: 'list',
    name: 'addEmployeeManager',
    message: 'Who\'s the employee\'s manager?',
    choices: managers
}];
const updateEmp = [{
    type: 'list',
    name: 'updateEmployee',
    message: 'Which employee\'s role do you want to change?',
    choices: employees
},
{
    type: 'list',
    name: 'updateEmployeeRole',
    message: 'Which role do you want to assign the employee?',
    choices: roles
}];

const addRole = [{
        type: 'input',
        name: 'addRole',
        message: 'What\'s the name of the role?',
    },
    {
        type: 'input',
        name: 'addRoleSalary',
        message: 'What\'s the salary of the role?',
    },
    {
        type: 'list',
        name: 'addRoleDepartment',
        message: 'Which department does the role belong to?',
        choices: departments
    }];
const addDepart = {
        type: 'input',
        name: 'addDepartment',
        message: 'What\'s the name of the department?',
    };

module.exports = { nav, addEmp, updateEmp, addRole, addDepart, employees, managers, roles, departments }