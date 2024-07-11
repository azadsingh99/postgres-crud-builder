const databaseBuilder = require("../utility/databaseConnectionBuilder");
const indexFileBuilder = require("../utility/indexFileBulider");
const sequelizeModelBuilder = require("../utility/modelBuilder");

const crudBuilderControllerFunctionality = async (req, res) => {
    try{
        const {modelData} = req.body;
        for(let model of modelData){
           await indexFileBuilder(); //function to create the index file for the project
           await databaseBuilder(); //function to make connection with the database

           const name = model.name;
           const fields = model.fields;
           await sequelizeModelBuilder(name, fields) //function to create the models of the project
        }
    }catch(err){
        return res.status(500).json({error : err});
    }
}

module.exports = crudBuilderControllerFunctionality;