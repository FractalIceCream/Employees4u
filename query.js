const mysql = require('mysql2');
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
// const db = require('./connection.js');

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

const roles = function(){
    return new Promise(function(resolve, reject){
        db.query(`SELECT title FROM role`,
        function(err,rows) {
            if(rows===undefined){
                reject(new Error("Error rows is undefined"))
            } else {
                resolve(rows.map(obj=>obj.title));
            }
        })
    })
};

const managers = function(){
    return new Promise(function(resolve, reject){
        db.query(`SELECT CONCAT(first_name," ",last_name) as managers FROM employee WHERE manager_id IS NULL`,
        function(err,rows) {
            if(rows===undefined){
                reject(new Error("Error rows is undefined"))
            } else {
                // console.log(rows.map((obj) => [obj.id,obj.managers]));
                // resolve(rows.map((obj) => Object.create({key:'a',value:obj.managers})));
                resolve(rows.map(obj=>obj.managers));
            }
        })
    })
};

const departments = function(){
    return new Promise(function(resolve, reject){
        db.query(`SELECT name FROM department`,
        function(err,rows) {
            if(rows===undefined){
                reject(new Error("Error rows is undefined"))
            } else {
                // console.log(rows.map((obj) => [obj.id,obj.managers]));
                // resolve(rows.map((obj) => Object.create({key:'a',value:obj.managers})));
                resolve(rows.map(obj=>obj.name));
            }
        })
    })
};
const employees = function(){
    return new Promise(function(resolve, reject){
        db.query(`SELECT CONCAT(first_name," ",last_name) as name FROM employee`,
        function(err,rows) {
            if(rows===undefined){
                reject(new Error("Error rows is undefined"))
            } else {
                // console.log(rows.map((obj) => [obj.id,obj.managers]));
                // resolve(rows.map((obj) => Object.create({key:'a',value:obj.managers})));
                resolve(rows.map(obj=>obj.name));
            }
        })
    })
};
const empManager = function(manager) {
    return new Promise(function(resolve, reject) {
        db.query(`SELECT id FROM employee WHERE first_name = ? AND last_name = ? `, manager,
        function(err, rows) {
            if(rows===undefined) {
                reject(new Error("Error rows is undefined"))
            } else {
                // console.log(rows[0].id);
                resolve(rows[0].id)
            }
        })
    })
};
// db.end();
module.exports = { db, viewEmp,viewRole,viewDepart, roles, managers, departments, employees}