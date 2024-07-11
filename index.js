const express = require('express');
const app = express();
const crudBuilderRoute = require('./routes/crudBuilderRoute');


app.use(crudBuilderRoute);
app.listen(3000, () => {
    console.log('listening on port 3000');
})