const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Initialization", () => {
    it("it should return an object with an 'employeeName', 'id', and 'email' property", () => {
      const obj = new Employee();

      expect("employeeName" in obj).toEqual(true);
      expect("id" in obj).toEqual(true);
      expect("email" in obj).toEqual(true);
    });
  });

  describe("get functions", () => {
    it("should retrieve name, id, email when appropriate function is invoked", () => {
      const obj = new Employee("Andrew", 1, "email@test.com");

      const getName = obj.getName();
      const getId = obj.getId();
      const getEmail = obj.getEmail();

      expect(obj instanceof Employee).toEqual(true);
      expect(getName).toEqual("Andrew");
      expect(getId).toEqual(1);
      expect(getEmail).toEqual("email@test.com");
    });
  });

  describe("get role function", () => {
    it("if 'role' does not exist on constructor object, create 'roll = Employee' on object", () => {
      const obj = new Employee();

      const createRole = obj.getRole();

      expect(obj instanceof Employee).toEqual(true);
      expect(createRole).toEqual("Employee");
    });
  });
});
