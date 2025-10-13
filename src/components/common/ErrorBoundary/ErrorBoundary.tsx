// src/components/common/ErrorBoundary/ErrorBoundary.tsx
import React, { ErrorInfo, ReactNode } from 'react';
import { ErrorContainer, ErrorMessage, RetryButton } from './ErrorBoundaryStyles';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallbackMessage?: string;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by boundary:', error, errorInfo);
        this.setState({ errorInfo });
    }

    handleRetry = (): void => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <h2>Something went wrong</h2>
                    <ErrorMessage>
                        {this.props.fallbackMessage || 'An unexpected error occurred.'}
                    </ErrorMessage>
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                        <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
                            {this.state.error.toString()}
                            <br />
                            {this.state.errorInfo?.componentStack}
                        </details>
                    )}
                    <RetryButton onClick={this.handleRetry}>
                        Try Again
                    </RetryButton>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;