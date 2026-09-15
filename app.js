const LS_ACT='vh-activities', LS_PROF='vh-profile', LS_CLUBS='vh-clubs';
let activities=JSON.parse(localStorage.getItem(LS_ACT)||'null') || seedActivities();
let clubs=JSON.parse(localStorage.getItem(LS_CLUBS)||'null') || [{name:'Debate Club',role:'Member',joined:'2025-09-01',hours:0},{name:'Red Crescent Youth',role:'Volunteer',joined:'2025-06-15',hours:0}];
let profile=JSON.parse(localStorage.getItem(LS_PROF)||'null') || {name:'Ege C.', school:'Atatürk Anadolu Lisesi', grade:'11', studentId:'2025-0042', targetHours:100, advisor:'Mr. Demir'};

function seedActivities(){
  return [
    {id:'a1', date:'2026-03-12', organization:'Red Crescent Youth', category:'Community Service', hours:4, description:'Neighborhood food package distribution', supervisor:'Ms. Ayşe Yılmaz', supervisorEmail:'ayse@school.edu.tr', status:'approved', evidence:'photo1.jpg', createdAt:Date.now()-10000000},
    {id:'a2', date:'2026-04-05', organization:'Debate Club', category:'Club', hours:2, description:'Weekly meeting + topic research', supervisor:'Mr. Demir', supervisorEmail:'', status:'pending', evidence:'', createdAt:Date.now()-5000000},
    {id:'a3', date:'2026-05-20', organization:'Municipality Park Project', category:'Community Service', hours:5, description:'Park cleanup and tree planting', supervisor:'Ms. Elif Kaya', supervisorEmail:'elif@belediye.gov.tr', status:'approved', evidence:'park.jpg', createdAt:Date.now()-2000000},
  ];
}
function saveAll(){
  localStorage.setItem(LS_ACT, JSON.stringify(activities));
  localStorage.setItem(LS_CLUBS, JSON.stringify(clubs));
  localStorage.setItem(LS_PROF, JSON.stringify(profile));
}
function uid(){ return Math.random().toString(36).slice(2,9); }

function switchTab(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelector(`[data-tab="${id}"]`).classList.add('active');
  if(id==='dashboard') renderDashboard();
  if(id==='log') renderLog();
  if(id==='clubs') renderClubs();
  if(id==='report') preparePrint();
}

function openProfileModal(){
  document.getElementById('pName').value=profile.name;
  document.getElementById('pSchool').value=profile.school;
  document.getElementById('pGrade').value=profile.grade;
  document.getElementById('pId').value=profile.studentId;
  document.getElementById('pTarget').value=profile.targetHours;
  document.getElementById('pAdvisor').value=profile.advisor;
  document.getElementById('profileModal').style.display='grid';
}
function closeProfileModal(){ document.getElementById('profileModal').style.display='none'; }
function saveProfile(){
  profile.name=document.getElementById('pName').value.trim()||'Student';
  profile.school=document.getElementById('pSchool').value.trim();
  profile.grade=document.getElementById('pGrade').value.trim();
  profile.studentId=document.getElementById('pId').value.trim();
  profile.targetHours=parseInt(document.getElementById('pTarget').value)||100;
  profile.advisor=document.getElementById('pAdvisor').value.trim();
  saveAll(); renderAll(); closeProfileModal();
}

function openActivityModal(id){
  document.getElementById('actModal').style.display='grid';
  if(id){
    const a=activities.find(x=>x.id===id);
    document.getElementById('actModalTitle').textContent='Edit activity';
    document.getElementById('aId').value=a.id;
    document.getElementById('aDate').value=a.date;
    document.getElementById('aOrg').value=a.organization;
    document.getElementById('aCat').value=a.category;
    document.getElementById('aHours').value=a.hours;
    document.getElementById('aDesc').value=a.description;
    document.getElementById('aSup').value=a.supervisor;
    document.getElementById('aSupEmail').value=a.supervisorEmail;
    document.getElementById('aStatus').value=a.status;
    document.getElementById('aEvidence').value=a.evidence||'';
  } else {
    document.getElementById('actModalTitle').textContent='Add activity';
    document.getElementById('aId').value='';
    document.getElementById('aDate').value=new Date().toISOString().slice(0,10);
    document.getElementById('aOrg').value='';
    document.getElementById('aCat').value='Community Service';
    document.getElementById('aHours').value='';
    document.getElementById('aDesc').value='';
    document.getElementById('aSup').value='';
    document.getElementById('aSupEmail').value='';
    document.getElementById('aStatus').value='pending';
    document.getElementById('aEvidence').value='';
  }
}
function closeActModal(){ document.getElementById('actModal').style.display='none'; }
function saveActivity(){
  const id=document.getElementById('aId').value;
  const obj={
    id: id||uid(),
    date: document.getElementById('aDate').value,
    organization: document.getElementById('aOrg').value.trim(),
    category: document.getElementById('aCat').value,
    hours: parseFloat(document.getElementById('aHours').value)||0,
    description: document.getElementById('aDesc').value.trim(),
    supervisor: document.getElementById('aSup').value.trim(),
    supervisorEmail: document.getElementById('aSupEmail').value.trim(),
    status: document.getElementById('aStatus').value,
    evidence: document.getElementById('aEvidence').value.trim(),
    createdAt: Date.now()
  };
  if(!obj.date || !obj.organization || !obj.hours || !obj.description){ alert('Please fill date, organization, hours and description.'); return; }
  if(id){ const idx=activities.findIndex(x=>x.id===id); activities[idx]={...activities[idx], ...obj}; }
  else activities.unshift(obj);
  saveAll(); renderAll(); closeActModal();
}
function deleteActivity(id){
  if(!confirm('Delete this activity?')) return;
  activities=activities.filter(x=>x.id!==id); saveAll(); renderAll();
}
function toggleStatus(id, status){
  const a=activities.find(x=>x.id===id); if(a){ a.status=status; a.approvedAt=status==='approved'? new Date().toISOString().slice(0,10):''; saveAll(); renderAll(); }
}

