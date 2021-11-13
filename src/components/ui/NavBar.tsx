import LogoSrc from './../../media/logo/aghlogowh.png';
import styled from 'styled-components';
import { NavList } from './NavList';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

const Column = styled.nav`
    background-color: #236133;
    justify-content: center;
`;
const Image = styled.img`
  margin: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const FakeNavLinkButton = styled(Button)({
    '&&&': {color: 'white',
    backgroundColor: '',
    display: 'flex',
    margin: '0 auto',
    padding: '10px',
    fontSize: '14.5px',
    justifyContent: 'center'}
})

interface Props {
    unsetToken: () => void
}

export const NavBar : React.FC<Props> = ({unsetToken}) => {

    let history = useHistory();

    const handleLogout =() => {
      unsetToken();
      history.push("/");
      console.log("after redirect");
    }
    return (
        <Column>
            <Image src={LogoSrc}/>
            <NavList/>
            <FakeNavLinkButton onClick={handleLogout}>Wyloguj</FakeNavLinkButton>
        </Column>
        
    );
}