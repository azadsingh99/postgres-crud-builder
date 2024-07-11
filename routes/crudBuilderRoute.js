const express = require('express');
const crudBuilderControllerFunctionality = require('../controller/crudBuilderController');
const router = express.Router();


router.post('/api/builder', crudBuilderControllerFunctionality);