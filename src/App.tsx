import {Layout, Login, NavBar, PageContent} from './components';
import { useSelector } from 'react-redux';
import { StoreState } from './store/rootReducer';
import { useEffect } from 'react';

function App() {

  const isAuthentificated = useSelector((state: StoreState) => state.state.isAuth);
  var authToken = localStorage.getItem("token");

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
