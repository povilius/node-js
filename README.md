- kad projektas veiktų reikalingas "index.js" failas ir "package.json" failas
- index.js faile rašome visą JavaScript kodą, kuris bus reikalingas mūsų programai
- package.json faile rašome informaciją susijusią su mūsų projektu. Reikalinga title, version ir scripts sekcija
- const casual = require("casual"); // same as import casual from 'casual';
= req - request, res - response
- app.get("/cars", (req, res) => { const cars = ["BMW", "Audi", "Mercedes"];res.send(cars); }); - GET pavyzdys
- app.listen(3000, () => console.log("The server is running on port 3000")); - aplikacijos klausymo paleidimas
- npm install cors; const cors = require("cors")