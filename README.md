# Urheilijarekisteri

Web-ohjelmoinnin harjoitustyö, jossa toteutettiin urheilijoiden tietojen hallintaan tarkoitettu verkkosovellus.

Sovelluksessa käyttäjä voi hakea, lisätä, muokata ja poistaa urheilijoita. Urheilijoiden tiedot tallennetaan MariaDB-tietokantaan.

## Käytetyt teknologiat

### Backend

- Node.js
- Express.js
- MariaDB
- mysql2
- dotenv
- cors

### Frontend

- React
- TypeScript
- Vite
- Bootstrap 5
- CSS
- Context API

### Kehitystyökalut

- Visual Studio Code
- HeidiSQL
- Postman
- Git ja GitHub

## Sovelluksen ominaisuudet

- Urheilijoiden listaaminen tietokannasta
- Uuden urheilijan lisääminen
- Urheilijan tietojen muokkaaminen
- Urheilijan poistaminen vahvistuksen jälkeen
- Urheilijatietojen automaattinen päivittäminen
- Responsiivinen käyttöliittymä
- Mustapunainen käyttöliittymä ja animaatiot
- REST-rajapinta tietojen käsittelyyn

## Projektin rakenne

```text
urheilijarekisteri/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── database/
│   └── database.sql
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   └── types/
│   └── package.json
├── .gitignore
└── README.md
```

## Tietokanta

Sovellus käyttää MariaDB-tietokantaa nimeltä `urheilijarekisteri`.

Tietokannan luontiskripti sijaitsee tiedostossa:

`database/database.sql`

Tietokannan taulu on `urheilijat`.

Taulu sisältää seuraavat kentät:

- id
- etunimi
- sukunimi
- kutsumanimi
- syntymaaika
- paino
- kuva_url
- laji
- saavutukset

Tietokanta voidaan luoda suorittamalla `database.sql` esimerkiksi HeidiSQL-ohjelmassa.

## Asennus ja käynnistäminen

### 1. Vaatimukset

Tietokoneella tulee olla asennettuna:

- Node.js ja npm
- MariaDB

### 2. Backendin asentaminen

Siirry backend-kansioon:

```bash
cd backend
npm install
```

Luo backend-kansioon `.env`-tiedosto seuraavilla asetuksilla:

```env
DB_HOST=127.0.0.1
DB_USER=oma_tietokantakayttaja
DB_PASSWORD=oma_salasana
DB_NAME=urheilijarekisteri
DB_PORT=3306
PORT=3001
```

Korvaa käyttäjätunnus ja salasana omilla MariaDB-tunnuksillasi.

Käynnistä backend:

```bash
node server.js
```

Backend toimii osoitteessa:

http://localhost:3001

### 3. Frontendin asentaminen

Avaa toinen terminaali ja siirry frontend-kansioon projektin juuresta:

```bash
cd frontend
npm install
npm run dev
```

Frontend toimii oletusarvoisesti osoitteessa:

http://localhost:5173

## REST API

Backend tarjoaa seuraavat REST-rajapinnan toiminnot:

| Metodi | Osoite            | Toiminto                |
| ------ | ----------------- | ----------------------- |
| GET    | /api/athletes     | Hakee kaikki urheilijat |
| GET    | /api/athletes/:id | Hakee yhden urheilijan  |
| POST   | /api/athletes     | Lisää urheilijan        |
| PUT    | /api/athletes/:id | Päivittää urheilijan    |
| DELETE | /api/athletes/:id | Poistaa urheilijan      |

### Esimerkki urheilijan lisäämisestä

POST /api/athletes

```json
{
  "etunimi": "Usain",
  "sukunimi": "Bolt",
  "kutsumanimi": "Lightning Bolt",
  "syntymaaika": "1986-08-21",
  "paino": 94,
  "kuva_url": null,
  "laji": "Pikajuoksu",
  "saavutukset": "8 olympiakultaa ja 11 maailmanmestaruutta"
}
```

## Sovelluksen arkkitehtuuri

Backend on toteutettu käyttämällä Model, Controller ja Routes -rakennetta.

- Routes määrittelee REST-rajapinnan osoitteet.
- Controller vastaanottaa HTTP-pyynnöt ja käsittelee vastaukset.
- Model suorittaa MariaDB-tietokannan SQL-kyselyt.

Frontend on toteutettu Reactin funktionaalisilla komponenteilla ja Context API:lla.

Context API:n avulla urheilijoiden tietoja ja CRUD-toimintoja voidaan käyttää useissa komponenteissa ilman tarpeetonta tietojen välittämistä komponenttien välillä.

## Testaus

REST-rajapinnan GET-, POST-, PUT- ja DELETE-toimintoja on testattu Postmanilla.

React-käyttöliittymän toimintoja on testattu selaimessa.

Frontendin koodia on tarkistettu seuraavilla komennoilla:

```bash
npm run build
npm run lint
```

## Kehitysympäristö

Projekti on toteutettu paikallisessa Windows-kehitysympäristössä käyttäen Visual Studio Codea.

## Tekijä

Artur Fedorov

Karelia-ammattikorkeakoulu

Web-ohjelmoinnin harjoitustyö, 2026
