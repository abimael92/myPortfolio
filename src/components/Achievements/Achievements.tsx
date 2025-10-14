import React from 'react';

import {
	Section,
	SectionDivider,
	SectionTitle,
} from '../../styles/GlobalComponents';
import { Box, Boxes, BoxNum, BoxText } from './AchievementsStyles';

// import { PersonalAchievements } from '../../constants/constants';
import { useAchievements } from '../../hooks/usePortfolioData';


const Achievements = () => {

	const { achievements, loading } = useAchievements();


	if (loading) return <div>Loading achievements...</div>;

	return (
		<Section id='achievements'>
			<SectionTitle>Personal Achievements</SectionTitle>
			<SectionDivider />
			<Boxes>
				{achievements?.map((card, index) => (
					<Box key={index}>
						<BoxNum>{`+${card.role}`}</BoxNum>
						<BoxText>{card.achievement}</BoxText>
					</Box>
				))}
			</Boxes>
		</Section>
	);
};

export default Achievements;
