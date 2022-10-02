const inquirer = require("inquirer");
const Employee = require("../lib/Employee");
const Engineer = require("../lib/Engineer");
const Manager = require("../lib/Manager");
const Intern = require("../lib/Intern");
const fs = require("fs");

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
    choices: ["Engineer", "Intern", "Complete"],
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
let manAnswers = [];
let engAnswers = [];
let intAnswers = [];

function managerPrompt() {
  inquirer
    .prompt(manQuest)
    .then((answers) => {
      manAnswers.push(answers);
      console.log(manAnswers);
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
      console.log(engAnswers);
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
      console.log(intAnswers);
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

function renderHtml() {
  fs.writeFile(
    "index.html",
    `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
        <title>Bio Builder</title>
    </head>
    
    <body>
        <nav class="jumbotron jumbotron-fluid">
            <h1 class="display-4 text-center">Team Profiles</h1>
        </nav>
        <main class="container">
            ${createClasses(manAnswers, manager)}
            ${createClasses(engAnswers, engineer)}
            ${createClasses(intAnswers, intern)}
        </main>
    
    </body>
    
    </html>
    `,
    (err) => (err ? console.error(err) : console.log("Page created!"))
  );
}

const manager = "Manager";
const engineer = "Engineer";
const intern = "Intern";
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

function createCards(arr, role) {
  switch (role) {
    case manager:
      console.log(arr);
      for (i of arr) {
        let html = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${manager}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="#" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item"><a href="#" class="card-link">Office number: ${i.officeNumber}</a></li>
  </ul>
</div>
</div>`;
return html;
      }
      return;

    case engineer:
      console.log(arr);
      for (i of arr) {
        let html = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${i.getRole(engineer)}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="#" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item"><a href="#" class="card-link">GitHub: ${i.getGitHub(i.gitHub)}</a></li>
  </ul>
</div>
</div>`;
return html;
      }
      return;

    case intern:
      console.log(arr);
      for (i of arr) {
        let html = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h5 class="card-title">${i.employeeName}</h5>
  <h6 class="card-subtitle mb-2 text-muted">${i.getRole(intern)}</h6>
  <ul class="list-group">
    <li class="list-group-item">ID: ${i.id}</li>
    <li class="list-group-item"><a href="#" class="card-link">Email: ${i.email}</a></li>
    <li class="list-group-item">School: ${i.getSchool(i.school)}</li>
  </ul>
</div>
</div>`;
return html;
      }
      return;
  }
}

module.exports = {
  managerPrompt,
};


