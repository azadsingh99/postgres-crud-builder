const databaseBuilder = require("../utility/databaseConnectionBuilder");
const indexFileBuilder = require("../utility/indexFileBuliding");

const crudBuilderControllerFunctionality = async (req, res) => {
    try{
        const {modelData} = req.body;
        for(let model of modelData){
           await indexFileBuilder(); //function to create the index file for the project
           await databaseBuilder(); //function to make connection with the database
        }
    }catch(err){
        return res.status(500).json({error : err});
    }
}

module.exports = crudBuilderControllerFunctionality;