function openClubModal(){ document.getElementById('clubModal').style.display='grid'; }
function closeClubModal(){ document.getElementById('clubModal').style.display='none'; }
function saveClub(){
  const name=document.getElementById('cName').value.trim();
  const role=document.getElementById('cRole').value.trim();
  const joined=document.getElementById('cJoined').value;
  if(!name){ alert('Club name required'); return;}
  clubs.push({name, role, joined, hours:0}); saveAll(); renderClubs(); closeClubModal();
  document.getElementById('cName').value=''; document.getElementById('cRole').value=''; document.getElementById('cJoined').value='';
}
function deleteClub(idx){ if(confirm('Remove club?')){ clubs.splice(idx,1); saveAll(); renderClubs(); } }

function filteredActivities(){
  const q=document.getElementById('q').value.toLowerCase();
  const cat=document.getElementById('fCat').value;
  const status=document.getElementById('fStatus').value;
  const from=document.getElementById('fFrom').value;
  const to=document.getElementById('fTo').value;
  return activities.filter(a=>{
    if(q && !(a.organization.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.supervisor.toLowerCase().includes(q))) return false;
    if(cat!=='all' && a.category!==cat) return false;
    if(status!=='all' && a.status!==status) return false;
    if(from && a.date < from) return false;
    if(to && a.date > to) return false;
    return true;
  });
}

function renderDashboard(){
  document.getElementById('profileMini').textContent = `${profile.name} • ${profile.school} • ${profile.grade}. sınıf`;
  document.getElementById('ringTarget').textContent = profile.targetHours;
  const approved = activities.filter(a=>a.status==='approved').reduce((s,a)=>s+a.hours,0);
  const pending = activities.filter(a=>a.status==='pending').reduce((s,a)=>s+a.hours,0);
  const total = activities.reduce((s,a)=>s+a.hours,0);
  const pct = Math.min(100, Math.round(approved / (profile.targetHours||1) *100));
  document.getElementById('ringPct').textContent = pct+'%';
  document.getElementById('ringLabel').textContent = `${approved} / ${profile.targetHours} h`;
  document.getElementById('ringSub').textContent = pending? `${pending}h pending` : 'All approved hours counted';
  const circ=2*Math.PI*48, off=circ - circ*pct/100;
  document.getElementById('ring').style.strokeDashoffset=off;
  document.getElementById('ring').style.stroke = pct>=100? '#059669' : pct>=50? '#0e7490' : '#d97706';

  document.getElementById('kpis').innerHTML=`
    <div class="kpi"><small>Total logged</small><b>${total}h</b><div style="font-size:11px;color:#6b7280">${activities.length} activities</div></div>
    <div class="kpi"><small>Approved</small><b style="color:#059669">${approved}h</b><div style="font-size:11px;color:#6b7280">${pct}% of target</div></div>
    <div class="kpi"><small>Pending</small><b style="color:#d97706">${pending}h</b><div style="font-size:11px;color:#6b7280">awaiting sign-off</div></div>
    <div class="kpi"><small>Clubs</small><b>${clubs.length}</b><div style="font-size:11px;color:#6b7280">active memberships</div></div>
  `;

  // category chart
  const cats=['Community Service','Club','Competition','Leadership','Other'];
  const byCat=cats.map(c=>({c, h: activities.filter(a=>a.status==='approved' && a.category===c).reduce((s,a)=>s+a.hours,0)}));
  const maxCat=Math.max(1, ...byCat.map(x=>x.h));
  document.getElementById('catChart').innerHTML = byCat.map(x=>`
    <div class="bar-row"><span>${x.c}</span><div class="bar"><div class="bar-fill" style="width:${x.h/maxCat*100}%"></div></div><span style="font-weight:700">${x.h}h</span></div>
  `).join('');

  // monthly trend last 6 months
  const months=[];
  const now=new Date();
  for(let i=5;i>=0;i--){ const d=new Date(now.getFullYear(), now.getMonth()-i, 1); months.push({key: d.toISOString().slice(0,7), label: d.toLocaleString('en',{month:'short'})}); }
  const byMonth=months.map(m=>({label:m.label, h: activities.filter(a=>a.status==='approved' && a.date.startsWith(m.key)).reduce((s,a)=>s+a.hours,0)}));
  const maxM=Math.max(1, ...byMonth.map(x=>x.h));
  document.getElementById('monthChart').innerHTML = byMonth.map(x=>`
    <div class="bar-row"><span>${x.label}</span><div class="bar"><div class="bar-fill" style="width:${x.h/maxM*100}%;background:${x.h? 'linear-gradient(90deg,#0e7490,#06b6d4)':'#e6e7ef'}"></div></div><span style="font-weight:700">${x.h}h</span></div>
  `).join('');

  // recent
  const recent=[...activities].sort((a,b)=> b.date.localeCompare(a.date)).slice(0,4);
  document.getElementById('recentList').innerHTML = recent.map(a=>`
    <div style="display:flex;justify-content:space-between;gap:12px;padding:10px;border:1px solid #e6e7ef;border-radius:12px;background:white">
      <div><b>${a.organization}</b> <span style="font-size:11px;color:#6b7280">• ${a.category}</span><div style="font-size:12px;color:#6b7280">${a.date} • ${a.hours}h • ${a.supervisor||'—'}</div></div>
      <span class="badge ${a.status==='approved'?'b-approved':a.status==='pending'?'b-pending':'b-rejected'}">${a.status}</span>
    </div>
  `).join('') || '<div style="color:#6b7280;font-size:12px">No activities yet.</div>';
}

