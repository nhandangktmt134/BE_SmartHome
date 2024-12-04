const express = require('express');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
require('./mqtt/sub');
const cors = require('cors');
const initWebRoutes = require('./routes/web');
const supabase = require('./config/supabaseClient')

const corsOptions = {
    origin: true,
    credentials: true, //access-control-allow-credentials:true
    optionsSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 8081;
const hostname = process.env.HOST_NAME;

app.use(cors(corsOptions));

//config req.body to get data from client
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

initWebRoutes(app);
// console.log(supabase)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});