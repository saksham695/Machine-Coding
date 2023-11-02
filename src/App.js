import { inputStyles } from './utils';
import TypeaheadSearch from './components/TypeaheadSearch';
import SuggestionsList from './components/SuggestionsList';
import './App.css';

function App() {
   const transformData = (data) => data.results;
   const promise = async (query, signal) => 
      await fetch(`https://swapi.dev/api/films?search=${query}`, {signal});

   return (
      <div className="App">
         <h1>Typeahead Search/ Autocomplete Suggestions</h1>

         <TypeaheadSearch
            inputId="movie-input"
            placeholderText="search for movies..."
            debounceDelayTime={500}
            autoComplete={true}
            styling={{
               input: inputStyles
            }}
            loader={() => <div className="loader">Loading...</div>}
            renderItems={(items, activeIndex) => <SuggestionsList items={items} activeIndex={activeIndex} />}
            noResultsMessage={() => <div className="no-results">No results found...</div>}
            errorMessage={(errMsg) => <div className="err-msg">{errMsg}</div>}
            transformData={transformData}
            promise={promise}
         />
      </div>
   );
}

export default App;
