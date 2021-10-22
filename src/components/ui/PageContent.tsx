import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Plots, Controllers, Login } from '..';

const Content = styled.nav`
  background-color: rgba(255, 255, 255, .70);
`;

const ContentContainer = styled.div`
  padding: 20px;
  margin 30px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
  height: 90vh;
`;

//it will be a wrapper that would contain the page content
interface Props {
 component ?: React.FC;
}

export const PageContent : React.FC<Props> = () => {
    return (
        <Content>
            <ContentContainer>
                <div>page content</div>
                <Switch>
                    <Route path="/" exact component={Login} /> 
                    <Route path="/controllers" component={Controllers} />
                    <Route path="/plots" component={Plots} />
                    <Route path="/login" component={Login} />
                </Switch>
            </ContentContainer>
        </Content>
        
    );
}