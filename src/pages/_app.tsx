// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Theme from '../styles/theme';
import ErrorBoundary from '../components/common/ErrorBoundary/ErrorBoundary';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary fallbackMessage="There was a problem loading the portfolio. Please refresh the page.">
            <AuthProvider>
                <Theme>
                    <Component {...pageProps} />
                </Theme>
            </AuthProvider>
        </ErrorBoundary>
    );
}