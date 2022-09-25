const Engineer = require('../lib/Engineer');

describe("Engineer", () => {
    describe("Initialization", () => {
        it("it should return an object with a GitHub user name, in addition to properties from super constructor", () => {
            const obj = new Engineer();

            expect("employeeName" in obj).toEqual(true);
            expect("id" in obj).toEqual(true);
            expect("email" in obj).toEqual(true);
            expect("gitHub" in obj).toEqual(true);
        });
    });

    describe("Get Github function", () => {
        it("returns GitHub link", () => {
            const link = "ObviousEcho";
            const obj = new Engineer();

            const getLink = obj.getGitHub(link);

            expect(obj instanceof Engineer).toEqual(true);
            expect(getLink).toEqual(link);
        })
    });

    describe("Get role function", () => {
        it("returns role of engineer", () => {
            const title = "Engineer";
            const obj = new Engineer();

            const createRole = obj.getRole(title);

            expect(obj instanceof Engineer).toEqual(true);
            expect(createRole).toEqual(title);
        })
    })
});