import LogoSrc from './../../media/logo/aghlogowh.png';
import styled from 'styled-components';
import { NavList } from './NavList';

const Column = styled.nav`
    background-color: rgba(255, 255, 255, 1);
    background-color: #2E4961;
    justify-content: center;
`;
const Image = styled.img`
  margin: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 65%;
`;

interface Props {
 authenticated: boolean;
}

export const NavBar : React.FC<Props> = () => {
    return (
        <Column>
            <Image src={LogoSrc}/>
            <NavList authenticated={true}/>
        </Column>
        
    );
}