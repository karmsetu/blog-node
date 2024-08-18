import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();
const app = express();

const PORT = env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('hello world');
});

app.listen(PORT, () => {
    console.log(`listening to port: http://localhost:${PORT}`);
});
