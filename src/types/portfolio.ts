// src/types/portfolio.ts
export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	tags: string[];
	source?: string;
	visit?: string;
}

export interface Experience {
	year: number;
	position: string;
	company: string;
	date: string;
	period: string;
	project: string;
	industry: string;
	technologies: string[];
	achievements: string[];
	description: string;
}

export interface Skill {
	name: string;
	category: 'frontend' | 'backend' | 'cloud' | 'testing' | 'design';
	percent: number;
}

export interface Education {
	title: string;
	institution: string;
	date: string;
}

export interface Achievement {
	role: string;
	achievement: string;
}

export interface PortfolioData {
	projects: Project[];
	experience: Experience[];
	skills: Skill[];
	education: Education[];
	achievements: Achievement[];
}

export interface AuthContextType {
	accessToken: string | null;
	loading: boolean;
	error: string | null;
	saveToken: (token: string) => void;
	clearToken: () => void;
	isAuthenticated: boolean;
	refreshToken: () => Promise<void>;
}

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children?: React.ReactNode;
	size?: 'sm' | 'md' | 'lg';
}

export interface BlurWrapperProps {
	authenticated: boolean;
	children: React.ReactNode;
}

export interface LoadingProps {
	size?: 'small' | 'medium' | 'large';
	message?: string;
}

export interface ButtonProps {
	alt?: boolean;
	form?: string;
	disabled?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	children: React.ReactNode;
}
