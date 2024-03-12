import TuileFilm from '../TuileFilm/TuileFilm';
import '../ListeFilms/ListeFilm.css';
import {motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filtre from '../Filtre/Filtre';


function ListeFilm() {
   const urlListeFilms = 'https://film-22gk.onrender.com/api/films';
  // const urlListeFilms = 'data/titre-asc.json';
   const[urlFiltre, setUrlFiltre] = useState(urlListeFilms)
  const [listeFilms, setListeFilm] = useState([]);
  const[estCharger, setEstCharger] = useState(false)

  useEffect(() => {
    fetch(urlFiltre)
      .then((response) => response.json())
      .then((data) => {
        setListeFilm(data);
        setEstCharger(true)
      });
  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link key={index} to={`/film/${film.id}`}>
        <TuileFilm key={index} data={film} />
      </Link>
    );
  });

  const transition = {duration: 0.5, ease: 'easeInOut'}
  const variant = {
    hidden: {opacity: 0, y:25 },
    visible: {opacity: 1, y:0, transition},
    exit: {opacity: 0, y:25, transition}
  }


  
  return (
    <main>

     <motion.div
      key='filtre'
      initial={{opacity: 0, x: -25 }}
      animate={{opacity: 1, x: 0, transition }}
      exit={{opacity: 0, x:-25, transition }}


    >
      
      <Filtre setUrlFiltre={setUrlFiltre} urlListeFilms={urlListeFilms}  />

      </motion.div>

      {estCharger ? (

    
      <motion.div
      key='liste-film'
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variant}
      className='tuile-film-grid'

    >

      {/* <div className="tuile-film-grid"> */}
        {tuilesFilm}

      </motion.div>
      ) : ('')}
    </main>
  );
}

export default ListeFilm;

