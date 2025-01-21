
import {CORE_CONCEPTS} from './data.js';
import Header          from './components/Header.jsx'
import CoreConcept     from './components/CoreConcept.jsx';
import TabButton       from './components/TabButton.jsx';





//Using properties with object destructuring:
//The property names are defined in the component call in the default function App() 
//The component function then uses the same names to map the properties to data within the component function
//Iterestingly , we don't need to define all the properties in the component function call , if the object is already set as a JavasCript object
//We can use the ... (spread operator), and then object destructuring in the component parameters. The parameters have to match the names in the JavaScript Object

//Default component
function App() {
  function handleSelect(selectedButton){
    // selectedButton => 'components, 'jsx' , 'props' 
    console.log(selectedButton);
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
            <TabButton onSelect={()=>handleSelect('components')}>Components</TabButton>
            <TabButton onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
            <TabButton onSelect={()=>handleSelect('props')}>Props</TabButton>
            <TabButton onSelect={()=>handleSelect('state')}>State</TabButton>
          </menu>
        </section>
      </main>
    </div>
  );
}

export default App;
