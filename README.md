# Warehouse Software
  # Technologies Used #

- Node.js - to build the backend
- Express.js - to handle routing and HTTP requests
- Multer js- midelware to help with files
- MySQL - to store the articles and products data
- Docker - to containerize the application

# Implementation Details #

I've created a RESTfull API using Node.js and Express.js to handle the service. MySQL is used as the database to store the data To containerize the application, I've used Docker.

The code is structured into separate folders. The backend contains these folders: database, controllers, helpers, midelwares, models, and routes. The upload folder is created in order to keep imported files.

Included you can find database.sql file in order to create the warehouse_db. 

# Project structure #

Database
The folder contains a config.db.js file that sets up the connection to the MySQL database. 

Controllers
The controllers folder contains two files: files.controller.js and products.controller.js. These files handle the logic for the different API endpoints.

Helpers
This folder contains db-validators.js in order to validates against DB, file-validators.js in order to define validations rules about input files
jsonschema-validators.js in order to check the JSON schema before to import files to the system.

Models
The models folder contains these files: article.js and product.js and product-article.js These files define the database schema for the articles, products, and intermediat table productArticles also server.js to handle the server template config.
index.js to centralize all imports. 

Routes
The routes folder contains two files: files.routes.js and products.routes.js. These files define the different API endpoints and the corresponding controller functions.

Middlewares 
This folder contains validate-field.js in order to check if we have any error before to continue with the controllers logic.

# Two options to run the application 
# Run from NPM

- Follow these steps:

1 - Clone the repository  
2 - In the root directory of the project, create a .env please take a look on .env.example
3 - In the root directory run:

```
npm install 

npm start

```
5 - npm test to execute test suites

# The application can be accessed at http://localhost:8000.
# Run from Docker-Compose

- pre condition: Install docker

- To run the application, follow these steps:

1 - Clone the repository  
2 - In the root directory of the project, create a .env and set env variables like the example before
3 - In the root directory, run # Run

```
  docker build -t my-warehouse-app .

  docker-compose up -d
```
# The application can be accessed at http://localhost:4000.


# Pros and Cons of the Approach
# Pros

- The application uses Node.js, which is a popular and widely used platform for building scalable web applications.
- The code is structured in a way that is easy to read and understand.
- The use of Sequelize and Express.js makes the code easy to understand and maintain.
- Sequelize ORM provides an abstraction layer over the database and makes it easier to interact with the database using JavaScript code.
- The use of routes and controllers makes it easy to add new functionality to the system.
- The use of Sequelize migrations makes it easy to modify the database schema and keep track of changes.
- The use of Docker makes it easy to deploy the system in different environments.
- The API endpoints are simple and easy to use


# Cons

- The solution does not provide any authentication or authorization mechanism, which can be a security risk if the application is deployed in a    production environment.
- The use of Docker can be challenging for developers who are not familiar with Docker or containerization.
- The solution does not provide any performance optimization mechanisms, such as caching or indexing, which can lead to slow performance for large datasets or high traffic.
- The application loads all data from the JSON files into memory when it starts, which could be a problem if the data is very large.


# Considerations for Another Iteration

 For another iteration of the system, I would consider the following improvements:
 
- Add more unit test to improve the quality of the system also integration test.
- Implement authentication and authorization mechanisms to ensure the security of the application.
- Implement error handling mechanisms for the API requests to make it easier to debug errors or issues.
- Consider using a caching mechanism or indexing to optimize the performance of the application for large datasets or high traffic.
- Consider using a different database engine or switching to a NoSQL database if the data requirements or access patterns change.
- Use a monitoring and alerting system such as Prometheus or Datadog to track application metrics and receive notifications of failures or performance issues
- Consider include type-script 
- Include a Frontend implementation to show products Articles and to be able to sell
- If performance becomes an issue, it might be worth optimizing the code by using raw SQL queries or optimizing the Sequelize code.
- Implement pagination or filtering for the /products endpoint to handle large datasets more efficiently.
- If data needs to be imported from external systems, it might be worth exploring other data integration tools or libraries, such as Apache Kafka, Apache Nifi, or AWS Glue.
- By adding dynamic versions in the path, it can ensure that the API is scalable and that existing applications are not affected by changes in future versions. This allows for better management of the API and easier implementation of new features or changes without disrupting existing applications. It also allows for better version control and easier communication with users about which version of the API they are using. Overall, adding dynamic versions in the path is a best practice for building scalable and maintainable APIs7

Scalability
- Implement a load balancer to distribute traffic across multiple instances of the application to handle large volumes of requests.

# Using TypeScript in this solution provides several advantages:

