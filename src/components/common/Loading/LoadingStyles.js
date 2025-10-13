// src/components/common/Loading/LoadingStyles.js
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    
    p {
        margin-top: 1rem;
        color: rgba(255, 255, 255, 0.7);
        font-size: 1.4rem;
    }
`;

export const Spinner = styled.div`
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid #00d4ff;
    border-radius: 50%;
    width: ${props => {
        switch (props.size) {
            case 'small': return '24px';
            case 'large': return '48px';
            default: return '32px';
        }
    }};
    height: ${props => {
        switch (props.size) {
            case 'small': return '24px';
            case 'large': return '48px';
            default: return '32px';
        }
    }};
    animation: ${spin} 1s linear infinite;
`;