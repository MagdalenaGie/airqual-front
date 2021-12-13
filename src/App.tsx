import {Layout, Login, NavBar, PageContent} from './components';
import { useSelector } from 'react-redux';
import { StoreState } from './store/rootReducer';

function App() {

  const isAuthentificated = useSelector((state: StoreState) => state.state.isAuth);
  const authToken = useSelector((state: StoreState) => state.state.userData?.token);
  console.log("token in app:", authToken);

  if( !isAuthentificated ){
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
