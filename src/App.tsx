import useToken  from './components/user/useToken';
import {Layout, Login, NavBar, PageContent} from './components';

function App() {
  const {token, setToken, unsetToken} = useToken();
  console.log("token in app:", token);

  if(token === ""){
    return <Login setToken={setToken}/>;
  }

  return (
    <Layout>
      <NavBar unsetToken={unsetToken}/>
      <PageContent/>
    </Layout>
  );
}

export default App;
