import { IoIosArrowDropdown } from 'react-icons/io';
import styled from 'styled-components';
import { BsPalette2 } from 'react-icons/bs';

interface Div2Props {
	$mobileMenuOpen: boolean;
}

export const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
	background: #0f1624;
	display: flex;
	flex-direction: column;
	padding: 1rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

	@media (min-width: 768px) {
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
	}
`;

export const Div1 = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	@media (min-width: 768px) {
		width: auto;
		justify-content: flex-start;
	}
`;

export const Div2 = styled.nav<Div2Props>`
	display: ${({ $mobileMenuOpen }) => ($mobileMenuOpen ? 'flex' : 'none')};
	flex-direction: column;
	gap: 1rem;
	margin-top: 1rem;

	@media (min-width: 768px) {
		display: flex;
		flex-direction: row;
		margin-top: 0;
		gap: 5rem;
	}
`;

export const Div3 = styled.div`
	display: none;

	@media (min-width: 768px) {
		display: flex;
		gap: 1rem;
	}
`;

export const Span = styled.span`
	font-size: 1.5rem;
	font-weight: bold;
	color: white;
	margin-left: 0.5rem;
`;

export const NavLink = styled.a`
	color: rgba(255, 255, 255, 0.75);
	font-size: 1.1rem;
	transition: 0.3s ease;
	padding: 0.5rem 0;

	&:hover {
		color: #fff;
		text-decoration: underline;
	}

	&.active {
		color: rgba(0, 123, 255, 0.5);
		text-decoration: underline;
	}

	@media (min-width: 768px) {
		font-size: 2.2rem;
		padding: 0;
	}
`;

export const SocialIcons = styled.a`
	color: white;
	transition: 0.3s ease;
	padding: 0.5rem;
	border-radius: 50%;

	&:hover {
		background-color: #212d45;
		transform: scale(1.1);
	}

	svg {
		width: 2.8rem;
		height: 2.8rem;
	}
`;

export const MenuButton = styled.button`
	background: none;
	border: none;
	color: white;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0.5rem;

	@media (min-width: 768px) {
		display: none;
	}
`;

export const UserMenuButton = styled.button`
	background: none;
	border: none;
	color: white;
	cursor: pointer;
	padding: 0.5rem;
	position: relative;
`;

export const UserMenu = styled.div`
	position: absolute;
	top: 100%;
	right: 0;
	background: #222;
	border-radius: 4px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
	z-index: 1001;
	min-width: 150px;
`;

export const MenuItem = styled.button`
	background: none;
	border: none;
	color: white;
	width: 100%;
	text-align: left;
	padding: 0.75rem 1rem;
	cursor: pointer;
	transition: 0.2s;

	&:hover {
		background: #333;
	}
`;
