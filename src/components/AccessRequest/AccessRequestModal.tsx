// src/components/AccessRequest/AccessRequestModal.tsx
import React, { useState } from 'react';
import {
    Backdrop,
    Modal,
    Label,
    Input,
    Textarea,
    Button,
    CloseButton,
} from './AccessRequestModalStyles';
import { ModalTitle } from '../../styles/GlobalComponents';

interface AccessRequestModalProps {
    onClose: () => void;
}

interface FormData {
    linkedIn: string;
    email: string;
    reason: string;
}

interface InputFocusStates {
    linkedIn: boolean;
    email: boolean;
    reason: boolean;
}

const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        linkedIn: '',
        email: '',
        reason: ''
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [inputFocusStates, setInputFocusStates] = useState<InputFocusStates>({
        linkedIn: false,
        email: false,
        reason: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            const res = await fetch('/api/request-access', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.linkedIn,
                    email: formData.email,
                    message: formData.reason
                }),
            });

            const data = await res.json();
            setSubmitting(false);

            if (data.success) {
                setMessage("✅ Request sent! You'll receive an access code via email.");
                setFormData({
                    linkedIn: '',
                    email: '',
                    reason: ''
                });
            } else {
                setMessage("❌ Error sending request. Please try again.");
            }
        } catch (error) {
            setSubmitting(false);
            setMessage("❌ Error sending request. Please try again.");
        }
    };

    const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const handleFocus = (field: keyof InputFocusStates) => {
        setInputFocusStates(prev => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field: keyof InputFocusStates) => {
        setInputFocusStates(prev => ({ ...prev, [field]: false }));
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && e.target instanceof HTMLButtonElement) {
            onClose();
        }
    };

    return (
        <>
            <Backdrop onClick={onClose} aria-label="Close modal backdrop" tabIndex={-1} />
            <Modal
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <ModalTitle>Request Access</ModalTitle>
                <form onSubmit={handleSubmit}>
                    <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                    <Input
                        id="linkedin"
                        type="url"
                        value={formData.linkedIn}
                        onChange={handleInputChange('linkedIn')}
                        required
                        placeholder="https://linkedin.com/in/yourprofile"
                        $focused={inputFocusStates.linkedIn}
                        onFocus={() => handleFocus('linkedIn')}
                        onBlur={() => handleBlur('linkedIn')}
                    />

                    <Label htmlFor="email">Work Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                        placeholder="you@company.com"
                        $focused={inputFocusStates.email}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                    />

                    <Label htmlFor="reason">Reason for Inquiry</Label>
                    <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={handleInputChange('reason')}
                        required
                        rows={3}
                        placeholder="Why do you need access?"
                        $focused={inputFocusStates.reason}
                        onFocus={() => handleFocus('reason')}
                        onBlur={() => handleBlur('reason')}
                    />

                    <Button type="submit" disabled={submitting}>
                        {submitting ? 'Sending...' : 'Submit'}
                    </Button>

                    {message && (
                        <p
                            role="alert"
                            style={{
                                marginTop: '1rem',
                                color: message.startsWith('✅') ? '#4caf50' : '#e53935',
                                fontWeight: '600',
                                userSelect: 'none',
                            }}
                        >
                            {message}
                        </p>
                    )}
                </form>
                <CloseButton
                    onClick={onClose}
                    aria-label="Close modal"
                    onKeyDown={handleKeyDown}
                >
                    ×
                </CloseButton>
            </Modal>
        </>
    );
};

export default AccessRequestModal;