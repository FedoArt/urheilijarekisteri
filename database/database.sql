
CREATE DATABASE IF NOT EXISTS urheilijarekisteri
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE urheilijarekisteri;

CREATE TABLE IF NOT EXISTS urheilijat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    etunimi VARCHAR(100) NOT NULL,
    sukunimi VARCHAR(100) NOT NULL,
    kutsumanimi VARCHAR(100),
    syntymaaika DATE NOT NULL,
    paino DECIMAL(5,2),
    kuva_url VARCHAR(500),
    laji VARCHAR(100) NOT NULL,
    saavutukset TEXT
);
