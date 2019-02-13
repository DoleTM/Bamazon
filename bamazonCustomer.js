var inquirer = require("inquirer");

var bamazon = require("bamazon.sql");

inquirer.prompt([
    {
        type: "input",
        name: "bamazon",
        message: "Please select the the item_id number you would you like to buy"
    },
    {
        type: "input",
        name: "quantity",
        message: "Which quantity would you like to purchase?"
    }
]).then(function (response){
    console.log(response);
});