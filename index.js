const cb = require('./connection.js');
const inquirer = require('inquirer');
const { nav, addEmp, updateEmp, addRole, addDepart } = require('./inquiries.js');
const { db, viewEmp, viewRole, viewDepart } = require('./query.js');

function addEmployee() {
    inquirer
        .prompt(addEmp)
        .then(async (res) => {
            const manager = res.addEmployeeManager.split(" ");
            [rows, fields] = await cb.query(`SELECT id FROM employee WHERE first_name=? AND last_name=?`,manager,
            (err,res) => err?console.log(err):res)
            
            cb.execute(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (?,?,1,?)`, 
            [res.addEmployeeFirstName, res.addEmployeeLastName, rows[0].id])
            .then(res => console.log(res));
        })
        .then(() => init());
}
function updateEmployee() {
    inquirer
    .prompt(updateEmp)
        .then(async (res) => {
            const employee = res.updateEmployee.split(" ");
            [emp_id, fields] = await cb.query(`SELECT id FROM employee WHERE first_name=? AND last_name=?`,employee,
            (err,res) => err?console.log(err):res);
            
            [r_id, fields] = await cb.query(`SELECT id FROM role WHERE title=?`, [res.updateEmployeeRole], (err, res) => err?console.log(err):res);
            
            cb.execute(`UPDATE employee SET role_id = ? WHERE id = ?`, 
            [r_id[0].id, emp_id[0].id])
            .then((res) => console.log(res));
        })
        .then(() => init());
}

function addRoles() {
    inquirer
        .prompt(addRole)
        .then(async (res) => {


            [rows, fields] = await cb.query(`SELECT id FROM department WHERE name=?`,res.addRoleDepartment,
            (err,res) => err?console.log(err):res)
            
            cb.execute(`INSERT INTO role(title, salary, department_id) VALUE (?,?,?)`, 
            [res.addRole, res.addRoleSalary, rows[0].id])
            .then((res) => console.log(res));
        })
        .then(() => init());
}

function addDepartment() {
    inquirer
        .prompt(addDepart)
        .then(async (res) => {
            await cb.query(`INSERT INTO department(name) VALUE (?)`, 
            [res.addDepartment])
            .then((res) => console.log(res));
        })
        .then(() => init());
}
async function init() {
    inquirer
    .prompt(nav)
    .then(res => {
        switch (res.userAction) {
            case 'View All Employees':
                cb.query(viewEmp)
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
                cb.query(viewRole)
                    .then(([rows, fields]) => console.table(rows))
                    .then(() => init())
                break;
            case 'Add Role':
                console.log('addRole');
                addRoles();
                break;
            case 'View All Departments':
                cb.query(viewDepart)
                    .then(([rows, fields]) => console.table(rows))
                    .then(() => init())
                break;
            case 'Add Department':
                console.log('addDepart');
                addDepartment();
                break;
            case 'Quit':
                console.log('Quit');
                // quit();
                // cb.releaseConnection();
                // console.log(cb);
                cb.end();
                db.end();
                
                break;
            default:
                break;
        }
        return;
    }).then(console.log(''))
    .catch(err => console.log(err));
}
init();