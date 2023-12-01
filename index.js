const db = require('./connection.js');
const inquirer = require('inquirer');
const { nav, addEmp, updateEmp, addRole, addDepart } = require('./inquiries.js');
const { viewEmp, viewRole, viewDepart,
        getEmpID, getManagerID, getRoleID, getDepartID, 
        addNewEmployee, addNewRole, addNewDepart, updateEmpRole } = require('./query.js');

function viewTable(viewQuery) {
    db.query(viewQuery)
        .then(([rows, fields]) => console.table(rows))
        .then(() => init())
}

function addEmployee() {
    inquirer.prompt(addEmp)
        .then(async (res) => {
            const managerName = res.addEmployeeManager.split(" ");
            const managerID = await getManagerID(managerName);
            const roleID = await getRoleID(res.addEmployeeRole);
            await addNewEmployee(res.addEmployeeFirstName, res.addEmployeeLastName, roleID, managerID);
        })
        .then(() => init());
}
function updateEmployee() {
    inquirer.prompt(updateEmp)
        .then(async (res) => {
            const employee = res.updateEmployee.split(" ");
            const empID = await getEmpID(employee);
            const roleID = await getRoleID(res.updateEmployeeRole);
            await updateEmpRole(roleID, empID);
        })
        .then(() => init());
}

function addRoles() {
    inquirer.prompt(addRole)
        .then(async (res) => {
            const departID = await getDepartID(res.addRoleDepartment);
            await addNewRole(res.addRole, res.addRoleSalary, departID);
        })
        .then(() => init());
}

function addDepartment() {
    inquirer.prompt(addDepart)
        .then((res) => {
            addNewDepart(res.addDepartment);
        })
        .then(() => init());
}
function init() {
    inquirer.prompt(nav)
        .then(res => {
            switch (res.userAction) {
                case 'View All Employees':
                    viewTable(viewEmp);
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployee();
                    break;
                case 'View All Roles':
                    viewTable(viewRole);
                    break;
                case 'Add Role':
                    addRoles();
                    break;
                case 'View All Departments':
                    viewTable(viewDepart);
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    db.end();
                    break;
                default:
                    break;
            }
        }).then(console.log(''))
        .catch(err => console.log(err));
}
init();