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
}

export const NavList : React.FC<Props> = () => {
    const navContent = [
        <li key={1}><NavigationLink to="/">Home</NavigationLink></li>,
        <li key={2}><NavigationLink to="/plots">Wykresy</NavigationLink></li>,
        <li key={3}><NavigationLink to="/controllers">Czujniki</NavigationLink></li>
    ];
    
    return (
        <NavigationList>
            {navContent}
        </NavigationList>
    );
}