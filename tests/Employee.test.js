const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Initialization", () => {
    it("it should return an object with an 'employeeName' property", () => {
      const obj = new Employee();

      expect("employeeName").toEqual(true);
    });

    it("it should return an object with an 'id' property", () => {
      const obj = new Employee();

      expect("id").toEqual(true);
    });

    it("it should return an object with an 'email' property", () => {
      const obj = new Employee();

      expect("email").toEqual(true);
    });
  });

  describe("getName", () => {
    it("should set name when created", () => {
        const empName = "Andrew";
        const obj = new Employee(empName);

        expect(obj.employeeName).toEqual(empName);
    });
  });

  describe("getId", () => {
    it("should set id when created", () => {
        const id = 1;
        const obj = new Employee(id);

        expect(obj.id).toEqual(id);
    });
  });

  describe("getEmail", () => {
    it("should set email when created", () => {
        const mail = "test@test.com";
        const obj = new Employee(mail);

        expect(obj.email).toEqual(mail);
    });
  });

  describe("getRole", () => {
    it("should set role to 'Employee' when created", () => {
        const title = "Employee";
        const obj = new Employee(title);

        expect(obj.position).toEqual(title);
    });
  });
});