function renderLog(){
  const list=filteredActivities();
  const tb=document.getElementById('tbody');
  tb.innerHTML='';
  list.forEach(a=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`
      <td>${a.date}</td>
      <td><b>${a.organization}</b></td>
      <td>${a.category}</td>
      <td><b>${a.hours}h</b></td>
      <td style="max-width:220px">${a.description}<div style="font-size:11px;color:#6b7280">${a.evidence||''}</div></td>
      <td>${a.supervisor||'—'}<div style="font-size:11px;color:#6b7280">${a.supervisorEmail||''}</div></td>
      <td><span class="badge ${a.status==='approved'?'b-approved':a.status==='pending'?'b-pending':'b-rejected'}">${a.status}</span></td>
      <td><div style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="btn" onclick="openActivityModal('${a.id}')">Edit</button>
        <button class="btn" onclick="deleteActivity('${a.id}')">Delete</button>
        ${a.status!=='approved'? `<button class="btn" style="background:#ecfdf5" onclick="toggleStatus('${a.id}','approved')">Approve ✓</button>`:''}
        ${a.status!=='rejected'? `<button class="btn" onclick="toggleStatus('${a.id}','rejected')">Reject</button>`:''}
        ${a.status!=='pending'? `<button class="btn" onclick="toggleStatus('${a.id}','pending')">Pending</button>`:''}
      </div></td>
    `;
    tb.appendChild(tr);
  });
  document.getElementById('logMeta').textContent = `${list.length} of ${activities.length} activities • ${list.filter(a=>a.status==='approved').reduce((s,a)=>s+a.hours,0)}h approved in view`;
  if(!activities.length) tb.innerHTML='<tr><td colspan="8" style="text-align:center;color:#6b7280;padding:20px">No activities yet. Click + Add activity.</td></tr>';
}

