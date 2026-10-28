
import type { Athlete } from '../types/Athlete';

// Express-palvelimen REST-rajapinnan osoite.
const API_URL = 'http://localhost:3001/api/athletes';

// Hakee kaikki urheilijat backendistä.
export async function getAthletes(): Promise<Athlete[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Urheilijoiden hakeminen epäonnistui.');
  }

  return response.json();
}


 // Lisätään uusi urheilija tietokantaan.
export async function addAthlete(
  athlete: Omit<Athlete, 'id'>
): Promise<number> {

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(athlete)
  });

  if (!response.ok) {
    throw new Error('Urheilijan lisääminen epäonnistui.');
  }

  const data: { id: number } = await response.json();

  return data.id;
}


 // Päivitetään urheilijan tiedot tietokantaan.
export async function updateAthlete(
  id: number,
  athlete: Omit<Athlete, 'id'>
): Promise<void> {

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(athlete)
  });

  if (!response.ok) {
    throw new Error('Urheilijan päivittäminen epäonnistui.');
  }
}


 // Poistetaan urheilija tietokannasta ID:n perusteella.
export async function deleteAthlete(id: number): Promise<void> {

  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Urheilijan poistaminen epäonnistui.');
  }
}
