import { ApiData } from '@/types';
import { useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
// import {redirect} from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormField = ({
    formDataProp,
    method,
    id,
}: {
    formDataProp?: Omit<ApiData, '_id' | 'createdAt'>;
    method: 'POST' | 'PUT';
    id?: string;
}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<
        Omit<ApiData, '_id' | 'createdAt'>
    >({
        title: formDataProp ? formDataProp.title : '',
        description: formDataProp ? formDataProp.description : '',
        markdown: formDataProp ? formDataProp.markdown : '',
    });
    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        if (method === 'POST') {
            try {
                const result = await axios.post(
                    'http://localhost:3000/articles/new',
                    formData
                );
                // return redirect(`/articles/${result.data.message}`);
                // return <Navigate to={`/articles/${result.data.message}`} />;
                navigate(`/articles/${result.data.message}`);
            } catch (error) {
                console.log(error);
            }
        }

        if (method === 'PUT') {
            try {
                const result = await axios.put(
                    `http://localhost:3000/articles/${id}/edit`,
                    formData
                );
                console.log(result);

                // return redirect(`/articles/${result.data.message}`);
                // return <Navigate to={`/articles/${result.data.message}`} />;
                navigate(`/articles/${id}`);
            } catch (error) {
                console.log(error);
            }
        }
        // Here you can handle the form submission, e.g., send the data to an API
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Label htmlFor="title">Title:</Label>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="description">Description:</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <Label htmlFor="markdown">Markdown:</Label>
                <Textarea
                    id="markdown"
                    name="markdown"
                    value={formData.markdown}
                    onChange={handleChange}
                    required
                />
            </div>
            <Button type="submit">Submit</Button>
        </form>
    );
};

export default FormField;
