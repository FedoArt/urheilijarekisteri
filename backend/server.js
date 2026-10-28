
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Tuodaan urheilijoiden reitit.
const athleteRoutes = require('./routes/athleteRoutes');

// Luodaan Express-sovellus.
const app = express();

// Määritetään portti.
const PORT = process.env.PORT || 3001;

// Middlewaret
app.use(cors());
app.use(express.json());

// Testireitti
app.get('/', (req, res) => {
    res.json({
        message: 'Urheilijarekisterin REST API toimii!'
    });
});

// Urheilijoiden REST-rajapinta
app.use('/api/athletes', athleteRoutes);

// Käynnistetään palvelin.
app.listen(PORT, () => {
    console.log(`Palvelin käynnissä osoitteessa http://localhost:${PORT}`);
});
