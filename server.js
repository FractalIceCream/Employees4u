const inquirer = require('inquirer');
const mysql = require('mysql2');


const { nav, addEmp, updateEmp, addRole, addDepart, employees, managers, roles, departments } = require('./inquiries.js');
const inquiries = require('./inquiries.js');

const { db, empManager, viewEmp, viewRole, viewDepart } = require('./query.js');
function addEmployee() {
    let data;
    inquirer
        .prompt(addEmp)
        .then(async (res) => {
            const manager = res.addEmployeeManager.split(" ");
            data = await db.query(`SELECT id FROM employee WHERE first_name=? AND last_name=?`,manager,
            (err,res) => err?console.log(err):res)
            
            // data = empManager(manager)
            console.log(data);
            db.promise().execute(`
            INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?,?,1,?)`, 
            [res.addEmployeeFirstName, res.addEmployeeLastName, data]).then((res) => console.log(res));

        })
        .then(() => init());
    return;
}
function updateEmployee() {
    inquirer
        .prompt(updateEmp)
        .then((res) => console.log(res)).then(() => init());
}

function addRoles() {
    inquirer
        .prompt(addRole)
        .then((res) => console.log(res)).then(() => init());
}

function addDepartment() {
    inquirer
        .prompt(addDepart)
        .then((res) => console.log(res)).then(() => init());
}

function init() {
    inquirer
        .prompt(nav)
        .then((res) => {
            switch (res.userAction) {
                case 'View All Employees':
                    db.promise().query(viewEmp)
                        .then(([rows, fields]) => console.table(rows))
                        .then(() => init())
                    break;
                case 'Add employee':
                    console.log('addEmp');
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    console.log('updateEmp');
                    updateEmployee();
                    break;
                case 'View All Roles':
                    db.promise().query(viewRole)
                        .then(([rows, fields]) => console.table(rows))
                        .then(() => init())
                    break;
                case 'Add Role':
                    console.log('addRole');
                    addRoles();
                    break;
                case 'View All Departments':
                    db.promise().query(viewDepart)
                        .then(([rows, fields]) => console.table(rows))
                        .then(() => init())
                    break;
                case 'Add Department':
                    console.log('addDepart');
                    addDepartment();
                    break;
                case 'Quit':
                    console.log('Quit');
                    db.end();
                    break;
                default:
                    break;
            }
            return;
        }).then(console.log(''))
        .catch(err => console.log(err));
    return;
}
init();