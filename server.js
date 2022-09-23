const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'dodococo',
        database: 'employee_db',
    },
    console.log(`------------------
EMPLOYEE MANAGER
------------------
`)
);

// Helper functions to read data from mySQL database

// displays department data in a table
function displayDepartments(){
    db.query("SELECT * FROM department", (err, data) => {
        err ? console.error(err) : console.table(data);
    })
}

// displays role data in a table
function displayRoles(){
    db.query(`SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.id`, (err, data) => {
        err ? console.error(err) : console.table(data);
    })
}

// displays employee data in a table
// TODO: make the manager appear as the name instead of the id
function displayEmployees(){
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id, CONCAT(manager.first_name, " ", manager.last_name) as manager_name
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`, (err, data) => {
        err ? console.error(err) : console.table(data);
    })
}






// INQUIRER QUESTIONS AND FUNCTIONS
// TODO: How to make it so that the tables display first before the prompts start up again

function userInterface(){
    inquirer
    .prompt(
        {
         name: "action",
         type: 'list',
         message: "What would you like to do?",
         choices: [
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department'
         ]
        }
    )
    .then((response) => {
        switch(response.action){
            case "View All Employees":
                displayEmployees();
                break;
            case "View All Roles":
                displayRoles();
                break;
            case "View All Departments":
                displayDepartments();
                break;
        }

        // userInterface();
    })
}


userInterface();