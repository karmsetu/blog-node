import { RequestDataType } from '@/pages/SingleArticle';
import axios from 'axios';

export const getData = async (id: string) => {
    const data = await axios.get(`http://localhost:3000/articles/${id}`);
    return new Promise<RequestDataType>((resolve) => resolve(data.data));
};