- Type safety: TypeScript provides type checking at compile time, which can catch many errors before runtime. This can reduce the likelihood of  bugs and improve code quality.

- Readability and maintainability: TypeScript's type annotations can make the code more readable and self-documenting. This can make it easier for developers to understand the codebase and maintain it over time.

- IntelliSense support: With TypeScript, IDEs like Visual Studio Code can provide IntelliSense support, giving developers suggestions and auto-completion for variables and functions. This can make coding faster and more efficient.

- Better code organization: TypeScript allows for the use of interfaces, classes, and modules, which can provide better code organization and structure.

- Easier refactoring: With TypeScript, renaming variables or functions can be done safely with the confidence that the compiler will catch any issues. This can make refactoring easier and less error-prone.

- Improved teamwork: TypeScript's explicit type definitions can make it easier for developers to collaborate on the same codebase, as it reduces the likelihood of misunderstandings and miscommunications.

- Overall, using TypeScript can lead to more robust, maintainable, and readable code, which can reduce the likelihood of bugs and make development faster and more efficient.


#APi Details Products


<table>
   <thead>
      <tr>
         <th>Endpoint</th>
         <th>HTTP Method</th>
         <th>Description</th>
         <th>Request Body</th>
         <th>Response Body</th>
         <th>Success Status</th>
         <th>Error Status</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>/api/products</code></td>
         <td>GET</td>
         <td>Get all sellable products</td>
         <td>N/A</td>
         <td><code>{ "products": [ { "id": number, "name": string, "price": number, "createdAt": string, "updatedAt": string, "Articles": [ { "id": number, "name": string, "stock": number, "ProductArticles": { "quantity": number } } ] } ] }</code></td>
         <td>200</td>
         <td>500</td>
      </tr>
      <tr>
         <td><code>/api/products/:id</code></td>
         <td>DELETE</td>
         <td>Sell a product with the given ID</td>
         <td>N/A</td>
         <td>'Product sold successfully'</td>
         <td>204</td>
         <td>404, 409</td>
      </tr>
   </tbody>
</table>

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "products": [
    {
      "id": 1,
      "name": "Product 1",
      "description": "This is the first product",
      "price": 9.99,
      "createdAt": "2022-02-18T12:30:00.000Z",
      "updatedAt": "2022-02-18T13:30:00.000Z",
      "Articles": [
        {
          "id": 1,
          "name": "Article 1",
          "description": "This is the first article",
          "price": 1.99,
          "stock": 50,
          "createdAt": "2022-02-18T12:30:00.000Z",
          "updatedAt": "2022-02-18T13:30:00.000Z",
          "ProductArticles": {
            "productId": 1,
            "articleId": 1,
            "quantity": 1
          }
        },
        {
          "id": 2,
          "name": "Article 2",
          "description": "This is the second article",
          "price": 2.99,
          "stock": 25,
          "createdAt": "2022-02-18T12:30:00.000Z",
          "updatedAt": "2022-02-18T13:30:00.000Z",
          "ProductArticles": {
            "productId": 1,
            "articleId": 2,
            "quantity": 2
          }
        }
      ]
    }
  ]
 }
```

```
HTTP/1.1 204 OK
Content-Type: application/json
  
  { message: 'Product sold successfully' }

```

#APi Details File Import

<table>
   <thead>
      <tr>
         <th>Method</th>
         <th>URL</th>
         <th>HTTP Verb</th>
         <th>Request Body</th>
         <th>Success Response</th>
         <th>Error Response</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>importProductsFromJson</code></td>
         <td><code>/api/files/importProducts</code></td>
         <td>POST</td>
         <td>JSON file (multipart/form-data)</td>
         <td>Status: 201&lt;br&gt;Body: <code>{ message: 'Products imported successfully' }</code></td>
         <td>Status: 400&lt;br&gt;Body: <code>{ error: 'Not uploaded any File' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Failed to create product' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Article with id &lt;art_id&gt; does not exist' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Not enough stock for article with id &lt;art_id&gt;' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Invalid JSON format' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Internal server error' }</code></td>
      </tr>
      <tr>
         <td><code>importInventoryFromJson</code></td>
         <td><code>/api/files/importInventory</code></td>
         <td>POST</td>
         <td>JSON file (multipart/form-data)</td>
         <td>Status: 201&lt;br&gt;Body: <code>{ message: 'Inventory imported successfully' }</code></td>
         <td>Status: 400&lt;br&gt;Body: <code>{ error: 'No file detected' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Invalid JSON format' }</code>&lt;br&gt;or&lt;br&gt;Body: <code>{ error: 'Internal server error' }</code></td>
      </tr>
   </tbody>
</table>
