import { Link } from "react-router-dom";
import '../TuileFilm/TuileFilm.css'

function TuileFilm(props) {
    return (
   //  <Link to={`/film/${props.index}`}> 


   <article className="tuile">
      <img src={`img/${props.data.titreVignette}`} alt={props.data.titre} />
      <div className=""><h2>{props.data.titre}</h2></div> 
     

      
   </article>
   // </Link>
    );
  }
  
  export default TuileFilm;