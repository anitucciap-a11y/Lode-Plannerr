LODE PLANNER - PWA v1

Cosa contiene:
- index.html
- styles.css
- app.js
- data.js con orario scolastico e voti iniziali trimestre/pentamestre
- manifest.json
- service-worker.js
- icone app

Come provarla subito sul computer:
1. Apri la cartella lode-planner-pwa.
2. Avvia un piccolo server locale. Esempio: python3 -m http.server 8080
3. Apri http://localhost:8080 nel browser.

Come pubblicarla in modo semplice per iPhone/iPad:
Metodo consigliato: Netlify Drop.
1. Vai su https://app.netlify.com/drop
2. Trascina dentro la cartella lode-planner-pwa, non solo il file index.html.
3. Netlify genera un link HTTPS.
4. Apri quel link da Safari su iPad/iPhone.
5. Tocca Condividi -> Aggiungi alla schermata Home.
6. Apri Lode Planner dalla nuova icona.

Nota importante:
- Il salvataggio v1 è locale sul dispositivo tramite localStorage.
- I dati non si sincronizzano ancora tra iPad e iPhone.
- L'assistente AI è una sezione pronta graficamente, ma non è ancora collegata a un backend/API.
- Le notifiche push avanzate sono una fase successiva.

Dati inclusi:
- Orario scolastico settimanale.
- Voti visibili dagli screenshot del 1° trimestre e del pentamestre.
- Routine settimana/sabato/domenica.
- To-do e calendario dimostrativi modificabili.
