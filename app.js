const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []
const newEngineer = (employee) => {
    prompt([
          {
              type: 'input',
              name: 'github',
              message: 'What is their github username?'
          }
      ])
          .then (engineer => {
             employees.push(new Engineer(employee.name, employee.id, employee.email, engineer.github))
             addEmployee()
          })
          .catch(err => console.log(err))
  }


const subEmployee = () => {
  prompt({
    type: 'list',
    name: 'action',
    choices: ['Make Another Product', 'Finish'],
    message: 'What would you like to do now?'
  })
    .then(({ action }) => {
      switch (action) {
        case 'Make Another Product':
          mainMenu()
          break
        case 'Finish':
          const html = render(products)
          fs.writeFileSync(path.join(__dirname, 'output', 'index.html'), html)
          break
      }
    })
    .catch(err => console.log(err))
}

// Choices for employee
const chooseEmployees = () => {
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
  

chooseEmployees()