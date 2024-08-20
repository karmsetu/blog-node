import './App.css';
import Article from './components/Article';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="border-red-600 m-4">
                <Article />
            </div>
        </QueryClientProvider>
    );
}

export default App;
