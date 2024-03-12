import '../Vote/Vote.css'
import  { useState } from 'react';


//function Vote({onVote, moyenne, nombreVotes}) {
function Vote(props) {
     
    return (
        <>
        <div className='vote-container'>

        
                <div className="rating"  onClick={(e) => props.handleClick(e)}>
                    <input type="radio" id="star5" name="rating" value="5"  />
                    <label htmlFor="star5" id="5"></label>

                    <input type="radio" id="star4" name="rating" value="4"  />
                    <label htmlFor="star4" id="4"></label>

                    <input type="radio" id="star3" name="rating" value="3"  />
                    <label htmlFor="star3" id="3"></label>

                    <input type="radio" id="star2" name="rating" value="2" />
                    <label htmlFor="star2" id="2"></label>

                    <input type="radio" id="star1" name="rating" value="1"  />
                    <label htmlFor="star1" id="1"></label>
                </div> 

                     <p>({props.moyenne}/5)</p>

                    
                     {/* <p><strong>Nombre de votes:</strong>{nombreVotes}</p>  */}
             
                    <p>
                        {props.nombreVotes === 0 ? 'Aucun vote' : props.nombreVotes === 1 ? `   ${props.nombreVotes} vote` : ` ${props.nombreVotes} votes`}
                    </p>  
       </div>

        </>
        

       
   
        

       
    


    );
}
  
  export default Vote;