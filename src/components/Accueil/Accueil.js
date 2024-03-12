import texts from './Accueil.json'
import '../Accueil/Accueil.css'

import {motion } from 'framer-motion';


function Accueil() {

  const textAccueil = texts.map((text, index) => {
    return <p key={index}>{text}</p>;
  });

  const transition = {duration: 0.5, ease: 'easeInOut'}
  const variant = {
    hidden: {opacity: 0, y:25 },
    visible: {opacity: 1, y:0, transition},
    exit: {opacity: 0, y:25, transition}
  }

  return (
    <motion.main
      key='accueil'
      initial='hidden'
      animate='visible'
      exit='exit'
      variants={variant}

    >

      <div className="container">
            <h1>videoclub</h1>
            <div className="accueil-text-container">
                {textAccueil}
              </div>
          </div>

    </motion.main>
    

  );
}

export default Accueil;