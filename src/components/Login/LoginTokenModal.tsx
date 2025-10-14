// src/components/Login/LoginTokenModal.tsx
import React, { useState } from 'react';
import {
    Backdrop,
    Modal,
    Label,
    Input,
    Button,
    CloseButton,
} from './LoginTokenModalStyles';
import { ModalTitle } from '../../styles/GlobalComponents';

interface LoginTokenModalProps {
    onClose: () => void;
}

const LoginTokenModal: React.FC<LoginTokenModalProps> = ({ onClose }) => {
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleTokenSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const res = await fetch('/api/validate-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await res.json();
            setSubmitting(false);

            if (data.success) {
                localStorage.setItem('accessToken', token);
                onClose();
            } else {
                setError(data.message || 'Invalid token');
            }
        } catch (err) {
            setSubmitting(false);
            setError('Network error. Please try again.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.target instanceof HTMLButtonElement) {
            onClose();
        }
    };

    return (
        <>
            <Backdrop onClick={onClose} aria-label="Close modal backdrop" tabIndex={-1} />
            <Modal>
                <CloseButton
                    onClick={onClose}
                    onKeyDown={handleKeyDown}
                >
                    ×
                </CloseButton>
                <ModalTitle>Enter Access Token</ModalTitle>
                <form onSubmit={handleTokenSubmit}>
                    <Label htmlFor="token">Enter Access Token</Label>
                    <Input
                        id="token"
                        value={token}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setToken(e.target.value)}
                        required
                        placeholder="Enter token you received"
                    />
                    <Button type="submit" disabled={submitting}>
                        {submitting ? 'Validating...' : 'Access'}
                    </Button>
                    {error && (
                        <p
                            role="alert"
                            style={{
                                color: '#e53935',
                                marginTop: '1rem',
                                fontSize: '1.4rem'
                            }}
                        >
                            {error}
                        </p>
                    )}
                </form>
            </Modal>
        </>
    );
};

export default LoginTokenModal;