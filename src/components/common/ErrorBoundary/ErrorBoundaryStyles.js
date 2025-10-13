// src/components/common/ErrorBoundary/ErrorBoundaryStyles.js
import styled from 'styled-components';

export const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
    text-align: center;
    background: rgba(255, 0, 0, 0.1);
    border-radius: 8px;
    margin: 1rem;
    
    h2 {
        color: #ff6b6b;
        margin-bottom: 1rem;
    }
`;

export const ErrorMessage = styled.p`
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.4rem;
    margin-bottom: 2rem;
    max-width: 500px;
`;

export const RetryButton = styled.button`
    background: linear-gradient(270deg, #00DBD8 0%, #B133FF 100%);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    font-size: 1.4rem;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover {
        transform: translateY(-2px);
    }
`;