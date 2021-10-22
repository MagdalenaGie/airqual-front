import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationList = styled.ul`
  text-align: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavigationLink = styled(NavLink)`
  display: inline-block;
  justify-content: center;
  text-decoration: none;
  color: white;
  text-transform: uppercase;
  margin: 10px 0;
  padding: 5px 0;
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
        <li key={1}><NavigationLink to="/home">Informacje</NavigationLink></li>,
        <li key={2}><NavigationLink to="/plots">Wykresy</NavigationLink></li>,
        <li key={3}><NavigationLink to="/controllers">Czujniki</NavigationLink></li>,
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