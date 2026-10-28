
export interface Athlete {
  id: number;
  etunimi: string;
  sukunimi: string;
  kutsumanimi: string | null;
  syntymaaika: string;
  paino: string | number | null;
  kuva_url: string | null;
  laji: string;
  saavutukset: string | null;
}
