import styled, { css, keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(10, 175, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(10, 175, 255, 0.6); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

// Common Styles
const cardStyle = css`
	background: rgba(30, 30, 30, 0.8);
	backdrop-filter: blur(10px);
	border-radius: 16px;
	border: 1px solid rgba(255, 255, 255, 0.1);
	padding: 1.5rem;
	animation: ${fadeIn} 0.5s ease-out;

	@media (max-width: 768px) {
		padding: 1rem;
		border-radius: 12px;
	}

	@media (max-width: 480px) {
		padding: 0.75rem;
		border-radius: 8px;
	}
`;

const inputBaseStyles = css`
	width: 100%;
	padding: 0.8rem 1rem;
	border-radius: 8px;
	border: 1.5px solid #333;
	background: rgba(40, 40, 40, 0.8);
	color: #fff;
	font-size: 1.5rem;
	outline: none;
	transition: all 0.3s ease;
	font-family: 'Inter', sans-serif;

	&:focus {
		border-color: #0af;
		box-shadow: 0 0 0 3px rgba(10, 175, 255, 0.2);
		background: rgba(50, 50, 50, 0.9);
	}

	&:hover {
		border-color: #555;
	}

	@media (max-width: 480px) {
		padding: 0.7rem 1.2rem;
		font-size: 1.956rem;
	}
`;

// Main Container
export const Container = styled.div`
	display: flex;
	gap: 2rem;
	padding: 2rem;
	background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
	min-height: 100vh;
	font-family: 'Inter', sans-serif;

	@media (max-width: 768px) {
		flex-direction: column;
		padding: 1rem;
		gap: 1rem;
	}

	@media (max-width: 480px) {
		padding: 0.5rem;
		gap: 0.5rem;
	}
`;

// Left Panel - Editor
export const EditorPanel = styled.div`
	flex: 1;
	${cardStyle}
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	@media (max-width: 768px) {
		gap: 1rem;
	}

	@media (max-width: 480px) {
		gap: 0.75rem;
	}
`;

export const PanelHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);

	@media (max-width: 480px) {
		padding-bottom: 0.75rem;
	}
`;

export const Title = styled.h1`
	color: #fff;
	font-size: 2.8rem;
	font-weight: 700;
	margin: 0;
	background: linear-gradient(135deg, #0af 0%, #08c 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;

	@media (max-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 480px) {
		font-size: 3.185rem;
	}
`;

export const Section = styled.div`
	animation: ${fadeIn} 0.6s ease-out;
`;

export const SectionTitle = styled.h2`
	color: #0af;
	color: linear-gradient(135deg, #0af 0%, #08c 100%) !important;
	font-size: 2.2rem;
	font-weight: 600;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;

	&::before {
		content: '';
		width: 4px;
		height: 25px;
		background: linear-gradient(135deg, #0af 0%, #08c 100%);
		border-radius: 2px;
	}

	@media (max-width: 768px) {
		font-size: 1.8rem;
		margin-bottom: 0.75rem;
	}

	@media (max-width: 480px) {
		font-size: 2.258rem;
		margin-bottom: 0.5rem;

		&::before {
			height: 20px;
		}
	}
`;

export const IconButton = styled.button<{
	$danger?: boolean;
	$secondary?: boolean;
}>`
	background: ${(props) =>
		props.$danger ? '#dc3545' : props.$secondary ? '#6c757d' : '#007bff'};
	color: white;
	border: none;
	border-radius: 4px;
	padding: 8px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;
	min-width: 40px;
	height: 40px;

	&:hover {
		background: ${(props) =>
			props.$danger ? '#c82333' : props.$secondary ? '#5a6268' : '#0056b3'};
	}

	&:disabled {
		background: #6c757d;
		cursor: not-allowed;
	}

	@media (max-width: 480px) {
		min-width: 36px;
		height: 36px;
		padding: 6px;
	}
`;

export const AchievementText = styled.span<{
	$scrollX?: boolean;
	$scrollY?: boolean;
	$linkText?: boolean;
}>`
	flex: 1;
	padding: 8px;
	border: 1px solid transparent;
	border-radius: 4px;
	background: transparent;
	display: flex;
	align-items: center;
	line-height: 1.4;
	min-width: 8rem;
	min-height: 40px;
	max-height: 100px;
	word-wrap: break-word;
	white-space: pre-wrap;
	color: inherit;

	${({ $scrollX, $scrollY, $linkText }) => {
		if ($scrollX)
			return `
        overflow-x: auto;
        overflow-y: hidden;
        background: rgba(50,50,50,0.8);
        padding: 4px;

        /* inner wrapper to allow horizontal scroll for all lines */
        > span {
          display: inline-block;
          min-width: 100%;
          white-space: nowrap; /* prevent wrapping so horizontal scroll works */
        }
      `;
		if ($scrollY)
			return `
				min-width: 18rem;
				overflow-y: auto;
				overflow-x: hidden;
				white-space: pre-wrap;
				align-items: flex-start;
				background: rgba(50, 50, 50, 0.8);
			`;
		if ($linkText)
			return `
				display: -webkit-box;
				-webkit-line-clamp: 2; /* limit to 2 lines */
				-webkit-box-orient: vertical;
				height: 160px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: normal;
				cursor: pointer;
				color: #00aaff;
				text-decoration: underline;

				&:hover {
					color: #66ccff;
				}
			`;
		return `
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: normal;
		`;
	}}

	&::-webkit-scrollbar {
		width: 8px;
		height: 4px;
	}
	&::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, #00d4ff, #007bff);
		border-radius: 3px;
	}
	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
	}

	@media (max-width: 768px) {
		min-width: 6rem;
	}

	@media (max-width: 480px) {
		min-width: 100%;
		margin-bottom: 0.5rem;
	}
`;

export const AchievementTextArea = styled.textarea`
	display: block;
	box-sizing: border-box;
	padding: 8px 10px;
	border-radius: 6px;
	background: rgba(40, 40, 40, 0.8);
	border: 1.5px solid #333;
	color: inherit;
	line-height: 1.5;
	min-height: 5rem;
	min-width: 18rem;
	max-height: 0rem;

	/* Normal scroll behavior */
	overflow: auto;
	white-space: pre-wrap;
	word-break: break-word;

	resize: vertical;
	outline: none;
	font: inherit;
	transition: border-color 0.2s ease, box-shadow 0.2s ease;

	&:focus {
		border-color: #00b4ff;
		box-shadow: 0 0 6px rgba(0, 180, 255, 0.4);
	}

	/* Make resize handle larger and more visible */
	&::-webkit-resizer {
		background: linear-gradient(135deg, #00d4ff, #007bff);
		border-radius: 4px;
		border: 2px solid #00b4ff;
		box-shadow: 0 0 8px rgba(0, 180, 255, 0.8);
		width: 20px;
		height: 20px;
	}

	/* Firefox resize handle */
	&::-moz-resizer {
		background: linear-gradient(135deg, #00d4ff, #007bff);
		border-radius: 4px;
		border: 2px solid #00b4ff;
	}

	&::-webkit-scrollbar-thumb {
		background: linear-gradient(180deg, #00d4ff, #007bff);
		border-radius: 4px;
	}

	@media (max-width: 768px) {
		min-width: 14rem;
	}

	@media (max-width: 480px) {
		min-width: 100%;
		min-height: 8rem;
	}
`;

export const ImagePreview = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;

	img {
		width: 120px;
		max-height: 60px;
		object-fit: cover;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	@media (max-width: 480px) {
		img {
			width: 100px;
			max-height: 50px;
		}
	}
`;

// Achievement Items
export const AchievementList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;

	@media (max-width: 480px) {
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}
`;

export const AchievementItem = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
	padding: 1rem;
	background: rgba(50, 50, 50, 0.6);
	border-radius: 12px;
	border: 1px solid rgba(255, 255, 255, 0.05);
	transition: all 0.3s ease;
	animation: ${slideIn} 0.4s ease-out;

	&:hover {
		background: rgba(60, 60, 60, 0.8);
		border-color: rgba(10, 175, 255, 0.3);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		flex-wrap: wrap;
		gap: 0.75rem;
		padding: 0.75rem;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
		padding: 0.75rem;
	}
`;

export const AchievementInput = styled.input`
	flex: 1;
	padding: 8px;
	border: 2px solid rgba(10, 175, 255, 0.5);
	border-radius: 4px;
	background: #f8f9fa;

	&:focus {
		outline: none;
		border-color: #007bff;
		box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
	}

	@media (max-width: 480px) {
		width: 100%;
		margin-bottom: 0.5rem;
	}
`;

export const RemoveButton = styled.button`
	background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
	border: none;
	border-radius: 8px;
	color: white;
	padding: 0.6rem 1rem;
	font-size: 12px;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	min-width: 80px;

	&:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
	}

	&:active {
		transform: translateY(0);
	}

	@media (max-width: 480px) {
		min-width: 100%;
		padding: 0.75rem;
	}
`;

export const AddForm = styled.div`
	${cardStyle}
	background: rgba(40, 40, 40, 0.6);
	border: 2px dashed rgba(255, 255, 255, 0.1);
	transition: all 0.3s ease;

	&:hover {
		border-color: rgba(10, 175, 255, 0.3);
		background: rgba(45, 45, 45, 0.7);
	}
`;

export const FormRow = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	@media (max-width: 768px) {
		gap: 1rem;
	}

	@media (max-width: 480px) {
		gap: 0.75rem;
	}
`;

export const InputGroup = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin: 1rem;

	@media (max-width: 768px) {
		margin: 0.5rem;
		min-width: calc(50% - 1rem);
	}

	@media (max-width: 480px) {
		min-width: 100%;
		margin: 0.25rem 0;
	}
`;

/* Add to your styled components */
export const AchievementFormRow = styled.div`
	display: flex;
	gap: 1.5rem;
	align-items: flex-start;
	width: 100%;

	@media (max-width: 768px) {
		flex-wrap: wrap;
		gap: 1rem;
	}

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 0.75rem;
	}
`;

export const InputAchievementGroup = styled.div<{ flex?: number }>`
	display: flex;
	flex-direction: column;
	margin: 1rem;
	gap: 0.5rem;
	flex: ${(props) => props.flex || 1};

	@media (max-width: 480px) {
		width: 100%;
	}
`;

export const InputLabel = styled.label`
	color: #ccc;
	font-size: 15px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	@media (max-width: 480px) {
		font-size: 1.75rem;
	}
`;

export const StyledInput = styled.input`
	${inputBaseStyles}
`;

export const ToggleContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 2px;
	margin-left: 2px;
	padding: 0;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(60, 60, 60, 0.8);
		border-color: rgba(10, 175, 255, 0.3);
	}

	@media (max-width: 480px) {
		padding: 6px 10px;
		gap: 8px;
	}
`;

export const ToggleLabel = styled.label`
	display: flex;
	align-items: center;
	gap: 12px;
	cursor: pointer;
	font-size: 14px;
	font-weight: 500;
	color: #ccc;
	flex: 1;

	@media (max-width: 480px) {
		gap: 8px;
		font-size: 13px;
	}
`;

export const ToggleSwitch = styled.div<{ $isChecked: boolean }>`
	position: relative;
	width: 25px;
	height: 12px;
	background: ${(props) =>
		props.$isChecked
			? 'linear-gradient(135deg, #00b894 0%, #00a085 100%)'
			: 'rgba(100, 100, 100, 0.8)'};
	border-radius: 12px;
	transition: all 0.3s ease;
	border: 1px solid rgba(255, 255, 255, 0.1);

	&::after {
		content: '';
		position: absolute;
		top: 2px;
		left: ${(props) => (props.$isChecked ? '12px' : '2px')};
		width: 9px;
		height: 9px;
		background: white;
		border-radius: 50%;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 480px) {
		width: 44px;
		height: 22px;

		&::after {
			width: 16px;
			height: 16px;
			left: ${(props) => (props.$isChecked ? '24px' : '2px')};
		}
	}
`;

export const ToggleInput = styled.input`
	display: none;
`;

export const ToggleText = styled.span<{ $isChecked: boolean }>`
	font-weight: ${(props) => (props.$isChecked ? '600' : '400')};
	color: ${(props) => (props.$isChecked ? '#00b894' : '#ccc')};
	transition: all 0.3s ease;
`;

export const ArraySection = styled.div`
	margin: 1.5rem 0;
	padding: 1rem;
	background: rgba(45, 45, 45, 0.6);
	border-radius: 8px;
	border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const SectionHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1rem;
`;

export const ArrayIndex = styled.span`
	color: #0af;
	font-weight: 600;
	min-width: 30px;
	font-size: 14px;
`;

export const HelpText = styled.span`
	color: #888;
	font-size: 12px;
	margin-top: 4px;
	display: block;
`;

export const CurrentJobLabel = styled.label`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 2px;
	cursor: pointer;
	font-size: 12px;
	color: #ccc;
	text-align: center;
	white-space: normal;
	line-height: 1.1;
`;

export const CurrentJobText = styled.span`
	font-size: 12px;
	color: #ccc;
`;

export const CurrentJobPlaceholder = styled.div`
	padding: 0.8rem 1rem;
	border-radius: 8px;
	background: rgba(0, 184, 148, 0.2);
	border: 1px solid rgba(0, 184, 148, 0.3);
	color: #00b894;
	font-weight: 600;
	text-align: center;
`;

export const DateDisplay = styled.div`
	${inputBaseStyles}
	background: rgba(60, 60, 60, 0.3);
	color: '#aaa';
	cursor: not-allowed;
	display: flex;
	align-items: center;
	min-height: 42px;

	/* Make it look exactly like a disabled input */
	border: 1.5px solid #333;
	opacity: 0.8;

	& {
		color: #aaa !important;
	}

	/* Remove focus effects since it's not interactive */
	&:focus {
		border-color: #333;
		box-shadow: none;
		background: rgba(60, 60, 60, 0.6);
	}

	&:hover {
		border-color: #333;
	}

	& > div {
		color: inherit !important;
		width: 100%;
	}
`;

export const StatusIndicator = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 8px 12px;
	background: rgba(0, 184, 148, 0.1);
	border: 1px solid rgba(0, 184, 148, 0.3);
	border-radius: 6px;
	color: #00b894;
	font-size: 12px;
	font-weight: 500;
	margin-top: 8px;

	@media (max-width: 480px) {
		padding: 6px 10px;
		font-size: 11px;
	}
`;

export const StatusDot = styled.div`
	width: 8px;
	height: 8px;
	background: #00b894;
	border-radius: 50%;
	animation: pulse 2s infinite;
`;

export const AddButton = styled.button`
	background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
	border: none;
	border-radius: 8px;
	color: white;
	padding: 0.8rem 1.5rem;
	font-weight: 600;
	cursor: pointer;
	transition: all 0.3s ease;
	min-width: 100px;
	height: fit-content;

	&:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 184, 148, 0.4);
		animation: ${pulse} 1s infinite;
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@media (max-width: 480px) {
		min-width: 100%;
		padding: 0.75rem 1rem;
		margin-top: 0.5rem;
	}
`;

// Action Buttons
export const ActionBar = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	padding-top: 1rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 0.75rem;
		padding-top: 0.75rem;
	}
`;

export const SaveButton = styled.button`
	background: linear-gradient(135deg, #0af 0%, #08c 100%);
	border: none;
	border-radius: 10px;
	color: white;
	padding: 0.8rem 2rem;
	font-weight: 700;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.3s ease;
	min-width: 160px;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 25px rgba(10, 175, 255, 0.4);
		animation: ${glow} 2s infinite;
	}

	&:active {
		transform: translateY(0);
	}

	@media (max-width: 480px) {
		min-width: 100%;
		padding: 0.75rem 1rem;
	}
`;

export const StatusMessage = styled.div<{ $success?: boolean }>`
	padding: 0.8rem 1rem;
	border-radius: 8px;
	background: ${(props) =>
		props.$success ? 'rgba(0, 184, 148, 0.2)' : 'rgba(255, 71, 87, 0.2)'};
	color: ${(props) => (props.$success ? '#00b894' : '#ff4757')};
	border: 1px solid
		${(props) =>
			props.$success ? 'rgba(0, 184, 148, 0.3)' : 'rgba(255, 71, 87, 0.3)'};
	font-weight: 600;
	font-size: 14px;
	animation: ${fadeIn} 0.3s ease-out;

	@media (max-width: 480px) {
		padding: 0.6rem 0.8rem;
		font-size: 13px;
		text-align: center;
	}
`;

// Right Panel - Preview
export const PreviewPanel = styled.div`
	flex: 1;
	${cardStyle}
	display: flex;
	flex-direction: column;
	max-height: 80vh;
	overflow: hidden;

	@media (max-width: 768px) {
		max-height: 50vh;
	}

	@media (max-width: 480px) {
		max-height: 40vh;
	}
`;

export const PreviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	margin-bottom: 1rem;

	@media (max-width: 480px) {
		padding-bottom: 0.75rem;
		margin-bottom: 0.75rem;
	}
`;

export const PreviewTitle = styled.h2`
	color: #fff;
	font-size: 2.5rem;
	font-weight: 700;
	margin: 0;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		font-size: 2rem;
	}

	@media (max-width: 480px) {
		font-size: 2.125rem;
	}
`;

export const DataContainer = styled.div`
	flex: 1;
	overflow-y: auto;
	padding-right: 0.5rem;

	&::-webkit-scrollbar {
		width: 6px;
	}

	&::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(10, 175, 255, 0.3);
		border-radius: 3px;
	}

	&::-webkit-scrollbar-thumb:hover {
		background: rgba(10, 175, 255, 0.5);
	}

	@media (max-width: 480px) {
		padding-right: 0.25rem;
	}
`;

// Accordion Styles
export const AccordionSection = styled.div`
	margin-bottom: 1rem;
	border-radius: 12px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(40, 40, 40, 0.6);

	@media (max-width: 480px) {
		margin-bottom: 0.75rem;
		border-radius: 8px;
	}
`;

export const AccordionHeader = styled.div`
	padding: 1rem 1.5rem;
	background: rgba(50, 50, 50, 0.8);
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(60, 60, 60, 0.9);
	}

	@media (max-width: 480px) {
		padding: 0.75rem 1rem;
	}
`;

export const AccordionTitle = styled.h3`
	color: #0af;
	font-size: 2rem;
	font-weight: 600;
	margin: 0;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '▶';
		font-size: 1.6rem;
		transition: transform 0.3s ease;
	}

	&.open::before {
		transform: rotate(90deg);
	}

	@media (max-width: 768px) {
		font-size: 1.6rem;
	}

	@media (max-width: 480px) {
		font-size: 2.2rem;

		&::before {
			font-size: 1.2rem;
		}
	}
`;

export const AccordionCount = styled.span`
	background: rgba(10, 175, 255, 0.2);
	color: #0af;
	padding: 0.2rem 0.6rem;
	border-radius: 12px;
	font-size: 1.5rem;
	font-weight: 600;

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}

	@media (max-width: 480px) {
		font-size: 1.55rem;
		padding: 0.15rem 0.4rem;
	}
`;

export const AccordionContent = styled.div`
	padding: 1rem 1.5rem;
	background: rgba(35, 35, 35, 0.8);
	border-top: 1px solid rgba(255, 255, 255, 0.05);

	@media (max-width: 480px) {
		padding: 0.75rem 1rem;
	}
`;

export const DataItem = styled.div`
	padding: 0.8rem;
	margin-bottom: 0.5rem;
	background: rgba(60, 60, 60, 0.6);
	border-radius: 8px;
	border-left: 3px solid #0af;
	animation: ${fadeIn} 0.4s ease-out;

	&:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 480px) {
		padding: 0.6rem;
		margin-bottom: 0.4rem;
	}
`;

export const DataKey = styled.span`
	color: #0af;
	font-weight: 600;
	font-size: 1.6rem;

	@media (max-width: 768px) {
		font-size: 1.4rem;
	}

	@media (max-width: 480px) {
		font-size: 1.8rem;
		display: block;
		margin-bottom: 0.25rem;
	}
`;

export const DataValue = styled.span`
	color: #fff;
	margin-left: 0.5rem;
	font-size: 1.4rem;

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}

	@media (max-width: 480px) {
		font-size: 1.65rem;
		margin-left: 0;
		display: block;
	}
`;

export const EmptyState = styled.div`
	text-align: center;
	padding: 3rem 2rem;
	color: #666;
	font-style: italic;

	&::before {
		font-size: 2rem;
		display: block;
		margin-bottom: 1rem;
		opacity: 0.5;
	}

	@media (max-width: 480px) {
		padding: 2rem 1rem;

		&::before {
			font-size: 1.5rem;
			margin-bottom: 0.75rem;
		}
	}
`;

export const StyledTextArea = styled.textarea`
	width: 100%;
	padding: 8px 12px;
	border: 1px solid rgba(255, 255, 255, 0.05);
	color: #ddd;
	border-radius: 4px;
	font-size: 14px;
	resize: vertical;
	min-height: 80px;
	background: rgba(40, 40, 40, 0.8);

	@media (max-width: 480px) {
		padding: 6px 10px;
		min-height: 60px;
		font-size: 16px;
	}
`;

export const ArrayInputRow = styled.div`
	display: flex;
	gap: 8px;
	align-items: center;
	margin-bottom: 8px;

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 6px;
		align-items: stretch;
	}
`;

export const SmallButton = styled.button<{ $danger?: boolean }>`
	padding: 4px 8px;
	background: ${(props) => (props.$danger ? '#ff4757' : '#007bff')};
	color: white;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	font-size: 14px;
	white-space: nowrap;

	&:hover {
		background: ${(props) => (props.$danger ? '#ff3742' : '#0056b3')};
	}

	@media (max-width: 480px) {
		padding: 6px 10px;
		font-size: 13px;
	}
`;

// ADD these new components:
export const InputRow = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 0.75rem;
	}
`;

export const SliderContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
`;

export const SliderHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const PercentValue = styled.span`
	color: #0af;
	font-weight: 600;
	font-size: 1.6rem;
	background: rgba(10, 175, 255, 0.1);
	padding: 0.3rem 0.8rem;
	border-radius: 12px;
	min-width: 60px;
	text-align: center;
`;

export const SliderTrack = styled.div`
	position: relative;
	width: 100%;
	height: 8px;
	background: rgba(255, 255, 255, 0.1);
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s ease;

	&:hover {
		background: rgba(255, 255, 255, 0.15);
	}
`;

export const SliderProgress = styled.div<{ $percent: number }>`
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	width: ${(props) => props.$percent}%;
	background: linear-gradient(90deg, #0af 0%, #08c 100%);
	border-radius: 4px;
	transition: width 0.2s ease;
`;

export const SliderThumb = styled.div<{ $percent: number }>`
	position: absolute;
	left: ${(props) => props.$percent}%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 20px;
	height: 20px;
	background: #fff;
	border: 3px solid #0af;
	border-radius: 50%;
	cursor: grab;
	transition: all 0.2s ease;
	box-shadow: 0 2px 8px rgba(10, 175, 255, 0.4);

	&:hover {
		transform: translate(-50%, -50%) scale(1.1);
		box-shadow: 0 4px 12px rgba(10, 175, 255, 0.6);
	}

	&:active {
		cursor: grabbing;
		transform: translate(-50%, -50%) scale(1.05);
	}
`;

export const ExperienceItem = styled.div`
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	padding: 16px;
	margin-bottom: 16px;
	background: rgba(50, 50, 50, 0.6);

	&:hover {
		background: rgba(60, 60, 60, 0.8);
		border-color: rgba(10, 175, 255, 0.3);
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		padding: 12px;
	}

	@media (max-width: 480px) {
		padding: 10px;
		margin-bottom: 12px;
	}
`;

export const ExperienceEditForm = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	@media (max-width: 480px) {
		gap: 8px;
	}
`;

export const ExperienceHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 8px;

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 0.5rem;
	}
`;

export const ActionButtons = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;

	@media (max-width: 480px) {
		align-self: flex-end;
	}
`;

export const ExperienceTitle = styled.h4`
	margin: 0;
	color: #fff;
	font-size: 16px;
	font-size: larger;

	@media (max-width: 480px) {
		font-size: 14px;
	}
`;

export const ExperienceDate = styled.span`
	color: #ccc;
	font-size: 14px;

	@media (max-width: 480px) {
		font-size: 12px;
	}
`;

export const ExperienceProject = styled.p`
	margin: 4px 0;
	color: #e0e0e0;
	font-style: italic;

	strong {
		display: inline;
		font-weight: 600;
		font-style: none;
	}

	@media (max-width: 480px) {
		font-size: 13px;
	}
`;

export const ExperienceDescription = styled.p`
	margin: 8px 0;
	color: #e0e0e0;
	line-height: 1.4;

	@media (max-width: 480px) {
		font-size: 13px;
		margin: 6px 0;
	}
`;

export const ExperienceList = styled.ul`
	margin: 8px 0;
	list-style-type: disc !important;
	list-style-position: inside;
	color: #e0e0e0;

	& li {
		list-style-type: disc;
		list-style-position: inside;
		margin: 8px 0;
		padding-left: 20px;
		color: #e0e0e0;
	}

	@media (max-width: 480px) {
		font-size: 13px;
		margin: 6px 0;

		& li {
			margin: 6px 0;
			padding-left: 16px;
		}
	}
`;

export const ExperienceTech = styled.p`
	margin: 8px 0;
	color: #e0e0e0;

	@media (max-width: 480px) {
		font-size: 13px;
		margin: 6px 0;
	}
`;

export const UploadZone = styled.div<{ $isDragActive?: boolean }>`
	border: 2px dashed ${(props) => (props.$isDragActive ? '#007bff' : '#ccc')};
	border-radius: 4px;
	padding: 20px;
	text-align: center;
	cursor: pointer;
	background: ${(props) => (props.$isDragActive ? '#f8f9fa' : 'transparent')};
	transition: all 0.3s ease;

	&:hover {
		border-color: #007bff;
	}

	@media (max-width: 480px) {
		padding: 15px;
	}
`;

export const ImageInputContainer = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;

	@media (max-width: 480px) {
		flex-direction: column;
		gap: 8px;
		align-items: stretch;
	}
`;

export const UploadButton = styled.button`
	background: #007bff;
	color: white;
	border: none;
	padding: 8px 16px;
	border-radius: 4px;
	cursor: pointer;
	white-space: nowrap;

	&:hover {
		background: #0056b3;
	}

	@media (max-width: 480px) {
		padding: 10px 16px;
		width: 100%;
	}
`;
