import React from 'react';
import styled from 'styled-components';

const BlurDiv = styled.div`
  position: relative;
  /* filter: ${({ authenticated }) => (authenticated ? 'none' : 'blur(3px)')}; */
  filter:'none' ;
  /* pointer-events: ${({ authenticated }) => (authenticated ? 'auto' : 'none')}; */
  /* user-select: ${({ authenticated }) => (authenticated ? 'auto' : 'none')}; */
  transition: filter 0.3s ease, opacity 0.3s ease;
  opacity: ${({ authenticated }) => (authenticated ? 1 : 0.85)};
`;

const Overlay = styled.div`
  display: ${({ authenticated }) => (authenticated ? 'none' : 'flex')};
  display:  'none' ;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width:  100%;
  height: 100%;
  border-radius: 8px;
  /* cursor: not-allowed; */
  background: rgba(255, 255, 255, 0.02);
  z-index: 2;

  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 1.75rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  bottom: 10px;
  z-index: 3;
`;

const Wrapper = styled.div`
  position: relative;
`;

const BlurWrapper = ({ authenticated, children }) =>
  authenticated ? (
    <>{children}</>
  ) : (
    <Wrapper>
      <BlurDiv>{children}</BlurDiv>
      {/* <Overlay>
        <Tooltip>You must unlock to view personal data</Tooltip>
      </Overlay> */}
    </Wrapper>
  );


export default BlurWrapper;
