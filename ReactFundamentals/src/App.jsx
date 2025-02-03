
//react Hook function useState, they must only be called inside react component functions or custom react hooks , only called in the upper level (not wrapped in ifs or loops)

import {Fragment} from 'react'
import Header          from './components/Header.jsx'
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples  from'./components/Examples.jsx';



//Default component
function App() {


 

  return (
    <Fragment>
      <Header></Header>
      <main>
        <CoreConcepts/>
        <Examples/>  
      </main>
    </Fragment>
  );
}

export default App;
