import styled from 'styled-components';

export const LeftSection = styled.div`
  width: 100%;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 80%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
  @media ${(props) => props.theme.breakpoints.md} {
    width: 100%;
    display: flex;
    flex-direction: column;

    margin: 0 auto;
  }
`;


export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: column; /* Stack items vertically */
	align-items: center; /* Center items horizontally */

	min-width: 350px; /* or set a fixed width */
	width: 350px;

  margin: 0 auto;

	@media ${(props) => props.theme.breakpoints.md} {

		justify-content: flex-start;
	}
`;
