import React, { Fragment } from 'react';
import {useState} from 'react';
import {EXAMPLES} from '../data';
import TabButton from './TabButton.jsx';
import Section from './Section.jsx';
import Tabs from './Tabs.jsx';


//Using properties with object destructuring:
//The property names are defined in the component call in the default function App() 
//The component function then uses the same names to map the properties to data within the component function
//Iterestingly , we don't need to define all the properties in the component function call , if the object is already set as a JavasCript object
//We can use the ... (spread operator), and then object destructuring in the component parameters. The parameters have to match the names in the JavaScript Object

export default function Examples()
{
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
    return(
        
        <Section title="Examples" id="examples">
          <Tabs buttonsContainer="menu" buttons={ <Fragment> <TabButton isSelected={selectedTopic==='components'} onSelect={()=>handleSelect('components')}>Components</TabButton>
            <TabButton isSelected={selectedTopic==='jsx'} onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected={selectedTopic==='props'} onSelect={()=>handleSelect('props')}>Props</TabButton>
            <TabButton isSelected={selectedTopic==='state'} onSelect={()=>handleSelect('state')}>State</TabButton></Fragment>}>{tabContent}</Tabs>
          <menu>
          
          </menu>
          
        </Section>
    );
}