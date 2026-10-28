import AthleteList from "./components/AthleteList";
import { useAthletes } from "./context/useAthletes";
import athleteHero from "./assets/athlete-hero.png";
import { useState } from "react";
import AthleteForm from "./components/AthleteForm";
import type { Athlete } from "./types/Athlete";

const COPYRIGHT_YEAR = new Date().getFullYear();

function App() {
  const { athletes } = useAthletes();

  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedAthlete, setSelectedAthlete] = useState<Athlete | null>(null);

  return (
    <div className="premium-app">
      <nav className="premium-navbar container">
        <div className="brand">
          <span className="brand-symbol"></span>
          ARTUR<span className="brand-accent">FEDOROV</span>
        </div>

        <span className="nav-label">URHEILIJAREKISTERI</span>
      </nav>

      <header className="hero-section">
        <div className="hero-glow" />
        <img
          src={athleteHero}
          alt="ATHLETEX urheilijakollaasi"
          className="hero-athletes-image"
        />

        <div className="container hero-content">
          <div className="hero-tag">WEB-OHJELMOINTI • HARJOITUSTYÖ</div>

          <h1 className="hero-title">
            URHEILIJOIDEN
            <br />
            <span>REKISTERI.</span>
          </h1>

          <a href="#athletes" className="hero-button">
            SELAA URHEILIJOITA
          </a>

          <div className="hero-stats">
            <div>
              <strong>{athletes.length.toString().padStart(2, "0")}</strong>
              <span>URHEILIJAA</span>
            </div>

            <div>
              <strong>
                {new Set(athletes.map((a) => a.laji)).size
                  .toString()
                  .padStart(2, "0")}
              </strong>
              <span>URHEILULAJIA</span>
            </div>
          </div>
        </div>
      </header>

      <main id="athletes" className="container athletes-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">ATHLETE DATABASE</span>

            <h2>
              URHEILIJAT<span>.</span>
            </h2>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setSelectedAthlete(null);
              setShowAddForm(true);
            }}
          >
            + Lisää urheilija
          </button>
        </div>

        <AthleteList
          onEdit={(athlete) => {
            setSelectedAthlete(athlete);
            setShowAddForm(true);
          }}
        />
      </main>

      <footer className="premium-footer">
        <div className="container">
          ARTUR FEDOROV © {COPYRIGHT_YEAR} | URHEILIJAREKISTERI
          {showAddForm && (
            <AthleteForm
              athlete={selectedAthlete}
              onClose={() => {
                setShowAddForm(false);
                setSelectedAthlete(null);
              }}
            />
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
