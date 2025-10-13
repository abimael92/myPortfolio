import { DiReact, DiJavascript1, DiFirebase } from 'react-icons/di';
import {
	SiNextdotjs,
	SiTypescript,
	SiHtml5,
	SiCss3,
	SiSass,
	SiTailwindcss,
	SiAstro,
	SiDocker,
	SiFigma,
	SiGithub,
	SiJest,
	SiCypress,
	SiMongodb,
	SiSocketdotio,
	SiSwagger,
	SiDotenv,
	SiGithubactions,
} from 'react-icons/si';
import { FaKey } from 'react-icons/fa';

interface IconMap {
	[key: string]: React.ReactElement;
}

export const iconMap: IconMap = {
	// Frontend
	React: <DiReact size='2.5rem' />,
	JavaScript: <DiJavascript1 size='2.5rem' />,
	TypeScript: <SiTypescript size='2.5rem' />,
	'Next.js': <SiNextdotjs size='2.5rem' />,
	Astro: <SiAstro size='2.5rem' />,
	Redux: (
		<img
			src='/svgs/redux.svg'
			alt='Redux'
			style={{ width: '2.5rem', height: '2.5rem' }}
		/>
	),

	// Styling
	HTML: <SiHtml5 size='2.5rem' />,
	CSS3: <SiCss3 size='2.5rem' />,
	SCSS: <SiSass size='2.5rem' />,
	'Tailwind CSS': <SiTailwindcss size='2.5rem' />,

	// Backend & Databases
	Firebase: <DiFirebase size='2.5rem' />,
	Mongoose: <SiMongodb size='2.5rem' />,
	'Socket.IO': <SiSocketdotio size='2.5rem' />,

	// DevOps & Tools
	Docker: <SiDocker size='2.5rem' />,
	AWS: (
		<img
			src='/svgs/aws.svg'
			alt='AWS'
			style={{ width: '2.5rem', height: '2.5rem' }}
		/>
	),
	'CI/CD': <SiGithubactions size='2.5rem' />,

	// Testing
	Jest: <SiJest size='2.5rem' />,
	Cypress: <SiCypress size='2.5rem' />,

	// Other
	Figma: <SiFigma size='2.5rem' />,
	Git: <SiGithub size='2.5rem' />,
	GitHub: <SiGithub size='2.5rem' />,
	JWT: <FaKey size='2.5rem' />,
	Swagger: <SiSwagger size='2.5rem' />,
	dotenv: <SiDotenv size='2.5rem' />,
};
