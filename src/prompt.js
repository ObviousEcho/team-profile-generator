const inquirer = require("inquirer");
const Employee = require("../lib/Employee");
const Engineer = require("../lib/Engineer");
const Manager = require("../lib/Manager");
const Intern = require("../lib/Intern");
const fs = require("fs");

// Inquirer prompt questions
const manQuest = [
  {
    type: "input",
    name: "managerName",
    message: "Enter the manager's name.",
  },

  {
    type: "input",
    name: "managerId",
    message: "Enter/create an employee number.",
  },

  {
    type: "input",
    name: "managerEmail",
    message: "Enter/create an email address.",
  },

  {
    type: "input",
    name: "officeNumber",
    message: "Enter person's new office number.",
  },

  {
    type: "list",
    name: "addEmployee",
    message:
      "Would you like to add an Engineer or an Intern to the team, or complete your team roster?",
    choices: ["Engineer", "Intern"],
    filter(val) {
      return val.toLowerCase();
    },
  },
];
const engQuest = [
  {
    type: "input",
    name: "engName",
    message: "Enter the engineer's name.",
  },

  {
    type: "input",
    name: "engId",
    message: "Enter/create an employee number.",
  },

  {
    type: "input",
    name: "engEmail",
    message: "Enter/create an email address.",
  },

  {
    type: "input",
    name: "engGithub",
    message: "Enter the engineer's GitHub username.",
  },
];
const intQuest = [
  {
    type: "input",
    name: "intName",
    message: "Enter the intern's name.",
  },

  {
    type: "input",
    name: "intId",
    message: "Enter/create an employee number.",
  },

  {
    type: "input",
    name: "intEmail",
    message: "Enter/create an email address.",
  },

  {
    type: "input",
    name: "intSchool",
    message: "Enter the intern's school.",
  },
];
const addAnother = [
  {
    type: "confirm",
    name: "addToTeam",
    message:
      "Would you like to add another team member (just hit enter for YES)?",
    default: true,
  },
];
const engIntQuest = [
  {
    type: "list",
    name: "addEmployee",
    message:
      "Would you like to add an Engineer or an Intern to the team, or complete your team roster?",
    choices: ["Engineer", "Intern"],
    filter(val) {
      return val.toLowerCase();
    },
  },
];
// empty arrays to store answers
let manAnswers = [];
let engAnswers = [];
let intAnswers = [];

// Inquirer prompts
function managerPrompt() {
  inquirer
    .prompt(manQuest)
    .then((answers) => {
      manAnswers.push(answers);
      if (answers.addEmployee === "engineer") {
        engineerPrompt();
      }
      if (answers.addEmployee === "intern") {
        internPrompt();
      }
    })
    .catch((error) => {
      console.error(error, `Something went wrong!`);
    });
}

function engineerPrompt() {
  inquirer
    .prompt(engQuest)
    .then((answers) => {
      engAnswers.push(answers);
      addAnotherPrompt();
    })
    .catch((error) => {
      console.error(error, `Something went wrong!`);
    });
}

function internPrompt() {
  inquirer
    .prompt(intQuest)
    .then((answers) => {
      intAnswers.push(answers);
      addAnotherPrompt();
    })
    .catch((error) => {
      console.error(error, `Something went wrong!`);
    });
}

function addAnotherPrompt() {
  inquirer
    .prompt(addAnother)
    .then((answers) => {
      if (answers.addToTeam) {
        addEngIntPrompt();
      } else {
        renderHtml();
      }
    })
    .catch((error) => {
      console.error(error, `Someting went wrong!`);
    });
}

function addEngIntPrompt() {
  inquirer
    .prompt(engIntQuest)
    .then((answers) => {
      if (answers.addEmployee === "engineer") {
        engineerPrompt();
      }
      if (answers.addEmployee === "intern") {
        internPrompt();
      }
    })
    .catch((error) => {
      console.error(error, `Something went`);
    });
}

// writes html to dist folder
const manager = "Manager";
const engineer = "Engineer";
const intern = "Intern";
function renderHtml() {
  fs.writeFile(
    "./dist/index.html",
`<!DOCTYPE html>
<html lang="en">
    
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
<title>Bio Builder</title>
</head>
    
<body>
  <nav class="jumbotron jumbotron-fluid bg-primary">
    <h1 class="display-4 text-center text-white">Team Profiles</h1>
  </nav>
<main class="container d-flex justify-content-around">
  ${createClasses(manAnswers, manager)}
  ${createClasses(engAnswers, engineer)}
  ${createClasses(intAnswers, intern)}
</main>
    
</body>
    
</html>`,
    (err) => (err ? console.error(err) : console.log("Page created!"))
  );
}

// Creates instances of classes based upon user input from cli
function createClasses(arr, role) {
  if (arr) {
    switch (role) {
      case manager:
        const managerArr = [];
        arr.forEach((i) => {
          const manager = new Manager(
            i.managerName,
            i.managerId,
            i.managerEmail,
            i.officeNumber
          );
          managerArr.push(manager);
        });
        return createCards(managerArr, manager);

      case engineer:
        const engArr = [];
        arr.forEach((i) => {
          const engineer = new Engineer(
            i.engName,
            i.engId,
            i.engEmail,
            i.engGithub
          );
          engArr.push(engineer);
        });
        return createCards(engArr, engineer);

      case intern:
        const intArr = [];
        arr.forEach((i) => {
          const intern = new Intern(i.intName, i.intId, i.intEmail, i.intSchool);
          intArr.push(intern);
        });
        return createCards(intArr, intern);
    }
  }
}

// Creates bootstrap cards to display data
let htmlMan;
let htmlEng;
let htmlInt;
function createCards(arr, role) {
  switch (role) {
    case manager:
      for(i of arr) {
        htmlMan = 
`<div class="card bg-light" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${manager}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="mailto:${i.email}" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item">Office: ${i.officeNumber}</li>
  </ul>
</div>
</div>`;
}
return htmlMan;

    case engineer:
      for (i of arr) {
        htmlEng = 
`<div class="card bg-light" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${i.getRole(engineer)}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="mailto:${i.email}" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item"><a href="https://github.com/${i.getGitHub(i.gitHub)}" class="card-link">GitHub: ${i.getGitHub(i.gitHub)}</a></li>
  </ul>
</div>
</div>`;
}
return htmlEng;

    case intern:
      for (i of arr) {
        htmlInt = 
`<div class="card bg-light" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${i.getRole(intern)}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="mailto:${i.email}" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item">School: ${i.getSchool(i.school)}</li>
  </ul>
</div>
</div>`;
}
return htmlInt;
  }
}

module.exports = {
  managerPrompt,
};
