import styled from 'styled-components';

export const ImageContainer = styled.div`
	text-align: center;
	background-image: radial-gradient(
		50% 50% at 50% 50%,
		rgba(79, 108, 176, 0.25) 53.8%,
		rgba(79, 108, 176, 0) 100%
	);
	width: 100%;
	padding: 60px;
	margin-top: 48px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	@media ${(props) => props.theme.breakpoints.lg} {
		background-image: none;
		padding: 0;
		margin-top: 40px;
	}
	@media ${(props) => props.theme.breakpoints.md} {
		background-image: none;
		padding: 0;
		margin-top: 16px;
	}
`;

export const MainImage = styled.img`
	width: 100%;
`;

export const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 320px);
  justify-content: center; /* center the grid */
  gap: 40px;
  max-width: calc(320px * 3 + 40px * 2); /* max 3 items + 2 gaps */
  margin: 3rem auto;


  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: 820px;
    margin: 64px auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 700px;
    margin: 64px auto;
    gap: 24px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
	display: flex;
    flex-direction: column;
    align-items: center; /* center items horizontally */
    margin: 0;
    max-width: 100%;
    padding: 5%;
    gap: 2rem; /* optional spacing between items */
  }
`;

export const List2 = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 320px);
  justify-content: center; /* center the grid */
  gap: 40px;
  max-width: calc(320px * 2 + 80px * 4); /* max 3 items + 2 gaps */
  margin: 3rem auto;


  @media ${(props) => props.theme.breakpoints.lg} {
    max-width: 820px;
    margin: 64px auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 700px;
    margin: 64px auto;
    gap: 24px;
  }

  @media ${(props) => props.theme.breakpoints.sm} {
	display: flex;
    flex-direction: column;
    align-items: center; /* center items horizontally */
    margin: 0;
    max-width: 100%;
    padding: 5%;
    gap: 2rem; /* optional spacing between items */
  }
`;


export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;

	@media ${(props) => props.theme.breakpoints.sm} {
		display: flex;
		margin-left: 18px;
	}
`;

export const ListTitle = styled.h4`
	font-weight: 700;
	font-size: 28px;
	line-height: 32px;
	letter-spacing: 0.02em;
	color: #ffffff;
	margin-bottom: 8px;

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 24px;
		line-height: 28px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0.02em;
		margin-bottom: 4px;
	}
`;

export const ListParagraph = styled.p`
	font-size: 18px;
	line-height: 30px;
	color: rgba(255, 255, 255, 0.75);

	@media ${(props) => props.theme.breakpoints.md} {
		font-size: 16px;
		line-height: 28px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 14px;
		line-height: 22px;
	}
`;

export const ListItem = styled.li`
  width: 320px;
	border-radius: 10px;
	box-shadow: 3px 3px 20px rgba(80, 78, 78, 0.5);
	max-width: 320px;
	margin: 0 ;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	transition: transform 0.3s ease;
	

	&:hover {
		background-color: #212d45;
		transform: scale(1.2);
		cursor: pointer;
	}

	@media ${(props) => props.theme.breakpoints.md} {
		max-width: 203px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
	    flex-direction: column;
    align-items: center; /* center content */
    text-align: center;  /* center text */
    width: 100%;         /* optional: make them responsive */
    max-width: 320px;    /* keep the same as desktop card width */
	}
`;

export const ListIcon = styled.img`
	display: block;
	width: 48px;
	height: 48px;
	margin-bottom: 10px;

	@media ${(props) => props.theme.breakpoints.md} {
		width: 40px;
		height: 40px;
		margin-bottom: 8px;
	}

	@media ${(props) => props.theme.breakpoints.sm} {
		width: 32px;
		height: 32px;
		margin-bottom: 0px;
	}
`;




export const SkillsItemsContainer = styled.div`
  padding: 0rem 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem; /* Adjust the gap between items if needed */
  box-sizing: border-box; /* Include padding and border in element's total width and height */
`;

// export const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem; /* Space between items */
//   box-sizing: border-box; /* Include padding and border in element's total width and height */
//   width: 100%;
//   margin: 0 auto; /* Center the row */
// `;

export const SkillsContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column; /* stack categories vertically */
  gap: 2rem;

  h2 {
    margin-bottom: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #04D9FF;
    cursor: pointer;
    user-select: none;

	@media ${(props) => props.theme.breakpoints.sm} {
		font-size: 18px;
	}

    span {
      display: inline-block; /* needed for transform */
      transition: color 0.3s ease, transform 0.3s ease;
    }

    &:hover span {
      color: #00ffff; /* hover cyan */
      transform: translateX(8%); /* smoother shift only on text */
    }

    &.active span {
      color: #ffd700; /* gold when active */
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap; /* allows items to stay inline and wrap to next line */
  gap: 1rem;
`;



export const SkillItem = styled.div`
  position: relative;        /* required for SkillPercent positioning */
  flex: 0 1 220px;          /* fixed width for each skill item, but still responsive */
  margin: 0.5rem;            /* gap between skills */
`;


export const Progress = styled.div`
  background-color: #e3e3e3;
  height: 12px;
  border-radius: 6px;
  width: 100%;
  position: relative;
`;

export const ProgressIn = styled.div`
  background-color: #04D9FF;
  background: linear-gradient(90deg,  #0072ff 0%, #00c6ff 100%);
  height: 100%;
  border-radius: 6px;
  width: ${props => props.width || '0%'};
  transition: width 0.6s ease-in-out;
  position: absolute;
  left: 0;
  top: 0;
`;

export const SkillPercent = styled.div`
  line-height: 40px;
  position: absolute;
  right: 0;
  top: -40px;
  font-weight: 400;
  color: #ffffff;
  font-size: 20px;
  
`;

export const SkillTitle = styled.h3`
  line-height: 40px;
  font-weight: 800;
  color: #ffffff;
  text-transform: capitalize;
  margin: 0;
  font-size: 22px;

  border-radius: 12px;
  padding: 2px 8px;
  font-weight: bold;
  white-space: nowrap;

`;
