import React, { useEffect, useState } from 'react';
import { DiFirebase, DiReact } from 'react-icons/di';
import { SiDocker, SiFigma } from 'react-icons/si';
import { FaCodeBranch } from 'react-icons/fa';
import { iconMap } from '../../constants/TechnologiesIcons';
import { useInView } from 'react-intersection-observer';

import {
	Section,
	SectionDivider,
	SectionText,
	SectionTitle,
	SectionSubtitle
} from '../../styles/GlobalComponents';

import {
	List,
	List2,
	ListContainer,
	ListItem,
	ListParagraph,
	ListTitle,
	SkillsContainer,
	SkillsItemsContainer,
	Row,
	SkillItem,
	SkillTitle,
	Progress,
	ProgressIn,
	SkillPercent
} from './TechnologiesStyles';

import { useSkills } from '../../hooks/usePortfolioData';

const SkillBar = ({ skill, category }) => {
	const [fill, setFill] = useState(0);
	const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

	useEffect(() => {
		if (inView) {
			let progress = 0;
			const duration = 2000;
			const stepTime = duration / skill.percent;
			const timer = setInterval(() => {
				progress++;
				setFill(progress);
				if (progress >= skill.percent) clearInterval(timer);
			}, stepTime);
			return () => clearInterval(timer);
		}
	}, [inView, skill.percent]);

	const getIcon = (skill) => {
		if (!iconMap[skill?.name]) {
			console.warn(`Missing icon for skill: "${skill?.name}"`);
		}
		return iconMap[skill?.name] || <span>❓</span>;
	};




	return (
		<SkillsItemsContainer>
			<SkillItem ref={ref} style={{ minWidth: '220px', flex: '1 1 auto' }}>
				<SkillTitle>{getIcon(skill)} {skill.name}</SkillTitle>

				<Progress>
					<ProgressIn width={`${fill}%`} />
					<SkillPercent>{fill}%</SkillPercent>
				</Progress>
			</SkillItem>
		</SkillsItemsContainer>
	);
};

const Technologies = () => {
	const { skills, loading } = useSkills();
	const [openCategories, setOpenCategories] = useState([]);


	if (loading) return <div>Loading skills...</div>;

	const toggleCategory = (category) => {
		setOpenCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category) // close if already open
				: [...prev, category] // open in addition
		);
	};


	return (
		<Section id='tech'>
			<SectionTitle>Technologies</SectionTitle>
			<SectionDivider />
			<SectionText>
				I specialize in <strong>full-stack development</strong>,
				crafting <span className="highlight">scalable</span> and <span className="highlight">high-performance </span>
				web applications centered on exceptional <em>user experiences</em>.<br /><br />

				My expertise spans  <strong>modern front-end </strong>frameworks,
				efficient<strong> back-end architectures</strong>, and <em>intuitive design</em>,
				enabling me to deliver seamless digital solutions that address real-world challenges.
			</SectionText>

			<List>
				<ListItem>
					<picture><DiReact size="3rem" /></picture>
					<ListContainer>
						<ListTitle>Frontend</ListTitle>
						<ListParagraph>
							Built fast, responsive UIs with React and TypeScript, focusing on accessibility and real-world user experience.
						</ListParagraph>
					</ListContainer>
				</ListItem>

				<ListItem>
					<picture><DiFirebase size="3rem" /></picture>
					<ListContainer>
						<ListTitle>Backend</ListTitle>
						<ListParagraph>
							Developed scalable backends using Node.js with MongoDB and SQL, implementing authentication and secure data flows.
						</ListParagraph>
					</ListContainer>
				</ListItem>

				<ListItem>
					<picture><SiDocker size="3rem" /></picture>
					<ListContainer>
						<ListTitle>DevOps</ListTitle>
						<ListParagraph>
							Managed deployments with Docker and CI/CD pipelines. Delivered stable releases using AWS S3 and GitHub integrations.
						</ListParagraph>
					</ListContainer>
				</ListItem>
			</List>

			<List2>
				<ListItem>
					<picture><SiFigma size="3rem" /></picture>
					<ListContainer>
						<ListTitle>UI / UX</ListTitle>
						<ListParagraph>
							Designed modern, intuitive interfaces in Figma and translated them into clean, maintainable code for smooth UX.
						</ListParagraph>
					</ListContainer>
				</ListItem>

				<ListItem>
					<picture><FaCodeBranch size="3rem" /></picture>
					<ListContainer>
						<ListTitle>Teamwork</ListTitle>
						<ListParagraph>
							Collaborated in Agile teams, using GitHub for version control and code reviews. Ensured fast delivery and quality.
						</ListParagraph>
					</ListContainer>
				</ListItem>
			</List2>

			<SectionTitle>Skills & Proficiency</SectionTitle>
			<SectionDivider colorAlt />

			<SectionText>
				Over the years I’ve worked across the <strong>full stack</strong> — from building{' '}
				<span className="highlight">sleek interfaces</span> to managing{' '}
				<span className="highlight">reliable back-end systems</span> and{' '}
				<strong>cloud infrastructure</strong>.
				<br /><br />
				Explore each category below to see the <em>technologies</em> I use and the
				depth of <strong>experience</strong> I bring to every project.
			</SectionText>


			<SkillsContainer>
				{['frontend', 'backend', 'cloud', 'testing', 'design'].map((category) => {
					const categorySkills = skills.filter((s) => s.category === category);
					if (!categorySkills.length) return null;

					return (
						<div key={category} style={{ marginBottom: '3rem' }}>
							<h2
								onClick={() => toggleCategory(category)}
								className={openCategories.includes(category) ? 'active' : ''}
							>
								<span>
									{'< '}
									{category === 'frontend' && 'Libraries & Frameworks'}
									{category === 'backend' && 'Backend & APIs'}
									{category === 'cloud' && 'Infrastructure & Tools'}
									{category === 'testing' && 'Testing & QA'}
									{category === 'design' && 'Design & UI/UX'}
									{' />'}
								</span>
							</h2>


							{openCategories.includes(category) && (
								<Row>
									{categorySkills.map((skill) => (
										<SkillBar key={skill.name} skill={skill} category={category} />
									))}
								</Row>
							)}

						</div>
					);
				})}
			</SkillsContainer>

		</Section >
	);
};

export default Technologies;
