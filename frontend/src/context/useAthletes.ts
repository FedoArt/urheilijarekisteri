
import { useContext } from 'react';
import { AthleteContext } from './athleteContextValue';

// Hook Contextin tietojen käyttämiseen.
export function useAthletes() {
  const context = useContext(AthleteContext);

  if (!context) {
    throw new Error('useAthletes vaatii AthleteProviderin.');
  }

  return context;
}
