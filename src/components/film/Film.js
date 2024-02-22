import { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import {  Link } from "react-router-dom";






function Film() {
  const {id} = useParams();
  const urlFilm = `https://film-22gk.onrender.com/api/films/${id}`;
    console.log(urlFilm);
  const [film, setFilm] = useState([]);
 

  useEffect(() => {
    fetch(urlFilm)
    .then((response) => response.json())
  
    .then((data) => {
       console.log(data)
       setFilm(data)
      
    });

    }, [])

    const genres = film.genres ? film.genres.join(' , ') : '';

    return (
     

      
      <article className="tuile">
      
         <img src={`../img/${film.titreVignette}`} alt={film.titre} style={{ width: '300px' }} />
        <div className=""><h2> titre : {film.titre}</h2></div> 
        <div className=""><h2> description :  {film.description}</h2></div>
        <div className=""><h2> realisation : {film.realisation}</h2></div>  
        <div className=""><h2> genres : {genres}</h2></div>
        <li> <Link  to="/liste-films" className='btn'>retour</Link></li>   
       
      

      
      </article>

      
  
    );
  }
  
  export default Film;