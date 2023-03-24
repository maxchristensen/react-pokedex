import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Pokedex from './Pokedex';
import PokemonDetails from './PokemonDetails';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' Component={Pokedex} />
        <Route path='/pokemon/:id' Component={PokemonDetails} />
      </Routes>
    </HashRouter>
  );
}

export default App;
