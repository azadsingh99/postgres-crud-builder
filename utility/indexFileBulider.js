const fs = require('fs');
const path = require('path'); 

const indexFileBuilder = async() => {
    try{
        const indexFileBuilderCode = `
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
        `

        const filePath = path.join(__dirname, '../crudFolder/');
        if(!fs.existsSync(filePath))
            fs.mkdirSync(filePath, { recursive: true });

        const indexFilePath = path.join(filePath, `index.js`);
        fs.writeFileSync(indexFilePath, indexFileBuilderCode);
    }catch(err){
        return err;
    }
}

module.exports = indexFileBuilder;