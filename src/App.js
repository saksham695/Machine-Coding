import './App.css';
import Carousel from './components/Carousel';
import { images } from "./data";

function App() {
   return (
      <div className="App">
         <Carousel
            images={images}
            showArrows={true}
            showIndicators={true}
            autoPlay={true}
            interval={3000}
            infinite={true}
         />
      </div>
   );
}

export default App;
