const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamMember = []
const memberId = [];

function validateId(input) {
    if (isNaN(input)) {
        return "Please enter a 6 digit ID number!";
    }
    for (i = 0; i < memberId.length; i++) {
        if (input === memberId[i]) {
            return "That ID number is already in use!"
        }
    }
    return true;
}

const createManager = () => {
    return inquirer
        .prompt([{
                type: "input",
                message: "What is your name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your ID number?",
                name: "id",
                validate: validateId
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            },
            // for future development{
            //     type: "input",
            //     message: "What is the name of your Team?",
            //     name: "teamName"
            // }

        ])
        .then((data) => {
            const newManager = new Manager(
                data.name,
                data.id,
                data.email,
                data.officeNumber
            );

            teamMember.push(newManager);
            memberId.push(data.id);

            console.log("Now that we have your information, let's gather the rest of your Team's info.");

            createEmployee();

        });

}

const createEmployee = () => {
    return inquirer
        .prompt([{
            type: "list",
            message: "Please select your Team Member's Role",
            name: "change",
            choices: [
                "Engineer",
                "Intern",
                "I Have no other Team Members to add."
            ]
        }]).then((data) => {
            switch (data.change) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                case "I Have no other Team Members to add.":
                    teamHTML();
                    break;
                default:
                    break;
            }
        });
};

const createEngineer = () => {
    return inquirer
        .prompt([{
                type: "input",
                message: "What is their name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is their GitHub User Name?",
                name: "github"
            },
            {
                type: "input",
                message: "What is their ID number?",
                name: "id",
                validate: validateId
            }
        ])
        .then((data) => {
            const newEngineer = new Engineer(
                data.name,
                data.id,
                data.email,
                data.github
            );

            teamMember.push(newEngineer);
            memberId.push(data.id);

            console.log("You've successfully added your Engineer");

            createEmployee();
        });
}

const createIntern = () => {
    return inquirer
        .prompt([{
                type: "input",
                message: "What is their name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is their email address?",
                name: "email"
            },
            {
                type: "input",
                message: "What is their ID number?",
                name: "id",
                validate: validateId
            },
            {
                type: "input",
                message: "What school are they currently attending?",
                name: "school"
            }

        ])
        .then((data) => {
            const newIntern = new Intern(
                data.name,
                data.id,
                data.email,
                data.school
            );

            teamMember.push(newIntern);
            memberId.push(data.id);

            console.log("You've successfully added your Engineer");

            createEmployee();

        });
}

const teamHTML = () => {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMember), "utf-8");
}

createManager();