# postgres-crud-builder

`postgres-crud-builder` is a comprehensive Node.js library designed to simplify the creation of CRUD (Create, Read, Update, Delete) operations for PostgreSQL databases using Sequelize ORM. This library allows developers to dynamically create PostgreSQL models and their corresponding CRUD APIs with minimal setup. By passing the model name and fields from the frontend or Postman, `postgres-crud-builder` will automatically generate the model and RESTful API endpoints using Node.js. This package provides a flexible and user-friendly API that allows developers to quickly set up CRUD operations without the need to write repetitive code.

## Features

- **Ease of Use**: Simplifies the process of creating CRUD operations with minimal configuration and setup.
- **Dynamic Model Creation**: Supports dynamic schema definitions, allowing you to create models on-the-fly by specifying the model name and fields.
- **Seamless Integration**: Works seamlessly with Sequelize, leveraging its powerful features for model management and data manipulation.
- **Automatic CRUD API Generation**: Automatically generates RESTful API endpoints for each model, facilitating quick API development.
- **Validation**: Integrates with Sequelize to offer comprehensive schema validation, ensuring data integrity and consistency.
- **Error Handling**: Implements robust error handling mechanisms for database operations, enhancing the reliability of your application.
- **Extensibility**: Easily extendable to add custom methods, middleware, and additional functionality to suit your specific needs.
- **Scalability**: Designed to handle a wide range of use cases, from simple applications to complex systems.

## Installation

You can install `postgres-crud-builder` using npm. Run the following command in your project directory:

```sh
npm install sequelize pg pg-hstore
