/* Decorative atmosphere; no WebGL, dependencies, network or persistent state. */
'use strict';
(()=>{
 document.querySelectorAll('.selected-row').forEach((row,i)=>row.style.setProperty('--entry-delay',i*120+'ms'));
 const canvas=document.querySelector('#ambientSmoke');if(!canvas)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),coarse=matchMedia('(pointer: coarse)');
 const ctx=canvas.getContext('2d',{alpha:true});if(!ctx){canvas.hidden=true;return}
 const sprite=document.createElement('canvas');sprite.width=320;sprite.height=160;const sc=sprite.getContext('2d');
 if(!sc){canvas.hidden=true;return}
 let seed=83917;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 const grid=Array.from({length:65*33},random),smooth=t=>t*t*(3-2*t);
 function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y),fx=smooth(x-ix),fy=smooth(y-iy);const at=(a,b)=>grid[((b%33+33)%33)*65+((a%65+65)%65)];return (at(ix,iy)*(1-fx)+at(ix+1,iy)*fx)*(1-fy)+(at(ix,iy+1)*(1-fx)+at(ix+1,iy+1)*fx)*fy}
 const pixels=sc.createImageData(320,160);
 for(let y=0;y<160;y++)for(let x=0;x<320;x++){
  const nx=(x-160)/160,ny=(y-80)/80;
  const curl=Math.sin(x*.022)*.28+Math.sin(x*.048)*.1;
  const envelope=Math.pow(Math.max(0,1-nx*nx),1.6)*Math.exp(-Math.pow((ny-curl)*2.35,2));
  const n=noise(x/53,y/30)*.54+noise(x/24+7,y/16+3)*.29+noise(x/10,y/8)*.17;
  const at=(y*320+x)*4;pixels.data[at]=201;pixels.data[at+1]=207;pixels.data[at+2]=219;pixels.data[at+3]=Math.pow(Math.max(0,(n-.21)*1.3),1.7)*envelope*74;
 }
 sc.putImageData(pixels,0,0);
 let width=0,height=0,raf=0,last=0,elapsed=0,previous=0;
 const disabled=()=>reduced.matches||navigator.connection?.saveData===true;
 function draw(){ctx.clearRect(0,0,width,height);if(disabled())return;
  const p=elapsed*.022;
  ctx.save();ctx.translate(width*(.45+Math.sin(p)*.35),height*(.54+Math.sin(p*.8)*.18));ctx.rotate(-.18+Math.sin(p*.6)*.12);ctx.globalAlpha=.22;ctx.drawImage(sprite,-width*.88,-height*.35,width*1.76,height*.7);ctx.restore();
  ctx.save();ctx.translate(width*(.6+Math.sin(p*.75+2)*.4),height*(.69+Math.cos(p*.6)*.17));ctx.rotate(.2+Math.cos(p)*.1);ctx.globalAlpha=.14;ctx.drawImage(sprite,-width*.8,-height*.3,width*1.6,height*.6);ctx.restore();
 }
 function frame(time){raf=0;if(document.hidden||disabled())return;const interval=coarse.matches?90:60;if(time-last>=interval){if(previous)elapsed+=Math.min(.15,(time-previous)/1000);previous=time;last=time;draw()}raf=requestAnimationFrame(frame)}
 function run(){cancelAnimationFrame(raf);raf=0;previous=0;canvas.hidden=disabled();draw();if(!document.hidden&&!disabled())raf=requestAnimationFrame(frame)}
 function resize(){width=Math.min(640,Math.max(240,Math.round(innerWidth*.45)));height=Math.max(180,Math.round(innerHeight*width/innerWidth));canvas.width=width;canvas.height=height;draw()}
 resize();run();addEventListener('resize',resize,{passive:true});document.addEventListener('visibilitychange',run);reduced.addEventListener('change',run);navigator.connection?.addEventListener('change',run);
 addEventListener('pagehide',e=>{if(!e.persisted)cancelAnimationFrame(raf)},{once:true});
})();
