import styled from 'styled-components';
import { BsPalette2 } from 'react-icons/bs'; // Add this line

export const PaletteIconWrapper = styled.div`
	position: relative;
	display: inline-block;
`;

export const PaletteIcon = styled(BsPalette2)`
	font-size: 2rem;
	cursor: pointer;
`;

export const ColorPalettePopup = styled.div`
	position: fixed;
	right: 20px;
	background-color: #0f1624;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	z-index: 10;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px;
	gap: 5px;
	width: 200px;
`;

export const ColorOption = styled.div`
	cursor: pointer;
	border-radius: 4px;
	display: flex;
	flex-direction: column; /* Display items in a column */
	padding: 10px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #2a354a; /* Adjust hover color for better contrast */
	}

	.icon {
		font-size: 1.5rem;
		margin-right: 10px;
	}

	.switch-label {
		margin-left: auto;
		display: flex;
		align-items: center;
	}

	.switch-label-text {
		margin-right: 5px;
	}
`;

export const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: 40px;
	height: 20px;
`;

export const SwitchInput = styled.input`
	opacity: 0;
	width: 0;
	height: 0;

	&:checked + span {
		background-color: #2a354a;
	}

	&:focus + span {
		box-shadow: 0 0 1px #2a354a;
	}
`;

export const SwitchSlider = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #d1d1d1; /* Background color for the slider */
	border-radius: 15px;
	transition: 0.4s;
	cursor: pointer;

	&:before {
		position: absolute;
		content: '';
		height: 18px;
		width: 18px;
		left: 2px;
		bottom: 1px;
		background-color: white; /* Color of the slider button */
		border-radius: 50%;
		transition: 0.4s;
	}

	${SwitchInput}:checked + & {
		background-color: #4caf50; /* Background color when checked */
	}

	${SwitchInput}:checked + &:before {
		transform: translateX(
			20px
		); /* Move the slider button to the right when checked */
	}
`;

export const Icon = styled.div`
	opacity: 0.6;
	transition: opacity 0.3s ease;
`;

export const ModeSwitchWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

export const SwitchContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
`;

export const Title = styled.div`
	text-align: left;
	font-weight: bold;
	margin-bottom: 5px;
`;
export const ColorButtonGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 10px;
	align-items: center;
	justify-content: center;
`;

export const ColorButton = styled.button`
	background-color: ${(props) => props.color};
	border: none;
	border-radius: 10px;
	width: 20px;
	height: 20px;
	cursor: pointer;

	&:not(:last-child) {
		margin-right: 10px;
	}
`;
