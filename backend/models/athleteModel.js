
const pool = require('../config/database');

// Haetaan kaikki urheilijat tietokannasta.
async function getAllAthletes() {
    const [rows] = await pool.query(
        'SELECT * FROM urheilijat'
    );

    return rows;
}

// Lisätään uusi urheilija tietokantaan.
async function addAthlete(athlete) {
    const {
        etunimi,
        sukunimi,
        kutsumanimi,
        syntymaaika,
        paino,
        kuva_url,
        laji,
        saavutukset
    } = athlete;

    const sql = `
        INSERT INTO urheilijat
        (etunimi, sukunimi, kutsumanimi, syntymaaika,
         paino, kuva_url, laji, saavutukset)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute(sql, [
        etunimi,
        sukunimi,
        kutsumanimi || null,
        syntymaaika,
        paino ?? null,
        kuva_url || null,
        laji,
        saavutukset || null
    ]);

    return result.insertId;
}


 // Haetaan yksittäinen urheilija ID:n perusteella.
async function getAthleteById(id) {
    const [rows] = await pool.execute(
        'SELECT * FROM urheilijat WHERE id = ?',
        [id]
    );

    return rows[0];
}


 // Päivitetään urheilijan tiedot ID:n perusteella.
async function updateAthlete(id, athlete) {
    const {
        etunimi,
        sukunimi,
        kutsumanimi,
        syntymaaika,
        paino,
        kuva_url,
        laji,
        saavutukset
    } = athlete;

    const sql = `
        UPDATE urheilijat
        SET etunimi = ?,
            sukunimi = ?,
            kutsumanimi = ?,
            syntymaaika = ?,
            paino = ?,
            kuva_url = ?,
            laji = ?,
            saavutukset = ?
        WHERE id = ?
    `;

    const [result] = await pool.execute(sql, [
        etunimi,
        sukunimi,
        kutsumanimi || null,
        syntymaaika,
        paino ?? null,
        kuva_url || null,
        laji,
        saavutukset || null,
        id
    ]);

    return result.affectedRows;
}


 // Poistetaan urheilija ID:n perusteella.
async function deleteAthlete(id) {
    const [result] = await pool.execute(
        'DELETE FROM urheilijat WHERE id = ?',
        [id]
    );

    return result.affectedRows;
}

module.exports = {
    getAllAthletes,
    addAthlete,
    getAthleteById,
    updateAthlete,
    deleteAthlete
};





