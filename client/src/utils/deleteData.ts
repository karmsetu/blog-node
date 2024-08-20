import axios from 'axios';

export const deleteData = async (id: string) => {
    await axios.delete(`http://localhost:3000/articles/${id}/delete`);
};
