import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Plots, Controllers, Login } from '..';

const Content = styled.nav`
  background-color: #17344E;
`;

//it will be a wrapper that would contain the page content
interface Props {
 component ?: React.FC;
}

export const PageContent : React.FC<Props> = () => {
    return (
        <Content>
                <div>page content</div>
                <Switch>
                    <Route path="/" exact component={Login} /> 
                    <Route path="/controllers" component={Controllers} />
                    <Route path="/plots" component={Plots} />
                    <Route path="/login" component={Login} />
                </Switch>
        </Content>
        
    );
}