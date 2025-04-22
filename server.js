const express = require ('express');
const app = express();
const  authRoutes = require('./routes/authRoutes/authentication');
const  eventRoutes = require('./routes/eventRoutes/events');
const getConnection = require('./utils/getConnection');

require('dotenv').config();

getConnection();
app.use(express.json());

app.use('/api/auth/',authRoutes);
app.use('api/events/', eventRoutes);


app.listen(5000,()=>console.log('server is listening at port 5000'));