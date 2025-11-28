// src/components/About/About.tsx
import React, { useState, useEffect, useContext } from 'react';
import {
	FaUserGraduate,
	FaUserTie,
	FaPhoneAlt,
	FaMapMarkerAlt,
	FaEnvelope,
	FaBirthdayCake,
	FaUserClock,
	FaGlobeAmericas, FaLanguage
} from 'react-icons/fa';
import BlurWrapper from "../PrivateContent/BlurWrapper";
import { AuthContext } from '../../context/AuthContext';
import {
	Container,
	Row,
	RightContainer,
	AboutSectionText,
	PersonalInfoGrid,
	ProfessionalInfoGrid,
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
	SectionTitle,
} from '../../styles/GlobalComponents';

const About: React.FC = () => {
	const { accessToken } = useContext(AuthContext);
	const authenticated = !!accessToken;

	const birthday = new Date(1992, 9, 7);
	const today = new Date();
	const age = today.getFullYear() - birthday.getFullYear() -
		(today < new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate()) ? 1 : 0);
	const workExp = today.getFullYear() - 2015;

	const toRotate = ["Web Developer", "Full-Stack Developer", "Software Engineer"];
	const [loopNum, setLoopNum] = useState<number>(0);
	const [isDeleting, setIsDeleting] = useState<boolean>(false);
	const [text, setText] = useState<string>('');
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const delta = 150;
	const period = 1500;

	useEffect(() => {
		const tick = () => {
			let i = loopNum % toRotate.length;
			let fullText = toRotate[i];
			let updatedText = isDeleting ?
				fullText.substring(0, text.length - 1) :
				fullText.substring(0, text.length + 1);

			setText(updatedText);

			if (!isDeleting && updatedText === fullText) {
				setIsPaused(true);
				setTimeout(() => {
					setIsDeleting(true);
					setIsPaused(false);
				}, period);
			} else if (isDeleting && updatedText === '') {
				setIsDeleting(false);
				setLoopNum(loopNum + 1);
				setIsPaused(true);
				setTimeout(() => {
					setIsPaused(false);
				}, period);
			}
		};

		let ticker: NodeJS.Timeout;
		if (!isPaused) {
			ticker = setInterval(tick, delta);
		}

		return () => clearInterval(ticker);
	}, [text, isDeleting, isPaused, loopNum, toRotate]);

	return (
		<Section id='about'>
			<SectionTitle>About Me</SectionTitle>
			<SectionDivider colorAlt />
			<Container>
				<AboutSectionText>
					Hey there! I'm a <strong>web developer</strong> passionate about solving problems and learning new technologies along the way.<br /><br />
					I enjoy working with <strong>collaborative teams</strong> where we can share knowledge, support each other, and build meaningful projects together.<br /><br />
					I'm always looking for  <strong>opportunities to grow</strong>, contribute, and enjoy the process — ready to turn  <span className="highlight">caffeine</span> into code! ☕︎
				</AboutSectionText>

				<RightContainer>
					<BlurWrapper authenticated={authenticated}>
						<ImageNeon className="neon-medium">
							<Image src="/images/my_picture.png" alt="Abimael" width={300} height={300} />
						</ImageNeon>
					</BlurWrapper>
					<RotatingText>
						<span className="txt-rotate">
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
							<InfoDetail>{birthday.toDateString()}</InfoDetail>
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
							<InfoDetail>{workExp} years</InfoDetail>
						</BlurWrapper>
					</InfoItem>
				</PersonalInfoGrid>

				<PersonalInfoGrid>
					<InfoItem>
						<FaLanguage />
						<InfoTitle>Languages:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>Spanish (Native), English (Fluent)</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaGlobeAmericas />
						<InfoTitle>Timezone:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>GMT-6 (4+ hrs overlap with EST)</InfoDetail>
						</BlurWrapper>
					</InfoItem>
					<InfoItem>
						<FaUserTie />
						<InfoTitle> Visa Status:</InfoTitle>
						<BlurWrapper authenticated={authenticated}>
							<InfoDetail>

								B-1/B-2
								{/* <div style={{ fontSize: '0.985rem', color: 'rgba(255,255,255,0.8)' }}>
									Expires: Jul 30, 2035
								</div> */}
							</InfoDetail>
						</BlurWrapper>
					</InfoItem>

				</PersonalInfoGrid>


			</Row>
		</Section>
	);
};

export default About;




// <PersonalInfoGrid>
// 	<InfoItem >
// 		<FaGlobeAmericas />
// 		<InfoTitle>Languages:</InfoTitle>
// 		<BlurWrapper authenticated={authenticated}>
// 			<InfoDetail>
// 				{/* <div style={{ marginBottom: '8px', }}> */}
// 				{/* <span style={{
// 										// background: '#006847',
// 										border: '1px solid #fff',
// 										color: 'white',
// 										padding: '2px 6px',
// 										borderRadius: '4px',
// 										fontSize: '0.95rem',
// 										marginRight: '6px'
// 									}}>ES</span> */}
// 				Spanish (Native)
// 				{/* </div>
// 								<div> */}
// 				{/* <span style={{
// 										// background: '#bd3d44',
// 										border: '1px solid #fff',
// 										color: 'white',
// 										padding: '2px 6px',
// 										borderRadius: '4px',
// 										fontSize: '0.95rem',
// 										marginRight: '6px'
// 									}}>EN</span> */}
// 				English (Fluent)
// 				{/* </div> */}
// 			</InfoDetail>
// 			<InfoItem>
// 				<FaGlobeAmericas />
// 				<InfoTitle>Timezone:</InfoTitle>
// 				<BlurWrapper authenticated={authenticated}>
// 					<InfoDetail>GMT-6 (4+ hrs overlap with EST)</InfoDetail>
// 				</BlurWrapper>
// 			</InfoItem>
// 		</BlurWrapper>
// 	</InfoItem>
// </PersonalInfoGrid>