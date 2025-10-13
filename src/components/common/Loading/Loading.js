// src/components/common/Loading/Loading.js
import React from 'react';
import { LoadingContainer, Spinner } from './LoadingStyles';

const Loading = ({ size = 'medium', message = 'Loading...' }) => {
    return (
        <LoadingContainer>
            <Spinner size={size} />
            {message && <p>{message}</p>}
        </LoadingContainer>
    );
};

export default Loading;