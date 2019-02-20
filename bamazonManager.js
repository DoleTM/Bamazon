var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "yourRootPassword",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    // Thread id #
    console.log("Connected as ID: " + connection.threadId);

    console.log("=========================================");
    initiate();

});

function initiate() {
    inquirer.prompt([
        {
            type: "list",
            name: "manager",
            message: "Please select an option below.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (response) {
        //console.log(response);

        switch (response.manager) {
            case "View Products for Sale":
                console.log("View Products for Sale");
                viewProducts();
                connection.end();
                break;
            case "View Low Inventory":
                console.log("View Low Inventory");
                viewLow();
                connection.end();
                break;
            case "Add to Inventory":
                console.log("Add to Inventory");
                addToInv();
                connection.end();
                break;
            case "Add New Product":
                console.log("Add New Product");
                var inqurier = require("inqurier");
                inqurier.prompt([
                    {
                        type: "input",
                        name: "add_more",
                        message: "How much would you like to add to inventory?"
                    }
                ]).then(function (err, res) {
                    if (err) throw err;
                    addNew(res);
                });
                connection.end();
                break;
            default:
                console.log("Somethings not right");
                connection.end();
                break;
        }
    });
};

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("=========================================");
        console.log("ID #" + " | " + "Product Name" + " | " + "Style" + " | " + "Price" + " | " + "Stock Qty");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
        console.log("=========================================");
    })
};

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity > 5", function (err, res) {
        if (err) throw err;
        console.log("=========================================");
        console.log("ID #" + " | " + "Product Name" + " | " + "Style" + " | " + "Price" + " | " + "Stock Qty");
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        };
        console.log("=========================================");
    });
}

function addToInv() {

    inquirer.prompt([
        {
            type: "input",
            name: "add_more",
            message: "Which ID # do you want to add stock to?"
        },
        {
            type: "input",
            name: "quantity",
            message: "How much would you like to add to inventory?"
        }
    ]).then(function (id, quantity, res) {
        console.log("Updating inventory quantity...\n");
        var itemSelect = res[id - 1];
        var add = (itemSelect.stock_quantity + quantity);
        var query = "UPDATE bamazon_db.products SET ? WHERE ?";
        connection.query(query,
            [
                {
                    stock_quantity: add
                },
                {
                    item_id: itemSelect.item_id
                }
            ],
            function (err) {
                if (err) throw err;
                console.log("=========================================");
                console.log("ID # " + itemSelect.item_id + " quantity updated to: " + add + "\n");

                console.log("=========================================");

                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    console.log("ID #" + " | " + "Product Name" + " | " + "Style" + " | " + "Price" + " | " + "Stock Qty");
                    for (let i = 0; i < res.length; i++) {
                        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                    };
                    inquirer.prompt([
                        {
                            type: "confirm",
                            name: "another",
                            message: "Would you like to add a quantity to another item?"
                        }
                    ]).then(function (response) {
                        switch (response.another) {
                            case true:
                                addNew(id, quantity, res);
                                break;
                            case false:
                                initiate();
                                break;
                            default:
                                console.log("Session as ID: " + connection.threadId + " has ended.")
                                connection.end();
                                break;
                        }
                    })
                });
            }
        );
    })
};

function addNew(id, quantity, res) {
    console.log("Updating inventory quantity...\n");
    var itemSelect = res[id - 1];
    var add = (itemSelect.stock_quantity + quantity);
    var query = "UPDATE bamazon_db.products SET ? WHERE ?";
    connection.query(query,
        [
            {
                stock_quantity: add
            },
            {
                item_id: itemSelect.item_id
            }
        ],
        function (err) {
            if (err) throw err;
            console.log("=========================================");
            console.log("ID # " + itemSelect.item_id + " quantity updated to: " + add + "\n");

            console.log("=========================================");

            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                console.log("ID #" + " | " + "Product Name" + " | " + "Style" + " | " + "Price" + " | " + "Stock Qty");
                for (let i = 0; i < res.length; i++) {
                    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
                };
                inquirer.prompt([
                    {
                        type: "confirm",
                        name: "another",
                        message: "Would you like to add a quantity to another item?"
                    }
                ]).then(function (response) {
                    switch (response.another) {
                        case true:
                            addNew(id, quantity, res);
                            break;
                        case false:
                            initiate();
                            break;
                        default:
                            console.log("Session as ID: " + connection.threadId + " has ended.")
                            connection.end();
                            break;
                    }
                })
            });
        }
    );
};

inquirer.prompt([{}]).then(function (res) {
    connection.query(
        "INSERT INTO",
        {
            item_name: res.item
        },
        function (err) {
            if (err) throw err;
        }
    )
});