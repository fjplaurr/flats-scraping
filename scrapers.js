const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const express = require('express');

let browser;

const app = express();

// Plugin to avoid bot searchers
puppeteer.use(StealthPlugin());

// Open a new tab in the browser and go to the url
async function scrapeFlat(url) {
  const page = await browser.newPage();
  await page.goto(url);
}

// Open the browser
async function launchBrowser() {
  browser = await puppeteer.launch({
    headless: true,
    // args needed by heroku-puppeteer buildpack
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
}

// Main function
async function main() {
  await launchBrowser();
  scrapeFlat('https://www.idealista.com/alquiler-viviendas/almeria-almeria/con-precio-hasta_500,de-dos-dormitorios,de-tres-dormitorios,de-cuatro-cinco-habitaciones-o-mas,publicado_ultimas-24-horas');
  scrapeFlat('https://www.fotocasa.es/es/alquiler/viviendas/almeria-capital/almeria-ciudad/l?gridType=list&combinedLocationIds=724,1,4,276,486,4013,88,0,0&latitude=36.838519415269104&longitude=-2.4599311887141835&maxPrice=500&minRooms=2&sortType=publicationDate');
  scrapeFlat('https://www.milanuncios.com/alquiler-de-pisos-en-almeria-almeria/?fromSearch=1&desde=350&hasta=500&demanda=n&dormd=2');
  scrapeFlat('https://www.pisos.com/alquiler/pisos-almeria_capital/con-2-habitaciones/desde-350/hasta-500/fecharecientedesde-desc');
}

// Get
app.get('/', (req, res) => {
  main();
});

// Server listening
const port = process.env.PORT || 8080;
app.listen(port,
  () => console.log(`Server listening on port ${port}`));
