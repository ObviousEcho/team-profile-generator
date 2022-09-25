const Manager = require('../lib/Manager');

describe("Manager", () => {
    describe("Initialization", () => {
        it("it should return an object with an 'officeNumber' property, in addition to properties from the super constructor", () => {
            const obj = new Manager();

            expect("employeeName" in obj).toEqual(true);
            expect("id" in obj).toEqual(true);
            expect("email" in obj).toEqual(true);
            expect("officeNumber" in obj).toEqual(true);
        })
    });

    describe("Get role function", () => {
        it("returns role of manager", () => {
            const title = "Manager";
            const obj = new Manager();

            const createRole = obj.getRole(title);

            expect(obj instanceof Manager).toEqual(true);
            expect(createRole).toEqual(title);
        })
    });
});