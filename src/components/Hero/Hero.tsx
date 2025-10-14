// src/components/Hero/Hero.tsx
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
	Section,
	SectionText,
	SectionTitle,
} from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection, ButtonContainer } from './HeroStyles';
import BlurWrapper from '../PrivateContent/BlurWrapper';

interface HeroProps {
	handleClick?: () => void;
}

const Hero: React.FC<HeroProps> = (props) => {
	const { accessToken } = useAuth(); // Use the custom hook
	const hasAccess = !!accessToken;

	const workExp = new Date().getFullYear() - 2015;

	const handleDownloadClick = (e: React.MouseEvent) => {
		if (!hasAccess) {
			e.preventDefault();
			// Optionally show a message or trigger the access modal
			console.log('Access required to download CV');
		}
		// If hasAccess is true, the download will proceed normally
	};

	return (
		<Section row nopadding>
			<LeftSection>
				<SectionTitle main >
					My Portfolio
					<br />
					Abimael Garcia (Web Developer)
				</SectionTitle>
				<SectionText>
					{`Full-Stack Developer with ${workExp} years of experience building scalable,
                    high-performing web applications. Experienced in leading new builds,
                    modernizing legacy systems, and choosing the right architecture—monolithic,
                    microservices, or serverless.

                    Skilled in React, Next.js, TypeScript, Node.js,
                    GraphQL, SQL, and MongoDB. Known for adaptability, clear communication,
                    and effective collaboration in fast-paced, multicultural teams.

                    Focused on clean, maintainable code and delivering real-world value from design to deployment.
                    Committed to continuous learning and practical problem-solving.`}
				</SectionText>
				<ButtonContainer>
					<BlurWrapper authenticated={hasAccess}>
						<Button onClick={props.handleClick}>
							<a
								href='https://drive.google.com/uc?export=download&id=1IjFu-kn8scFmSAkGZ1DjC1hDlRuYHm2V'
								target='_blank'
								rel='noopener noreferrer'
								style={{ textDecoration: 'none', color: 'inherit' }}
								download
								onClick={handleDownloadClick}
							>
								Download CV
							</a>
						</Button>
					</BlurWrapper>
				</ButtonContainer>
			</LeftSection>
		</Section>
	);
};

export default Hero;