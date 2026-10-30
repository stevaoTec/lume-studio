/* Verified project names and disciplines from the supplied LUME Films reference. */
'use strict';
(()=>{
 const cases=[{id:'triama',name:'Triama',type:'Campanha institucional',description:'Projeto apresentado pela LUME na categoria de campanha institucional.'},{id:'hd-studio',name:'HD Studio',type:'Conteúdo e direção de arte',description:'Projeto apresentado pela LUME na categoria de conteúdo e direção de arte.'},{id:'centerbox',name:'Centerbox',type:'Campanha de marca',description:'Projeto apresentado pela LUME na categoria de campanha de marca.'}];
 const dialog=document.querySelector('#selectedDialog');let current=0;
 const display=()=>{const item=cases[current];document.querySelector('#selectedDialogTitle').textContent=item.name;document.querySelector('#selectedDialogBrand').textContent=item.name;document.querySelector('#selectedDialogType').textContent=item.type;document.querySelector('#selectedDialogDiscipline').textContent=item.type;document.querySelector('#selectedDialogDescription').textContent=item.description;document.querySelector('#selectedDialogIndex').textContent=String(current+1).padStart(2,'0');document.querySelector('#selectedPosition').textContent=`${String(current+1).padStart(2,'0')} / 03`};
 document.querySelectorAll('[data-selected]').forEach(button=>button.addEventListener('click',()=>{current=cases.findIndex(item=>item.id===button.dataset.selected);display();openDialog(dialog)}));
 document.querySelector('#nextSelected').addEventListener('click',()=>{current=(current+1)%cases.length;display()});
 document.querySelector('#previousSelected').addEventListener('click',()=>{current=(current+cases.length-1)%cases.length;display()});
 document.querySelector('#selectedBrief').addEventListener('click',()=>{dialog.close();openDialog(document.querySelector('#briefDialog'))});
 document.querySelector('#manifestoEditorialBtn').addEventListener('click',()=>document.querySelector('#manifestoBtn').click());
})();
