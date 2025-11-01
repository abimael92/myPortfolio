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
`;

const inputBaseStyles = css`
	width: 100%;
	padding: 0.8rem 1rem;
	border-radius: 8px;
	border: 1.5px solid #333;
	background: rgba(40, 40, 40, 0.8);
	color: #fff;
	font-size: 14px;
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
`;

// Left Panel - Editor
export const EditorPanel = styled.div`
	flex: 1;
	${cardStyle}
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

export const PanelHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
`;

export const Section = styled.div`
	animation: ${fadeIn} 0.6s ease-out;
`;

export const SectionTitle = styled.h2`
	color: #fff;
	font-size: 1.8rem;
	font-weight: 600;
	margin-bottom: 1rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: '';
		width: 4px;
		height: 16px;
		background: linear-gradient(135deg, #0af 0%, #08c 100%);
		border-radius: 2px;
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

	&:hover {
		background: ${(props) =>
			props.$danger ? '#c82333' : props.$secondary ? '#5a6268' : '#0056b3'};
	}

	&:disabled {
		background: #6c757d;
		cursor: not-allowed;
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
	max-width: 150px;
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
`;

export const AchievementTextArea = styled.textarea`
	display: block;
	box-sizing: border-box;
	padding: 8px 10px;
	border-radius: 6px;
	background: rgba(60, 60, 60, 0.8);
	color: inherit;
	line-height: 1.5;
	min-height: 10rem;
	min-width: 18rem;
	max-height: 20rem;

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
`;

export const ImagePreview = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 8px;

	img {
		width: 180px;
		max-height: 60px;
		object-fit: cover;
		border-radius: 4px;
		border: 1px solid #ddd;
	}
`;

// Achievement Items
export const AchievementList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-bottom: 2rem;
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
	gap: 1rem;
	align-items: flex-end;

	@media (max-width: 480px) {
		flex-direction: column;
	}
`;

export const InputGroup = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const InputLabel = styled.label`
	color: #ccc;
	font-size: 12px;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.5px;
`;

export const StyledInput = styled.input`
	${inputBaseStyles}
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
`;

// Action Buttons
export const ActionBar = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: flex-end;
	padding-top: 1rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
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
`;

// Right Panel - Preview
export const PreviewPanel = styled.div`
	flex: 1;
	${cardStyle}
	display: flex;
	flex-direction: column;
	max-height: 80vh;
	overflow: hidden;
`;

export const PreviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 1rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	margin-bottom: 1rem;
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
`;

// Accordion Styles
export const AccordionSection = styled.div`
	margin-bottom: 1rem;
	border-radius: 12px;
	overflow: hidden;
	border: 1px solid rgba(255, 255, 255, 0.1);
	background: rgba(40, 40, 40, 0.6);
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
`;

export const AccordionCount = styled.span`
	background: rgba(10, 175, 255, 0.2);
	color: #0af;
	padding: 0.2rem 0.6rem;
	border-radius: 12px;
	font-size: 1.5rem;
	font-weight: 600;
`;

export const AccordionContent = styled.div`
	padding: 1rem 1.5rem;
	background: rgba(35, 35, 35, 0.8);
	border-top: 1px solid rgba(255, 255, 255, 0.05);
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
`;

export const DataKey = styled.span`
	color: #0af;
	font-weight: 600;
	font-size: 1.6rem;
`;

export const DataValue = styled.span`
	color: #fff;
	margin-left: 0.5rem;
	font-size: 1.4rem;
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
`;
