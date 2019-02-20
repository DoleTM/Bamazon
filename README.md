# Bamazon
An Amazon like node.js based command line application

##Overview
I created a taplist including some of my favorite craft beers that are available to purchase within a MySQL database. The app will take in orders from customers and deplete stock from the store's inventory. 

Running this application will first display all of the items available for sale.

The app will then prompt users with two messages.
1. Which ID# would you like to purchase?
2. How much of this item would you like to purchase?

Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.
If it does then the item quantity is updated in the inventory and the customer's price is displayed. The application will then ask if the customer would like to purchase another.

If the stock quantity of the selected item is less than what the customer requests, then they are prompted with an "Insuffecient Quantity" and brought back to purchase a different selection/quantity.

![GIF Demo 1](/bamazonDemo1.gif)
![GIF Demo 2](/bamazonDemo2.gif)

<!-- ###Manager View
The manager will be prompted with the following choices.
- Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

![GIF of Program]()
![GIF of Program]()
![GIF of Program]()
![GIF of Program]()

###Supervisor View



![GIF of Program]()
![GIF of Program]() -->

###Future Revisions
1. I would like to add to this database with live prices
2. Be able to search the taplist by Brewery
3. Able to see the nearest place the beer requested is available