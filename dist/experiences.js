'use strict';
(()=>{
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const host=document.querySelector('#sculpture'),explore=document.querySelector('#exploreForm');
 explore.addEventListener('click',()=>{const active=explore.getAttribute('aria-pressed')!=='true';explore.setAttribute('aria-pressed',String(active));explore.setAttribute('aria-label',active?'Reunir as partes do símbolo 3D':'Explorar as partes do símbolo 3D');explore.querySelector('span').textContent=active?'Reunir símbolo':'Explorar forma';host.dataset.exploded=String(active);host.dispatchEvent(new CustomEvent('lume-explore',{detail:active}))});
 const consoleEl=document.querySelector('.light-console'),stage=document.querySelector('#lightStage'),slider=document.querySelector('#lightPosition'),output=document.querySelector('#lightValue'),description=document.querySelector('#lightDescription');
 const descriptions={soft:'Luz suave: volume, delicadeza e espaço para respirar.',cinema:'Cinema: contraste, atmosfera e uma história em cada sombra.',noir:'Noir: preto, branco e o essencial em evidência.'};
 let x=65,y=42,tx=x,ty=y,raf=0,last=0;
 function apply(){consoleEl.style.setProperty('--light-x',x+'%');consoleEl.style.setProperty('--light-y',y+'%')}
 function frame(t){const dt=last?Math.min(.05,(t-last)/1000):.016;last=t;const blend=1-Math.exp(-dt*10);x+=(tx-x)*blend;y+=(ty-y)*blend;apply();if(Math.abs(tx-x)+Math.abs(ty-y)>.05)raf=requestAnimationFrame(frame);else{raf=0;x=tx;y=ty;apply()}}
 function aim(nx,ny){tx=Math.max(0,Math.min(100,nx));ty=Math.max(8,Math.min(92,ny));slider.value=String(Math.round(tx));output.textContent=Math.round(tx)+'%';if(media.matches){x=tx;y=ty;apply();return}if(!raf){last=0;raf=requestAnimationFrame(frame)}}
 stage.addEventListener('pointermove',e=>{if(e.pointerType==='touch'&&e.buttons===0)return;const r=stage.getBoundingClientRect();aim((e.clientX-r.left)/r.width*100,(e.clientY-r.top)/r.height*100)});
 slider.addEventListener('input',()=>aim(Number(slider.value),ty));document.querySelector('#resetLight').addEventListener('click',()=>aim(50,42));
 document.querySelectorAll('button[data-light-mode]').forEach(button=>button.addEventListener('click',()=>{const mode=button.dataset.lightMode;consoleEl.dataset.lightMode=mode;document.querySelectorAll('button[data-light-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));description.textContent=descriptions[mode]}));
 media.addEventListener('change',()=>{if(media.matches){cancelAnimationFrame(raf);raf=0;x=tx;y=ty;apply()}});apply();
 document.querySelector('#replayIntro').addEventListener('click',()=>window.replayLumeIntro?.());
 const footer=document.querySelector('.footer-v5');let footerQueued=false;
 function footerDraw(){footerQueued=false;const r=footer.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.75)));footer.style.setProperty('--footer-open',media.matches?1:p.toFixed(4))}
 function footerRequest(){if(!footerQueued){footerQueued=true;requestAnimationFrame(footerDraw)}}
 addEventListener('scroll',footerRequest,{passive:true});addEventListener('resize',footerRequest);footer.addEventListener('pointermove',e=>{if(media.matches||e.pointerType==='touch')return;const r=footer.getBoundingClientRect();footer.style.setProperty('--footer-x',((e.clientX-r.left)/r.width*2-1).toFixed(3))});footer.addEventListener('pointerleave',()=>footer.style.setProperty('--footer-x',0));footerDraw();
 addEventListener('pagehide',()=>cancelAnimationFrame(raf),{once:true});
})();
