// npm install react-router-dom
import Accueil from '../Accueil/Accueil'
import ListeFilms from '../ListeFilms/ListeFilms'
import Film from '../film/Film';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Entete from '../Entete/Entete';
import PageNonTrouvée from '../PageNonTrouvée/PageNonTrouvée';
import { useState } from 'react';
import Admin from '../Admin/Admin';
import React from 'react';

export const AppContext = React.createContext();


function App() {

  // const [estLog, setEstLog] = useState(false)
  const [logging, setLogging] = useState({estLog : false, usager : ''})

  

  function login(e){
    e.preventDefault();
    if(e.target.usager.value == 'admin') {
      // setEstLog(prevEstLog =>!prevEstLog)
    
      // setLogging({estLog : false, usager: e.target.usager.value})
       setLogging(logging => ({...logging, estLog: true, usager: e.target.usager.value}));
       e.target.reset();
    }
    console.log('login')
  }


  function logout() {
    // Réinitialise l'état du login
    setLogging({ estLog: false, usager: '' });
  }


    return (
       
       <AppContext.Provider value={{ ...logging, logout }}>
      <div className="App">
        <Router> 
            {/* <Entete  handleLogin={login} estLog={estLog} /> */}
            <Entete  handleLogin={login}  />
            <Routes>
              <Route path="/" element={<Accueil />}></Route>
              <Route path="/liste-films" element={<ListeFilms />}></Route>
              <Route path="/film/:id" element={<Film />}></Route>
              <Route path="/*" element={<PageNonTrouvée />}></Route>
              <Route path="/admin" element={logging.estLog ? < Admin /> : <Navigate to="/" /> } />
              
            </Routes>
        </Router>
        
      </div>
      </AppContext.Provider>

    );
  }
  
  export default App;
  