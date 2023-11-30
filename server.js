const inquirer = require('inquirer');
const mysql = require('mysql2');
// const departments = ['Legal', 'Engineering'];
// const roles = ['sales','IT'];
// const managers = ['bob', 'joe'];
// const employees = ['irene', 'myself'];

const { nav, addEmp, updateEmp, addRole, addDepart, employees, managers, roles, departments } = require('./inquiries.js');
const inquiries = require('./inquiries.js');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'root',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

function viewEmployees () {
    db.query(viewEmp, (err, res) => err ? console.log(err) : console.table(res));
    // inquirer.prompt(
    //     {
    //         type: 'confirm',
    //         name: 'continue',
    //         message: 'continue?',
    //     }
    // ).then((res) => res.continue ? init() : console.log('quitting')).then(console.log(''))
    // .catch((err) => console.log(err));

}
function addEmployee() {
    inquirer
    .prompt(addEmp)
    .then((res) => console.log(res));
    return;
}
function updateEmployee() {
    inquirer
    .prompt(updateEmp)
    .then((res) => console.log(res));
}

function addRoles() {
    inquirer
    .prompt(addRole)
    .then((res) => console.log(res));
}

function addDepartment() {
    inquirer
    .prompt(addDepart)
    .then((res) => console.log(res));
}
const viewEmp = 
`SELECT emp.id, emp.first_name, emp.last_name, role.title, dep.name, role.salary,
        IF(emp.manager_id = m.id, CONCAT(m.first_name," ", m.last_name), NULL) as manager
    FROM employee emp
    JOIN role
        ON emp.role_id = role.id
    JOIN department dep
        ON role.department_id = dep.id
    LEFT JOIN employee m
        ON emp.manager_id = m.id
`;

const viewRole = 
`SELECT role.id, role.title, dep.name, role.salary
    FROM role
    JOIN department dep
        ON role.department_id = dep.id 
`;

const viewDepart = 
`SELECT * FROM department`;
// function navigation (res) {
//     switch (res.userAction) {
//         case 'View All Employees':
//             viewEmployees();
//             // db.query(viewEmp, (err, res) => err ? console.log(err) : console.table(res));
//             // console.log('viewEmp');
//             // init();
//             // break;
//         case 'Add employee':
//             console.log('addEmp');
//             addEmployee();
//             break;
//         case 'Update Employee Role':
//             console.log('updateEmp');
//             updateEmployee();
//             break;
//         case 'View All Roles':
//             console.log('viewEmp');
//             db.query(viewRole, (err, res) => err ? console.log(err) : console.table(res));
//             break;
//         case 'Add Role':
//             console.log('addRole');
//             addRoles();
//             break;
//         case 'View All Departments':
//             console.log('viewDepart');
//             db.query(viewDepart, (err, res) => err ? console.log(err) : console.table(res));
//             break;
//         case 'Add Department':
//             console.log('addDepart');
//             addDepartment();
//             break;
//         case 'Quit':
//             console.log('Quit');
//             break;
//         default:
//             console.log("something happened");
//             break;
//     }
//     console.log('outside here');
// }
function init() {
    inquirer
        .prompt(nav)
        .then((res) => {
            switch (res.userAction) {
                case 'View All Employees':
                    console.log('viewEmp');
                    // viewEmployees();
                    db.promise().query(viewEmp)
                    .then(([rows, fields]) => console.table(rows)).then(() => init())//.then(() => db.end());
                    // db.query(viewEmp, (err, res) => err ? console.log(err) : console.table(res));
                    // init();
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
                    console.log('viewEmp');
                    db.query(viewRole, (err, res) => err ? console.log(err) : console.table(res));
                    init();
                    break;
                case 'Add Role':
                    console.log('addRole');
                    addRoles();
                    break;
                case 'View All Departments':
                    console.log('viewDepart');
                    db.query(viewDepart, (err, res) => err ? console.log(err) : console.table(res));
                    init();
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
        }).then(console.log(''))
        .catch(err => console.log(err));
}
init();