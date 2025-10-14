// src/components/Experience/ExperienceStyles.ts
import styled from 'styled-components';

interface TimeLineContainerProps {
	index: number;
	active: number;
}

interface CarouselButtonProps {
	index: number;
	active: number;
}

interface CarouselItemProps {
	index: number;
	active: number;
}

interface CarouselItemDotProps {
	active: boolean;
}

interface CarouselLineProps {
	active: boolean;
	isFirst: boolean;
	isLast: boolean;
}

export const TimeLineContainer = styled.div<TimeLineContainerProps>`
	top: 0;
	z-index: 2;
	height: auto;
	min-width: 80%;
	position: relative;
	overflow: visible;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0.5rem 0;
	padding: 2rem;

	@media (max-width: 768px) {
		padding: 1rem;
		min-width: 100%;
		height: 520px;
		margin: 0;
		box-sizing: border-box;
	}
`;

export const CarouselContainer = styled.div`
	display: flex;
	overflow-x: auto;
	scroll-behavior: smooth;
	padding: 0;
	margin: 0 auto;
	width: 100%;
	box-sizing: border-box;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const CarouselButtons = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin: 0 3rem;

	@media (max-width: 480px) {
		display: none;
	}
`;

export const CarouselButton = styled.button<CarouselButtonProps>`
	box-sizing: border-box;
	background: none;
	font-size: 800;
	padding: 4px;
	border-radius: 30px;
	border: none;
	cursor: pointer;
	margin: 0 4px;
	opacity: ${(props) => (props.active === props.index ? `1` : `.33`)};
	transform: ${(props) =>
		props.active === props.index ? `scale(1.6)` : `scale(1)`};
	color: white;

	&:hover {
		box-shadow: 0 0 10px rgba(255, 255, 255, 1);
		border-radius: 30px;
	}

	&:focus {
		outline: none;
		border-radius: 30px;
	}

	@media (max-width: 480px) {
		transform: scale(1.2);
	}
`;

export const ArrowButton = styled.button`
	box-sizing: border-box;
	background: none;
	padding: 4px;
	border: none;
	cursor: pointer;
	margin: 0 4px;
	font-size: 800;
	border-radius: 30px;
	color: white;
	transform: scale(1.6);

	&:hover {
		box-shadow: 0 0 10px rgba(255, 255, 255, 1);
	}

	&:focus {
		outline: none;
	}

	@media (max-width: 480px) {
		transform: scale(1.2);
	}
`;

export const CarouselButtonDot = styled.div<CarouselItemDotProps>`
	background-color: white;
	border-radius: 30px;
	margin: auto;
	width: 8px;
	height: 8px;
`;

export const CarouselMobileScrollNode = styled.div`
	display: flex;
	min-width: 100%;
	scroll-snap-type: x mandatory;
	scroll-padding: 1rem;
	justify-content: start;
	gap: 1rem;

	@media (max-width: 768px) {
		flex-wrap: nowrap;
		padding: 0 1rem;
		overflow-x: auto;
	}
`;

export const CarouselItem = styled.div<CarouselItemProps>`
	min-width: 80%;
	scroll-snap-align: center;
	flex: 0 0 80%;
	display: flex;
	flex-direction: column;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	padding: 1rem 1.5rem;
	z-index: ${(props) => (props.active === props.index ? 2 : 1)};
	opacity: ${(props) => (props.active === props.index ? 1 : 0.5)};
	transform: ${(props) =>
		props.active === props.index ? 'scale(1.05)' : 'scale(1)'};
	transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
	box-shadow: ${(props) =>
		props.active === props.index ? '0 0 15px rgba(255,255,255,0.3)' : 'none'};
	margin: 1rem;

	@media (max-width: 768px) {
		min-width: 90%;
		flex: 0 0 90%;
		margin: 0.5rem 0;
		padding: 1rem;
	}
`;

export const CarouselItemTitle = styled.h3`
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	margin: 10px auto;
	padding: 1rem;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 14px;
		line-height: 20px;
	}
`;

export const TimeLineItemTitle = styled.h4`
	font-weight: bold;
	font-size: 26px;
	line-height: 24px;
	color: #fff;
	text-align: center;
	margin: 10px auto 0;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 24px;
		line-height: 20px;
	}
`;

export const CarouselTimeLine = styled.div`
	width: 100%;
	position: relative;
`;

