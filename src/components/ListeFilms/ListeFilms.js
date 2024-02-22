import TuileFilm from '../TuileFilm/TuileFilm';
import '../ListeFilms/ListeFilm.css'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



function ListeFilm() {
  //  const [etat, setEtat] = useState(true)
 

     const urlListeFilms = 'https://film-22gk.onrender.com/api/films'
      const [listeFilms, setListeFilm] = useState([]);
    //   { titre : 'Film1', realisateur: 'billy1', annee : '1997'},
    //   { titre : 'Film2', realisateur: 'billy2', annee : '1998'},
    //   { titre : 'Film3', realisateur: 'billy3', annee : '1999'}

    //  ];
    //  console.log('rendu')
    useEffect(() => {
    fetch(urlListeFilms)
    .then((response) => response.json())
    .then((data) => {
      setListeFilm(data)
    });

    }, [])

     const tuilesFilm = listeFilms.map((film, index) => {

            // return <TuileFilm key={index} data={film} />
            //  <TuileFilm key={index} data={film} />
             return  <Link key={index} to={`/film/${film.id}`}><TuileFilm key={index} data={film}/></Link>
            

     });


    return (
     <main>
      {/* <button onClick={() => setEtat(!etat)}>change etat</button> */}
        <h1 className='.mt-large'>Liste de films</h1>
              <div className="tuile-film-grid">
                {tuilesFilm}
             </div>
     </main>
    );
  }
  
  export default ListeFilm;