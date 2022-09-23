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
console.log(
`------------------
EMPLOYEE MANAGER
------------------
`)
);

// Helper functions to read data from mySQL database

// displays department data in a table
function displayDepartments(){
    db.promise().query("SELECT * FROM department")
    .then(([rows]) => {
        const departmentArray = rows;
        console.table(departmentArray);
    })
    .then(() => userInterface())
}

// displays role data in a table
function displayRoles(){
    db.promise().query(`SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.id`)
    .then(([rows]) => {
        const roleArray = rows;
        console.table(roleArray);
    })
    .then(() => userInterface())
}

// displays employee data in a table
function displayEmployees(){
    db.promise().query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) as manager_name
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager_id;`)
    .then(([rows]) => {
        const employeeArray = rows;
        console.table(employeeArray);
    })
    .then(() => userInterface())
}

// add employee
function addEmployee(){

}

// update employee role
function updateEmployee(){

}

// add role
function addRole(){

}

// add department
function addDepartment(){
    inquirer.prompt(
        {
            name: "departmentName",
            type: "input",
            message: "What is the name of the department?"
        }
    )
    .then((response) => {
        if (response.departmentName){
            db.promise().query(`INSERT INTO department (name) VALUES (?)`, response.departmentName)
            .then(() => {
                console.log(`Added ${response.departmentName} to the database`);
            })
            .then(() => userInterface())
        } else{
            console.log("That is not a valid input. Please try again.");
            addDepartment();
        }
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
            'View All Employees', // done
            'Add Employee',
            'Update Employee Role',
            'View All Roles', // done
            'Add Role',
            'View All Departments', // done
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
            case "Add Department":
                addDepartment();
                break;
        }

    })
}


userInterface();