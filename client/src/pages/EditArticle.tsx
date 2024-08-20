import { getData } from '@/utils/getData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RequestDataType } from './SingleArticle';
import FormField from '@/components/FormField';

const EditArticle = () => {
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
    return loading ? (
        <div>...loading</div>
    ) : (
        <FormField formDataProp={data} method="PUT" id={id} />
    );
};

export default EditArticle;
