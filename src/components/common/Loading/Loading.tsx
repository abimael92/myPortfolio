// src/components/common/Loading/Loading.tsx
import React from 'react';
import { LoadingContainer, Spinner } from './LoadingStyles';
import { LoadingProps } from '../../../types/portfolio';

const Loading: React.FC<LoadingProps> = ({ size = 'medium', message = 'Loading...' }) => {
    return (
        <LoadingContainer>
            <Spinner size={size} />
            {message && <p>{message}</p>}
        </LoadingContainer>
    );
};

export default Loading;