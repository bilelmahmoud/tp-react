import { Link } from "react-router-dom";
import '../TuileFilm/TuileFilm.css';

function TuileFilm(props) {
  return (
    <article className="tuile">
      <div className="card">
        <img src={`img/${props.data.titreVignette}`} alt={props.data.titre} />
        <div className="descriptions">
          <h1>{props.data.titre}</h1>
          <p>{props.data.description}</p>
          <p>{props.data.realisation}</p>
        </div>
      </div>
    </article>
  );
}

export default TuileFilm;