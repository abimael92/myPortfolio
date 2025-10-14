// src/components/NavDropDown/index.tsx
import React from 'react';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { FaLocationArrow } from "react-icons/fa";
import {
  DropDownContainer,
  DropDownIcon,
  DropDownItem,
  DropDownItemDesc,
  DropDownItemTitle,
  DropDownTextContainer
} from './NavDropDown';

interface NavDropDownProps {
  active?: boolean;
}

const NavDropDown: React.FC<NavDropDownProps> = ({ active }) => (
  <DropDownContainer active={active}>
    NavDropDown
  </DropDownContainer>
);


export default NavDropDown;