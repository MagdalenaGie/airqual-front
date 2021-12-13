import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { Plots, Controllers} from '..';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/rootReducer';
import { useEffect } from 'react';
import { getData, getStatus, setIntervalId } from '../../store/actions';

const Content = styled.nav`
  background-color: #ffffff;
`;

interface Props {
 component ?: React.FC;
}

export const getFormattedDate = (date: Date) => {
  return `${date.toISOString().slice(0, 10)} ${date.toLocaleTimeString('pl-PL')}`;
}

export const PageContent : React.FC<Props> = () => {

  const authToken = useSelector((state: StoreState) => state.state.userData?.token)!;

  const dispatch = useDispatch(); 
  const refreshData = () => {
    const stop = new Date();
    const start = new Date(stop.getTime() - 360000);
    dispatch(getData(getFormattedDate(start), getFormattedDate(stop), authToken));
    dispatch(getStatus(authToken));
  }

  useEffect(()=>{
    refreshData();
	  var timer = window.setInterval(refreshData, 3600000);
    dispatch(setIntervalId(timer));
  }, []);

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