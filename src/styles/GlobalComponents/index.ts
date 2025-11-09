// src/styles/GlobalComponents/index.ts
import styled from 'styled-components';

interface SectionProps {
	grid?: boolean;
	row?: boolean;
	nopadding?: boolean;
}

interface SectionTitleProps {
	main?: boolean;
	center?: boolean;
}

interface SectionDividerProps {
	colorAlt?: boolean;
	divider?: boolean;
}

interface ButtonBackProps {
	alt?: boolean;
	form?: string;
	disabled?: boolean;
}

interface ButtonFrontProps {
	alt?: boolean;
	disabled?: boolean;
}

interface LinkContainerProps {
	large?: boolean;
}

interface LinkIconImgProps {
	large?: boolean;
	nav?: boolean;
}

export const Section = styled.section<SectionProps>`
	display: ${(props) => (props.grid ? 'grid' : 'flex')};
	flex-direction: ${(props) => (props.row ? 'row' : 'column')};
	padding: ${(props) => (props.nopadding ? '0' : '32px 48px 0')};
	margin: 0 auto;
	max-width: 1040px;
	box-sizing: content-box;
	position: relative;
	overflow: hidden;
	grid-template-columns: 1fr 1fr;

	@media ${(props) => props.theme.breakpoints.md} {
		padding: 24px 48px 0;
		flex-direction: column;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		padding: ${(props) => (props.nopadding ? '0' : '16px 16px 0')};
		width: calc(100vw - 32px);
		flex-direction: column;
	}
`;

export const SectionTitle = styled.h2<SectionTitleProps>`
	font-weight: 800;
	font-size: ${(props) => (props.main ? '65px' : '56px')};
	line-height: ${(props) => (props.main ? '72px' : '56px')};
	margin-top: 100px;
	width: max-content;
	max-width: 100%;
	background: linear-gradient(
		121.57deg,
		rgba(0, 240, 255, 0.75) 18.77%,
		rgba(0, 240, 255, 0.55) 60.15%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-bottom: 16px;
	padding: ${(props) => (props.main ? '58px 0 16px' : '0')};

	${(props) =>
		props.center &&
		`
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    `}

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: ${(props) => (props.main ? '56px' : '48px')};
		line-height: ${(props) => (props.main ? '56px' : '48px')};
		margin-bottom: 12px;
		padding: ${(props) => (props.main ? '40px 0 12px' : '0')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 32px;
		line-height: 40px;
		margin-top: 50px;
		font-size: ${(props) => (props.main ? '28px' : '32px')};
		line-height: ${(props) => (props.main ? '32px' : '40px')};
		margin-bottom: 8px;
		padding: ${(props) => (props.main ? '16px 0 8px' : '0')};
		max-width: 100%;
	}
`;

export const SectionTitle2 = styled.h2<SectionTitleProps>`
	font-weight: 800;
	font-size: ${(props) => (props.main ? '65px' : '56px')};
	line-height: ${(props) => (props.main ? '72px' : '56px')};
	margin-top: 10px;
	width: max-content;
	max-width: 100%;
	background: linear-gradient(
		121.57deg,
		#ffffff 18.77%,
		rgba(255, 255, 255, 0.66) 60.15%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-bottom: 16px;
	padding: ${(props) => (props.main ? '58px 0 16px' : '0')};

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: ${(props) => (props.main ? '56px' : '48px')};
		line-height: ${(props) => (props.main ? '56px' : '48px')};
		margin-bottom: 12px;
		padding: ${(props) => (props.main ? '40px 0 12px' : '0')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 32px;
		line-height: 40px;
		font-size: ${(props) => (props.main ? '28px' : '32px')};
		line-height: ${(props) => (props.main ? '32px' : '40px')};
		margin-bottom: 8px;
		padding: ${(props) => (props.main ? '16px 0 8px' : '0')};
		max-width: 100%;
	}
`;

