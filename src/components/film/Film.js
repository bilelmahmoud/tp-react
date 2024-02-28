import { useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
// import {  Link } from "react-router-dom";
import '../film/Film.css'





function Film() {
  const {id} = useParams();
  const urlFilm = `https://film-22gk.onrender.com/api/films/${id}`;
  // const urlFilm = `data/titre-asc.json/${id}
    console.log(urlFilm);
  const [film, setFilm] = useState([]);
  const [rating, setRating] = useState(0);
  const [moyenne, setMoyenne] = useState(0);
  const [nombreVotes, setNombreVotes] = useState(0);
 

  useEffect(() => {
    fetch(urlFilm)
    .then((response) => response.json())
  
    .then((data) => {
       console.log(data.notes)
       console.log(data)
       setFilm(data)
     

       if (data.notes && data.notes.length > 0) {
        // Calcul de la moyenne
        const moyenne = data.notes.reduce((total, note) => total + note, 0) / data.notes.length;
        console.log('Moyenne:', moyenne);

        // Mise à jour de la moyenne et du nombre de votes
        setMoyenne(moyenne.toFixed(2)); // Limité à 2 chiffres après la virgule
        setNombreVotes(data.notes.length);
      } else {
        // Aucune note, mettre à jour la moyenne et le nombre de votes à des valeurs par défaut
        setMoyenne(0);
        setNombreVotes(0);
      }
      
    });

    }, [])

    const genres = film.genres ? film.genres.join(' , ') : '';

    async function soumettreNote(e) {
      console.log(e.target)
      let aNotes;
      // tableau pour les votes
      if (!film.notes) {
        aNotes = [rating];
      } else {
        aNotes = [...film.notes, rating];
      }
        
        const oOptions = {
          method : 'put',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({notes: aNotes})
        }

        let putNote = await fetch(urlFilm, oOptions) ,
            getFilm = await fetch(urlFilm);


        Promise.all([putNote, getFilm])
        .then(response  => response[1].json())
        .then((data) => {
            console.log(data.notes);
            setFilm(data)
            //setMoyenne
            //seTnBvOTES
        })    
    }


    return (
    
  
    <article className="carte">
      <img src={`../img/${film.titreVignette}`} alt={film.titre} className="carte-image" />
      <div className="carte-info">
        <h2> {film.titre}</h2>
        <p> <strong>Description</strong> : {film.description}</p>
        <p> <strong>Réalisation</strong> : {film.realisation}</p>
        <p> <strong>Annee</strong> : {film.annee}</p>
        <p> <strong>Genres</strong> : {genres}</p>

        {/* <div className="rating">
        <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5"></label>
        <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4"></label>
        <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3"></label>
        <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2"></label>
        <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1"></label>
        </div> */}

              <div className="rating">
                {[5, 4, 3, 2, 1].map((value) => (
                  <div key={value}>
                    <input
                      type="radio"
                      id={`star${value}`}
                      name="rating"
                      value={value}
                      checked={rating === value}
                      onChange={() => setRating(value)}
                    />
                    <label htmlFor={`star${value}`}></label>
                  </div>
                ))}
              </div>


        <p><strong>Moyenne des votes:</strong> {moyenne}</p>
        <p><strong>Nombre de votes:</strong> {nombreVotes}</p>
  
        <button onClick={soumettreNote}>vote</button>
   
      </div>
                 
      {/* <Link to="/liste-films" className='btn'>Retour</Link> */}
    </article>
    



      
  
    );
  }
  
  export default Film;