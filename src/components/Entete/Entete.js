import { NavLink, Link } from "react-router-dom";
import '../Entete/Entete.css'
import { useContext } from "react";
import { AppContext } from "../App/App";



function Entete(props) {

   const context = useContext(AppContext)
   console.log(props)
    return (
      <header>
         <div className="container">
            <div className="titre-site">
              <Link  to="/">Videoclub</Link>
            </div>
            <ul className="nav-links">
               <li> { context.estLog ? <NavLink  to="/admin">Admin</NavLink> : " " } </li> 

               <li> <NavLink  to="/liste-films">Liste des films</NavLink></li>
               {/* <li> <NavLink to="/liste-films" className="btn">btn</NavLink></li> */}
               <li>        
                 
               <div>
            {/* Affiche le nom d'utilisateur et le bouton de logout si l'utilisateur est connecté */}
            {context.estLog ? (
               <>
                 <div className="user-info">
                     
                        <p className="welcome-message">Bienvenue, {context.usager}!</p>
                        <button onClick={context.logout} className="logout-btn ">Logout</button>
                 </div>
                 
               </>
            ) : (
               // Affiche le formulaire de login si l'utilisateur n'est pas connecté
               <form onSubmit={props.handleLogin}>
                  <input type="text" name="usager"></input>
                  <button className="btn-login">Login</button>
               </form>
            )}
        </div>


               </li>
               
            </ul>
         </div>

         

        
        
                    
      </header>
      
    );
  }

  
  export default Entete;