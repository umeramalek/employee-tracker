// call upon all the npm's 
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
// const consoleTable = require('console.table');


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
        console.log(response)
    
    // view responses for all the choices if chosen
    // if the response is equal to the string then run the function and then break 
    
    switch(response.start) {
        case 'View all departments':
            viewDepartment()
          break;
        case 'View all roles':
            viewRoles()
          break;
        case 'View all employees':
            viewEmployees()
          break;
        case 'Add a department':
            addDepartment()
          break;
        case 'Add a role':
            addRole()
          break;
        case 'Add an employee':
            addEmployee()
          break;
          case 'Update employee role':
            updateEmployee() 
          break;
        

      }


  





    })
}



// to view deparment
function viewDepartment(){
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            throw err
        }
        console.table(result);
        init()
      });
}

// to view roles
function viewRoles(){
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            throw err
        }
        console.table(result);
        init()
      });
}


// to view employee
function viewEmployees(){
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            throw err
        }
        console.table(result);
        init()
      });
}

// add a department
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        name: 'department_name',
        message: 'What is the department name?'
    }
]).then((depResults) => {
    let sql = `INSERT INTO department (dep_name) VALUES ('${depResults.department_name}')`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        console.table(result)
        console.log(`Added a department to the database`)
        init()
    })
})
};

function addRole() {
    let dep_list = [];
        db.query('SELECT dep_name FROM department', (err, result) => {
            if (err) {
                throw err
            }
            for (i=0; i<result.length; i++) {
                dep_list.push(result[i].dep_name);
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'roleDep',
                message: 'What is the department for the role?',
                choices: dep_list
            }
        ]).then((roleAnswers) => {
            db.query(`SELECT id FROM department WHERE dep_name = '${roleAnswers.roleDep}'`, (err, result) => {
                if (err) {
                    throw err
                }
                let depId = result[0].id;
                let sql = `INSERT INTO roles (title, salary, department_id) VALUES ('${roleAnswers.roleTitle}', ${roleAnswers.roleSalary}, ${depId})`;
                db.query(sql, (err, result) => {
                    if (err) {
                        throw err
                    }
                    console.table(result);
                    init()
                })
            })
        })
};


// Add employee function
function addEmployee() {
    let role_list = [];
        db.query(`SELECT title FROM roles`, (err, result) => {
            if (err) {
                throw err
            }
            for (i=0; i<result.length; i++) {
                role_list.push(result[i].title);
            }
        })
        inquirer.prompt([{
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the employee?',
            choices: role_list
        }
    ]).then((emp_Results) => {
        db.query(`SELECT id FROM roles WHERE title = '${emp_Results.role}'`, (err, result) => {
            if (err) {
                throw err
            }
        let roleId = result[0].id;
        let sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${emp_Results.firstName}', '${emp_Results.lastName}', ${roleId})`;
        db.query(sql, (err, result) => {
            if (err) {
                throw err
            }
            console.table(result);
            init()
        })
        }); 
    })
};

// Update Employee Role function
function updateEmployee() {
    let role_list= [];
        db.query(`SELECT title FROM roles`, (err, result) => {
            if (err) {
                throw err
            }
            for (i=0; i<result.length; i++) {
                role_list.push(result[i].title);
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'empId',
                message: 'What is the employee ID?'
            },
            {
                type: 'list',
                name: 'empRole',
                message: 'What is their new role?',
                choices: role_list
            }
        ]).then((update_results) => {
            let newRoleId = [];
            db.query(`SELECT id FROM roles WHERE title = '${update_results.empRole}'`, (err, result) => {
                if (err) {
                    throw err
                }
                // console.table(result);
                newRoleId.push(result[0].id);

                let sql = `UPDATE employee SET role_id = ${newRoleId} WHERE id = ${update_results.empId}`;
            db.query(sql, (err, result) => {
                if (err) {
                    throw err
                }
                console.table(result);
                init()
            })
            })
        })
};


init()



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
