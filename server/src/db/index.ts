import mongoose from 'mongoose';
import articleModel from './models/article.model';
import { DataType } from '..';

export type DataBaseError = {
    statusCode: number;
    type: string;
    message: string;
} | null;

export type DataBaseResponse = {
    error: DataBaseError;
    body: any | null;
};

class DataBase {
    path: string;
    constructor(path: string) {
        this.path = `mongodb://localhost/${path}`;
    }

    connect = async (): Promise<DataBaseResponse> => {
        try {
            await mongoose.connect(this.path);
            console.log(`connected`);
            return { body: { message: `connected` }, error: null };
        } catch (error) {
            return {
                error: {
                    statusCode: 500,
                    type: 'DatabaseConnectionError',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
                body: null,
            };
        }
    };

    createNew = async (
        title: string,
        description: string,
        markdown: string
    ): Promise<DataBaseResponse> => {
        const article = new articleModel({
            title,
            description,
            markdown,
        });
        try {
            const result = await article.save();
            return {
                error: null,
                body: { id: result.id },
            };
        } catch (error) {
            return {
                error: {
                    statusCode: 500,
                    type: 'DatabaseAddObjectError',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
                body: null,
            };
        }
    };

    getArticle = async (): Promise<DataBaseResponse> => {
        try {
            const result = await articleModel.find({});
            if (!result)
                return {
                    error: {
                        statusCode: 400,
                        type: 'Bad Client request',
                        message: `no id found`,
                    },
                    body: null,
                };
            return {
                error: null,
                body: result,
            };
        } catch (error) {
            return {
                error: {
                    statusCode: 500,
                    type: 'Unable to fetch articles',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
                body: null,
            };
        }
    };

    getArticleById = async (id: string): Promise<DataBaseResponse> => {
        console.log(id);
        try {
            const result = await articleModel.findById(id);

            if (!result)
                return {
                    body: null,
                    error: {
                        statusCode: 400,
                        type: 'Bad Client request',
                        message: `no id found`,
                    },
                };
            return {
                error: null,
                body: {
                    title: result?.title,
                    description: result?.description,
                    markdown: result?.sanitizedHTML,
                    createdAt: result?.createdAt,
                },
            };
        } catch (error) {
            return {
                body: null,
                error: {
                    statusCode: 500,
                    type: 'Unable to fetch articles',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
            };
        }
    };

    editArticle = async (
        id: string,
        updatedObject: Omit<DataType, 'createdAt'>
    ): Promise<DataBaseResponse> => {
        try {
            const result = await articleModel.findByIdAndUpdate(id, {
                ...updatedObject,
            });
            if (!result)
                return {
                    error: {
                        statusCode: 400,
                        type: 'Bad Client request',
                        message: `no id found`,
                    },
                    body: null,
                };
            return {
                error: null,
                body: result,
            };
        } catch (error) {
            return {
                error: {
                    statusCode: 500,
                    type: 'Unable to fetch articles',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
                body: null,
            };
        }
    };

    deleteArticle = async (id: string): Promise<DataBaseResponse> => {
        try {
            const result = await articleModel.findByIdAndDelete(id);
            if (!result)
                return {
                    error: {
                        statusCode: 400,
                        type: 'Bad Client request',
                        message: `no id found`,
                    },
                    body: null,
                };
            return {
                error: null,
                body: result,
            };
        } catch (error) {
            return {
                error: {
                    statusCode: 500,
                    type: 'Unable to delete articles',
                    message:
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred',
                },
                body: null,
            };
        }
    };
}

export default DataBase;
