
import { createContext } from 'react';
import type { Athlete } from '../types/Athlete';

// Contextin sisältämät tiedot ja toiminnot.
export interface AthleteContextType {
  athletes: Athlete[];
  loading: boolean;
  error: string | null;
  refreshAthletes: () => Promise<void>;
  addAthlete: (athlete: Omit<Athlete, 'id'>) => Promise<number>;
  updateAthlete: (
    id: number,
    athlete: Omit<Athlete, 'id'>
  ) => Promise<void>;
  deleteAthlete: (id: number) => Promise<void>;
}

// Yhteinen Context.
export const AthleteContext = createContext<AthleteContextType | undefined>(
  undefined
);
