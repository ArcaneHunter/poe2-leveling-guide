const routeList=document.querySelector('#reward-list');
function toggleRouteCard(card){done.has(card.dataset.id)?done.delete(card.dataset.id):done.add(card.dataset.id);saveRoute();renderRoute();}
routeList.addEventListener('click',event=>{const card=event.target.closest('.reward');if(card)toggleRouteCard(card);});
routeList.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.closest('.reward')){event.preventDefault();toggleRouteCard(event.target.closest('.reward'));}});
const rawPanel=document.querySelector('#raw-panel'),rawText=document.querySelector('#raw-route');
document.querySelector('#raw-toggle').addEventListener('click',()=>{rawText.value=JSON.stringify(route,null,2);rawPanel.hidden=!rawPanel.hidden;});
document.querySelector('#raw-cancel').addEventListener('click',()=>{rawPanel.hidden=true;});
document.querySelector('#raw-save').addEventListener('click',()=>{try{const next=JSON.parse(rawText.value);if(!Array.isArray(next)||next.some(step=>!step.act||!step.area||!step.objective||!['points','stats','choice'].includes(step.type)))throw new Error();route=next.map((step,index)=>({...step,id:step.id||`custom-${Date.now()}-${index}`,bonus:step.bonus||''}));done=new Set([...done].filter(id=>route.some(step=>step.id===id)));saveRoute();rawPanel.hidden=true;renderRoute();renderEditor();}catch{alert('Use a JSON array. Each step needs act, area, objective, and type (points, stats, or choice). Reward/note can be empty.');}});
const editorList=document.querySelector('#editor-list');let draggedId=null;
editorList.addEventListener('dragstart',event=>{const row=event.target.closest('.editor-row');if(!row)return;draggedId=row.dataset.id;row.classList.add('dragging');event.dataTransfer.effectAllowed='move';});
editorList.addEventListener('dragend',event=>{event.target.closest('.editor-row')?.classList.remove('dragging');editorList.querySelectorAll('.drag-over').forEach(row=>row.classList.remove('drag-over'));draggedId=null;});
editorList.addEventListener('dragover',event=>{const row=event.target.closest('.editor-row');if(!row||row.dataset.id===draggedId)return;event.preventDefault();row.classList.add('drag-over');event.dataTransfer.dropEffect='move';});
editorList.addEventListener('dragleave',event=>event.target.closest('.editor-row')?.classList.remove('drag-over'));
editorList.addEventListener('drop',event=>{const target=event.target.closest('.editor-row');if(!target||!draggedId||target.dataset.id===draggedId)return;event.preventDefault();const from=route.findIndex(step=>step.id===draggedId),to=route.findIndex(step=>step.id===target.dataset.id);route.splice(to,0,route.splice(from,1)[0]);saveRoute();renderRoute();renderEditor();});
