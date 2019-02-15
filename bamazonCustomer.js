// Declare global variables
var inquirer = require("inquirer");
var mysql = require("mysql");

// Establish Connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "bamazon_db"
});

// While in the connection do something....
connection.connect(function (err) {
    if (err) throw err;
    // Thread id #
    console.log("Connected as ID: " + connection.threadId);

    readTable();

    initiate();

});

function initiate() {
    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please select the the item_id number you would you like to buy\n"
        },
        {
            type: "input",
            name: "quantity",
            message: "Which quantity would you like to purchase?"
        }
    ]).then(function (response) {
        console.log(response);
    });
    connection.end();
};

// CRUD functions
function readTable() {
    // Selects all info from the database and loops through the table
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("=========================================");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
        console.log("=========================================");
    });
};

// function updateTable() {
//     console.log("Updating all Rocky Road quantities...\n");
//      var reduce = (stock_quantity - repsonse.quantity)
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stock_quantity: response.
//             }
//         ],
//         function (err, res) {
//             console.log(res.affectedRows + " products updated!\n");
//             // Call deleteProduct AFTER the UPDATE completes
//             deleteProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// };


// inquirer.prompt([{}]).then(function (res){
//     connection.query(
//         "INSERT INTO",
//         {
//             item_name: res.item
//         },
//         function (err) {
//             if (err) throw err;
//         }
//     )
// })