// src/styles/GlobalComponents/Button.tsx
import React from 'react';
import { ButtonBack, ButtonFront } from './index';
import { ButtonProps } from '../../types/portfolio';

const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBack alt={props.alt} form={props?.form} disabled={props?.disabled}>
    {props?.children}
    <ButtonFront alt={props?.alt} onClick={props?.onClick} disabled={props?.disabled}>
      {props?.children}
    </ButtonFront>
  </ButtonBack>
);

export default Button;