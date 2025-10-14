// src/components/PaletteChanger/PaletteChanger.tsx
import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {
	PaletteIconWrapper,
	PaletteIcon,
	ColorPalettePopup,
	ColorButtonGrid,
	ColorOption,
	ColorButton,
	Switch,
	SwitchInput,
	SwitchSlider,
	ModeSwitchWrapper,
	Title,
	SwitchContent,
	Icon,
} from './PaletteChangerStyles';

interface PaletteChangerProps {
	showPaletteMenu: boolean;
	setShowPaletteMenu: (show: boolean) => void;
}

const PaletteChanger: React.FC<PaletteChangerProps> = ({
	showPaletteMenu,
	setShowPaletteMenu
}) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	const colorOptions = ['#ff0000', '#00ff00', '#0000ff', '#ff9900', '#9900cc', '#66ccff'];

	return (
		<PaletteIconWrapper>
			<PaletteIcon onClick={() => setShowPaletteMenu(!showPaletteMenu)} />
			{showPaletteMenu && (
				<ColorPalettePopup>
					<ColorOption>
						<Title>Mode:</Title>
						<ModeSwitchWrapper>
							<SwitchContent>
								<Icon className={isDarkMode ? 'inactive' : ''}>
									<FaSun />
								</Icon>
								<Switch>
									<SwitchInput
										type='checkbox'
										checked={isDarkMode}
										onChange={toggleDarkMode}
									/>
									<SwitchSlider />
								</Switch>
								<Icon className={isDarkMode ? '' : 'inactive'}>
									<FaMoon />
								</Icon>
							</SwitchContent>
						</ModeSwitchWrapper>
					</ColorOption>

					<ColorOption>
						<Title>Presets:</Title>
						<ModeSwitchWrapper>
							<ColorButtonGrid>
								{colorOptions.map((color, index) => (
									<ColorButton
										key={index}
										color={color}
										onClick={() => console.log(`Color selected: ${color}`)}
									/>
								))}
							</ColorButtonGrid>
						</ModeSwitchWrapper>
					</ColorOption>
				</ColorPalettePopup>
			)}
		</PaletteIconWrapper>
	);
};

export default PaletteChanger;