const rewards = [
  {act:'Act 1', area:'Clearfell', objective:'Defeat Beira, the Rotten Pack', reward:'+10% Cold Resistance', type:'stats'},
  {act:'Act 1', area:'Hunting Grounds', objective:'Defeat The Crowbell', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 1', area:'Freythorn', objective:'Defeat The King in the Mists', reward:'+30 Spirit', type:'stats'},
  {act:'Act 1', area:'Ogham Farmlands', objective:"Find Una's Lute and return it to Una", reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 1', area:'Ogham Manor', objective:'Defeat Candlemass, the Living Rite', reward:'+20 maximum Life', type:'stats'},
  {act:'Act 2', area:'Keth', objective:'Defeat Kabala, Constrictor Queen', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 2', area:'Valley of the Titans', objective:'Offer the Kabala and Sun Clan Relics at the altar', reward:'+1 Charm Slot; choose 30% Charm Charges gained or 15% Mana Recovery from Flasks (changeable)', type:'choice'},
  {act:'Act 2', area:'Deshar', objective:'Find the Final Letter and return it to Shambrin', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 2', area:'Spires of Deshar', objective:'Interact with the Sisters of Garukhan monument', reward:'+10% Lightning Resistance', type:'stats'},
  {act:'Act 3', area:'Jungle Ruins', objective:'Defeat Mighty Silverfist', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 3', area:'Azak Bog', objective:'Defeat Ignagduk, the Bog Witch', reward:'+30 Spirit', type:'stats'},
  {act:'Act 3', area:'Venom Crypts', objective:'Return Corpse-snake Venom to Servi', reward:'Choose 25% Stun Threshold, 30% Elemental Ailment Threshold, or 25% Mana Regeneration Rate', type:'choice'},
  {act:'Act 3', area:"Jiquani's Machinarium", objective:'Defeat Blackjaw, the Remnant', reward:'+10% Fire Resistance', type:'stats'},
  {act:'Act 3', area:'Aggorat', objective:'Sacrifice the Sacrificial Heart at the altar', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 4', area:"Journey's End", objective:'Defeat Captain Hartlin and free Freya', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 4', area:'Whakapanu Island', objective:'Defeat Great White One and return its Shark Fin to Kaimana', reward:'Choose 30% Armour/Evasion/ES, or hybrid defence bonus (Armour applies to elemental damage / Deflection / faster ES recharge)', type:'choice'},
  {act:'Act 4', area:'Eye of Hinekora', objective:"Interact with Navali's Rest", reward:'+5% maximum Mana', type:'stats'},
  {act:'Act 4', area:'Halls of the Dead', objective:'Obtain Ancestral Tattoos', reward:'Make 3 choices: +5% Cold Resistance or +5 Intelligence; +5% Fire Resistance or +5 Strength; +5% Lightning Resistance or +5 Dexterity', type:'choice'},
  {act:'Act 4', area:'Halls of the Dead', objective:'Defeat Yama the White', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Act 4', area:'Abandoned Prison', objective:'Complete Goddess of Justice', reward:'Choose 30% Life Recovery from Flasks or 30% Mana Recovery from Flasks', type:'choice'},
  {act:'Interlude', area:'Wolvenhold', objective:'Defeat Oswin, the Dread Warden', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Interlude', area:'Khari Crossing', objective:'Complete the Molten Shrine', reward:'+5% maximum Life', type:'stats'},
  {act:'Interlude', area:'Khari Crossing', objective:'Defeat Akthi and Anundr, the Sandworm', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Interlude', area:'Qimah', objective:"Choose at Kochai's Pillar", reward:'Choose: +5 all Attributes, 15% Global Defences, 20% Presence Area, 12% Cooldown Recovery, 3% Movement Speed, +5% Elemental Resists, or 5% Experience Gain with penalties', type:'choice'},
  {act:'Interlude', area:'Kriar Village', objective:'Defeat Lythara, the Wayward Spear', reward:'+40 Spirit', type:'stats'},
  {act:'Interlude', area:'Howling Caves', objective:'Defeat the Abominable Yeti', reward:'+2 Weapon Set Passive Skill Points', type:'points'},
  {act:'Interlude', area:'Kingsmarch', objective:'Complete all Interludes', reward:'+2 Weapon Set Passive Skill Points', type:'points'}
];
const storageKey = 'wayfinder-poe2-0-5';
let done = new Set(JSON.parse(localStorage.getItem(storageKey) || '[]'));
let filter = 'all';
const routeDetails = [{name:'Act 1',note:'Clearfell to Ogham Manor',count:5},{name:'Act 2',note:'Vastiri Desert and the titans',count:4},{name:'Act 3',note:'The Vaal jungle and ruins',count:5},{name:'Act 4 + Interludes',note:'Island route and allied forces',count:13}];
const list = document.querySelector('#reward-list');
function renderRoute() { document.querySelector('#route-grid').innerHTML = routeDetails.map((route,i) => `<article class="route"><span class="route__number">0${i+1}</span><h3>${route.name}</h3><p>${route.note}</p><span class="route__reward-count">${route.count} permanent rewards</span></article>`).join(''); }
function render() { list.innerHTML = rewards.map((item,index) => { const isDone=done.has(index); const visible=filter==='all'||item.type===filter; return `<button class="reward-card ${isDone?'is-done':''}" data-id="${index}" ${visible?'':'hidden'} type="button" aria-pressed="${isDone}"><span class="check">${isDone?'✓':''}</span><span><span class="reward-card__act">${item.act} · ${item.area}</span><h3>${item.objective}</h3><p>${item.reward}</p></span><span class="reward-card__tag">${item.type==='points'?'Points':item.type==='choice'?'Choice':'Bonus'}</span></button>`; }).join(''); updateProgress(); }
function updateProgress() { const count=done.size; document.querySelector('#completed-count').textContent=count; document.querySelector('#total-count').textContent=rewards.length; document.querySelector('#progress-bar').style.width=`${count/rewards.length*100}%`; document.querySelector('#progress-label').textContent=count===rewards.length?'All campaign bonuses claimed.':count?`${rewards.length-count} bonuses still to find.`:'Start with Act 1.'; }
list.addEventListener('click', e => { const card=e.target.closest('[data-id]'); if(!card)return; const id=Number(card.dataset.id); done.has(id)?done.delete(id):done.add(id); localStorage.setItem(storageKey,JSON.stringify([...done])); render(); });
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{ filter=button.dataset.filter; document.querySelectorAll('.filter').forEach(b=>b.classList.toggle('is-active',b===button)); render(); }));
document.querySelector('#reset-progress').addEventListener('click',()=>{ if(confirm('Reset all checked rewards?')) { done.clear(); localStorage.removeItem(storageKey); render(); } });
renderRoute(); render();
