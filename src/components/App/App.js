// npm install react-router-dom
import Accueil from '../Accueil/Accueil'
import ListeFilms from '../ListeFilms/ListeFilms'
import Film from '../film/Film';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Entete from '../Entete/Entete';
import PageNonTrouvée from '../PageNonTrouvée/PageNonTrouvée';

function App() {
    return (
      <div className="App">
        <Router> 
            <Entete />
            <Routes>
              <Route path="/" element={<Accueil />}></Route>
              <Route path="/liste-films" element={<ListeFilms />}></Route>
              <Route path="/film/:id" element={<Film />}></Route>
              <Route path="/*" element={<PageNonTrouvée />}></Route>
            </Routes>
        </Router>
        
      </div>
    );
  }
  
  export default App;
  