import express, { NextFunction, Request, Response } from 'express';
import dummyData, { DataType } from '../utils/data';
import { database } from '..';
import {
    ClientDataType,
    removeExtraFields,
    validateDataType,
} from '../utils/fieldValidater';

const router = express.Router();

router.post('/new', async (req: Request, res: Response) => {
    const { title, description, markdown } = req.body;
    if (!title || !markdown)
        return res.status(500).json({ message: `incomplete field` });
    const data = await database.createNew(title, description ?? '', markdown);
    if (data.error) {
        res.status(data.error.statusCode).json({ message: data.error.message });
    }
    return res.status(200).send({ message: data.body.id });
    res.redirect(`/articles/${data.body.id}`);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const data = await database.getArticleById(req.params.id);
    if (data.error) {
        return res
            .status(data.error.statusCode)
            .json({ message: data.error.message });
    }
    return res.status(200).json(data.body);
});

router.put('/:id/edit', async (req: Request, res: Response) => {
    const { id } = req.params;
    const object = req.body;
    if (!validateDataType(object)) {
        return res
            .status(400)
            .json({ error: 'Invalid fields in the request body' });
    }

    // Optionally remove extra fields if you don't want to throw an error
    const sanitizedData: ClientDataType = removeExtraFields(object);
    const data = await database.editArticle(id, sanitizedData);
    if (data.error) {
        return res
            .status(data.error.statusCode)
            .json({ message: data.error.message });
    }
    return res.status(200).json({ message: data.body });
});

router.delete('/:id/delete', async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await database.deleteArticle(id);
    if (data.error) {
        return res.status(data.error.statusCode).json({
            message: data.error.message,
        });
    }
    return res.status(200).json({ message: data });
});

export default router;
