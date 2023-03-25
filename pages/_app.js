import '@/styles/globals.css';
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

//create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Navbar/>
                <Component {...pageProps} />
                <Footer/>
            </Provider>
        </QueryClientProvider>
    );
}
