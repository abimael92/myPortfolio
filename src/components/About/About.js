import React, { useState, useRef, useEffect } from 'react';

import { FaUserGraduate, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaBirthdayCake, FaUserClock } from 'react-icons/fa';

import BlurWrapper from "../PrivateContent/BlurWrapper";

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import {
	BulletPoint,
	Container,
	Row,
	RightContainer,
	AboutSectionText,
	PersonalInfoGrid,
	RotatingText,
	ImageNeon,
	Image,
	InfoItem,
	InfoTitle,
	InfoDetail,
} from './AboutStyles';

import {
	Section,
	SectionDivider,
	SectionText,
	SectionTitle,
} from '../../styles/GlobalComponents';


const About = () => {

	const { accessToken } = useContext(AuthContext);
	const authenticated = !!accessToken;
	// const hasAccess = !!accessToken;

	const birthday = new Date(1992, 9, 7); // October is month 9 (zero-based index)
	const today = new Date();
	const age = today.getFullYear() - birthday.getFullYear() - (today < new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()) ? 1 : 0);
	const workExp = today.getFullYear() - 2015;
	const toRotate = ["Web Developer", "Full-Stack Developer", "Software Engineer"];

	const remToPixels = (rem) => rem * 16;

	const [loopNum, setLoopNum] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [text, setText] = useState('');
	const [isPaused, setIsPaused] = useState(false);
	// const [delta, setDelta] = useState(300 - Math.random() * 100);
	const delta = 150;
	const period = 1500;


	useEffect(() => {
		const tick = () => {
			let i = loopNum % toRotate.length;
			let fullText = toRotate[i];
			let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

			setText(updatedText);

			if (!isDeleting && updatedText === fullText) {
				setIsPaused(true); // Pause before deleting
				setTimeout(() => {
					setIsDeleting(true); // Start deleting after pause
					setIsPaused(false); // Reset pause
				}, period);
			} else if (isDeleting && updatedText === '') {
				setIsDeleting(false);
				setLoopNum(loopNum + 1);
				setIsPaused(true); // Pause before starting new text
				setTimeout(() => {
					setIsPaused(false); // Reset pause
				}, period);
			}
		};

		let ticker;
		if (!isPaused) {
			ticker = setInterval(() => {
				tick();
			}, delta);
		}

		return () => clearInterval(ticker);
	}, [text, isDeleting, isPaused, loopNum]);


	return (
		<Section id='about'>
			<SectionTitle>About Me</SectionTitle>
			<SectionDivider colorAlt />
			<Container>
				<AboutSectionText>
					Hey there! I’m a <strong>web developer</strong> passionate about solving problems and learning new technologies along the way.<br /><br />

					I enjoy working with <strong>collaborative teams</strong> where we can share knowledge, support each other, and build meaningful projects together.<br /><br />

					I’m always looking for  <strong>opportunities to grow</strong>, contribute, and enjoy the process — ready to turn  <span className="highlight">caffeine</span> into code! ☕︎
				</AboutSectionText>

				<RightContainer>
					<BlurWrapper authenticated={authenticated}>
						<ImageNeon className="neon-medium">
							<Image src="/images/my_picture.png" alt="Abimael" width={300} height={300} fetchPriority="high" />
						</ImageNeon>
					</BlurWrapper>
					<RotatingText>
						<span
							className="txt-rotate"
							data-period="1000"
							data-rotate={JSON.stringify(toRotate)}
						>
							<span className="wrap">
								{`I'm a ${text}`}
							</span>
						</span>
					</RotatingText>

				</RightContainer>
			</Container>

			<Row>
				<PersonalInfoGrid>
					<InfoItem>
						<FaUserGraduate />
						<InfoTitle>Degree:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>Bachelor's in Computer Science</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaPhoneAlt />
						<InfoTitle>Phone:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>+52 (614) 132 54 05</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaMapMarkerAlt />
						<InfoTitle>Location:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>Chihuahua, Chih. Mexico</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaEnvelope />
						<InfoTitle>Email:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>abimael1992g@gmail.com</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaBirthdayCake />
						<InfoTitle>Birthday:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>{birthday.toDateString() || 'October 7th, 1992'}</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaUserClock />
						<InfoTitle>Age:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>{age}</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaUserClock />
						<InfoTitle>Experience:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>{workExp}</InfoDetail>
						</BlurWrapper>
					</InfoItem>
				</PersonalInfoGrid>
			</Row>

		</Section>
	);
};

export default About;
