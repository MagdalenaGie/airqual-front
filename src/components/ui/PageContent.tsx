import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Plots, Controllers} from '..';

const Content = styled.nav`
  background-color: #ffffff;
`;

//it will be a wrapper that would contain the page content
interface Props {
 component ?: React.FC;
}

export const PageContent : React.FC<Props> = () => {
    return (
        <Content>
                <Switch>
                    <Route path="/" exact component={Plots} /> 
                    <Route path="/controllers" component={Controllers} />
                    <Route path="/plots" component={Plots} />
                </Switch>
        </Content>
        
    );
}