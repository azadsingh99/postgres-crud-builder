const fs = require('fs');
const path = require('path');
const { DataTypes } = require('sequelize');

const sequelizeModelBuilder = async (modelName, fields) => {
    const schemaDefinition = {};

    fields.forEach(field => {
        const fieldName = Object.keys(field)[0];
        const fieldProperties = field[fieldName];
        let fieldType;

        switch (fieldProperties.type.toLowerCase()) {
            case 'string':
                fieldType = DataTypes.STRING;
                break;
            case 'number':
                fieldType = DataTypes.INTEGER;
                break;
            case 'boolean':
                fieldType = DataTypes.BOOLEAN;
                break;
            case 'date':
                fieldType = DataTypes.DATE;
                break;
            case 'array':
                fieldType = DataTypes.ARRAY(DataTypes[fieldProperties.itemType.toUpperCase()] || DataTypes.STRING);
                break;
            default:
                fieldType = DataTypes.STRING;
        }

        schemaDefinition[fieldName] = {
            type: fieldType,
            allowNull: fieldProperties.required !== true,
            unique: fieldProperties.unique || false
        };
    });

    const modelCode = `
        const { DataTypes } = require('sequelize');
        const sequelize = require('../db').sequelize;

        const ${modelName} = sequelize.define('${modelName}', ${JSON.stringify(schemaDefinition, null, 2)}, {
            tableName: '${modelName.toLowerCase()}',
            timestamps: false
        });

        module.exports = ${modelName};
    `;

    const folderPath = path.join(__dirname, '../crudFolders/model');

    if (!fs.existsSync(folderPath))
        fs.mkdirSync(folderPath, { recursive: true });

    const filePath = path.join(folderPath, `${modelName}.js`);
    fs.writeFileSync(filePath, modelCode);

    return (`Model ${modelName} created at ${filePath}`);
};

module.exports = sequelizeModelBuilder;
