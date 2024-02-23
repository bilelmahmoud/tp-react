import TuileFilm from '../TuileFilm/TuileFilm';
import '../ListeFilms/ListeFilm.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ListeFilm() {
  const urlListeFilms = 'https://film-22gk.onrender.com/api/films';
  const [listeFilms, setListeFilm] = useState([]);

  useEffect(() => {
    fetch(urlListeFilms)
      .then((response) => response.json())
      .then((data) => {
        setListeFilm(data);
      });
  }, []);

  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link key={index} to={`/film/${film.id}`}>
        <TuileFilm key={index} data={film} />
      </Link>
    );
  });

  return (
    <main>
      <h1>Liste de films</h1>
      <div className="tuile-film-grid">
        {tuilesFilm}
      </div>
    </main>
  );
}

export default ListeFilm;