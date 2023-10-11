

const express = require('express');
const app = express();
const { PORT } = require("./config");

const apiRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Server listen on port: ${PORT}`);
});