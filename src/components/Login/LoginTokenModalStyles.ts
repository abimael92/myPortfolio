import styled, { css } from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.85);
  z-index: 99999;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #1e1e1e;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  z-index: 100000;
  color: #e0e0e0;
  width: 360px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.7);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
  transition: all 0.3s ease;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 2rem;
  color: #ccc;
  user-select: none;
`;

const inputBaseStyles = css`
  width: 100%;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1.25rem;
  border-radius: 6px;
  border: 1.5px solid #333;
  background: #222;
  color: #eee;
  font-size: 1%.5;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #4caf50;
    box-shadow: 0 0 6px #4caf50;
  }
`;

export const Input = styled.input`
  ${inputBaseStyles}
`;

export const Textarea = styled.textarea`
  ${inputBaseStyles}
  resize: vertical;
  min-height: 70px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.65rem;
  border-radius: 8px;
  border: none;
  background: #4caf50;
  color: #fff;
  font-weight: 700;
  font-size: 2rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s ease;

  &:disabled {
    background: #2a662a;
    cursor: not-allowed;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  color: #e53935;   /* red color */
  font-size: 3rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  line-height: 1;
  padding: 0;
  
  &:hover {
    color: #b71c1c;
  }
`;

