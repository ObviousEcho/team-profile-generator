const Employee = require("./Employee");

class Intern extends Employee {
  constructor(employeeName, id, email, school) {
    super(employeeName, id, email);
    this.school = school;
  }

  getSchool(edu) {
    if (!this.school) {
      this.school = edu;
    } else {
      this.school = edu;
    }
    return this.school;
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

module.exports = Intern;