function renderClubs(){
  const grid=document.getElementById('clubsGrid');
  // compute hours per club from activities
  const hoursByClub={};
  activities.filter(a=>a.status==='approved').forEach(a=>{ hoursByClub[a.organization]=(hoursByClub[a.organization]||0)+a.hours; });
  grid.innerHTML='';
  clubs.forEach((c,i)=>{
    const h=hoursByClub[c.name]||0;
    const div=document.createElement('div');
    div.style.cssText='background:white;border:1px solid #e6e7ef;border-radius:14px;padding:14px';
    div.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:start;gap:8px"><b>${c.name}</b><button class="btn" onclick="deleteClub(${i})">✕</button></div>
      <div style="font-size:12px;color:#6b7280">${c.role||'Member'} • Joined ${c.joined||'—'}</div>
      <div style="margin-top:8px;font-size:12px"><b>${h}h</b> approved via this club</div>
    `;
    grid.appendChild(div);
  });
  if(!clubs.length) grid.innerHTML='<div style="color:#6b7280">No clubs yet.</div>';
}

function preparePrint(){
  const list=filteredActivities();
  const approvedH=list.filter(a=>a.status==='approved').reduce((s,a)=>s+a.hours,0);
  const totalH=list.reduce((s,a)=>s+a.hours,0);
  const byClub={};
  list.filter(a=>a.status==='approved').forEach(a=>{ byClub[a.organization]=(byClub[a.organization]||0)+a.hours; });
  const clubSummary=Object.entries(byClub).map(([k,v])=> `${k}: ${v}h`).join(' • ') || '—';
  const verification='VOL-'+ new Date().getFullYear() +'-'+ Math.random().toString(36).slice(2,6).toUpperCase();
  document.getElementById('printArea').innerHTML=`
    <div class="print-header">
      <div><h2>${profile.school||'School Name'}</h2><div style="font-size:11px;color:#6b7280;letter-spacing:.06em;text-transform:uppercase;font-weight:800">Volunteer & Club Activity Report</div></div>
      <div style="text-align:right;font-size:11px;color:#6b7280">Verification: <b style="color:#0f172a">${verification}</b><br>${new Date().toLocaleDateString('en-GB')}</div>
    </div>
    <div class="print-meta">
      <div><b>Student:</b> ${profile.name} <span style="color:#6b7280">(${profile.grade}. sınıf • ${profile.studentId})</span></div>
      <div><b>Advisor:</b> ${profile.advisor||'—'}</div>
      <div><b>Period:</b> ${document.getElementById('fFrom').value||'—'} → ${document.getElementById('fTo').value||'—'}</div>
      <div><b>Filtered:</b> ${list.length} activities • ${approvedH}h approved / ${totalH}h total</div>
    </div>
    <table class="print-table">
      <thead><tr><th style="width:92px">Date</th><th>Organization</th><th>Category</th><th style="width:52px">Hours</th><th>Description</th><th>Supervisor</th><th style="width:72px">Status</th></tr></thead>
      <tbody>${list.map(a=>`<tr><td>${a.date}</td><td><b>${a.organization}</b></td><td>${a.category}</td><td><b>${a.hours}</b></td><td>${a.description}</td><td>${a.supervisor||'—'}</td><td>${a.status}</td></tr>`).join('') || '<tr><td colspan="7" style="text-align:center;padding:16px;color:#6b7280">No activities in current filter.</td></tr>'}</tbody>
    </table>
    <div class="print-summary">
      <div><b>Approved hours:</b> ${approvedH}h</div>
      <div><b>By club:</b> ${clubSummary}</div>
      <div><b>Target:</b> ${approvedH} / ${profile.targetHours}h (${Math.round(approvedH/(profile.targetHours||1)*100)}%)</div>
    </div>
    <div class="print-sign">
      <div><div class="sig-line">Student signature • ${profile.name}</div></div>
      <div><div class="sig-line">Supervisor / Teacher</div></div>
      <div><div class="sig-line">Counselor / Advisor • ${profile.advisor||''}</div></div>
    </div>
    <div style="padding:10px 20px;font-size:10px;color:#6b7280;border-top:1px solid #e6e7ef">This document was generated offline from VolunteerHub. Data stored locally in browser. Status ``pending`` requires supervisor sign-off. Verification ${verification}.</div>
  `;
}

function exportCSV(all=false){
  const list=all? activities : filteredActivities();
  if(!list.length){ alert('No data to export'); return; }
  const h=['date','organization','category','hours','description','supervisor','supervisorEmail','status','evidence'];
  let csv=h.join(',')+'\n';
  list.forEach(a=>{ csv+= h.map(k=>`"${String(a[k]??'').replace(/"/g,'""')}"`).join(',')+'\n'; });
  const blob=new Blob([csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const el=document.createElement('a'); el.href=url; el.download=all?'volunteer_activities_all.csv':'volunteer_activities_filtered.csv'; el.click(); URL.revokeObjectURL(url);
}
function exportJSON(){
  const data={profile, activities, clubs, exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='volunteer-hub_backup.json'; a.click(); URL.revokeObjectURL(url);
}
function importJSON(e){
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    try{
      const j=JSON.parse(reader.result);
      if(j.activities) activities=j.activities;
      if(j.clubs) clubs=j.clubs;
      if(j.profile) profile=j.profile;
      saveAll(); renderAll(); alert('Imported successfully');
    } catch(err){ alert('Invalid JSON'); }
  };
  reader.readAsText(file); e.target.value='';
}

function renderAll(){ renderDashboard(); renderLog(); renderClubs(); preparePrint(); }
renderAll();
