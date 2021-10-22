import styled from 'styled-components';
import bgdSource from './../../media/background/clouds.jpg';

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
  background-image: url(${bgdSource});
  background-size: cover;
`;