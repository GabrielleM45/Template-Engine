const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);

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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
            }
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
        }])
        .then((data) => {
            switch (data.change) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    fs.writeFile(outputPath, render(teamMember), function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                    console.log("Successfully added Team Members! Open your Team Page to view your Team.");
                    break;
            }
        });
}

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
            },
            {
                type: "list",
                message: "Are there any other Team Members to add?",
                name: "change",
                choices: [
                    "Intern",
                    "Engineer",
                    "I Have no other Team Members to add."
                ]
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


            switch (data.change) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    fs.writeFile(outputPath, render(teamMember), function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                    console.log("Successfully added Team Members! Open your Team Page to view your Team.");
                    break;
            }
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
            },
            {
                type: "list",
                message: "Are there any other Team Members to add?",
                name: "change",
                choices: [
                    "Intern",
                    "Engineer",
                    "I Have no other Team Members to add."
                ]
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

            switch (data.change) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    fs.writeFile(outputPath, render(teamMember), function(err) {
                        if (err) {
                            throw err;
                        }
                    });
                    console.log("Successfully added Team Members! Open your Team Page to viewTeam.");
                    break;
            }
        })
}

const init = async() => {

    console.log("Hi there, as the Team's Manager, let's get started on creating your Team...");
    try {

        const data = await createManager();
        await writeFileAsync(outputPath, render(teamMember));

        console.log("Successfully added Team Members! Open your Main Page to view Team.");

    } catch (err) {

        console.log(err);


    }
}
init();






// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ``