const express = require('express');
const path = require('path');

const pathToDistFolder = path.join(__dirname, '../unit-8-assignment/dist');

const app = express();

const data = {
    message: "Hello, World!",
    success: true
};

const logRoutes = (req, res, next) => {
    const time = (new Date()).toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
};


const serveStatic = express.static(pathToDistFolder);

const serveData = (req, res, next) => res.send(data);
const serveHello = (req, res, next) => {
    const name = req.query.name || "stranger";
    res.send(`hello ${name}`);
}


app.use(logRoutes);
app.use(serveStatic);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);


const port = 8080;
app.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}`);
});