export const SectionSubtitle = styled.h3<SectionTitleProps>`
	font-weight: 600;
	font-size: ${(props) => (props.main ? '55px' : '46px')};
	line-height: ${(props) => (props.main ? '52px' : '36px')};
	width: max-content;
	margin: 100px 0 16px;
	height: 50px;
	max-width: 100%;
	background: linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	padding: ${(props) => (props.main ? '18px 0 16px' : '0')};
	background-clip: text;
	text-fill-color: transparent;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: ${(props) => (props.main ? '56px' : '48px')};
		line-height: ${(props) => (props.main ? '56px' : '48px')};
		padding: ${(props) => (props.main ? '40px 0 12px' : '0')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 32px;
		line-height: 40px;
		font-size: ${(props) => (props.main ? '28px' : '32px')};
		line-height: ${(props) => (props.main ? '32px' : '40px')};
		padding: ${(props) => (props.main ? '16px 0 8px' : '0')};
		max-width: 100%;
	}
`;

export const ModalTitle = styled.h3<SectionTitleProps>`
	font-weight: 500;
	font-size: ${(props) => (props.main ? '45px' : '36px')};
	line-height: ${(props) => (props.main ? '45px' : '36px')};
	width: max-content;
	margin: 20px;
	max-width: 100%;
	padding: ${(props) => (props.main ? '58px 0 16px' : '0')};
	background-clip: text;
	color: rgba(0, 240, 255, 0.75);

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: ${(props) => (props.main ? '56px' : '48px')};
		line-height: ${(props) => (props.main ? '56px' : '48px')};
		padding: ${(props) => (props.main ? '40px 0 12px' : '0')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 32px;
		line-height: 40px;
		font-size: ${(props) => (props.main ? '28px' : '32px')};
		line-height: ${(props) => (props.main ? '32px' : '40px')};
		padding: ${(props) => (props.main ? '16px 0 8px' : '0')};
		max-width: 100%;
	}
`;

export const SectionText = styled.p`
	max-width: 800px;
	font-size: 20px;
	line-height: 1.6;
	font-weight: 300;
	padding-bottom: 3.6rem;
	color: rgba(255, 255, 255, 0.75);
	white-space: pre-line;

	strong {
		font-weight: 600;
		color: white;
	}

	em {
		font-style: italic;
		color: #00f0ff; /* neon cyan */
		font-weight: 500;
		background-color: rgba(0, 240, 255, 0.1); /* subtle neon glow */
		padding: 2px 4px;
		border-radius: 4px;
	}

	.highlight {
		color: #1e90ff; /* shiny brownish */
		font-weight: 500;
		font-style: bold;
	}

	@media (max-width: 768px) {
		font-size: 18px;
		line-height: 1.5;
		padding-bottom: 2.4rem;
		max-width: 90%;
	}

	@media (max-width: 480px) {
		font-size: 16px;
		line-height: 1.4;
		padding-bottom: 2rem;
		max-width: 100%;
	}
`;

export const SectionSmallText = styled.p`
	font-size: 16px;
	line-height: 22px;
	letter-spacing: 0.02em;
	color: rgba(255, 255, 255, 0.75);
	padding-right: 16px;
	margin-top: 10px;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 12px;
		line-height: 18px;
		padding-right: 32px;
	}
	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 10px;
		line-height: 16px;
		padding-right: 0;
	}
`;

export const SectionDivider = styled.div<SectionDividerProps>`
	width: 184px;
	padding-bottom: 12px;
	margin-bottom: 5rem;
	height: 6px;
	border-radius: 10px;
	background-color: #fff;
	background: ${(props) =>
		props.colorAlt
			? 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)'
			: 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'};

	margin: ${(props) => (props.divider ? '4rem 0' : '')};

	@media ${(props) => props.theme.breakpoints.md} {
		width: 48px;
		height: 4px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 32px;
		height: 2px;
	}
`;

export const SectionSubText = styled.p`
	max-width: 800px;
	font-weight: 300;
	font-size: 18px;
	line-height: 32px;
	color: rgba(255, 255, 255, 0.75);

	@media ${(props) => props.theme.breakpoints.md} {
		max-width: 672px;
		font-size: 16px;
		line-height: 25px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 14px;
		line-height: 22px;
	}
`;

