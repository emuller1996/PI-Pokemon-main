import './App.css';
import Landing from './components/Landing/Landing';
import {Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NuevoPokemon from './components/NuevoPokemon/NuevoPokemon';
import PokemonDetalle from './components/PokemonDetalle/PokemonDetalle';


function App() {
  return (
    <div className="App">
      <Route exact path='/'>
      <Landing></Landing>
      </Route>
      <Route exact path='/Home'>
        <Home></Home>
      </Route>
      <Route exact path='/create'>
        <NuevoPokemon/>
      </Route>
      <Route exact path="/pokemon/:id" component={PokemonDetalle} />
      
    </div>
  );
}

export default App;
