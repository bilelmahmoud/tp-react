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
  //const [rating, setRating] = useState(0);
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
       

    
        setMoyenne((data.notes.reduce((total, note) => total + note, 0) / data.notes.length).toFixed(2));
        setNombreVotes(data.notes.length);
        console.log('Moyenne:', moyenne);
      } else {
        setMoyenne(0);
        setNombreVotes(0);
      }
      
    });

    }, [])

    const genres = film.genres ? film.genres.join(' , ') : '';

    async function soumettreNote(e) {
      e.preventDefault();

      let rating = parseInt(e.target.id, 10);
      
      
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

                           <textarea name="commentaire" id="" cols="50" rows="8" placeholder='votre commentaire'></textarea>
                           <br />
                           <button className='btn'>soumettre</button>

         
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
        });
    }

    return (
    
      <>
  
    <article className="carte">
      <img src={`../img/${film.titreVignette}`} alt={film.titre} className="carte-image" />
     
      <div className="carte-info">

        <div className='titre-vote-container'>
              <h2> {film.titre}</h2>
              
        <Vote handleClick={soumettreNote} moyenne={moyenne} nombreVotes={nombreVotes} />
        </div>
      
              <p> <strong>Description : </strong>{film.description}</p>
              <p> <strong>Réalisation :</strong>{film.realisation}</p>
              <p> <strong>Annee :</strong>{film.annee}</p>
              <p> <strong>Genres :</strong><span className='film-genres'>{genres}</span></p>
              {BlocAjoutCommentaire}
              {/* <div className='film-vote-commentaire'> */}
              {/* <div className="moyenne-vote">
              </div> */}
              {/* </div> */}
        
      
      </div>
                 
      {/* <Link to="/liste-films" className='btn'>Retour</Link> */}
    </article>
      <div className='film-commentaire-container'>


      <div className='commentaire-film'>
                      
                      {film.commentaires && film.commentaires.map((commentaire, index) => (
                      <div className="carte-commentaire" key={index}>
                        <p>
                        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className='icone'><rect fill="none" height="256" width="256"/><circle cx="128" cy="128" fill="none" r="96" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="120" fill="none" r="40" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M63.8,199.4a72,72,0,0,1,128.4,0" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                          { commentaire.usager && ` ${commentaire.usager} `}
                          <br />
                          {commentaire.commentaire && ` ${commentaire.commentaire}`}
                      
                        </p>
                      </div>
                      ))}
                         
                      </div>



      </div>
          
    
</>


      
  
    );
  }
  
  export default Film;