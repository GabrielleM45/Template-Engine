// TODO: Write code to define and export the Employee class
const inquirer = require("inquirer");
const jest = require("jest");


class Employee {
    constructor(name, email, id, role) {
        this.name = name;
        this.email = email;
        this.id = id;
        this.role = "Employee";
    }

    getOfficeNumber() {
        return this.getOfficeNumber;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Employee;