export const CarouselItemDot = styled.div<CarouselItemDotProps>`
	background-color: ${(props) =>
		props.active ? 'rgb(0,123,255)' : 'rgba(0,123,255,0.7)'};
	border-radius: 50%;
	width: 3rem;
	height: 3rem;
	margin: 0 auto;
	position: relative;
	z-index: 1;
	transition: background-color 0.3s ease-in-out;

	box-shadow: ${(props) =>
		props.active ? '0 0 15px 5px rgba(255, 255, 255, 0.8) !important' : 'none'};

	@media (max-width: 480px) {
		width: 1.2rem;
		height: 1.2rem;
	}
`;

export const CarouselLine = styled.div<CarouselLineProps>`
	background-color: ${(props) =>
		props.active ? 'rgb(0,123,255)' : 'rgba(0,123,255,0.4)'};
	height: 0.4rem;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	z-index: 0;
	width: ${(props) =>
		props.isFirst ? '60%' : props.isLast ? '50%' : 'calc(100% +  12rem)'};

	left: ${(props) => (props.isFirst ? '50%' : '0')};
	right: ${(props) => (props.isLast ? '50%' : '0')};
`;

export const CarouselItemText = styled.p`
	font-size: 28px;
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
		height: 0.2rem;
	}
`;

export const CarouselHeader = styled.div`
	display: flex;
	font-weight: bold;
	align-self: center;
`;

export const CarouselHeaderRight = styled.div`
	margin-left: auto;
	align-items: center;
	display: inline-block;
`;

export const CarouselItemHeader = styled.span`
	font-size: 22px;
	align-items: center;
`;

export const CalendarIcon = styled.span`
	font-size: 24px;
	margin-right: 4px;
	align-self: flex-start;
`;

export const CarouselItemTextBold = styled.p`
	font-weight: bold;
	font-size: 18px;
	line-height: 12px;
	letter-spacing: 0.02em;
	color: rgba(255, 255, 255, 0.75);
	padding-right: 16px;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 14px;
		line-height: 18px;
		padding-right: 32px;
	}
	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 12px;
		line-height: 16px;
		padding-right: 0;
	}
`;

export const AchievementList = styled.ul`
	padding-left: 20px;
	font-size: 14px;
	line-height: 22px;
	letter-spacing: 0.02em;
	color: rgba(255, 255, 255, 0.75);
	padding-right: 16px;
	margin-top: 10px;

	li::before {
		content: '•';
		color: rgba(255, 255, 255, 0.75);
		margin-right: 8px;
	}

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

export const EducationItem = styled.div`
	width: 75%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;
	transition: opacity 0.3s;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	padding: 1rem;
	margin: 0.5rem;
	z-index: 2;
	align-self: center;
	box-shadow: 0 0 10px rgba(255, 255, 255, 1);

	@media (max-width: 768px) {
		width: 100%;
		padding: 0.8rem;
	}
`;

export const EducationItemTitle = styled.h4`
	font-weight: bold;
	font-size: 16px;
	color: #ffffff;
	text-align: center;
	margin: 10px auto 0;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 18px;
	}
`;

export const EducationItemTextBold = styled.p`
	font-size: 20px;
	letter-spacing: 0.02em;
	color: rgba(255, 255, 255, 0.75);
	text-align: center;
	margin: 10px auto 0;
	padding: 1.2rem;
	font-weight: bold;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 22px;
	}
	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 25px;
	}
`;

export const EducationHeader = styled.div`
	display: flex;
	align-items: center;
	font-weight: bold;
`;

export const EducationHeaderRight = styled.div`
	margin-left: auto;
	align-items: center;
	display: inline-block;
`;

export const EducationItemText = styled.p`
	align-items: center;
	font-size: 18px;
	letter-spacing: 0.02em;
	padding: 1rem 0;
	color: rgba(255, 255, 255, 0.75);
	text-align: center;
	margin: 10px auto 0;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 20px;
	}
	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 25px;
	}
`;

export const ProjectIndustryWrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	gap: 10px;
	align-items: center;
`;

export const TechnologiesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
`;

export const TechnologyTag = styled.div`
	background-color: #f0f0f0;
	color: #333;
	padding: 5px 10px;
	border-radius: 15px;
	font-size: 14px;
	font-weight: 500;
`;
