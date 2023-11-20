import './App.css';
import Accordion from './components/Accordion';
import { accordionData } from "./data";

function App() {
   return (
      <div className="App">
         <Accordion 
            title={"My Accordion"}
            data={accordionData}
            expandIcon={<span>&#9660;</span>}
         />
      </div>
   );
}

export default App;
