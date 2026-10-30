'use strict';
(()=>{
 const section=document.querySelector('.assembly');if(!section)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)'),buttons=[...section.querySelectorAll('[data-assembly-step]')],label=section.querySelector('#assemblyStage');
 const labels=['01 / IMAGEM','02 / MOVIMENTO','03 / DIGITAL'];let queued=false,enabled=false;
 const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>{v=clamp(v);return v*v*(3-2*v)};
 function render(){queued=false;const rect=section.getBoundingClientRect(),range=section.offsetHeight-innerHeight;const progress=enabled&&range>0?clamp(-rect.top/range):1;section.style.setProperty('--assembly-progress',progress.toFixed(4));section.style.setProperty('--layer-photo',enabled?(.18+.82*ease(progress/.31)).toFixed(4):1);section.style.setProperty('--layer-film',enabled?ease((progress-.21)/.36).toFixed(4):1);section.style.setProperty('--layer-digital',enabled?ease((progress-.5)/.36).toFixed(4):1);const stage=enabled?(progress<.35?0:progress<.68?1:2):2;label.textContent=labels[stage];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===stage)))}
 function request(){if(queued)return;queued=true;requestAnimationFrame(render)}
 function configure(){enabled=!media.matches&&innerHeight>=560;section.classList.toggle('scroll-enabled',enabled);request()}
 buttons.forEach((button,i)=>button.addEventListener('click',()=>{if(!enabled){buttons.forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));label.textContent=labels[i];return}const top=section.getBoundingClientRect().top+scrollY,range=section.offsetHeight-innerHeight;scrollTo({top:top+range*[.22,.54,.9][i],behavior:media.matches?'auto':'smooth'})}));
 addEventListener('scroll',request,{passive:true});addEventListener('resize',configure);media.addEventListener('change',configure);configure();
 document.querySelectorAll('[data-service-preset]').forEach(button=>button.addEventListener('click',()=>{const form=document.querySelector('#briefForm'),result=document.querySelector('#briefResult');form.hidden=false;result.hidden=true;[...form.querySelectorAll('input[name="service"]')].forEach(input=>input.checked=input.value===button.dataset.servicePreset)}));
})();
