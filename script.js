const pages = ['home','company','jobs','apply'];
const state = {candidate:{}, experiences:[], questions:[], answers:[], index:0, testConfig:null};
const $ = id => document.getElementById(id);
const supabaseReady = () => SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.startsWith('PASTE_') && !SUPABASE_ANON_KEY.startsWith('PASTE_');
const supabaseClient = supabaseReady() ? window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY) : null;

function showPage(name){
  if(!pages.includes(name)) name='home';
  document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id===name));
  document.querySelectorAll('[data-page]').forEach(el=>el.classList.toggle('active',el.dataset.page===name));
  document.getElementById('mainNav').classList.remove('open');
  history.replaceState(null,'',`#${name}`); window.scrollTo({top:0,behavior:'smooth'});
}
function positionName(id){return recruitmentJobs.find(j=>j.id===id)?.title || id;}
function initPositions(){ $('candidatePosition').innerHTML='<option value="">Pilih posisi</option>'+recruitmentJobs.filter(j=>j.active).map(j=>`<option value="${j.id}">${j.title}</option>`).join(''); }
function renderJobs(){
  $('jobsList').innerHTML = recruitmentJobs.filter(j=>j.active).map(j=>`<article class="job-card"><div><span class="job-type">${j.type}</span><h3>${j.title}</h3><div class="job-meta">📍 ${j.location}</div><p>${j.summary}</p></div><button class="primary" data-job="${j.id}">Lihat Detail</button></article>`).join('');
  $('jobsList').querySelectorAll('[data-job]').forEach(b=>b.onclick=()=>openJob(b.dataset.job));
}
function openJob(id){
  const j=recruitmentJobs.find(x=>x.id===id); if(!j)return;
  document.querySelector('.job-modal')?.remove();
  const modal=document.createElement('div'); modal.className='job-modal'; modal.innerHTML=`<div class="modal-backdrop"></div><div class="modal-card"><button class="modal-close" aria-label="Tutup">×</button><span class="job-type">${j.type}</span><h2>${j.title}</h2><div class="job-meta">📍 ${j.location}</div><h4>Deskripsi Pekerjaan</h4><p>${j.description}</p><h4>Kualifikasi</h4><ul>${j.qualifications.map(x=>`<li>${x}</li>`).join('')}</ul><button class="primary wide" id="applyThisJob">Lamar Posisi Ini →</button></div>`;
  document.body.appendChild(modal); modal.querySelector('.modal-close').onclick=()=>modal.remove(); modal.querySelector('.modal-backdrop').onclick=()=>modal.remove(); modal.querySelector('#applyThisJob').onclick=()=>{modal.remove(); showPage('apply'); $('candidatePosition').value=id;};
}
function addExperience(data={}){
  const index=state.experiences.length; state.experiences.push(data);
  const el=document.createElement('div'); el.className='experience-card'; el.dataset.index=index; el.innerHTML=`<div class="experience-head"><strong>Pengalaman ${index+1}</strong><button type="button" class="remove-exp">Hapus</button></div><div class="form-grid"><div class="field"><label>Nama Perusahaan</label><input data-key="company" value="${data.company||''}" required></div><div class="field"><label>Posisi / Jabatan</label><input data-key="position" value="${data.position||''}" required></div><div class="field"><label>Lama Bekerja</label><input data-key="duration" placeholder="Contoh: 2022 - 2024" value="${data.duration||''}" required></div><div class="field"><label>Alasan Berhenti</label><input data-key="reason_leaving" value="${data.reason_leaving||''}" required></div><div class="field full"><label>Tugas & Tanggung Jawab</label><textarea data-key="responsibilities" rows="4" required>${data.responsibilities||''}</textarea></div></div>`;
  $('experienceList').appendChild(el); el.querySelector('.remove-exp').onclick=()=>{el.remove(); syncExperiences(); renderExperienceNumbers();}; el.querySelectorAll('[data-key]').forEach(input=>input.oninput=syncExperiences); syncExperiences();
}
function syncExperiences(){state.experiences=[...document.querySelectorAll('.experience-card')].map(card=>{const o={};card.querySelectorAll('[data-key]').forEach(i=>o[i.dataset.key]=i.value.trim());return o;});}
function renderExperienceNumbers(){document.querySelectorAll('.experience-card').forEach((c,i)=>c.querySelector('strong').textContent=`Pengalaman ${i+1}`);}
function toggleExperience(){const disabled=$('noExperience').checked; $('experienceList').classList.toggle('disabled',disabled); $('addExperience').disabled=disabled; if(disabled){state.experiences=[];$('experienceList').innerHTML='';} else if(!$('experienceList').children.length) addExperience();}
function renderQuestion(){
  const q=state.questions[state.index], total=state.questions.length; $('questionNumber').textContent=`SOAL ${String(state.index+1).padStart(2,'0')}`; $('questionText').textContent=q.question; $('progressText').textContent=`Soal ${state.index+1} / ${total}`; $('progressBar').style.width=`${((state.index+1)/total)*100}%`;
  $('answerOptions').innerHTML=q.options.map((o,i)=>`<button type="button" class="option ${state.answers[state.index]===i?'selected':''}" data-index="${i}"><span>${String.fromCharCode(65+i)}</span><em>${o}</em></button>`).join(''); $('answerOptions').querySelectorAll('.option').forEach(b=>b.onclick=()=>{state.answers[state.index]=Number(b.dataset.index);renderQuestion();}); $('prevBtn').disabled=state.index===0; $('nextBtn').textContent=state.index===total-1?'Lanjut ke Essay →':'Berikutnya →';
}
function showEssay(){
  $('mcPanel').classList.add('hidden'); $('essayPanel').classList.remove('hidden'); document.querySelectorAll('.tab').forEach((t,i)=>t.classList.toggle('active',i===1));
  const essayQuestions = state.testConfig?.essay || [];
  $('essayQuestions').innerHTML=essayQuestions.map((q,i)=>`<div class="essay-item"><label>${i+1}. ${q}</label><textarea data-essay="${i}" rows="6" required placeholder="Tulis jawaban kamu..."></textarea></div>`).join(''); window.scrollTo({top:0,behavior:'smooth'});
}
function calculateScore(){let correct=0;state.questions.forEach((q,i)=>{if(state.answers[i]===q.answer)correct++;});return {correct,total:state.questions.length,score:Math.round(correct/state.questions.length*100)};}
function candidateCode(){const d=new Date(), stamp=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}`;return `HG-REC-${stamp}-${Math.random().toString(36).slice(2,7).toUpperCase()}`;}
async function submitApplication(essayAnswers){
  const score=calculateScore();
  const mcAnswers=state.questions.map((q,i)=>({question:q.question,selected_answer:q.options[state.answers[i]],selected_index:state.answers[i],correct_answer:q.options[q.answer],is_correct:state.answers[i]===q.answer}));
  const essayData=(state.testConfig?.essay || []).map((question,i)=>({question,answer:essayAnswers[i]}));
  const payload={candidate_code:candidateCode(),name:state.candidate.name,email:state.candidate.email,phone:state.candidate.phone,domicile:state.candidate.domicile,position:positionName(state.candidate.position),experiences:state.candidate.experiences,multiple_choice_answers:mcAnswers,multiple_choice_score:score.score,multiple_choice_total:score.total,essay_answers:essayData,essay_note:null,status:'Submitted',submitted_at:new Date().toISOString()};
  if(!supabaseClient){showSuccess();return;}
  const {error}=await supabaseClient.from('candidates').insert(payload); if(error){console.error(error);alert('Lamaran belum tersimpan. Periksa konfigurasi Supabase dan struktur tabel.');return;} showSuccess();
}
function showSuccess(){$('applicationFormWrap').classList.add('hidden');$('assessmentWrap').classList.add('hidden');$('successWrap').classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});}

document.querySelectorAll('[data-page]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showPage(el.dataset.page);}));
$('menuToggle').onclick=()=>$('mainNav').classList.toggle('open');
$('addExperience').onclick=()=>addExperience(); $('noExperience').onchange=toggleExperience;
$('applicationForm').onsubmit=e=>{e.preventDefault();syncExperiences();if(!$('noExperience').checked && !state.experiences.length){alert('Tambahkan minimal satu pengalaman kerja atau pilih “belum memiliki pengalaman kerja”.');return;} state.candidate={name:$('candidateName').value.trim(),email:$('candidateEmail').value.trim(),phone:$('candidatePhone').value.trim(),domicile:$('candidateDomicile').value.trim(),position:$('candidatePosition').value,experiences:state.experiences};state.testConfig=recruitmentTests[state.candidate.position];if(!state.testConfig){alert('Soal untuk posisi ini belum tersedia. Silakan pilih posisi lain atau hubungi recruitment.');return;}state.questions=[...state.testConfig.multipleChoice];state.answers=new Array(state.questions.length).fill(null);state.index=0;$('applicationFormWrap').classList.add('hidden');$('assessmentWrap').classList.remove('hidden');renderQuestion();};
$('prevBtn').onclick=()=>{if(state.index>0){state.index--;renderQuestion();}};
$('nextBtn').onclick=()=>{if(state.answers[state.index]===null){alert('Silakan pilih jawaban terlebih dahulu.');return;}if(state.index<state.questions.length-1){state.index++;renderQuestion();}else showEssay();};
$('essayForm').onsubmit=e=>{e.preventDefault();const answers=[...document.querySelectorAll('[data-essay]')].map(x=>x.value.trim());if(answers.some(x=>!x)){alert('Lengkapi seluruh jawaban essay terlebih dahulu.');return;}submitApplication(answers);};
$('homeBtn').onclick=()=>{location.hash='#home';location.reload();};

initPositions();renderJobs();if(!document.querySelector('.experience-card'))addExperience();showPage(location.hash.slice(1)||'home');
