// call upon all the npm's 
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');

// port 
const PORT = process.envPORT | 3000;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

// prompts from inquirer
// init function 

function init() {
    inquirer.prompt({
        type:'list',
        message:'What would you like to do?',
        name:'start',
        choices:[
            'View all departments',
            'Add a department',
            'View all roles',
            'Add a role',
            'View all employees',
            'Add an employee',
            'Update employee role',
        ]
    })
    .then((response) => {
    // view responses for all the choices if chosen

    })
}


// to view deparment
db.query(`SELECT * FROM department`, (err, result) => {
    if (err) {
        throw err
    }
    console.table(result);
  });

// to view roles
db.query(`SELECT * FROM roles`, (err, result) => {
    if (err) {
        throw err
    }
    console.table(result);
  });

// to view employee
db.query(`SELECT * FROM employee`, (err, result) => {
    if (err) {
        throw err
    }
    console.table(result);
  });


// add a department
function addDepartment(){
    inquirer.prompt()[{
        type:'input',
        message:'What is the name of the department?',
        name:'department_name', 
    }]
    .then((depResults) => {
        db.query(`INSERT INTO department (department_name) VALUES ('${depResults.department_name}')`, (err, result) => {
            if (err) {
                throw err
            }
            console.table(result);
          });  
    })
}







// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
