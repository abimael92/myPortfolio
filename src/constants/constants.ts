// src/constants/constants.ts
import {
	Project,
	Experience,
	Education,
	Achievement,
} from '../types/portfolio';

export const Projects: Project[] = [
	{
		title: 'Pokedex App',
		description:
			'This Pokedex App fetches Pokémon data from the PokéAPI, allowing users to search for any Pokémon by name and view its stats, image, types, abilities, height, and weight.',
		image: '/images/Pokedex-preview.png',
		tags: ['React', 'PokéAPI', 'TypeScript', 'SCSS'],
		source: 'https://github.com/abimael92/pokedex-app', // replace with actual repo if needed
		id: 0,
	},
	{
		title: 'ThreeJs',
		description:
			'Create your unique and exclusive shirt with our brand-new 3D customization tool. Unleash your imagination and define your own style.',
		image: '/images/ThreeJS.png',
		tags: [
			'React',
			'Valtio',
			'Three.js',
			'Tailwind CSS',
			'Node',
			'Express',
			'OpenAI API',
		],
		source: 'https://github.com/abimael92/threejs.git',
		id: 1,
	},
	{
		title: 'Foto Vibes Forever',
		description:
			'Foto Vibes Forever is a virtual photo album web app where users can upload photos and videos, draw with sketch tools, add custom text, transform media, and personalize albums with custom styles.',
		image: '/images/fotovibes.png',
		tags: ['Firebase', 'React', 'TypeScript', 'SCSS', 'Canvas'],
		source: 'https://github.com/abimael92/foto-vibes-forever', // add real repo if available
		id: 2,
	},
	{
		title: 'CarShop',
		description:
			'CarShop is a web application that enables users to browse and purchase cars online.',
		image: '/images/CarShop-preview.png',
		tags: ['React', 'Node', 'Express', 'MongoDB'],
		source: 'https://github.com/abimael92/carshop-app', // replace with actual repo
		id: 3,
	},
	{
		title: 'E-commerce Video Game Platform',
		description:
			'An e-commerce platform for buying video games, with functionalities like user authentication, adding games to the wishlist, placing orders, viewing game details, and managing user profiles. The app is integrated with Strapi for the backend, Next.js for the frontend, AWS S3 for media storage, and uses the X-RapidAPI-Host for fetching game ratings.',
		image: '/images/ecommerce-video-game.png',
		tags: ['Strapi', 'Next.js', 'AWS S3', 'X-RapidAPI', 'React', 'Node.js'],
		source: 'https://github.com/abimael92/ecommerce-video-game-platform', // replace with actual repo
		id: 4,
	},
	{
		title: 'Tasty Kitchen Tales',
		description:
			'Tasty Kitchen Tales is a visually rich bakery blog built with Astro and MongoDB. It allows users to browse, search, and upload a variety of delicious bakery recipes. The platform emphasizes performance and SEO while providing a smooth content editing experience.',
		image: '/images/tasty-kitchen-tales.png',
		tags: ['Astro', 'MongoDB', 'Blog', 'Recipes'],
		source: 'https://github.com/abimael92/tasty-kitchen-tales', // replace with actual repo
		id: 5,
	},
	{
		title: 'School Management System',
		description:
			'A full-featured MERN-based school management platform with AWS S3 integration. It enables administration of students and teachers, real-time dashboards, attendance tracking, performance metrics, and secure file uploads. Built for scalability and maintainability.',
		image: '/images/school-management-system.png',
		tags: ['MERN', 'AWS S3', 'MongoDB', 'Redux', 'Dashboard'],
		source: 'https://github.com/abimael92/school-management-system', // replace with actual repo
		id: 6,
	},
];

