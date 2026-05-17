const DEFAULT_DATA = {
  appVersion: '1.0.0',
  subjects: [
    { id:'italiano', name:'Lingua e cultura italiana', short:'Italiano', color:'#DBE5F8', objective:9 },
    { id:'storia-arte', name:'Storia dell’arte', short:'Arte', color:'#F5E8B8', objective:9 },
    { id:'educazione-civica', name:'Educazione civica', short:'Civica', color:'#ECEAFF', objective:9 },
    { id:'fisica', name:'Fisica', short:'Fisica', color:'#C1D6FE', objective:9 },
    { id:'filosofia', name:'Filosofia', short:'Filo', color:'#D3D5FE', objective:9 },
    { id:'inglese', name:'Lingua e cultura straniera (inglese)', short:'Inglese', color:'#AFC4EB', objective:9 },
    { id:'lab-pittura', name:'Laboratorio della figurazione - pittura', short:'Lab pittura', color:'#F5E8B8', objective:9 },
    { id:'scienze-motorie', name:'Scienze motorie e sportive', short:'Motoria', color:'#E8E8DE', objective:9 },
    { id:'matematica', name:'Matematica', short:'Mate', color:'#9CCBFA', objective:9 },
    { id:'storia', name:'Storia', short:'Storia', color:'#BFD7F3', objective:9 },
    { id:'discipline-pittoriche', name:'Discipline pittoriche', short:'Pittura', color:'#F5E8B8', objective:9 },
    { id:'scultura', name:'Discipline plastiche e scultoree', short:'Scultura', color:'#CDE0FF', objective:10 },
    { id:'religione', name:'Religione', short:'Religione', color:'#F4F1E7', objective:null }
  ],
  schedule: [
    ['8-9','Religione','Filosofia','Storia dell’arte','Scultura','Letteratura','Pittura'],
    ['9-10','Matematica','Storia','Scienze motorie','Scultura','Inglese','Pittura'],
    ['10-11','Fisica','Letteratura','Matematica','Scienze motorie','Pittura','Pittura'],
    ['11-12','Inglese','Letteratura','Scultura','Inglese','Pittura','Storia dell’arte'],
    ['12-13','Storia dell’arte','Scultura','Scultura','Pittura','Filosofia','Fisica'],
    ['13-14','Letteratura','Scultura','Scultura','Pittura','Storia','—']
  ],
  routines: [
    { id:'week', title:'Routine settimana', rows:[['15:00','Compiti / avvio studio'],['16:30','Pausa tè'],['17:00','Lettura / sottolineo / riassunti'],['18:00','Disegno personale — minimo 60 min'],['19:00+','Ripetizione / temi / recuperi']]},
    { id:'saturday', title:'Routine sabato', rows:[['Mattina','Recuperi leggeri / organizzazione'],['Pomeriggio','Disegno personale più libero']]},
    { id:'sunday', title:'Routine domenica', rows:[['Mattina','Riposo vero'],['Pomeriggio','Pianificazione con AI']]}
  ],
  todos: [
    { id:'t1', bucket:'oggi', title:'Finire esercizi mate', detail:'60 min • Importante', subject:'matematica', done:false },
    { id:'t2', bucket:'oggi', title:'Schema Kant', detail:'25 min • Filosofia', subject:'filosofia', done:false },
    { id:'t3', bucket:'oggi', title:'Disegno personale', detail:'60 min • Blocco creativo', subject:'discipline-pittoriche', done:false },
    { id:'t4', bucket:'settimana', title:'Verifica fisica', detail:'Mercoledì • preparazione', subject:'fisica', done:false },
    { id:'t5', bucket:'settimana', title:'Consegna pittura', detail:'Martedì • controlla materiali', subject:'discipline-pittoriche', done:false },
    { id:'t6', bucket:'organizzare', title:'Argomenti da quaderno', detail:'Prima lista, poi pianifica argomenti', subject:'filosofia', done:false },
    { id:'t7', bucket:'recuperi', title:'Esercizi lasciati indietro', detail:'Matematica', subject:'matematica', done:false }
  ],
  events: [
    { id:'e1', title:'Consegna pittura', date:'2026-05-05', type:'Consegna', subject:'discipline-pittoriche', priority:'Importante' },
    { id:'e2', title:'Verifica fisica', date:'2026-05-06', type:'Verifica', subject:'fisica', priority:'Urgente' },
    { id:'e3', title:'Interrogazione filosofia', date:'2026-05-08', type:'Interrogazione', subject:'filosofia', priority:'Importante' },
    { id:'e4', title:'Disegno personale', date:'2026-05-17', type:'Evento', subject:'discipline-pittoriche', priority:'Normale' }
  ],
  grades: [
    { id:'g1', term:'trim1', valueLabel:'8', value:8, subject:'italiano', date:'2025-12-09', type:'Scritto/Grafico' },
    { id:'g2', term:'trim1', valueLabel:'9', value:9, subject:'storia-arte', date:'2025-12-03', type:'Scritto/Grafico' },
    { id:'g3', term:'trim1', valueLabel:'8', value:8, subject:'educazione-civica', date:'2025-12-11', type:'Orale' },
    { id:'g4', term:'trim1', valueLabel:'8-', value:7.75, subject:'fisica', date:'2025-12-06', type:'Scritto/Grafico' },
    { id:'g5', term:'trim1', valueLabel:'9', value:9, subject:'filosofia', date:'2025-12-06', type:'Orale' },
    { id:'g6', term:'trim1', valueLabel:'8', value:8, subject:'educazione-civica', date:'2025-12-01', type:'Orale' },
    { id:'g7', term:'trim1', valueLabel:'9', value:9, subject:'inglese', date:'2025-11-28', type:'Orale' },
    { id:'g8', term:'trim1', valueLabel:'9', value:9, subject:'lab-pittura', date:'2025-11-27', type:'Scritto/Grafico' },
    { id:'g9', term:'trim1', valueLabel:'8½', value:8.5, subject:'scienze-motorie', date:'2025-11-12', type:'Orale' },
    { id:'g10', term:'trim1', valueLabel:'9', value:9, subject:'fisica', date:'2025-11-12', type:'Scritto/Grafico' },
    { id:'g11', term:'trim1', valueLabel:'9', value:9, subject:'italiano', date:'2025-11-10', type:'Orale' },
    { id:'g12', term:'trim1', valueLabel:'7½', value:7.5, subject:'matematica', date:'2025-11-10', type:'Orale' },
    { id:'g13', term:'trim1', valueLabel:'8½', value:8.5, subject:'matematica', date:'2025-11-03', type:'Scritto/Grafico' },
    { id:'g14', term:'trim1', valueLabel:'9½', value:9.5, subject:'educazione-civica', date:'2025-10-06', type:'Scritto/Grafico' },
    { id:'g15', term:'trim1', valueLabel:'8½', value:8.5, subject:'italiano', date:'2025-10-28', type:'Scritto/Grafico' },
    { id:'g16', term:'trim1', valueLabel:'9-', value:8.75, subject:'inglese', date:'2025-10-31', type:'Scritto/Grafico' },
    { id:'g17', term:'trim1', valueLabel:'8-', value:7.75, subject:'storia', date:'2025-10-21', type:'Orale' },
    { id:'g18', term:'trim1', valueLabel:'9', value:9, subject:'inglese', date:'2025-10-20', type:'Orale' },
    { id:'g19', term:'trim1', valueLabel:'9', value:9, subject:'discipline-pittoriche', date:'2025-10-16', type:'Scritto/Grafico' },
    { id:'g20', term:'trim1', valueLabel:'8+', value:8.25, subject:'storia-arte', date:'2025-10-11', type:'Orale' },

    { id:'p1', term:'penta', valueLabel:'10', value:10, subject:'discipline-pittoriche', date:'2026-05-08', type:'Scritto/Grafico' },
    { id:'p2', term:'penta', valueLabel:'8+', value:8.25, subject:'italiano', date:'2026-03-31', type:'Scritto/Grafico' },
    { id:'p3', term:'penta', valueLabel:'10', value:10, subject:'lab-pittura', date:'2026-04-18', type:'Scritto/Grafico' },
    { id:'p4', term:'penta', valueLabel:'9', value:9, subject:'scienze-motorie', date:'2026-03-26', type:'Orale' },
    { id:'p5', term:'penta', valueLabel:'9', value:9, subject:'lab-pittura', date:'2026-03-18', type:'Scritto/Grafico' },
    { id:'p6', term:'penta', valueLabel:'9', value:9, subject:'educazione-civica', date:'2026-03-09', type:'Pratico' },
    { id:'p7', term:'penta', valueLabel:'9', value:9, subject:'italiano', date:'2026-03-03', type:'Scritto/Grafico' },
    { id:'p8', term:'penta', valueLabel:'9', value:9, subject:'storia-arte', date:'2026-03-09', type:'Orale' },
    { id:'p9', term:'penta', valueLabel:'9+', value:9.25, subject:'storia-arte', date:'2026-02-11', type:'Scritto/Grafico' },
    { id:'p10', term:'penta', valueLabel:'9+', value:9.25, subject:'filosofia', date:'2026-03-13', type:'Orale' },
    { id:'p11', term:'penta', valueLabel:'10', value:10, subject:'inglese', date:'2026-02-27', type:'Scritto/Grafico' },
    { id:'p12', term:'penta', valueLabel:'8½', value:8.5, subject:'italiano', date:'2026-02-10', type:'Orale' },
    { id:'p13', term:'penta', valueLabel:'9½', value:9.5, subject:'inglese', date:'2026-02-05', type:'Orale' },
    { id:'p14', term:'penta', valueLabel:'10', value:10, subject:'discipline-pittoriche', date:'2026-02-03', type:'Scritto/Grafico' },
    { id:'p15', term:'penta', valueLabel:'8½', value:8.5, subject:'storia', date:'2026-02-03', type:'Orale' }
  ]
};
