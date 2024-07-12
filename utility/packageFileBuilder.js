const packageFileGenerator = () => {
    try{
        const packageFileCode = `
            {
                "name": "postgres-crud-builder",
                "version": "1.0.0",
                "main": "index.js",
                "scripts": {
                    "start" : "node index.js",
                    "test": "echo \"Error: no test specified\" && exit 1"
                },
                "keywords": [],
                "author": "",
                "license": "ISC",
                "description": "",
                "dependencies": {}
            }
        `

        const folderPath = path.join(__dirname, '../crudBuilder/')
        if(!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, {recursive : true})
        }

        const filePath = path.join(folderPath, 'package.json');
        fs.writeFileSync(filePath, packageFileCode);

        return (`Pakage File Generated for the Project...`)
    }catch(err){
        return err;
    }
}

module.exports = packageFileGenerator;