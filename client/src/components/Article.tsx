import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Pencil1Icon, SizeIcon, TrashIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { deleteData } from '@/utils/deleteData';

const Article = () => {
    const { isPending, error, data } = useQuery<ApiResponse>({
        queryKey: [],
        queryFn: () =>
            fetch('http://localhost:3000/').then((res) => res.json()),
    });
    if (isPending) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;
    console.log(data);
    return (
        <div className="">
            <h1 className="text-5xl">Articles</h1>
            <Button>
                <Link to={`/articles/new`}>Create new</Link>
            </Button>
            <ArticleCard propData={data} />
        </div>
    );
};

const ArticleCard = ({ propData }: { propData: ApiResponse }) => {
    return propData.body.map((article) => (
        <Card key={article._id}>
            <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>
                    {new Date(article.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>{article.description}</p>
                <div dangerouslySetInnerHTML={{ __html: article.markdown }} />
            </CardContent>
            <CardFooter className="">
                <Button>
                    <Link to={`/articles/${article._id}/edit`}>
                        <Pencil1Icon /> Edit
                    </Link>
                </Button>
                <Button>
                    <Link to={`/articles/${article._id}`}>
                        <SizeIcon /> Show More
                    </Link>
                </Button>
                <Button
                    onClick={() => {
                        deleteData(article._id as string).then(() => {
                            console.log(`article deleted`);
                            window.location.reload();
                        });
                    }}
                >
                    <TrashIcon />
                    Delete
                </Button>
            </CardFooter>
        </Card>
    ));
};

export default Article;
