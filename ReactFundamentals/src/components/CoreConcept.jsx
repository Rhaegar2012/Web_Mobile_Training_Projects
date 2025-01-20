//Using properties with object destructuring:
//The property names are defined in the component call in the default function App() 
//The component function then uses the same names to map the properties to data within the component function
//Iterestingly , we don't need to define all the properties in the component function call , if the object is already set as a JavasCript object
//We can use the ... (spread operator), and then object destructuring in the component parameters. The parameters have to match the names in the JavaScript Object


export default function CoreConcept({image,title,description}){
  return(
    <li>
      <img src={image} alt="..."/>
      <h3>{title}</h3>
      <p>{description}</p>
    </li>

  );
}