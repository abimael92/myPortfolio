// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../hooks/useAuth';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import AccessRequestModal from '../AccessRequest/AccessRequestModal';
import LoginTokenModal from '../Login/LoginTokenModal';
import BlurWrapper from '../PrivateContent/BlurWrapper';
import {
	Container,
	Div1,
	Div2,
	Div3,
	NavLink,
	SocialIcons,
	Span,
	MenuButton,
	UserMenuButton,
	UserMenu,
	MenuItem
} from './HeaderStyles';

const Header: React.FC = () => {
	const { accessToken } = useAuth();
	const hasAccess = !!accessToken;
	const [activeSection, setActiveSection] = useState<string>('');
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
	const [userMenuOpen, setUserMenuOpen] = useState<boolean>(false);
	const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
	const [showAccessModal, setShowAccessModal] = useState<boolean>(false);
	const [isMobile, setIsMobile] = useState<boolean>(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			const sections = ['about', 'tech', 'experience', 'projects', 'achievements'];
			sections.forEach((sectionId) => {
				const section = document.getElementById(sectionId);
				if (section) {
					const { top, height } = section.getBoundingClientRect();
					if (top <= 100 && top + height > 100) {
						setActiveSection(sectionId);
					}
				}
			});
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleNavClick = (id: string, e: React.MouseEvent) => {
		e.preventDefault();
		setActiveSection(id);
		setMobileMenuOpen(false);

		// Smooth scroll to section
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const navLinks = [
		{ id: 'about', label: 'About' },
		{ id: 'tech', label: 'Technologies' },
		{ id: 'experience', label: 'Experience' },
		{ id: 'projects', label: 'Projects' },
		{ id: 'achievements', label: 'Achievements' },
	];

	return (
		<>
			<Container>
				<Div1>
					<Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
						<Image
							src="/images/Kachorro92_Logo.png"
							alt="Logo"
							width={50}
							height={50}
						/>
						<Span>MyPortfolio</Span>
					</Link>
					<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
						{!hasAccess && (
							<UserMenuButton onClick={() => setUserMenuOpen(!userMenuOpen)}>
								<AiOutlineLock size={24} />
								{userMenuOpen && (
									<UserMenu>
										<MenuItem onClick={() => {
											setShowLoginModal(true);
											setUserMenuOpen(false);
										}}>
											Enter Token
										</MenuItem>
										<MenuItem onClick={() => {
											setShowAccessModal(true);
											setUserMenuOpen(false);
										}}>
											Request Access
										</MenuItem>
									</UserMenu>
								)}
							</UserMenuButton>
						)}

						<MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
							<GiHamburgerMenu />
						</MenuButton>
					</div>
				</Div1>

				<Div2 $mobileMenuOpen={mobileMenuOpen || !isMobile}>
					{navLinks.map(({ id, label }) => (
						<NavLink
							key={id}
							href={`#${id}`}
							className={activeSection === id ? 'active' : ''}
							onClick={(e: React.MouseEvent) => handleNavClick(id, e)}
						>
							{label}
						</NavLink>
					))}
				</Div2>

				<Div3>
					<BlurWrapper authenticated={hasAccess}>
						<SocialIcons href="https://github.com/abimael92" target="_blank" rel="noopener">
							<AiFillGithub />
						</SocialIcons>
						<SocialIcons href="https://www.linkedin.com/in/abimael-garcia-00580314a/" target="_blank" rel="noopener">
							<AiFillLinkedin />
						</SocialIcons>
						<SocialIcons href="mailto:abimael199g@gmail.com" target="_blank" rel="noopener">
							<AiOutlineMail />
						</SocialIcons>
					</BlurWrapper>
				</Div3>
			</Container>

			{showAccessModal && <AccessRequestModal onClose={() => setShowAccessModal(false)} />}
			{showLoginModal && <LoginTokenModal onClose={() => setShowLoginModal(false)} />}
		</>
	);
};

export default Header;