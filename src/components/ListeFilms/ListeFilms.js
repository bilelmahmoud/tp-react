import TuileFilm from '../TuileFilm/TuileFilm';
import '../ListeFilms/ListeFilm.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filtre from '../Filtre/Filtre';

function ListeFilm() {
   const urlListeFilms = 'https://film-22gk.onrender.com/api/films';
  // const urlListeFilms = 'data/titre-asc.json';
   const[urlFiltre, setUrlFiltre] = useState(urlListeFilms)
  const [listeFilms, setListeFilm] = useState([]);

  useEffect(() => {
    fetch(urlFiltre)
      .then((response) => response.json())
      .then((data) => {
        setListeFilm(data);
      });
  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link key={index} to={`/film/${film.id}`}>
        <TuileFilm key={index} data={film} />
      </Link>
    );
  });

  
  return (
    <main>
      <Filtre setUrlFiltre={setUrlFiltre} urlListeFilms={urlListeFilms}  />
      <div className="tuile-film-grid">
        {tuilesFilm}

      </div>
    </main>
  );
}

export default ListeFilm;

