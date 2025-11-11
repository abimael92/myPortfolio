// src/components/Footer/Footer.tsx
import React from 'react';
import { AiFillGithub, AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import BlurWrapper from '../PrivateContent/BlurWrapper';
import { useAuth } from '../../hooks/useAuth'; // Import custom hook
import { SocialIcons } from '../Header/HeaderStyles';
import {
	Container,
	CompanyContainer,
	FooterWrapper,
	LinkColumn,
	LinkItem,
	LinkList,
	LinkTitle,
	Slogan,
	SocialContainer,
	SocialIconsContainer,
} from './FooterStyles';

const Footer: React.FC = () => {
	const { accessToken } = useAuth(); // Use custom hook instead of useContext
	const hasAccess = !!accessToken;

	return (
		<Container>
			<FooterWrapper>
				<LinkList>
					<LinkColumn>
						<LinkTitle>Call</LinkTitle>
						<BlurWrapper authenticated={hasAccess}>
							<LinkItem href='tel:614-132-5405'>(614)-132-5405</LinkItem>
						</BlurWrapper>
					</LinkColumn>
					<LinkColumn>
						<LinkTitle>Email</LinkTitle>
						<BlurWrapper authenticated={hasAccess}>
							<LinkItem href='mailto:abimael1992g@gmail.com'>
								abimael1992g@gmail.com
							</LinkItem>
						</BlurWrapper>
					</LinkColumn>
				</LinkList>

				<SocialIconsContainer>
					<CompanyContainer>
						<Slogan>
							My Portfolio
							<br />
							Abimael Garcia (Web Developer)
						</Slogan>
					</CompanyContainer>
					<SocialContainer>
						<BlurWrapper authenticated={hasAccess}>
							<SocialIcons href='http://github.com/abimael92' target='_blank' rel='noopener noreferrer'>
								<AiFillGithub size='3rem' />
							</SocialIcons>
							<SocialIcons href='https://www.linkedin.com/in/abimael-garcia-00580314a/' target='_blank' rel='noopener noreferrer'>
								<AiFillLinkedin size='3rem' />
							</SocialIcons>
							<SocialIcons href='mailto:abimael1992g@gmail.com' target='_blank' rel='noopener noreferrer'>
								<AiOutlineMail size='3rem' />
							</SocialIcons>
						</BlurWrapper>
					</SocialContainer>
				</SocialIconsContainer>
			</FooterWrapper>
		</Container>
	);
};

export default Footer;