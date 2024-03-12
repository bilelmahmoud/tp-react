import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accueil from './Accueil';

// Mock du fichier Accueil.json
import texts from './Accueil.json';

describe('Composant Accueil', () => {

  test('Vérifie si les paragraphes du fichier Accueil.json sont présents', () => {
    render(<Accueil />);

    texts.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
      console.log(`Le texte "${paragraph}" est présent.`);
    });
  });

  
});