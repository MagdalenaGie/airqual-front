import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationList = styled.ul`
  list-style-type: none;
`;

const NavigationLink = styled(NavLink)`
  justify-content: center;
  display:inline-block;
  text-align: center;
  text-decoration: none;
  width: 80%;
  border: 2px solid grey;
  border-radius: 9px;
  padding: 5px;
  margin: 10px;
`;

const Button = styled.div`
  border: 1px solid grey;
  border-radius: 5px;
  justify-content: center;
  width: 80%;
  padding: 20px;
`;

interface Props {
 authenticated: boolean;
}

export const NavList : React.FC<Props> = ({authenticated}) => {
    const forNotAuth = [
        <li key={1}><NavigationLink to="/home">O projekcie</NavigationLink></li>,
        <li key={2}><NavigationLink to="/login">Zaloguj się</NavigationLink></li>,
        <li key={3}><NavigationLink to="/contact">Kontakt</NavigationLink></li>
    ];
    const forAuth = [
        <li key={1}><NavigationLink to="/home">O projekcie</NavigationLink></li>,
        <li key={2}><NavigationLink to="/plots">Zobacz wykresy</NavigationLink></li>,
        <li key={3}><NavigationLink to="/controllers">Sprawdź czujniki</NavigationLink></li>,
        <li key={4}><NavigationLink to="/logout">Wyloguj</NavigationLink></li>,
        <li key={5}><NavigationLink to="/contact">Kontakt</NavigationLink></li>
    ];

    var navContent =  authenticated ? forAuth : forNotAuth;

    return (
        <NavigationList>
            {navContent}
        </NavigationList>
    );
}