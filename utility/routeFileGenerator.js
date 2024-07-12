const fs = require('fs');
const path = require('path');

const routerGenerator = (model) => {
    try{
        const routerGeneratorCode = `
            const express = require('express');
            const router = express.Router();

            router.post('/create/${model}', ${model}Creation);
            router.get('/get/${model}', get${model});
            router.patch('/update/${model}', ${model}Updation);
            router.delete('/delete/${model}/:id', delete${model});
            router.get('/getAll/${model}', getAll${model});

            module.exports = router;
        `

        const folderPath = path.join(__dirname, '../crudFolders/routes');
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, `${model}routes.js`);
        fs.writeFileSync(filePath, routerGeneratorCode)

        return (`Routes Generated for ${model}`)
    }catch(err){
        return err;
    }
}

module.exports = routerGenerator;