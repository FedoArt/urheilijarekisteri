
const express = require('express');
const router = express.Router();

const athleteController = require('../controllers/athleteController');

// GET: Haetaan kaikki urheilijat.
router.get('/', athleteController.getAllAthletes);

// GET: Haetaan yksi urheilija ID:n perusteella.
router.get('/:id', athleteController.getAthleteById);

// POST: Lisätään uusi urheilija.
router.post('/', athleteController.addAthlete);

// PUT: Päivitetään urheilijan tiedot.
router.put('/:id', athleteController.updateAthlete);

// DELETE: Poistetaan urheilija ID:n perusteella.
router.delete('/:id', athleteController.deleteAthlete);

// Viedään reititin muiden tiedostojen käyttöön.
module.exports = router;
