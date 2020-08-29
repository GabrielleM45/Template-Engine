// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, officeNumber, ) {
        super(name, id, email)
        this.officeNumber = officeNumber;
        this.role = Manager;

    }

    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return this.role;
    }


}



module.exports = Manager;