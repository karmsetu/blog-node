import { Button } from '@/components/ui/button';
import { ApiData } from '@/types';
import { deleteData } from '@/utils/deleteData';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export type RequestDataType = Omit<ApiData, '_id'>;

const SingleArticle = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<RequestDataType>({
        createdAt: '',
        description: '',
        markdown: '',
        title: '',
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getData(id as string).then((res) => {
            setData({ ...res });
            setLoading(false);
        });
    }, []);
    return (
        <div>
            {loading ? (
                <h1>Loading</h1>
            ) : (
                <>
                    <div>
                        <h1>{data.title}</h1>
                        <span>{data.createdAt}</span>
                        <p>{data.description}</p>
                        <div
                            dangerouslySetInnerHTML={{ __html: data.markdown }}
                        />
                    </div>
                    <div>
                        <Button onClick={() => navigate('/')}>Go Back</Button>
                        <Button
                            onClick={() => navigate(`/articles/${id}/edit`)}
                        >
                            edit
                        </Button>
                        <Button
                            onClick={() => {
                                if (id === undefined) alert(`wrong page`);
                                deleteData(id as string).then(() =>
                                    navigate('/')
                                );
                            }}
                        >
                            delete
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

const getData = async (id: string) => {
    const data = await axios.get(`http://localhost:3000/articles/${id}`);
    return new Promise<RequestDataType>((resolve) => resolve(data.data));
};

export default SingleArticle;
