/* LUME / 09 — The existing accordion drives the service focus. */
'use strict';
(()=>{
 const panel=document.querySelector('.service-focus');if(!panel)return;
 const items=[...document.querySelectorAll('.service-item')],motion=matchMedia('(prefers-reduced-motion: reduce)');
 const lines=['A essência em cada imagem.','Uma história que encontra movimento.','Uma presença que se transforma em experiência.','Uma visão que conecta todas as partes.','Uma linguagem visual com intenção.','O começo de tudo: uma boa ideia.'];
 let active=0,animation;
 function select(i){if(i===active&&panel.dataset.ready)return;active=i;panel.dataset.ready='true';panel.dataset.serviceVisual=String(i);document.querySelector('#serviceFocusIndex').textContent=String(i+1).padStart(2,'0')+' / '+items[i].querySelector('h3').textContent.toLocaleUpperCase('pt-BR');document.querySelector('#serviceFocusLine').textContent=lines[i];items.forEach((item,j)=>item.classList.toggle('service-in-focus',i===j));animation?.cancel();if(!motion.matches&&panel.animate)animation=panel.animate([{opacity:.5,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'})}
 items.forEach((item,i)=>{item.addEventListener('toggle',()=>{if(item.open)select(i)});item.querySelector('summary').addEventListener('focus',()=>select(i))});
 motion.addEventListener('change',()=>{if(motion.matches)animation?.cancel()});select(0);
})();
