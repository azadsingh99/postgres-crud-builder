const fs = require('fs');
const path = require('path'); 

const databaseBuilder = async() => {
    try{
        const dbConnectionCode = `
            const { Sequelize } = require('sequelize');
            require('dotenv').config();

            const sequelize = new Sequelize(process.env.POSTGRES_URI, {
                dialect: 'postgres',
                logging: false
            });

            const connectDB = async () => {
                try {
                    await sequelize.authenticate();
                    console.log('PostgreSQL connected successfully');
                } catch (error) {
                    console.error('Error connecting to PostgreSQL:', error.message);
                    process.exit(1);  
                }
            };

            module.exports = { sequelize, connectDB };
        `
        const filePath = path.join(__dirname, '../crudFolder/');
        if(!fs.existsSync(filePath))
            fs.mkdirSync(filePath, { recursive: true });

        const dbConnectionFile = path.join(filePath, `dbConnection.js`);
        fs.writeFileSync(dbConnectionFile, dbConnectionCode);
    }catch(err){
        return err;
    }
}

module.exports = databaseBuilder;