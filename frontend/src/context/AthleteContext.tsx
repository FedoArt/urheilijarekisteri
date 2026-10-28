
import {
  useState,
  useEffect,
  type ReactNode
} from 'react';


import { AthleteContext } from './athleteContextValue';

import type { Athlete } from '../types/Athlete';



import {
  getAthletes,
  addAthlete as addAthleteRequest,
  updateAthlete as updateAthleteRequest,
  deleteAthlete as deleteAthleteRequest
} from '../services/athleteService';

// Provider jakaa tiedot React-komponenteille.
export function AthleteProvider({ children }: { children: ReactNode }) {

  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Haetaan urheilijat tietokannasta.
  async function refreshAthletes() {
    setLoading(true);
    setError(null);

    try {
      const data = await getAthletes();
      setAthletes(data);
    } catch {
      setError('Urheilijoiden hakeminen epäonnistui.');
    } finally {
      setLoading(false);
    }
  }

  // Lisätään uusi urheilija tietokantaan.
  async function addAthlete(athlete: Omit<Athlete, 'id'>) {

    // Lähetetään urheilija backendille.
    const newId = await addAthleteRequest(athlete);

    // Päivitetään urheilijalista.
    await refreshAthletes();

    // Palautetaan uuden urheilijan ID.
    return newId;
  }

  
// Päivitetään olemassa olevan urheilijan tiedot.
async function updateAthlete(
  id: number,
  athlete: Omit<Athlete, 'id'>
): Promise<void> {

  // Lähetetään päivitetyt tiedot backendille.
  await updateAthleteRequest(id, athlete);

  // Haetaan päivitetty urheilijalista.
  await refreshAthletes();
}


// Poistetaan urheilija tietokannasta.
async function deleteAthlete(id: number): Promise<void> {

  // Lähetetään DELETE-pyyntö backendille.
  await deleteAthleteRequest(id);

  // Päivitetään urheilijalista poistamisen jälkeen.
  await refreshAthletes();
}


  // Haetaan urheilijat sovelluksen käynnistyessä.
  
useEffect(() => {
  let cancelled = false;

  getAthletes()
    .then((data) => {
      if (!cancelled) {
        setAthletes(data);
      }
    })
    .catch(() => {
      if (!cancelled) {
        setError('Urheilijoiden hakeminen epäonnistui.');
      }
    })
    .finally(() => {
      if (!cancelled) {
        setLoading(false);
      }
    });

  return () => {
    cancelled = true;
  };
}, []);


  return (
    
<AthleteContext.Provider
  value={{
    athletes,
    loading,
    error,
    refreshAthletes,
    addAthlete,
    updateAthlete,
    deleteAthlete
  }}
>

      {children}
    </AthleteContext.Provider>
  );
}


