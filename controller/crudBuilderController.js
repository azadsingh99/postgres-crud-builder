const controllerCreation = require("../utility/controllerBuilder");
const databaseBuilder = require("../utility/databaseConnectionBuilder");
const indexFileBuilder = require("../utility/indexFileBulider");
const sequelizeModelBuilder = require("../utility/modelBuilder");
const packageFileGenerator = require("../utility/packageFileBuilder");
const routerGenerator = require("../utility/routeFileGenerator");

const crudBuilderControllerFunctionality = async (req, res) => {
    try{
        const {modelData} = req.body;

        await indexFileBuilder(); //function to create the index file for the project
        await databaseBuilder(); //function to make connection with the database
        await packageFileGenerator(); //function to generate the package.json file for the project.
        
        for(let model of modelData){
            const name = model.name;
            const fields = model.fields;
           
            await sequelizeModelBuilder(name, fields) //function to create the models of the project
            await routerGenerator(name); //function to gegenerate the route for each model individually
            await controllerCreation(name)
        }
    }catch(err){
        return res.status(500).json({error : err});
    }
}

module.exports = crudBuilderControllerFunctionality;