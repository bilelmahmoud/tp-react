import { NavLink, Link } from "react-router-dom";
import '../Entete/Entete.css'



function Entete() {
    return (
      <header>
         <div className="container">
            <div className="titre-site">
              <Link  to="/">Videoclub</Link>
            </div>
            <ul className="nav-links">
               <li> <NavLink  to="/liste-films">Liste des films</NavLink></li>
               <li> <NavLink to="/liste-films" className="btn">btn</NavLink></li>
               
            </ul>
         </div>                 
                    
      </header>
      
    );
  }

  
  export default Entete;