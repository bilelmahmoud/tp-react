import { useEffect, useState, useContext,  } from 'react'
import {useParams} from "react-router-dom";
import '../film/Film.css'
import { AppContext } from "../App/App";

function Film() {
   
  const context = useContext(AppContext)

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
  
        // const moyenne = data.notes.reduce((total, note) => total + note, 0) / data.notes.length;
        console.log('Moyenne:', moyenne);

    
        setMoyenne((data.notes.reduce((total, note) => total + note, 0) / data.notes.length).toFixed(2));
        setNombreVotes(data.notes.length);
      } else {
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
        aNotes = film.notes;
        aNotes.push(rating);
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
            console.log(moyenne)
            setMoyenne((data.notes.reduce((total, note) => total + note, 0) / data.notes.length).toFixed(2));
        
           setNombreVotes(data.notes.length);
        })    
    }

    let BlocAjoutCommentaire

    if(context.estLog) {
      BlocAjoutCommentaire = <form onSubmit={soumettreCommentaire}>

                           <textarea name="commentaire" id="" cols="30" rows="10" placeholder='votre commentaire'></textarea>
                           <button>soumettre</button>

         
                             </form>
    }

    async function soumettreCommentaire(e) {
      e.preventDefault();
      console.log(e.target)
      let aCommentaires;
     
      if (!aCommentaires) {
        aCommentaires = [{commentaire: 'je suis un comentaire', usager: context.usager}];
      } else {
        aCommentaires = film.commentaires;
        aCommentaires.push({commentaire: 'je suis un comentaire', usager: context.usager});
      }
        // appel async
        const oOptions = {
          method : 'put',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({commentaire : aCommentaires})
        }

        let putCommnetaire = await fetch(urlFilm, oOptions) ,
            getFilm = await fetch(urlFilm);


        Promise.all([putCommnetaire, getFilm])
        .then(response  => response[1].json())
        .then((data) => {
            console.log(data);
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

        
        <div className="rating">
          <input type="radio" id="star5" name="rating" value="5" checked={rating === 5} onChange={() => setRating(5)} />
          <label htmlFor="star5"></label>

          <input type="radio" id="star4" name="rating" value="4" checked={rating === 4} onChange={() => setRating(4)} />
          <label htmlFor="star4"></label>

          <input type="radio" id="star3" name="rating" value="3" checked={rating === 3} onChange={() => setRating(3)} />
          <label htmlFor="star3"></label>

          <input type="radio" id="star2" name="rating" value="2" checked={rating === 2} onChange={() => setRating(2)} />
          <label htmlFor="star2"></label>

          <input type="radio" id="star1" name="rating" value="1" checked={rating === 1} onChange={() => setRating(1)} />
          <label htmlFor="star1"></label>
        </div>

        <p><strong>Moyenne des votes:</strong> {moyenne}</p>
        <p><strong>Nombre de votes:</strong> {nombreVotes}</p>

        {BlocAjoutCommentaire}
  
        <button onClick={soumettreNote} className='btn'>vote</button>
   
      </div>
                 
      {/* <Link to="/liste-films" className='btn'>Retour</Link> */}
    </article>
    



      
  
    );
  }
  
  export default Film;