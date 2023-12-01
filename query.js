const db = require('./connection.js');

//read queries for console.table
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

//read queries for inquirer's choices

const employees = async function() {
    [rows, fields] = await db.query(`SELECT CONCAT(first_name," ",last_name) AS name FROM employee`);
    return rows.map(obj=>obj.name);
};

const managers = async function () {
    [rows, field] = await db.query(`
    SELECT CONCAT(first_name," ",last_name) as managers
        FROM employee
        WHERE manager_id IS NULL`); 
    return rows.map(obj => obj.managers);
};

const roles = async function() {
    [rows, fields] = await db.query(`SELECT title FROM role`);
    return rows.map(obj => obj.title);
}

const departments = async function() {
    [rows, fields] = await db.query(`SELECT name FROM department`);
    return rows.map(obj=>obj.name);
};

//read queries return associated ID's

const getEmpID = async function(employee) {
    [rows, fields] = await db.query(`
    SELECT id FROM employee WHERE first_name = ? AND last_name = ?`,
    employee);
    return rows[0].id;
}

const getManagerID = async function(manager) {
    [rows, fields] = await db.query(`
    SELECT id FROM employee WHERE first_name = ? AND last_name = ?`, manager);
    return rows[0].id;
};

const getRoleID = async function(role) {
    [rows,fields] = await db.query(`
    SELECT id FROM role WHERE title = ?`, role);
    return rows[0].id;
}

const getDepartID = async function (name) {
    [rows, fields] = await db.query(`
    SELECT id FROM department WHERE name = ?`, name);
    return rows[0].id;
}

//create queries for associated tables
const addNewEmployee = async function(first, last, roleID, managerID) {
    db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)
                VALUE(?,?,?,?)`, [first, last, roleID, managerID]);
    return console.log("Added new Employee");
}

const addNewRole = async function(title, salary, departID) {
    db.query(`INSERT INTO role(title, salary, department_id)
                VALUE (?,?,?)`, [title, salary, departID]);
    return console.log("Added New Role");
}

const addNewDepart = async function(name) {
    db.query(`INSERT INTO department(name) VALUE (?)`, name);
    return console.log("Add New Department");
}

//update queries for employees

const updateEmpRole = async function(roleID, empID) {
    db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleID, empID]);
    return console.log("Updated Employee");
}

module.exports = {
    viewEmp, viewRole, viewDepart,
    employees, managers, roles, departments,
    getEmpID, getManagerID, getRoleID, getDepartID,
    addNewEmployee, addNewRole, addNewDepart,
    updateEmpRole };