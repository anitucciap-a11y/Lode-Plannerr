const STORAGE_KEY = 'lodePlannerData.v1';
const state = loadState();
let currentTodo = 'oggi';
const bucketLabels = { oggi:'☀ Oggi', settimana:'🗓 Settimana', organizzare:'▣ Da organizzare', recuperi:'↺ Recuperi', personale:'⌂ Personale', arte:'✦ Arte', scuola:'▤ Scuola' };
const days = ['Lun','Mar','Mer','Gio','Ven','Sab'];

function clone(obj){ return JSON.parse(JSON.stringify(obj)); }
function loadState(){
  const saved = localStorage.getItem(STORAGE_KEY);
  if(saved){ try { return JSON.parse(saved); } catch(e){} }
  const initial = clone(DEFAULT_DATA);
  saveState(initial);
  return initial;
}
function saveState(data = state){ localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
function bySubject(id){ return state.subjects.find(s => s.id === id) || {name:id, short:id, color:'#D3D5FE', objective:null}; }
function fmtDate(iso){ const d = new Date(iso+'T00:00:00'); return d.toLocaleDateString('it-IT',{day:'2-digit',month:'2-digit',year:'2-digit'}); }
function valuePercent(v){ return Math.max(0, Math.min(100, Number(v) * 10)); }
function avg(values){ return values.length ? values.reduce((a,b)=>a+b,0)/values.length : null; }
function escapeHtml(str){ return String(str ?? '').replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }
function toast(msg){ const el = document.querySelector('#toast'); el.textContent = msg; el.classList.add('show'); setTimeout(()=>el.classList.remove('show'), 1800); }

function tag(subjectId, text){ const s = bySubject(subjectId); return `<span class="tag" style="background:${s.color}">${escapeHtml(text || s.short)}</span>`; }
function taskHtml(t){ return `<label class="task"><input type="checkbox" data-task="${t.id}" ${t.done?'checked':''}><div><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.detail)}</small></div>${tag(t.subject)}</label>`; }

function renderDashboard(){
  const today = state.todos.filter(t=>t.bucket==='oggi').slice(0,6);
  const left = today.slice(0,3).map(taskHtml).join('');
  const right = today.slice(3,6).map(taskHtml).join('');
  const urgent = state.events.slice(0,3).map(e => `<div class="deadline-item"><div><strong>${escapeHtml(e.title)}</strong><small>${fmtDate(e.date)} • ${escapeHtml(e.type)}</small></div>${tag(e.subject, e.priority)}</div>`).join('');
  document.querySelector('#dashboard').innerHTML = `
    <div class="label">Dashboard</div>
    <div class="grid2">
      <div class="stack">
        <div class="panel"><h2>Oggi</h2><div class="note"><div class="note-head"><div><div class="note-title">Piano di oggi</div><div class="note-sub">Checklist compatta e leggibile</div></div><span class="tag" style="background:var(--blue1)">Oggi</span></div><div class="today-split"><div class="tasks">${left}</div><div class="tasks">${right}</div></div></div></div>
        <div class="panel"><h2>Settimana</h2><div class="mini-week">${['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'].map((d,i)=>`<div class="mini-day"><b>• ${d}</b><span class="chip">${['Derivate','Consegna pittura','Verifica fisica','Scultura','Interrogazione','Recuperi'][i]}</span><span class="chip">${['Ripasso inglese','Schema storia','Flashcard arte','Filosofia','Compiti mate','Disegno libero'][i]}</span></div>`).join('')}</div></div>
        <div class="panel"><h2>Obiettivi di oggi</h2><div class="goals">${['Minimo','Ideale','Plus'].map((g,i)=>`<div class="note"><div class="note-head"><div><div class="note-title">Obiettivo ${g.toLowerCase()}</div><div class="note-sub">${['Il necessario per dire ok.','La versione completa della giornata.','Extra solo se hai energie.'][i]}</div></div><span class="tag" style="background:${['var(--blue1)','var(--cream)','var(--blue4)'][i]}">${g}</span></div><div class="tasks">${[['2 esercizi matematica','15 min filosofia'],['Finire esercizi','Schema Kant','Disegno 60 min'],['Flashcard arte','Anticipare inglese']][i].map(x=>`<label class="task"><input type="checkbox"><div><strong>${x}</strong><small>${g}</small></div></label>`).join('')}</div></div>`).join('')}</div></div>
      </div>
      <div class="stack">
        <div class="panel"><h2>Scadenze vicine</h2><div class="note warm">${urgent}</div></div>
        <div class="panel"><h2>Carico settimanale</h2>${meter('Studio teorico',80,'5h','deep')}${meter('Arte/consegne',65,'4h')}${meter('Assegni brevi',45,'2h')}${meter('Ripasso',30,'1h','cream')}</div>
        <div class="panel"><h2>Progressi</h2>${meter('Impegni',68,'68%')}${meter('Assegni',72,'8/11','deep')}${meter('Disegno',100,'ok','deep')}</div>
      </div>
    </div>`;
}
function meter(label,p,val,cls=''){ return `<div class="meter-row"><span>${label}</span><div class="bar"><div class="fill ${cls}" style="width:${p}%"></div></div><b>${val}</b></div>`; }

function renderSchool(){
  const schedule = `<div class="schedule"><div class="cell head">Ora</div>${days.map(d=>`<div class="cell head">${d}</div>`).join('')}${state.schedule.map(row=>`<div class="cell time">${row[0]}</div>${row.slice(1).map(x=>`<div class="cell" style="background:${subjectColorFromName(x)}">${escapeHtml(x)}</div>`).join('')}`).join('')}</div>`;
  const grouped = state.subjects.filter(s=>s.id!=='religione').map(s=>{
    const gs = state.grades.filter(g=>g.subject===s.id);
    const a = avg(gs.map(g=>g.value));
    const recent = gs.slice().sort((a,b)=>b.date.localeCompare(a.date)).slice(0,5);
    return `<div class="grade-card" data-grade-card><div class="grade-main"><div><h3>${escapeHtml(s.name)} ${tag(s.id,s.short)}</h3><p>Media attuale: ${a ? a.toFixed(2) : '—'}</p><p>Obiettivo: ${s.objective ?? '—'}</p><p>Ultimi voti: ${recent.map(g=>g.valueLabel).join(', ') || '—'}</p></div><div class="ring" style="--p:${a?valuePercent(a):0};--c:${s.color}"><span><strong>${a?a.toFixed(1):'—'}</strong><small>media</small></span></div></div><div class="grade-list">${recent.map(g=>`<div class="vote-row"><b>${g.valueLabel}</b><div>${g.type}</div><span>${fmtDate(g.date)}</span></div>`).join('') || '<p>Nessun voto inserito.</p>'}</div></div>`;
  }).join('');
  document.querySelector('#school').innerHTML = `<div class="label">Scuola</div><div class="panel"><h2>Orario scolastico</h2>${schedule}</div><div class="panel"><h2>Voti e medie</h2><div class="grades">${grouped}</div></div>`;
}
function subjectColorFromName(name){
  const key = String(name).toLowerCase();
  const map = [['matematica','matematica'],['fisica','fisica'],['filosofia','filosofia'],['inglese','inglese'],['storia','storia'],['scultura','scultura'],['pittura','discipline-pittoriche'],['arte','storia-arte'],['letteratura','italiano'],['motorie','scienze-motorie'],['religione','religione']];
  const found = map.find(([k])=>key.includes(k));
  return found ? bySubject(found[1]).color : '#fff';
}

function renderCalendar(){
  const year=2026, month=4;
  const first = new Date(year,month,1); const start = (first.getDay()+6)%7; const daysIn = new Date(year,month+1,0).getDate();
  let cells = Array.from({length:start},()=>`<div class="day"><div class="day-num"> </div></div>`);
  for(let d=1; d<=daysIn; d++){
    const iso = `${year}-05-${String(d).padStart(2,'0')}`;
    const ev = state.events.filter(e=>e.date===iso);
    cells.push(`<div class="day ${d===17?'today':''}"><div class="day-num">${d}</div>${ev.map(e=>`<div class="event" style="background:${bySubject(e.subject).color}">${escapeHtml(e.title)}</div>`).join('')}</div>`);
  }
  document.querySelector('#calendar').innerHTML = `<div class="label">Calendario</div><div class="panel"><h2>Maggio 2026</h2><div class="calendar-grid">${['Lun','Mar','Mer','Gio','Ven','Sab','Dom'].map(d=>`<div class="weekday">${d}</div>`).join('')}${cells.join('')}</div></div><div class="panel"><h2>Da organizzare</h2><div class="note warm">${state.todos.filter(t=>t.bucket==='organizzare').map(taskHtml).join('')}</div></div>`;
}

function renderTodo(){
  const tabs = Object.entries(bucketLabels).map(([id,label])=>`<button class="tab-btn ${currentTodo===id?'active':''}" data-todo-tab="${id}">${label}</button>`).join('');
  const items = state.todos.filter(t=>t.bucket===currentTodo).map(taskHtml).join('') || '<p class="muted">Nessuna attività qui.</p>';
  document.querySelector('#todo').innerHTML = `<div class="label">To-do</div><div class="panel"><h2>To-do</h2><div class="todo-tabs">${tabs}</div><div class="note"><div class="note-head"><div class="note-title">${bucketLabels[currentTodo]}</div><span class="tag" style="background:var(--blue1)">${state.todos.filter(t=>t.bucket===currentTodo && !t.done).length} aperti</span></div><div class="tasks">${items}</div></div></div>`;
}
function renderAssistant(){ document.querySelector('#assistant').innerHTML = `<div class="label">Assistente</div><div class="panel"><h2>Assistente</h2><div class="grid2"><div class="assistant-card"><b>Chat</b><p>Spazio per discutere il piano con l’AI.</p></div><div class="assistant-card"><b>Pianificazione</b><p>Riordino compiti, verifiche e recuperi.</p></div><div class="assistant-card"><b>Ripasso flashcard</b><p>Pronto per collegare file e appunti.</p></div><div class="assistant-card"><b>Allenamento orale</b><p>Timer, autovalutazione e note AI.</p></div></div></div><div class="panel"><h2>Nota tecnica</h2><p>La grafica e i dati sono locali. L’AI vera richiederà un collegamento API/backend in una fase successiva.</p></div>`; }
function renderRoutine(){ document.querySelector('#routineContent').innerHTML = state.routines.map(r=>`<div class="routine-card"><h3>${r.title}</h3>${r.rows.map(row=>`<div class="routine-row"><span>${row[0]}</span><div>${row[1]}</div></div>`).join('')}<button class="small-btn">Modifica</button></div>`).join(''); }
function renderAdd(){ document.querySelector('#addContent').innerHTML = `<div class="quick-list">${['Assegno','Verifica','Consegna','Interrogazione','Evento','Quaderno','Voto'].map(t=>`<button data-add-type="${t}">${t}</button>`).join('')}</div><div id="addForm"></div>`; }

function renderAll(){ renderDashboard(); renderSchool(); renderCalendar(); renderTodo(); renderAssistant(); renderRoutine(); renderAdd(); bindDynamic(); }
function bindDynamic(){
  document.querySelectorAll('[data-task]').forEach(cb=>cb.addEventListener('change', e=>{ const t=state.todos.find(x=>x.id===e.target.dataset.task); if(t){t.done=e.target.checked; saveState(); renderAll();} }));
  document.querySelectorAll('[data-grade-card]').forEach(card=>card.addEventListener('click',()=>card.classList.toggle('open')));
  document.querySelectorAll('[data-todo-tab]').forEach(btn=>btn.addEventListener('click',()=>{ currentTodo=btn.dataset.todoTab; renderTodo(); bindDynamic(); }));
  document.querySelectorAll('[data-add-type]').forEach(btn=>btn.addEventListener('click',()=>showAddForm(btn.dataset.addType)));
}
function showAddForm(type){
  const isGrade = type==='Voto';
  document.querySelector('#addForm').innerHTML = `<form class="form" id="quickForm"><input name="title" placeholder="${isGrade?'Voto, es. 8½':'Titolo'}" required>${isGrade?'': '<input name="date" type="date">'}<select name="subject">${state.subjects.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select>${isGrade?'<input name="date" type="date" required><select name="gradeType"><option>Orale</option><option>Scritto/Grafico</option><option>Pratico</option></select><select name="term"><option value="penta">Pentamestre</option><option value="trim1">1° Trimestre</option></select>':'<select name="bucket"><option value="oggi">Oggi</option><option value="settimana">Settimana</option><option value="organizzare">Da organizzare</option><option value="recuperi">Recuperi</option><option value="arte">Arte</option><option value="scuola">Scuola</option><option value="personale">Personale</option></select>'}<textarea name="detail" placeholder="Dettagli"></textarea><button>Salva ${type}</button></form>`;
  document.querySelector('#quickForm').addEventListener('submit', e=>{ e.preventDefault(); const fd=new FormData(e.target); if(isGrade){ const label=fd.get('title'); const val=parseGrade(label); state.grades.unshift({id:crypto.randomUUID(), term:fd.get('term'), valueLabel:label, value:val, subject:fd.get('subject'), date:fd.get('date'), type:fd.get('gradeType')}); } else { state.todos.unshift({id:crypto.randomUUID(), bucket:fd.get('bucket'), title:fd.get('title'), detail:fd.get('detail') || type, subject:fd.get('subject'), done:false}); const date=fd.get('date'); if(date){ state.events.push({id:crypto.randomUUID(), title:fd.get('title'), date, type, subject:fd.get('subject'), priority:'Normale'}); }} saveState(); closeDrawer('addMenu'); renderAll(); toast('Salvato'); });
}
function parseGrade(label){ return Number(String(label).replace('½','.5').replace('+','.25').replace('-','')) - (String(label).includes('-')?0.25:0); }
function closeDrawer(id){ document.querySelector('#'+id).classList.remove('open'); }

document.querySelectorAll('.bottom-nav button').forEach(btn=>btn.addEventListener('click',()=>{ document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active')); document.querySelector('#'+btn.dataset.screen).classList.add('active'); document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); window.scrollTo({top:0,behavior:'smooth'}); }));
document.querySelector('#routineBtn').addEventListener('click',()=>document.querySelector('#routineDrawer').classList.add('open'));
document.querySelector('#addBtn').addEventListener('click',()=>document.querySelector('#addMenu').classList.add('open'));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDrawer(b.dataset.close)));
document.querySelectorAll('.drawer').forEach(d=>d.addEventListener('click',e=>{ if(e.target===d) d.classList.remove('open'); }));
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./service-worker.js').catch(()=>{}); }
renderAll();
