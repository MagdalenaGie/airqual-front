import {Layout, Login, NavBar, PageContent} from './components';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from './store/rootReducer';
import { useEffect } from 'react';
import { setToken } from './store/actions';

function App() {

  const isAuthentificated = useSelector((state: StoreState) => state.state.isAuth);
  var authToken = localStorage.getItem("token");
  
  var dispatch = useDispatch();
  if(authToken){
    dispatch(setToken(authToken));
  }

  useEffect(() => {
    authToken = localStorage.getItem("token");
  }, [isAuthentificated])

  if(!authToken ){
    return <Login/>;
  }

  return (
    <Layout>
      <NavBar/>
      <PageContent/>
    </Layout>
  );
}

export default App;