export const SecondaryBtn = styled.button`
	color: #fff;
	background: none;
	border: 1px solid rgba(255, 255, 255, 0.33);
	box-sizing: border-box;
	border-radius: 999px;
	padding: 16px 24px;
	font-weight: 600;
	font-size: 18px;
	line-height: 16px;
	width: fit-content;
	margin-top: 32px;
	margin-bottom: 80px;
	cursor: pointer;
	transition: 0.4s ease;

	&:focus {
		outline: none;
	}

	&:hover {
		color: #0f1624;
		background: #fff;
		border: 1px solid #fff;
	}

	&:active {
		background: #e0e4eb;
		border: 1px solid #304169;
		box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
			inset 0px 0px 4px rgba(20, 20, 55, 0.3);
	}

	@media ${(props) => props.theme.breakpoints.md} {
		margin-top: 24px;
		margin-bottom: 64px;
		padding: 16px 24px;
		width: fit-content;
		font-size: 20px;
		line-height: 20px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		margin-top: 16px;
		margin-bottom: 40px;
		padding: 8px 16px;
		width: 100%;
		font-size: 14px;
		line-height: 16px;
	}
`;

export const ButtonBack = styled.div<ButtonBackProps>`
	width: ${({ alt }) => (alt ? '150px' : '262px')};
	height: ${({ alt }) => (alt ? '52px' : '64px')};
	border-radius: 50px;
	font-size: ${({ alt }) => (alt ? '20px' : '24px')};
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 3rem;
	color: #fff;
	background: ${({ alt }) =>
		alt
			? 'linear-gradient(270deg, #ff622e 0%, #B133FF 100%)'
			: 'linear-gradient(270deg, #00DBD8 0%, #B133FF 100%)'};
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;

	&:hover {
		color: #ff4500 !important;
		box-shadow: 0 0 10px rgba(255, 255, 255, 1);
	}

	@media ${(props) => props.theme.breakpoints.md} {
		width: ${({ alt }) => (alt ? '150px' : '184px')};
		height: ${({ alt }) => (alt ? '52px' : '48px')};
		font-size: ${({ alt }) => (alt ? '20px' : '16px')};
		margin-bottom: ${({ alt }) => (alt ? '0' : '64px')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 100%;
		height: 32px;
		font-size: 14px;
		margin-bottom: ${({ alt }) => (alt ? '0' : '32px')};
	}
`;

export const ButtonFront = styled.button<ButtonFrontProps>`
	border: none;
	border-radius: 50px;
	color: #fff;
	display: flex;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${({ alt }) =>
		alt
			? 'linear-gradient(270deg, #F46737 0%, #945DD6 100%)'
			: 'linear-gradient(270deg, #13ADC7 0%, #945DD6 100%)'};
	opacity: ${({ disabled }) => (disabled ? '.5' : '1')};
	transition: 0.4s ease;
	font-size: ${({ alt }) => (alt ? '20px' : '24px')};
	font-weight: 600;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: ${({ disabled }) =>
		disabled
			? 'inset 0px 2px 1px rgba(46, 49, 55, 0.15), inset 0px 0px 4px rgba(20, 20, 55, 0.3)'
			: 'none'};

	&:hover {
		color: #ff4500 !important;
	}

	&:focus {
		box-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
		transform: scale(0.98);
		outline: none;
	}

	&:active {
		opacity: 1;
		box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
			inset 0px 0px 4px rgba(20, 20, 55, 0.3);
	}

	&:disabled {
		background: linear-gradient(270deg, #00dbd8 0%, #b133ff 100%);
		opacity: 0.5;
		box-shadow: inset 0px 2px 1px rgba(46, 49, 55, 0.15),
			inset 0px 0px 4px rgba(20, 20, 55, 0.3);
	}

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: ${({ alt }) => (alt ? '20px' : '16px')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 14px;
	}
`;

export const LinkContainer = styled.div<LinkContainerProps>`
	margin-left: ${({ large }) => (large ? '24px' : '16px')};
	transition: 0.3s ease;
	justify-content: center;
	border-radius: 50px;
	padding: 8px;

	&:hover {
		background-color: #212d45;
		transform: scale(1.2);
		cursor: pointer;
	}

	@media ${(props) => props.theme.breakpoints.md} {
		margin-left: ${({ large }) => (large ? '16px' : '8px')};
	}
	@media ${(props) => props.theme.breakpoints.sm} {
		margin-left: ${({ large }) => (large ? '0' : '8px')};
	}
`;

export const LinkIconImg = styled.div<LinkIconImgProps>`
	display: flex;
	height: ${({ large }) => (large ? '32px' : '24px')};

	@media ${(props) => props.theme.breakpoints.md} {
		height: ${({ nav }) => (nav ? '16px' : '24px')};
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		height: ${({ large }) => (large ? '32px' : '16px')};
	}
`;
