const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');

describe("Intern", () => {
    describe("Initialization", () => {
        it("it should return an object with a school name, in addition to properties from super constructor", () => {
            const obj = new Intern();

            expect("employeeName" in obj).toEqual(true);
            expect("id" in obj). toEqual(true);
            expect("email" in obj).toEqual(true);
            expect("school" in obj).toEqual(true);
        });
    });

    describe("Get shcool function", () => {
        it("return school name", () => {
            const school = "UofU";
            const obj = new Intern();

            const newSchool = obj.getSchool(school);

            expect(obj instanceof Intern).toEqual(true);
            expect(newSchool).toEqual(school);
        })
    });

    describe("Get role function", () => {
        it("returns role of intern", () => {
            const title = "Intern";
            const obj = new Intern();

            const createRole = obj.getRole(title);

            expect(obj instanceof Intern).toEqual(true);
            expect(createRole).toEqual(title);
        })
    })
});