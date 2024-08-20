import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import CreateArticle from './pages/CreateArticle.tsx';
import SingleArticle from './pages/SingleArticle.tsx';
import EditArticle from './pages/EditArticle.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: 'articles/new',
        element: <CreateArticle />,
    },
    {
        path: 'articles/:id',
        element: <SingleArticle />,
    },
    {
        path: 'articles/:id/edit',
        element: <EditArticle />,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
