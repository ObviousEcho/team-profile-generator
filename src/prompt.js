const inquirer = require("inquirer");

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
let manAnswers;
let engAnswers = [];
let intAnswers = [];

function managerPrompt() {
  inquirer
    .prompt(manQuest)
    .then((answers) => {
      manAnswers = answers;
      if (answers.addEmployee === "engineer") {
        engineerPrompt();
      }
      if (answers.addEmployee === "intern") {
        internPrompt();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
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
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
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
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

function addAnotherPrompt() {
  inquirer
    .prompt(addAnother)
    .then((answers) => {
      if (answers.addToTeam) {
        addEngIntPrompt();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
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
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
}

module.exports = {
  managerPrompt,
  manAnswers,
  engAnswers,
  intAnswers,
};
