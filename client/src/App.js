import './App.css';
import Landing from './components/Landing/Landing';
import {Route } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
      <Landing></Landing>
      </Route>
      <Route exact path='/Home'>
        <Home></Home>
      </Route>
      
    </div>
  );
}

export default App;
