import LogoSrc from './../../media/logo/aghlogowh.png';
import styled from 'styled-components';
import { NavList } from './NavList';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions';
import { StoreState } from '../../store/rootReducer';

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
}

export const NavBar : React.FC<Props> = () => {

    let dispatch = useDispatch();
    let history = useHistory();

    const timerId = useSelector((state: StoreState) => state.state.timerId)!;

    const handleLogout =() => {
      clearInterval(timerId);
      dispatch(logout());
      history.push("/");
    }
    
    return (
        <Column>
            <Image src={LogoSrc}/>
            <NavList/>
            <FakeNavLinkButton onClick={handleLogout}>Wyloguj</FakeNavLinkButton>
        </Column>
        
    );
}