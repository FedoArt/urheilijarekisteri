
const pool = require('./config/database');

async function testConnection() {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');

        console.log('Yhteys MariaDB-tietokantaan onnistui!');
        console.log('Testikyselyn tulos:', rows[0].result);
    } catch (error) {
        console.error('Tietokantayhteys epäonnistui:', error.message);
    } finally {
        await pool.end();
    }
}

testConnection();
