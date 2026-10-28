import { useState } from "react";
import { useAthletes } from "../context/useAthletes";
import type { Athlete } from "../types/Athlete";

interface AthleteListProps {
  onEdit: (athlete: Athlete) => void;
}

function AthleteList({ onEdit }: AthleteListProps) {
  const { athletes, loading, error, deleteAthlete } = useAthletes();

  // Poistettavaksi valittu urheilija.
  const [athleteToDelete, setAthleteToDelete] = useState<Athlete | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // Avataan poistamisen vahvistusikkuna.
  function openDeleteDialog(athlete: Athlete) {
    setAthleteToDelete(athlete);
    setDeleteError("");
  }

  // Suljetaan vahvistusikkuna.
  function closeDeleteDialog() {
    if (deleting) return;

    setAthleteToDelete(null);
    setDeleteError("");
  }

  // Poistetaan urheilija tietokannasta.
  async function confirmDelete() {
    if (!athleteToDelete || deleting) return;

    setDeleting(true);
    setDeleteError("");

    try {
      await deleteAthlete(athleteToDelete.id);
      setAthleteToDelete(null);
    } catch {
      setDeleteError("Urheilijan poistaminen epäonnistui.");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status" />
        <p className="mt-3">Ladataan urheilijoita...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (athletes.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>Ei vielä urheilijoita</h4>
        <p className="text-secondary">
          Lisää ensimmäinen urheilija rekisteriin.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* URHEILIJAKORTIT */}
      <div className="row g-4">
        {athletes.map((athlete) => (
          <div className="col-md-6 col-lg-4" key={athlete.id}>
            <div className="card h-100">
              {athlete.kuva_url && (
                <img
                  src={athlete.kuva_url}
                  className="card-img-top"
                  alt={`${athlete.etunimi} ${athlete.sukunimi}`}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title athlete-name">
                  <span>{athlete.etunimi}</span>
                  <span>{athlete.sukunimi}</span>
                </h5>

                <p className="text-danger fw-bold">{athlete.laji}</p>

                <p className="text-secondary">{athlete.saavutukset}</p>

                {/* KORTIN TOIMINTOPAINIKKEET */}
                <div className="mt-auto pt-3 d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onEdit(athlete)}
                  >
                    Muokkaa
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => openDeleteDialog(athlete)}
                  >
                    Poista
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POISTAMISEN VAHVISTUSIKKUNA */}
      {athleteToDelete && (
        <div
          className="modal d-block"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.82)",
            zIndex: 1055,
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white border border-danger">
              <div className="modal-header border-secondary">
                <h2
                  id="delete-dialog-title"
                  className="modal-title fs-4 fw-bold"
                >
                  VAHVISTA POISTO
                </h2>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Sulje"
                  onClick={closeDeleteDialog}
                  disabled={deleting}
                />
              </div>

              <div className="modal-body p-4">
                <p>
                  Haluatko varmasti poistaa urheilijan
                  <strong>
                    {" "}
                    {athleteToDelete.etunimi} {athleteToDelete.sukunimi}
                  </strong>{" "}
                  rekisteristä?
                </p>

                <p className="text-danger mb-0">Toimintoa ei voi peruuttaa.</p>

                {deleteError && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {deleteError}
                  </div>
                )}
              </div>

              <div className="modal-footer border-secondary">
                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={closeDeleteDialog}
                  disabled={deleting}
                >
                  Peruuta
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => void confirmDelete()}
                  disabled={deleting}
                >
                  {deleting ? "Poistetaan..." : "Poista urheilija"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AthleteList;
