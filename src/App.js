import Popover from './components/Popover';
import './App.css';

function App() {
   return (
      <div className="App">
         <Popover
            description="Demo description"
            position="top"
            style={{
               backgroundColor: "white",
               fontWeight: "bold",
            }}
         >
            <div className="hover-button">Hover me to see popover</div>
         </Popover>
      </div>
   );
}

export default App;
