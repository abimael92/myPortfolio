import styled from 'styled-components';
import {
	SectionTitle,
	SectionText as GlobalSectionText,
} from '../../styles/GlobalComponents';

const remToPixels = (rem: number): number => rem * 16;

export const BulletPoint = styled.span`
	display: inline-block;
	width: 8px;
	height: 8px;
	background-color: #fff;
	border-radius: 50%;
	margin-right: 8px;
`;

export const PersonalInfo = styled.div`
	padding: 15px;

	@media ${(props) => props.theme.breakpoints.sm} {
		padding: 12px 8px;
	}
`;

export const PersonalInfoGrid = styled(PersonalInfo)`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 24px 32px;
	padding: 24px;
	box-sizing: border-box;
	min-width: 0;

	@media ${(props) => props.theme.breakpoints.md} {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px 24px;
		padding: 20px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		grid-template-columns: 1fr;
		gap: 16px 0;
		padding: 12px 0;
	}
`;

export const InfoItem = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	font-size: 16px;
	color: #fff;
	flex-wrap: nowrap;

	svg {
		font-size: 24px;
		min-width: 24px;

		@media ${(props) => props.theme.breakpoints.sm} {
			font-size: 20px;
			min-width: 20px;
		}
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 14px;
		gap: 0.5rem;
	}
`;

export const InfoTitle = styled.h4`
	font-weight: bold;
	display: flex;
	align-items: center;
	font-size: 18.5px;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 20px;
	}
`;

export const InfoDetail = styled.span`
	font-weight: normal;
	font-size: 16.75px;
	padding-left: 4px;
	line-height: 1.4;
	word-break: break-word;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 17.5px;
		padding-left: 2px;
	}
`;

export const Row = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 24px;

	@media ${(props) => props.theme.breakpoints.sm} {
		gap: 16px;
	}
`;

export const RotatingText = styled.h2`
	font-size: 3.5;
	font-weight: bold;
	color: rgb(0, 123, 255);
	margin-top: 1rem;
	font-family: monospace; /* gives typewriter feel */

	.txt-rotate > .wrap {
		display: inline;
		border-right: 0.15em solid rgb(0, 123, 255); /* matches text color */
		white-space: nowrap;
		overflow: hidden;
		animation: blink 0.75s step-end infinite;
	}

	@keyframes blink {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: rgb(0, 123, 255);
		}
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 2.25rem;
		text-align: center;
		margin-top: 0.75rem;
	}
`;

export const StyledSectionTitle = styled(SectionTitle)`
	font-weight: bold;
`;

export const Container = styled.div`
	display: flex;
	flex-wrap: wrap;
	padding: 1rem;

	> * {
		width: 50%;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		flex-direction: column;
		> * {
			width: 100%;
		}
	}
`;

export const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	gap: 1.5rem;

	width: 50%;

	@media ${(props) => props.theme.breakpoints.md} {
		width: auto;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 100%;
		padding: 1rem 0;
	}
`;

export const SectionText = styled.div`
	flex: 1;
	margin-right: 2rem;

	@media ${(props) => props.theme.breakpoints.sm} {
		margin-right: 0;
	}
`;

export const AboutSectionText = styled(GlobalSectionText)`
	width: 50%;
	flex: 1;
	font-weight: 300;
	font-size: 2rem;
	line-height: 1.75;
	padding-bottom: 1.6rem;
	margin-right: 2.6rem;
	color: rgba(255, 255, 255, 0.5);

	strong {
		font-weight: 500;
		color: white;
	}

	.highlight {
		color: #d4a373;
		font-weight: 500;
		font-style: italic;
	}

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 20px;
		line-height: 32px;
		padding-bottom: 1.2rem;
		margin-right: 2.2rem;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 100%;
		font-size: 16px;
		line-height: 24px;
		padding-bottom: 0.8rem;
		margin-right: 0;
	}
`;

export const Image = styled.img`
	display: block;
	width: ${(props) => props.width || '25rem'};
	height: ${(props) => props.height || '25rem'};
	object-fit: cover;
	border-radius: 50%;
	border: 4px solid rgba(255, 255, 255, 0.2);
	box-shadow: 0 0 8px rgba(255, 255, 255, 0.4);
	filter: grayscale(30%) contrast(90%) brightness(95%);

	@media ${(props) => props.theme.breakpoints.md} {
		width: ${(props) => props.width || '20rem'};
		height: ${(props) => props.height || '20rem'};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		margin-left: 0;
		margin-top: 1rem;
		/* max-width: 90%; */
		width: ${(props) => props.width || '25rem'};
		height: ${(props) => props.height || '25rem'};
	}
`;

export const ImageNeon = styled.div`
	position: relative;
	display: inline-flex;
	width: ${remToPixels(16)}px;
	height: ${remToPixels(16)}px;
	border-radius: 50%;
	overflow: hidden;
	margin: 1rem;
	align-items: center;
	justify-content: center;
	padding: 2rem;

	&::before,
	&::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		z-index: -1;
		animation: rotate 10s linear infinite;
		box-shadow: 0 0 20px rgba(4, 217, 255, 0.8);
	}

	&::before {
		width: calc(100% + 200px);
		height: calc(100% + 20px);
		animation: rotate 4s linear infinite;
		background: conic-gradient(
			from 0deg,
			rgba(4, 217, 255, 0),
			rgba(4, 217, 255, 1) 30%,
			transparent 30%
		);
		box-shadow: 0 0 20px rgba(4, 217, 255, 0.8);
	}

	&::after {
		width: calc(100% + 40px);
		height: calc(100% + 40px);
		border: 2px solid rgba(4, 217, 255, 0.6);
		background: transparent;
		box-shadow: 0 0 30px rgba(4, 217, 255, 0.8);
		animation: rotate 6s linear infinite;
	}

	&.neon-small::before {
		width: calc(100% + 15px);
		height: calc(100% + 15px);
		border: 2px solid rgba(173, 216, 230, 0.6);
		animation: rotate 6s linear infinite;
	}

	&.neon-medium::before {
		width: calc(100% + 25px);
		height: calc(100% + 25px);
		border: 3px solid rgba(173, 216, 230, 0.8);
		animation: rotate 5s linear infinite;
	}

	&.neon-large::before {
		width: calc(100% + 35px);
		height: calc(100% + 35px);
		border: 4px solid rgba(173, 216, 230, 0.9);
		animation: rotate 4s linear infinite;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.6;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	@media ${(props) => props.theme.breakpoints.md} {
		width: 20rem;
		height: 20rem;
		padding: 0.75rem;
		margin: 0 auto;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 28rem;
		height: 28rem;
		padding: 1rem;
		margin: 0 auto;
	}
`;
