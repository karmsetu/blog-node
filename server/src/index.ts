import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { env } from 'process';
import articleRouter from './routes/articles';
import DataBase, { DataBaseError, DataBaseResponse } from './db';
dotenv.config();

export const database = new DataBase('blog');
export type DataType = {
    id?: number;
    title?: string;
    createdAt?: number;
    description?: string;
};
database.connect();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/articles', articleRouter);
const PORT = env.PORT || 3000;

app.get('/', async (req: Request, res: Response) => {
    const data = await database.getArticle();
    if (data.error) {
        res.json({ message: data.error.message }).sendStatus(
            data.error.statusCode
        );
    }
    res.json({
        body: data.body,
    });
});

app.listen(PORT, () => {
    console.log(`listening to port: http://localhost:${PORT}`);
});
