
//react Hook function useState, they must only be called inside react component functions or custom react hooks , only called in the upper level (not wrapped in ifs or loops)

import {useState} from 'react'
import {CORE_CONCEPTS} from './data.js';
import Header          from './components/Header.jsx'
import CoreConcept     from './components/CoreConcept.jsx';
import TabButton       from './components/TabButton.jsx';
import {EXAMPLES}              from './data.js';





//Using properties with object destructuring:
//The property names are defined in the component call in the default function App() 
//The component function then uses the same names to map the properties to data within the component function
//Iterestingly , we don't need to define all the properties in the component function call , if the object is already set as a JavasCript object
//We can use the ... (spread operator), and then object destructuring in the component parameters. The parameters have to match the names in the JavaScript Object

//Default component
function App() {
  //Hook function , useState allows to manage component specific state , when changed it will trigger the parent component function to re execute
  //Input default state for reach to store (Initial state value)
  //Return an array of 2 elements (always), the names of the elements are up to the user but they typically follow a specific convetion
  //First element -> current state provided by React 
  //Second element -> function to update the stored value 
  const[selectedTopic,setSelectedTopic]=useState('components');
  function handleSelect(selectedButton){
    // selectedButton => 'components, 'jsx' , 'props' 
    setSelectedTopic(selectedButton);
    console.log(selectedTopic);
  }

  let tabContent =<p>Please select a topic</p>;

  if(selectedTopic){
    tabContent = (<div id="tab-content">
      <h3>{EXAMPLES[selectedTopic].title}</h3>
      <p>{EXAMPLES[selectedTopic].description}</p>
      <pre>
        <code>{EXAMPLES[selectedTopic].code}</code>
      </pre>

    </div>);
  }

  return (
    <div>
      <Header></Header>
      <main>
        <section id="core-concepts">
          <h2>Time to get started!</h2>
          <ul>
            <CoreConcept {...CORE_CONCEPTS[0]}/>
            <CoreConcept title={CORE_CONCEPTS[1].title} description={CORE_CONCEPTS[1].description} image={CORE_CONCEPTS[1].image}/>
            <CoreConcept title={CORE_CONCEPTS[2].title} description={CORE_CONCEPTS[2].description} image={CORE_CONCEPTS[2].image}/>
            <CoreConcept title={CORE_CONCEPTS[3].title} description={CORE_CONCEPTS[3].description} image={CORE_CONCEPTS[3].image}/>
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton isSelected={selectedTopic==='components'} onSelect={()=>handleSelect('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic==='jsx'} onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic==='props'} onSelect={()=>handleSelect('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic==='state'} onSelect={()=>handleSelect('state')}>State</TabButton>
          </menu>
          {tabContent}
        </section>
      </main>
    </div>
  );
}

export default App;
