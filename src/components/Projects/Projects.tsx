import React, { useContext, useState } from 'react';

import {
	BlogCard,
	CardInfo,
	Content,
	ExternalLinks,
	GridContainer,
	HeaderThree,
	HeaderStack,
	Hr,
	Tag,
	TagList,
	TitleContent,
	UtilityList,
	Img,
	ImgWrapper,
	ButtonContainer,
	ShowMoreButton
} from './ProjectsStyles';

import {
	Section,
	SectionDivider,
	SectionTitle,
} from '../../styles/GlobalComponents';

import BlurWrapper from '../PrivateContent/BlurWrapper';

// import { Projects as MyProjects } from '../../constants/constants';
import { useProjects } from '../../hooks/usePortfolioData';

import { AuthContext } from '../../context/AuthContext';

const Projects = () => {
	const { accessToken } = useContext(AuthContext);
	const authenticated = !!accessToken;

	const { projects, loading } = useProjects();
	const [showAll, setShowAll] = useState(false);

	if (loading) return <div>Loading projects...</div>;

	const projectsToShow = showAll ? projects : projects.slice(0, 3);

	return (
		<Section nopadding id='projects'>
			<SectionTitle main>Projects</SectionTitle>
			<SectionDivider colorAlt />

			<GridContainer>
				{projectsToShow.map((project, index) => (
					<BlogCard key={index}>
						<ImgWrapper>
							<Img src={project.image} alt={project.title} />
						</ImgWrapper>
						<Content>

							<TitleContent>
								<HeaderThree title={project.title.toString()}>
									{project.title}
								</HeaderThree>
								<Hr />
							</TitleContent>
							<CardInfo>{project.description}</CardInfo>

							<HeaderStack>Stack</HeaderStack>
							<TagList>
								{project.tags.map((tag, idx) => {
									return <Tag key={idx}>{tag}</Tag>;
								})}
							</TagList>
							<UtilityList>
								{project.source ? (
									<BlurWrapper authenticated={authenticated}>
										<ExternalLinks
											href={project.source}
											target='_blank'
											rel='noopener noreferrer'>
											Code
										</ExternalLinks>
									</BlurWrapper>
								) : (
									<ExternalLinks disabled>Code</ExternalLinks>
								)}
								{project.visit && (
									<ExternalLinks
										href={project.visit}
										target='_blank'
										rel='noopener noreferrer'>
										Visit
									</ExternalLinks>
								)}
							</UtilityList>
						</Content>
					</BlogCard>
				))}
			</GridContainer>
			{/* Show More / Show Less button */}
			{projects.length > 2 && (
				<ButtonContainer>
					<ShowMoreButton showAll={showAll} onClick={() => setShowAll(!showAll)}>
						{showAll ? 'Show Less' : 'Show More'}
					</ShowMoreButton>
				</ButtonContainer>
			)}
		</Section>
	);
};

export default Projects;
