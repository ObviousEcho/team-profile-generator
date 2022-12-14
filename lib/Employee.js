class Employee {
    constructor(employeeName, id, email) {
        this.employeeName = employeeName;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.employeeName;
    };

    getId() {
        return this.id;
    };

    getEmail() {
        return this.email;
    };

    getRole() {
        if(!this.role) {
            this.role = "Employee";
        }
        return this.role;
    };
};

module.exports = Employee;