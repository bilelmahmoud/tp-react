import '../Vote/Vote.css'
import  { useState } from 'react';


function Vote({onVote}) {
    const [rating, setRating] = useState(0);
    const soumettreNote = () => {
        onVote(rating);
        setRating(0);
    };

     
    return (
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

        <button onClick={soumettreNote} className='btn'>vote</button>

        </div> 



    );
  }
  
  export default Vote;