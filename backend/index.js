import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Models/db.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
connectDB();
dotenv.config();

const app = express();


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('Hello World!');
});

app.use(bodyParser.json());
app.use(cors("*"));  
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


