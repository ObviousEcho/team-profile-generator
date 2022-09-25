const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(employeeName, id, email, gitHub) {
    super(employeeName, id, email);
    this.gitHub = gitHub;
  }

  getGitHub(link) {
    if (!this.gitHub) {
      this.gitHub = link;
    } else {
      this.gitHub = link;
    }
    return this.gitHub;
  }

  getRole(title) {
    if (!this.role) {
      this.role = title;
    } else {
      this.role = title;
    }
    return this.role;
  }
}

module.exports = Engineer;
