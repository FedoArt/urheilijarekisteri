
import { useState, type FormEvent } from 'react';
import type { Athlete } from '../types/Athlete';
import { useAthletes } from '../context/useAthletes';

// Urheilijan tiedot ilman tietokannan ID:tä.
type AthleteInput = Omit<Athlete, 'id'>;


interface AthleteFormProps {
  onClose: () => void;
  athlete?: Athlete | null;
}


// Muunnetaan tietokannan päivämäärä lomakkeelle.
function formatDateForInput(value: string): string {
  if (!value.includes('T')) {
    return value.slice(0, 10);
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return date.toLocaleDateString('sv-SE', {
    timeZone: 'Europe/Helsinki'
  });
}

function AthleteForm({ onClose, athlete }: AthleteFormProps) {
  const { addAthlete, updateAthlete } = useAthletes();


  
const [form, setForm] = useState<AthleteInput>({
  etunimi: athlete?.etunimi ?? '',
  sukunimi: athlete?.sukunimi ?? '',
  kutsumanimi: athlete?.kutsumanimi ?? '',
  syntymaaika: athlete
    ? formatDateForInput(athlete.syntymaaika)
    : '',
  paino: athlete?.paino ?? null,
  kuva_url: athlete?.kuva_url ?? '',
  laji: athlete?.laji ?? '',
  saavutukset: athlete?.saavutukset ?? ''
});


  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Päivitetään lomakkeen kentän arvo.
  function updateField<K extends keyof AthleteInput>(
    field: K,
    value: AthleteInput[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value
    }));
  }

  // Tallennetaan urheilija.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError('');

    
try {
  if (athlete) {
    // Päivitetään olemassa oleva urheilija.
    await updateAthlete(athlete.id, form);
  } else {
    // Lisätään uusi urheilija.
    await addAthlete(form);
  }

  onClose();
} catch {

      setError('Urheilijan tallentaminen epäonnistui.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="modal d-block"
      role="dialog"
      aria-modal="true"
      aria-labelledby="athlete-form-title"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1055
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content bg-dark text-white border-secondary">

          <div className="modal-header border-secondary">
            <div>
              <small className="text-danger fw-bold">
                ATHLETEX DATABASE
              </small>
              <h2
                id="athlete-form-title"
                className="modal-title fw-bold mt-2"
              >
                
                    {athlete ? 'MUOKKAA URHEILIJA' : 'LISÄÄ URHEILIJA'}

              </h2>
            </div>

            <button
              type="button"
              className="btn-close btn-close-white"
              aria-label="Sulje"
              onClick={onClose}
              disabled={saving}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body p-4">

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">Etunimi *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.etunimi}
                    onChange={(e) =>
                      updateField('etunimi', e.target.value)
                    }
                    required
                    maxLength={100}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Sukunimi *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.sukunimi}
                    onChange={(e) =>
                      updateField('sukunimi', e.target.value)
                    }
                    required
                    maxLength={100}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Kutsumanimi</label>
                  <input
                    type="text"
                    className="form-control"
                    value={form.kutsumanimi ?? ''}
                    onChange={(e) =>
                      updateField('kutsumanimi', e.target.value)
                    }
                    maxLength={100}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Syntymäaika *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.syntymaaika}
                    onChange={(e) =>
                      updateField('syntymaaika', e.target.value)
                    }
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Paino (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="999.99"
                    step="0.01"
                    value={form.paino ?? ''}
                    onChange={(e) =>
                      updateField(
                        'paino',
                        e.target.value === ''
                          ? null
                          : Number(e.target.value)
                      )
                    }
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Urheilulaji *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Esim. Pikajuoksu"
                    value={form.laji}
                    onChange={(e) =>
                      updateField('laji', e.target.value)
                    }
                    required
                    maxLength={100}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Kuvan URL</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://example.com/kuva.jpg"
                    value={form.kuva_url ?? ''}
                    onChange={(e) =>
                      updateField('kuva_url', e.target.value)
                    }
                    maxLength={500}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Saavutukset</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Urheilijan tärkeimmät saavutukset..."
                    value={form.saavutukset ?? ''}
                    onChange={(e) =>
                      updateField('saavutukset', e.target.value)
                    }
                  />
                </div>

              </div>
            </div>

            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={onClose}
                disabled={saving}
              >
                Peruuta
              </button>

              <button
                type="submit"
                className="btn btn-danger"
                disabled={saving}
              >
                
{saving
  ? 'Tallennetaan...'
  : athlete
    ? 'Tallenna muutokset'
    : 'Tallenna urheilija'}

              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AthleteForm;
