// src/pages/index.tsx
import dynamic from 'next/dynamic';
import { Layout } from '../layout/Layout';
import { Section } from '../styles/GlobalComponents';

const Hero = dynamic(() => import('../components/Hero/Hero'), { ssr: false });
const BgAnimation = dynamic(() => import('../components/BackgrooundAnimation/BackgroundAnimation'), { ssr: false });
const Achievements = dynamic(() => import('../components/Achievements/Achievements'), { ssr: false });
const Projects = dynamic(() => import('../components/Projects/Projects'), { ssr: false });
const Experience = dynamic(() => import('../components/Experience/Experience'), { ssr: false });
const About = dynamic(() => import('../components/About/About'), { ssr: false });
const Technologies = dynamic(() => import('../components/Technologies/Technologies'), { ssr: false });

const Home: React.FC = () => {
	return (
		<Layout>
			<Section grid>
				<Hero />
				<BgAnimation />
			</Section>
			<About />
			<Technologies />
			<Experience />
			<Achievements />
			<Projects />
		</Layout>
	);
};

export default Home;