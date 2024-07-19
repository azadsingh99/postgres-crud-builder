const express = require("express");
const crudBuilderControllerFunctionality = require("../controller/crudBuilderController");
const router = express.Router();

const databaseConnectionCode = `
require('dotenv').config();
const mysql = require('mysql2/promise');

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    console.log('MySQL connected successfully');
    return connection;
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
`;

const createBaseFile = async () => {
  try {
    const indexCode = `
            require('dotenv').config();
            const express = require('express');
            const app = express();
            const path = require('path');

            const bodyParser = require('body-parser');
            const crudRouter = require('./route/crudBuilderRouter');

            app.use(bodyParser.json());
            app.use(crudRouter);
            app.use('/public', express.static(path.join(__dirname, './public')));

            app.listen(process.env.PORT, () => {
                console.log('Server is running on port 3001')
            })
        `;

    const folderPath = path.join(__dirname, "../crudFolders/");
    if (!fs.existsSync(folderPath))
      fs.mkdirSync(folderPath, { recursive: true });

    const filePath = path.join(folderPath, `index.js`);
    fs.writeFileSync(filePath, routeCode);

    return `Routes ${name} created at ${filePath}`;
  } catch (err) {}
};

// MYSQL_HOST=your_host
// MYSQL_USER=your_username
// MYSQL_PASSWORD=your_password
// MYSQL_DATABASE=your_database
// const cs = new ConnectionString('mysql://user:password@host:port/dbName');

function generateCreateTableSQL(tableName, fields) {
  // Assuming fields is an array of objects with 'name' and 'type' properties
  const columns = fields
    .map((field) => {
      let sqlType;
      switch (field.type.toLowerCase()) {
        case "string":
          sqlType = "VARCHAR(255)"; // Adjust length as needed
          break;
        case "number":
          sqlType = "INT";
          break;
        case "boolean":
          sqlType = "BOOLEAN";
          break;
        case "date":
          sqlType = "DATE";
          break;
        default:
          sqlType = "VARCHAR(255)";
      }
      return `${field.name} ${sqlType}`;
    })
    .join(", ");

  const createTableSql = `CREATE TABLE ${tableName} (${columns})`;
  return createTableSql;
}
