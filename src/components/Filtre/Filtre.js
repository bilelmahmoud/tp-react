import { useState } from 'react';
import '../Filtre/Filtre.css';

function Filtre({ setUrlFiltre, urlListeFilms }) {
  const [filtreActif, setFiltreActif] = useState("");

  function filtre(e) {
    if (e.target.textContent === 'Titre alphabétique (A-Z)') {
      setUrlFiltre(`${urlListeFilms}?tri=titre&order=asc`);

    } else if (e.target.textContent === 'Titre alphabétique (Z-A)') {
      setUrlFiltre(`${urlListeFilms}?tri=titre&order=desc`);

    } else if (e.target.textContent === 'Réalisateur alphabétique (A-Z)') {
      setUrlFiltre(`${urlListeFilms}?tri=realisation&order=asc`);

    } else if (e.target.textContent === 'Réalisateur alphabétique (Z-A)') {
      setUrlFiltre(`${urlListeFilms}?tri=realisation&order=desc`);

    } else if (e.target.textContent === 'Par année (du plus récent)') {
      setUrlFiltre(`${urlListeFilms}?tri=annee&order=desc`);

    } else if (e.target.textContent === 'Par année (du plus ancien)') {
      setUrlFiltre(`${urlListeFilms}?tri=annee&order=asc`);
    }
    setFiltreActif(e.target.textContent);
  }

  return (
    <ul className="filtre-list">
      <li className={filtreActif === 'Titre alphabétique (A-Z)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Titre alphabétique (A-Z)</li>
      <li className={filtreActif === 'Titre alphabétique (Z-A)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Titre alphabétique (Z-A)</li>
      <li className={filtreActif === 'Réalisateur alphabétique (A-Z)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Réalisateur alphabétique (A-Z)</li>
      <li className={filtreActif === 'Réalisateur alphabétique (Z-A)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Réalisateur alphabétique (Z-A)</li>
      <li className={filtreActif === 'Par année (du plus récent)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Par année (du plus récent)</li>
      <li className={filtreActif === 'Par année (du plus ancien)' ? 'filtre-actif' : ''} onClick={(e) => filtre(e)}>Par année (du plus ancien)</li>
    </ul>
  );
}

export default Filtre;
