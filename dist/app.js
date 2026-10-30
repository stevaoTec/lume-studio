 'use strict';
function lumeIcon(name){const paths={arrow:'M5 19 19 5M5 5h14v14',play:'m9 5 11 7-11 7Z',pause:'M8 5v14M16 5v14'};const ns='http://www.w3.org/2000/svg';const icon=document.createElementNS(ns,'svg');icon.setAttribute('class','ui-icon');icon.setAttribute('viewBox','0 0 24 24');icon.setAttribute('aria-hidden','true');icon.setAttribute('fill','none');icon.setAttribute('stroke','currentColor');icon.setAttribute('stroke-width','1.4');icon.setAttribute('stroke-linecap','round');icon.setAttribute('stroke-linejoin','round');const path=document.createElementNS(ns,'path');path.setAttribute('d',paths[name]||paths.arrow);icon.append(path);return icon}

document.documentElement.classList.add('js-ready');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const intro=document.querySelector('#intro');
document.documentElement.classList.add('site-staged');
let arrived=false,revealsStarted=false,replaying=false;
function initReveals(){
 if(revealsStarted)return;revealsStarted=true;
 if('IntersectionObserver'in window&&!reduced){
  document.querySelectorAll('.project-grid,.process-grid,.service-list,.faq-list').forEach(group=>{[...group.children].forEach((el,i)=>el.style.setProperty('--entry-delay',Math.min(i,3)*85+'ms'))});
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}})},{threshold:.09});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
 }else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}
