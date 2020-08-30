// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officeNumber, teamName) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        // this.teamName = teamName;
        //will add this once call is in place//

    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    // getTeamName() {
    //     return this.teamName;
    // }

    getRole() {
        return "Manager";
    }
}

module.exports = Manager;