export const TimeLineData: Experience[] = [
	{
		year: 2024,
		position: 'Developer',
		company: 'StellarAlgo',
		date: 'Oct 2024 - Feb 2025',
		period: '5 months',
		project: 'Customer Data Platform (CDP)',
		industry: 'Marketing / Data Analytics',
		technologies: ['JavaScript', 'Data Integration', 'Testing', 'Debugging'],
		achievements: [
			'Enhanced CDP to unify fan data insights.',
			'Developed advanced segmentation and lead scoring features.',
			'Integrated multiple data sources to streamline workflows.',
			'Ensured platform reliability via testing and debugging.',
		],
		description:
			'Contributed to StellarAlgo’s platform to enable data-driven marketing decisions through improved fan engagement and operational efficiency.',
	},
	{
		year: 2024,
		position: 'Software Specialist',
		company: 'Tandem Theory',
		date: 'Jun 2024 - Sep 2024',
		period: '4 months',
		project: 'Educate Texas Platform',
		industry: 'Education',
		technologies: ['WordPress', 'PHP', 'JavaScript'],
		achievements: [
			'Developed custom PHP functionalities for robust backend.',
			'Enhanced frontend interactivity with JavaScript.',
			'Managed WordPress content and site structure.',
			'Performed thorough testing and debugging.',
		],
		description:
			'Built a multi-page platform to support educational content delivery, focusing on performance and usability.',
	},
	{
		year: 2023,
		position: 'Software Specialist (Frontend Developer)',
		company: 'Onsolve',
		date: 'Aug 2023 - Mar 2024',
		period: '8 months',
		project: 'One Call Now',
		industry: 'Emergency Management',
		technologies: ['React', 'TypeScript', 'GraphQL', 'GitLab'],
		achievements: [
			'Implemented frontend features with React and TypeScript.',
			'Optimized data fetching using GraphQL.',
			'Managed multi-repo frontend codebase on GitLab.',
			'Participated in code reviews and project reporting.',
		],
		description:
			'Supported disaster notification platform by developing user-focused frontend solutions and maintaining code quality.',
	},
	{
		year: 2021,
		position: 'Software Specialist (Frontend Developer)',
		company: 'MANN+HUMMEL',
		date: 'Dec 2021 - Feb 2023',
		period: '15 months',
		project: 'STREAMETRIC',
		industry: 'Industrial Water Quality',
		technologies: ['React', 'TypeScript', 'Jest', 'Cypress', 'Figma'],
		achievements: [
			'Designed responsive UI components.',
			'Collaborated in Agile teams using Jira and Bitbucket.',
			'Ensured backend integration with frontend.',
			'Improved code quality with testing frameworks.',
			'Prototyped designs in Figma with cross-functional teams.',
		],
		description:
			'Developed industrial water quality monitoring web app focusing on UI/UX and robust frontend architecture.',
	},
	{
		year: 2018,
		position: 'Full Stack Developer',
		company: 'Robert Bosch GmbH',
		date: 'Sep 2018 - Nov 2021',
		period: '38 months',
		project: 'IT Service Portal (ITSP)',
		industry: 'Engineering and Technology',
		technologies: [
			'React',
			'TypeScript',
			'Node.js',
			'Express',
			'MongoDB',
			'SQL',
		],
		achievements: [
			'Built and maintained multiple application views.',
			'Resolved ~30 user issues monthly with low incidence.',
			'Adopted Agile methodologies with Jira and Git.',
			'Collaborated with stakeholders to meet deadlines.',
			'Solved complex technical challenges to improve performance.',
		],
		description:
			'Developed internal service portal enhancing asset request workflows and user experience for Bosch employees.',
	},
	{
		year: 2018,
		position: 'Developer',
		company: 'HCL Technologies',
		date: 'Oct 2018 - Mar 2019',
		period: '6 months',
		project: 'Internal Application Development',
		industry: 'IT Services',
		technologies: ['React', 'Jest', 'Node.js', 'GitLab', 'Jira'],
		achievements: [
			'Created user-friendly React interfaces with tests.',
			'Collaborated in Agile team environment.',
			'Enhanced backend integration with Node.js.',
			'Maintained clean code standards.',
		],
		description:
			'Delivered high-quality internal applications with full-stack development focus in a collaborative Agile team.',
	},
	{
		year: 2018,
		position: 'Data Engineer',
		company: 'DataZone / AutoZone',
		date: 'Mar 2016 - Oct 2018',
		period: '31 months',
		project: 'Data Management and Pipelines',
		industry: 'Retail and Technology',
		technologies: ['SQL', 'NoSQL', 'Database Optimization'],
		achievements: [
			'Designed and maintained secure and efficient databases.',
			'Optimized database performance using internal tools.',
			'Built data pipelines for effective data flow.',
			'Gained foundational expertise in data engineering.',
		],
		description:
			'Managed critical retail data systems, improving database efficiency and security.',
	},
	{
		year: 2016,
		position: 'ASP.NET Developer',
		company: 'Jabil Inc.',
		date: 'Jun 2015 - Mar 2016',
		period: '9 months',
		project: 'KPI Command Center',
		industry: 'Manufacturing',
		technologies: ['ASP.NET', 'SQL'],
		achievements: [
			'Developed dynamic web pages with ASP.NET and SQL.',
			'Collaborated on performance optimization and security.',
		],
		description:
			'Built and maintained manufacturing performance web apps ensuring security and responsiveness.',
	},
];

export const SkillsData = [
	// Frontend
	'React',
	'Next.js',
	'TypeScript',
	'JavaScript',
	'Redux',
	'HTML',
	'CSS3',
	'SCSS',
	'Tailwind CSS',
	'Astro',
	'Canvas',

	// Backend
	'JWT',
	'Multer',
	'dotenv',
	'Cors',
	'Mongoose',
	'Swagger',
	'Socket.IO',

	// Cloud / DevOps
	'AWS S3',
	'Git',
	'GitHub',
	'CI/CD',
	'Docker',

	// Testing
	'Jest',
	'Cypress',

	// Design
	'Figma',
];

export const EducationData: Education[] = [
	{
		title: 'Bachelors’ degree in computer science',
		institution: 'Instituto Tecnológico de Cd. Jiménez',
		date: '04/2012 - 04/2016',
	},
	{
		title: 'Web Developer Training (HTML, CSS, & JavaScript)',
		institution: 'Microsoft',
		date: '06/2018 - 08/2018',
	},
];

export const PersonalAchievements: Achievement[] = [
	{
		role: 'Lead Developer',
		achievement:
			'Successfully led junior devs in critical module development, ensuring timely delivery and seamless integration.',
	},
	{
		role: 'Cross-Functional Collaboration',
		achievement:
			'Collaborated with UX/UI designers to translate concepts into responsive interfaces, ensuring seamless integration.',
	},
	{
		role: 'API Integration',
		achievement:
			'Integrated third-party APIs for enhanced functionality and user interactions.',
	},
	{
		role: 'Technical Leadership',
		achievement:
			'Took ownership of front-end project, guiding team to improve code quality and streamline development.',
	},
	{
		role: 'Full-Stack Expertise',
		achievement:
			'Developed dynamic web pages, showcasing proficiency in both front-end and back-end.',
	},
	{
		role: 'Problem-Solving',
		achievement:
			'Translated complex business requirements into functional specifications, demonstrating analytical and problem-solving skills.',
	},
];
