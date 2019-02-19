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

// Confirming Session ID and starting the program
connection.connect(function (err) {
    if (err) throw err;
    // Thread id #
    console.log("Connected as ID: " + connection.threadId);
    initiate();
});

// Initializing the database with a command prompt.
function initiate() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("=========================================");
        console.log("ID #" + " | " + "Product Name" + " | " + "Style" + " | " + "Price" + " | " + "Stock Qty");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
        console.log("=========================================");

        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please select the the ID # of the item you would you like to purchase.\n"
            },
            {
                type: "input",
                name: "quantity",
                message: "Which quantity would you like to purchase?"
            }
        ]).then(function (response) {
            updateTable(response.id, response.quantity, res);
        });
    });
};

// How the table updates when an item is purchased.
function updateTable(id, quantity, res) {
    console.log("Updating inventory quantity...\n");
    var itemSelect = res[id - 1];

    if (itemSelect.stock_quantity == 0 || (itemSelect.stock_quantity - quantity < 0)) {
        console.log("Insufficient Quantity!");
        initiate();
    } else {
        var reduce = (itemSelect.stock_quantity - quantity);
        var query = "UPDATE bamazon_db.products SET ? WHERE ?";
        connection.query(query,
            [
                {
                    stock_quantity: reduce
                },
                {
                    item_id: itemSelect.item_id
                }
            ],
            function (err) {
                if (err) throw err;
                console.log("=========================================");
                console.log("ID # " + itemSelect.item_id + " quantity updated to: " + reduce + "\n");

                console.log("Your price for this transaction is: $" + (quantity * itemSelect.price));
                console.log("=========================================");

                connection.query("SELECT * FROM products", function (err, res){
                    if (err) throw err;
                    for (let i = 0; i < res.length; i++) {
                        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                    };
                    inquirer.prompt([
                        {
                            type: "confirm",
                            name: "another",
                            message: "Would you like to purchase another item?"
                        }
                    ]).then(function (response){
                        switch(response.another){
                            case true:
                            initiate();
                            break;
                            case false:
                            console.log("Thank you for your purchase, have a nice day.")
                            connection.end();
                            break;
                            default:
                            console.log("You must be too drunk to press y or n, get out!")
                            console.log("Session as ID: " + connection.threadId + " has ended.")
                            connection.end();
                            break;
                        }
                    })
                });
            }            
        );
    };  
};