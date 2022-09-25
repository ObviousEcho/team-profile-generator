const Employee = require("./Employee");

class Manager extends Employee {
  constructor(employeeName, id, email, officeNumber) {
    super(employeeName, id, email);
    this.officeNumber = officeNumber;
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

module.exports = Manager;
