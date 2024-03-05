import texts from './Accueil.json'
import '../Accueil/Accueil.css'


function Accueil() {
  const textAccueil = texts.map((text, index) => {
    return <p key={index}>{text}</p>;
  });

  return (
    <div className="container">
       <h1>videoclub</h1>
       <div className="accueil-text-container">
          {textAccueil}
        </div>
    </div>

  );
}

export default Accueil;