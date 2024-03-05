import { useEffect, useState, useContext,  } from 'react'
import {useParams} from "react-router-dom";
import '../film/Film.css'
import { AppContext } from "../App/App";
import Vote from '../Vote/Vote'

function Film() {
   
  const context = useContext(AppContext)

  const {id} = useParams();
  const urlFilm = `https://film-22gk.onrender.com/api/films/${id}`;
  // const urlFilm = `data/titre-asc.json/${id}
    console.log(urlFilm);
  const [film, setFilm] = useState([]);
  // const [rating, setRating] = useState(0);
  const [moyenne, setMoyenne] = useState(0);
  const [nombreVotes, setNombreVotes] = useState(0);
 

  useEffect(() => {
    fetch(urlFilm)
    .then((response) => response.json())
  
    .then((data) => {
      //  console.log(data.notes)
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

    async function soumettreNote(rating) {
      let aNotes;
  
      if (!film.notes) {
        aNotes = [rating];
      } else {
        aNotes = film.notes;
        aNotes.push(rating);
      }
  
      const oOptions = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notes: aNotes }),
      };
  
      let putNote = await fetch(urlFilm, oOptions);
      let getFilm = await fetch(urlFilm);
  
      Promise.all([putNote, getFilm])
        .then((response) => response[1].json())
        .then((data) => {
          console.log(data.notes);
          setFilm(data);
          setMoyenne((data.notes.reduce((total, note) => total + note, 0) / data.notes.length).toFixed(2));
          setNombreVotes(data.notes.length);
        });
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
      const commentaireValue = e.target.commentaire.value;
    
      let aCommentaires;
    
      if (!film.commentaires) {
        aCommentaires = [{ commentaire: commentaireValue, usager: context.usager }];
      } else {
        // aCommentaires = [...film.commentaires, { commentaire: commentaireValue, usager: context.usager }];
        aCommentaires = [...film.commentaires, { commentaire: commentaireValue, usager: context.usager }];
       
      }
    
      const oOptions = {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentaires: aCommentaires }),  
      };
    
      let putCommnetaire = await fetch(urlFilm, oOptions);
      let getFilm = await fetch(urlFilm);
    
      Promise.all([putCommnetaire, getFilm])
        .then((response) => response[1].json())
        .then((data) => {
          console.log(data);
          setFilm(data);
          e.target.reset();
          //setMoyenne
          //seTnBvOTES
        });
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
        </div> */}

        <p><strong>Moyenne des votes:</strong> {moyenne}</p>
        <p><strong>Nombre de votes:</strong> {nombreVotes}</p>

        {BlocAjoutCommentaire}
 
        <Vote onVote={soumettreNote} /> 

  
        {/* <button onClick={soumettreNote} className='btn'>vote</button> */}

        {film.commentaires && film.commentaires.map((commentaire, index) => (
        <div key={index}>
          <p>
            {commentaire.usager && `Usager: ${commentaire.usager}, `}
            {commentaire.commentaire && `Commentaire: ${commentaire.commentaire}`}
          </p>
        </div>
))}
      </div>
                 
      {/* <Link to="/liste-films" className='btn'>Retour</Link> */}
    </article>
    



      
  
    );
  }
  
  export default Film;