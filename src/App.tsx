import React from 'react';
import {Layout, NavBar, PageContent} from './components';

function App() {
  return (
    <Layout>
      <NavBar authenticated={true}/>
      <PageContent/>
    </Layout>
  );
}

export default App;