let introTimer,exitTimer,arrivalTimer;
function lockIntro(locked){document.body.classList.toggle('intro-running',locked);document.querySelectorAll('header,main,footer').forEach(el=>el.inert=locked)}
function finishIntro(){
 if(arrived)return;arrived=true;clearTimeout(introTimer);intro.classList.add('departing');document.querySelector('#skipIntro').tabIndex=-1;
 arrivalTimer=setTimeout(()=>{document.documentElement.classList.add('site-arrived');initReveals()},reduced?0:350);
 exitTimer=setTimeout(()=>{intro.classList.add('done');intro.inert=true;lockIntro(false);if(replaying||intro.contains(document.activeElement)){document.querySelector('.header .brand').focus({preventScroll:true});replaying=false}},reduced?0:1250);
 try{sessionStorage.setItem('lume-entered-v6','1')}catch{}
}
function startIntro(){
 clearTimeout(introTimer);clearTimeout(exitTimer);clearTimeout(arrivalTimer);arrived=false;intro.inert=false;intro.classList.remove('instant','done','departing');lockIntro(true);document.querySelector('#skipIntro').tabIndex=0;introTimer=setTimeout(finishIntro,3400);
}
let entered=false;try{entered=!!sessionStorage.getItem('lume-entered-v6')}catch{}
if(entered||reduced){intro.classList.add('instant');finishIntro();lockIntro(false)}else startIntro();
document.querySelector('#skipIntro').addEventListener('click',finishIntro);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!arrived)finishIntro()});
document.querySelector('#year').textContent=new Date().getFullYear();
const menuButton=document.querySelector('.menu-toggle'),mobileNav=document.querySelector('#mobileNav');
function closeMenu(){mobileNav.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';mobileNav.hidden=open;menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'Abrir menu':'Fechar menu')});
mobileNav.querySelectorAll('a,button').forEach(el=>el.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const filterButtons=document.querySelectorAll('[data-filter]');
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{filterButtons.forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});const cat=btn.dataset.filter;document.querySelector('.project-grid').classList.toggle('filtered',cat!=='all');document.querySelectorAll('.project').forEach(card=>{card.hidden=cat!=='all'&&card.dataset.category!==cat;card.classList.add('visible')})}));
const dialogs=document.querySelectorAll('dialog');let lastFocus;
function openDialog(d){lastFocus=document.activeElement;closeMenu();d.showModal();document.body.classList.add('dialog-open')}
function closeDialog(d){d.close()}
dialogs.forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>closeDialog(d));d.addEventListener('click',e=>{if(e.target===d){const box=d.getBoundingClientRect();if(e.clientX<box.left||e.clientX>box.right||e.clientY<box.top||e.clientY>box.bottom)closeDialog(d)}});d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');lastFocus?.focus()})});
const projects=[
{title:'Além do retrato',category:'FOTOGRAFIA / EDITORIAL',image:'assets/editorial.jpg',alt:'Estudo visual de fotografia editorial',text:'Mais do que registrar uma pessoa: revelar presença. Uma exploração sobre luz natural, enquadramento e personalidade, com uma linguagem editorial que valoriza a história de quem está diante da câmera.',tags:['Direção de fotografia','Retratos','Moda & editorial']},
{title:'O instante em movimento',category:'AUDIOVISUAL / NARRATIVA',image:'assets/camera.jpg',alt:'Fotógrafo registrando uma paisagem cinematográfica',text:'Um gesto, uma textura, uma mudança de luz. Pensamos o audiovisual como uma sequência de sensações, conectando conceito, captação e edição para construir narrativas com ritmo e intenção.',tags:['Roteiro & conceito','Captação','Edição & cor']},
{title:'Presença que conecta',category:'DIGITAL / WEB DESIGN',text:'Uma experiência digital começa muito antes do primeiro clique. Este conceito explora tipografia expressiva, formas tridimensionais e uma navegação simples para transformar identidade em uma presença digital memorável.',tags:['Interface & experiência','Desenvolvimento responsivo','Interação 3D']},
{title:'Perspectivas silenciosas',category:'FOTOGRAFIA / ESPAÇOS',image:'assets/architecture.jpg',alt:'Estudo de linhas e perspectivas arquitetônicas',text:'O encontro entre forma, luz e espaço. Uma exploração visual da arquitetura que encontra beleza nas linhas, na escala e nos detalhes que muitas vezes passam despercebidos.',tags:['Arquitetura','Interiores','Perspectiva']}
];
const pd=document.querySelector('#projectDialog');
document.querySelectorAll('[data-project]').forEach(btn=>btn.addEventListener('click',()=>{const p=projects[Number(btn.dataset.project)];const container=document.querySelector('#projectContent');container.replaceChildren();if(p.image){const img=document.createElement('img');img.className='project-dialog-image';img.src=p.image;img.alt=p.alt;container.append(img)}else{const a=document.createElement('div');a.className='digital-modal-art';a.textContent='MAKE IT MATTER.';container.append(a)}const copy=document.createElement('div');copy.className='project-dialog-copy';const label=document.createElement('span');label.className='eyebrow';label.textContent=p.category;const h=document.createElement('h2');h.textContent=p.title;const text=document.createElement('p');text.textContent=p.text;const tags=document.createElement('div');tags.className='tags';p.tags.forEach(tag=>{const s=document.createElement('span');s.textContent=tag;tags.append(s)});const note=document.createElement('p');note.className='project-concept-note';note.textContent='Estudo de direção visual. As imagens são referências de banco de imagens; este conceito não representa um trabalho realizado para um cliente.';const cta=document.createElement('button');cta.className='pill primary';cta.textContent='Quero criar algo assim';cta.append(lumeIcon('arrow'));cta.addEventListener('click',()=>{pd.close();openDialog(document.querySelector('#briefDialog'))});copy.append(label,h,text,tags,note,cta);container.append(copy);openDialog(pd)}));
const briefDialog=document.querySelector('#briefDialog'),briefForm=document.querySelector('#briefForm'),briefResult=document.querySelector('#briefResult');
document.querySelectorAll('[data-brief]').forEach(b=>b.addEventListener('click',()=>openDialog(briefDialog)));
let briefText='';
briefForm.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(briefForm);const services=f.getAll('service');briefText=`LUME — PRIMEIRO BRIEFING\n\nNome / marca: ${String(f.get('name')).trim()}\n\nO que quero criar: ${services.length?services.join(', '):'Quero explorar as possibilidades'}\n\nMinha ideia:\n${String(f.get('idea')).trim()}\n\nVamos dar forma a essa ideia juntos.`;document.querySelector('#briefPreview').textContent=briefText;briefForm.hidden=true;briefResult.hidden=false;document.querySelector('#copyStatus').textContent='';document.querySelector('#copyBrief').focus()});
document.querySelector('#editBrief').addEventListener('click',()=>{briefResult.hidden=true;briefForm.hidden=false;briefForm.elements.name.focus()});
document.querySelector('#copyBrief').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(briefText);document.querySelector('#copyStatus').textContent='Briefing copiado. Agora é só compartilhar.'}catch{document.querySelector('#copyStatus').textContent='Não foi possível copiar automaticamente. Baixe o arquivo ou selecione o texto acima.'}});
document.querySelector('#downloadBrief').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([briefText],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='LUME-meu-briefing.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
const filmDialog=document.querySelector('#manifestoDialog'),filmImage=document.querySelector('#filmImage'),filmText=document.querySelector('#filmText');
const filmScenes=[{image:'assets/editorial.jpg',text:'Tudo começa\ncom um olhar.'},{image:'assets/architecture.jpg',text:'Uma nova perspectiva.\nOutra possibilidade.'},{image:'assets/camera.jpg',text:'A imagem encontra\no movimento.'},{image:'assets/lume-brand.jpg',text:'LUME.\nFeito para ser sentido.'}];
let filmElapsed=0,filmPlaying=false,filmRaf=0,filmPrevious=0,filmScene=-1;
function updateFilm(){const scene=Math.min(3,Math.floor(filmElapsed/5));if(scene!==filmScene){filmScene=scene;filmImage.src=filmScenes[scene].image;filmText.textContent=filmScenes[scene].text;filmText.style.whiteSpace='pre-line'}document.querySelector('#filmTime').textContent=`00:${String(Math.floor(filmElapsed)).padStart(2,'0')} / 00:20`;document.querySelector('#filmProgress').style.width=`${filmElapsed*5}%`;const playButton=document.querySelector('#filmPlay');playButton.textContent=filmPlaying?'Pausar ':'Reproduzir ';playButton.append(lumeIcon(filmPlaying?'pause':'play'));document.querySelector('#filmPlay').setAttribute('aria-label',filmPlaying?'Pausar manifesto':'Reproduzir manifesto')}
function filmTick(time){if(!filmPlaying)return;if(filmPrevious)filmElapsed=Math.min(20,filmElapsed+Math.min(.1,(time-filmPrevious)/1000));filmPrevious=time;if(filmElapsed>=20)filmPlaying=false;updateFilm();if(filmPlaying)filmRaf=requestAnimationFrame(filmTick)}
function startFilm(){cancelAnimationFrame(filmRaf);filmPlaying=true;filmPrevious=0;updateFilm();filmRaf=requestAnimationFrame(filmTick)}
document.querySelector('#manifestoBtn').addEventListener('click',()=>{filmElapsed=0;filmScene=-1;openDialog(filmDialog);startFilm()});
document.querySelector('#filmPlay').addEventListener('click',()=>{if(filmPlaying){filmPlaying=false;cancelAnimationFrame(filmRaf);updateFilm()}else{if(filmElapsed>=20)filmElapsed=0;startFilm()}});
document.querySelector('#filmRestart').addEventListener('click',()=>{filmElapsed=0;startFilm()});
filmDialog.addEventListener('close',()=>{filmPlaying=false;cancelAnimationFrame(filmRaf)});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&filmPlaying){filmPlaying=false;cancelAnimationFrame(filmRaf);updateFilm()}});

window.replayLumeIntro=()=>{history.replaceState(null,'','#inicio');scrollTo({top:0,behavior:'instant'});if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;replaying=true;document.documentElement.classList.remove('site-arrived');startIntro();document.querySelector('#skipIntro').focus({preventScroll:true})};
