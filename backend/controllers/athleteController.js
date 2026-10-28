
const athleteModel = require('../models/athleteModel');

// Haetaan kaikki urheilijat.
async function getAllAthletes(req, res) {
    try {
        const athletes = await athleteModel.getAllAthletes();

        res.status(200).json(athletes);
    } catch (error) {
        console.error('Virhe urheilijoiden haussa:', error);

        res.status(500).json({
            message: 'Urheilijoiden hakeminen epäonnistui.'
        });
    }
}

// Lisätään uusi urheilija.
async function addAthlete(req, res) {
    try {
        const athlete = req.body;

        // Tarkistetaan pakolliset kentät.
        if (
            !athlete.etunimi ||
            !athlete.sukunimi ||
            !athlete.syntymaaika ||
            !athlete.laji
        ) {
            return res.status(400).json({
                message: 'Pakollisia tietoja puuttuu.'
            });
        }

        // Lähetetään tiedot Modelille.
        const newId = await athleteModel.addAthlete(athlete);

        res.status(201).json({
            message: 'Urheilija lisätty onnistuneesti!',
            id: newId
        });
    } catch (error) {
        console.error('Virhe urheilijan lisäämisessä:', error);

        res.status(500).json({
            message: 'Urheilijan lisääminen epäonnistui.'
        });
    }
}


 // Haetaan yksittäinen urheilija ID:n perusteella.
async function getAthleteById(req, res) {
    try {
        // Otetaan urheilijan ID URL-osoitteesta.
        const id = Number(req.params.id);

        // Tarkistetaan, että ID on kelvollinen.
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Virheellinen urheilijan ID.'
            });
        }

        // Haetaan urheilija Modelin avulla.
        const athlete = await athleteModel.getAthleteById(id);

        // Jos urheilijaa ei löydy.
        if (!athlete) {
            return res.status(404).json({
                message: 'Urheilijaa ei löytynyt.'
            });
        }

        // Palautetaan urheilijan tiedot.
        res.status(200).json(athlete);

    } catch (error) {
        console.error('Virhe urheilijan haussa:', error);

        res.status(500).json({
            message: 'Urheilijan hakeminen epäonnistui.'
        });
    }
}


 // Päivitetään urheilijan tiedot.
async function updateAthlete(req, res) {
    try {
        // Haetaan urheilijan ID osoitteesta.
        const id = Number(req.params.id);

        // Tarkistetaan ID.
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Virheellinen urheilijan ID.'
            });
        }

        // Haetaan päivitetyt tiedot pyynnöstä.
        const athlete = req.body;

        // Tarkistetaan pakolliset kentät.
        if (
            !athlete ||
            !athlete.etunimi ||
            !athlete.sukunimi ||
            !athlete.syntymaaika ||
            !athlete.laji
        ) {
            return res.status(400).json({
                message: 'Pakollisia tietoja puuttuu.'
            });
        }

        // Päivitetään urheilija Modelin avulla.
        const affectedRows = await athleteModel.updateAthlete(id, athlete);

        // Tarkistetaan, löytyikö päivitettävä urheilija.
        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Urheilijaa ei löytynyt.'
            });
        }

        // Palautetaan onnistunut vastaus.
        res.status(200).json({
            message: 'Urheilijan tiedot päivitetty onnistuneesti!'
        });

    } catch (error) {
        console.error('Virhe urheilijan päivittämisessä:', error);

        res.status(500).json({
            message: 'Urheilijan päivittäminen epäonnistui.'
        });
    }
}


// Poistetaan urheilija ID:n perusteella.
async function deleteAthlete(req, res) {
    try {
        // Haetaan urheilijan ID URL-osoitteesta.
        const id = Number(req.params.id);

        // Tarkistetaan, että ID on kelvollinen.
        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                message: 'Virheellinen urheilijan ID.'
            });
        }

        // Poistetaan urheilija Modelin avulla.
        const affectedRows = await athleteModel.deleteAthlete(id);

        // Tarkistetaan, löytyikö poistettavaa urheilijaa.
        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Urheilijaa ei löytynyt.'
            });
        }

        // Palautetaan onnistunut vastaus.
        res.status(200).json({
            message: 'Urheilija poistettu onnistuneesti!'
        });

    } catch (error) {
        console.error('Virhe urheilijan poistamisessa:', error);

        res.status(500).json({
            message: 'Urheilijan poistaminen epäonnistui.'
        });
    }
}

module.exports = {
    getAllAthletes,
    addAthlete,
    getAthleteById,
    updateAthlete,
    deleteAthlete
};



