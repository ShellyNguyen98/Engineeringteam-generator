const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const {prompt} = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

    // Add engineer
const buildEngineer = (employee) => {
    prompt([
        {
          type: 'input',
          name: 'github',
          message: 'Enter employee github username:'
        }
    ])

    .then (engineer => {
         employees.push(new Engineer(employee.name, employee.id, employee.email, engineer.github))
         newEmployee()
    })
    
    .catch(err => console.log(err))
  }

//   Add intern
const buildIntern = (employee) => {
    prompt([
        {
          type: 'input',
          name: 'school',
          message: 'What school does the intern go to?'
        }
    ])
    
    .then (intern => {
        employees.push(new Intern(employee.name, employee.id, employee.email, intern.school))
        newEmployee()
    })
    
    .catch(err => console.log(err))
  }

    // Add Manager
const buildManager = (employee) => {
    prompt([
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is the manager office number?'
        }
    ])
    
    .then (manager => {
        employees.push(new Manager(employee.name, employee.id, employee.email, manager.officeNumber))
        newEmployee()
    })
    
    .catch(err => console.log(err))
  }
//   Add new employees
const newEmployee = () => {
  prompt({
    type: 'list',
    name: 'select',
    message: 'What would you like to do now?',
    choices: ['Add a new employee', 'Finish']
  })
    .then(({ select }) => {
      switch (select) {
        case 'Add another employee':
          chooseEmployee()
          break
        case 'Finish':
          const html = render (employees)
          fs.writeFileSync(path.join(__dirname,'output','index.html'), html)
          break
      }
    })
    .catch(err => console.log(err))
}

// Choices for employee
const chooseEmployee = () => {
    prompt([
      {
        type: 'list',
        name: 'role',
        message: 'What is the role of the employee?',
        choices: ['Engineer','Intern','Manager']
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the employee?'
      },
      {
          type: 'input',
          name: 'id',
          message: 'What is the ID for the employee?'
      },
      {
          type: 'input',
          name: 'email',
          message: 'What is the email of the employee?'
      }
    ])
    .then(employee => {
      switch (employee.role) {
        case 'Engineer':
          buildEngineer(employee)
          break
        case 'Intern':
          buildIntern(employee)
          break
        case 'Manager':
          buildManager(employee)
          break
      }
    })
    .catch(err => console.log(err))
  }
  

chooseEmployee()