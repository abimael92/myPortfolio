import styled from 'styled-components';

export const GridContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 3rem;
  padding: 2rem 1rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem 0;
  }
`;

export const BlogCard = styled.div`
  background: #212D3E;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease, backdrop-filter 0.4s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.4);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 30px rgba(0,123,255,0.6);
  }
`;


export const ImgWrapper = styled.div`
  width: 100%;
  height: 140px;
  overflow: hidden; /* ensures zoom doesn't exceed container */
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  position: relative;
`;

export const Img = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform 0.4s ease;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transform: scale(1.15); /* slight initial zoom */

${ImgWrapper}:hover & {
  transform: scale(1.5); /* hover zoom */
}
`;

export const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;

  ${ImgWrapper} {
    padding: 0; /* remove padding for image wrapper */
  }
`;

export const TitleContent = styled.div`
  text-align: center;
  font-weight: 800;
  font-size: 2rem;
  margin: 0.5rem 0 1.5rem 0;
  font-family: 'Poppins', 'Inter', sans-serif;
  position: relative;
  display: inline-block;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -6px; /* distance from text */
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(to right, #00d4ff, #007bff);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 70%; /* subtle hover animation */
    transition: width 0.3s ease;
  }
`;

export const HeaderThree = styled.h3`
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #00d4ff;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  text-align: center;
  position: relative;
  transition: color 0.3s ease;

  /* subtle hover effect */
  &:hover {
    color: #ffa500;
  }

  /* animated underline effect */
  /* &::after {
    content: '';
    display: block;
    width: 0;
    height: 3px;
    margin: 0.5rem auto 0;
    background: linear-gradient(90deg, #00d4ff, #007bff, #ffa500);
    border-radius: 2px;
    transition: width 0.4s ease;
  } */

  &:hover::after {
    width: 60%;
  }
`;


export const Hr = styled.hr`
  width: 50%;
  height: 3px;
  margin: 0.25rem auto 0.5rem;
  border: none;
  border-radius: 3px;
  background: linear-gradient(270deg, #00d4ff, #007bff, #ffa500);
  background-size: 600% 100%;
  animation: gradientMove 3s ease infinite;

  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;


export const CardInfo = styled.p`
  flex-grow: 1;
  padding: 1rem 1.2rem;
  margin: 0;
  font-size: 1.55rem;
  line-height: 1.5;
  color: #e4e6e7;
  text-align: justify;
  border-radius: 12px;

  /* glass/neon effect */
  background: rgba(0,0,0,0.25);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 4px 12px rgba(0,123,255,0.2);

  /* subtle animation on hover */
  transition: all 0.3s ease-in-out;

  &:hover {
    background: rgba(0,0,0,0.35);
    box-shadow: 0 8px 20px rgba(0,123,255,0.4);
    transform: translateY(-2px);
  }

  /* scrollable content */
  max-height: 80px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #00d4ff, #007bff);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
  }

  /* custom animated line effect */
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -2px;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #00d4ff, #007bff);
    border-radius: 4px;
    /* animation: pulseLine 2s infinite; */
  }

  @keyframes pulseLine {
    0%, 100% { opacity: 0.3; transform: scaleY(0.9); }
    50% { opacity: 1; transform: scaleY(1.05); }
  }
`;


export const HeaderStack = styled.h4`
  font-weight: 500;
  color: #9cc9e3;
  font-size: 1.4rem;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  overflow-x: auto;
  padding: 0.3rem;

  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d0bb57;
    border-radius: 3px;
  }
`;

export const Tag = styled.li`
  background: linear-gradient(135deg, #007bff, #00d4ff);
  color: #fff;
  padding: 0.4rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 20px;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0,123,255,0.6);
  }
`;

export const UtilityList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 2rem;
  flex-wrap: wrap;
`;

export const ExternalLinks = styled.a`
  color: #fff;
  font-size: 1.4rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem;
  border-radius: 16px;
  border: 2px solid #00d4ff;
  background: rgba(0,123,255,0.2);
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,123,255,0.5);
  }

  &[disabled] {
    background: #555;
    border-color: #999;
    cursor: not-allowed;
    color: #ccc;
    pointer-events: none;
    box-shadow: none;
  }
`;
export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  @media ${(props) => props.theme.breakpoints.sm} {
    margin-top: 1.5rem;
    padding: 0 1rem;
  }
`;


export const ShowMoreButton = styled.button`
  padding: 0.8rem 2rem;
  margin: 2rem;
  font-size: 1.4rem;
  border-radius: 12px;
  border: 2px solid #00d4ff;
  background: ${(props) => (props.showAll ? '#007bff' : 'rgba(0,123,255,0.2)')};
  background: rgba(0,123,255,0.2);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.6),
              0 0 20px rgba(0, 123, 255, 0.4);
  text-align: center;

  &:hover {
    background: #00d4ff;
    background: rgba(0, 123, 255, 0.6);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 0 20px rgba(0, 212, 255, 0.8),
                0 0 30px rgba(0, 123, 255, 0.6);
  }
`;
