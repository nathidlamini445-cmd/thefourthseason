// All scene logic: booth, theater, garden canvas, letter, seasons.
let ran = false
export function initCinema(CFG) {
  if (ran) return
  ran = true
const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const hx=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
const mix=(a,b,k)=>{const A=hx(a),B=hx(b);return 'rgb('+A.map((v,i)=>Math.round(v+(B[i]-v)*k)).join()+')'};
$('#tname').textContent=CFG.name;const ticket=$('.ticket');if(ticket){const seat=document.createElement('span');seat.className='seat';seat.textContent='seat '+CFG.seat;ticket.append(seat)}
let cur=0,muted=false,sel=[[],[],[]],started=false,raf,seasonStart=0;
const bgm=$('#bgm');bgm.src=CFG.music;bgm.volume=0;bgm.loop=true;bgm.preload='auto';
function startMusic(level=.18){if(muted)return;bgm.volume=0;bgm.play().then(()=>fade(level,900)).catch(()=>{})}
const iOS=/iP(hone|ad|od)/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function fade(to,ms=1500){if(muted)to=0;if(iOS){if(to===0)bgm.pause();else{bgm.volume=1;bgm.play().catch(()=>{})}return}const from=bgm.volume,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/ms);bgm.volume=Math.max(0,Math.min(1,from+(to-from)*k));if(k<1)requestAnimationFrame(f)})(t0)}
$('#mute').onclick=()=>{muted=!muted;$('#mute').textContent='sound: '+(muted?'off':'on');if(muted){bgm.volume=0;if(iOS)bgm.pause()}else startMusic(.18)};
function go(n){document.querySelectorAll('.scene').forEach((s,i)=>s.classList.toggle('on',i===n));cur=n}
async function type(el,t,ms=28){el.textContent='';for(const c of t){el.textContent+=c;await sleep(ms)}}
function say(lines,sel,done){let i=0,busy=false;const el=$(sel),sc=el.closest('.scene');
 async function show(){busy=true;await type(el,lines[i]);busy=false}
 sc.onclick=()=>{if(busy)return;if(++i>=lines.length){sc.onclick=null;done();return}show()};show()}
const nm=s=>s.replace('{name}',CFG.name);

/* 0 ticket */
$('.ticket').onclick=()=>{startMusic(.18);go(1);startBooth()};
/* 1 booth, with live pixel preview */
const col=(i,n)=>(CFG.booth[i].o.find(o=>o[0]===n)||[])[1]||'';
const avg=cs=>'#'+[0,1,2].map(i=>Math.round(cs.map(hx).reduce((s,x)=>s+x[i],0)/cs.length).toString(16).padStart(2,'0')).join('');
function tray(){
 const pc=sel[0].filter(n=>n!=='salt').map(n=>col(0,n)),c=pc.length?avg(pc):'#f6e7b4',salt=sel[0].includes('salt'),dr=col(1,sel[1][0]),ch=col(2,sel[2][0]);
 const K=[[5,8,5,5],[9,5,6,6],[14,8,5,5],[7,4,4,4],[12,2,5,5],[3,11,4,3],[17,11,4,3]].map(r=>`<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}"/>`).join('');
 const sp=salt?[[7,6],[11,4],[15,9],[6,10],[13,12],[10,9]].map(p=>`<rect x="${p[0]}" y="${p[1]}" width="1" height="1" fill="#fff"/>`).join(''):'';
 const pop=`<svg viewBox="0 0 24 28" shape-rendering="crispEdges"><defs><pattern id="st" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="2" height="4" fill="#ff4d5e"/><rect x="2" width="2" height="4" fill="#f4ecd8"/></pattern></defs><polygon points="4,13 20,13 18,27 6,27" fill="url(#st)"/><g fill="${c}">${K}</g><rect x="9" y="6" width="2" height="2" fill="#0002"/>${sp}</svg>`;
 const cup=`<svg viewBox="0 0 20 28" shape-rendering="crispEdges"><rect x="9" y="0" width="2" height="6" fill="#ff4d5e"/><rect x="3" y="5" width="14" height="3" fill="#ff4d5e"/><polygon points="4,8 16,8 14.5,27 5.5,27" fill="#f4ecd833" stroke="#f4ecd8"/>${dr?`<polygon points="4.6,12 15.4,12 14.4,26.4 5.6,26.4" fill="${dr}"/><rect x="7" y="14" width="1" height="1" fill="#fff9"/><rect x="11" y="18" width="1" height="1" fill="#fff9"/><rect x="9" y="22" width="1" height="1" fill="#fff9"/>`:''}</svg>`;
 const bar=`<svg viewBox="0 0 30 14" shape-rendering="crispEdges">${ch?`<rect x="1" y="2" width="22" height="10" fill="${ch}"/><rect x="1" y="5" width="22" height="2" fill="#fffa"/><rect x="23" y="3" width="3" height="8" fill="#5a301a"/><rect x="26" y="3" width="3" height="8" fill="#5a301a"/><rect x="25" y="3" width="1" height="8" fill="#2d160b"/>`:`<rect x="2" y="3" width="26" height="8" fill="none" stroke="#a79cc4" stroke-dasharray="2 2"/>`}</svg>`;
 $('#tray').innerHTML=pop+cup+bar}
function startBooth(){type($('#say0'),nm(CFG.clerk));let st=0;sel=[[],[],[]];tray();
 function step(){const s=CFG.booth[st],po=$('#po');$('#pq').textContent=s.q;po.innerHTML='';
  s.o.forEach(o=>{const b=document.createElement('button');b.textContent=o[0];if(o[1])b.style.borderLeft='8px solid '+o[1];
   b.onclick=()=>{if(s.multi){b.classList.toggle('sel');sel[st]=[...po.querySelectorAll('.sel')].map(x=>x.textContent)}else{po.querySelectorAll('.sel').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');sel[st]=[o[0]]}tray()};po.append(b)});
  $('#pn').onclick=()=>{if(++st<CFG.booth.length)step();else{go(2);const L=CFG.usher.map(l=>nm(l).replace('{pop}',sel[0].join(' + ')||'plain').replace('{drink}',sel[1][0]||'water').replace('{choc}',(sel[2][0]&&sel[2][0]!=='none')?sel[2][0]:'no chocolate'));say(L,'#say1',()=>{$('#cup').style.setProperty('--dc',col(1,sel[1][0])||'#bfe6ff');$('#cup').classList.remove('eaten');$('.pop').classList.remove('eaten');go(3)})}}}
 step()}
/* 3 theater */
[[7,.095,[1,4]],[6,.125,[0,3,5]],[5,.16,[2]]].forEach(([n,k,h])=>{const r=document.createElement('div');r.className='rw';for(let i=0;i<n;i++){const s=document.createElement('i');s.style.setProperty('--k',k);if(h.includes(i))s.className='h';r.append(s)}$('#rows').append(r)});
const v=$('#vid');let pl=false;
$('#posters').replaceChildren();
CFG.movies.slice(0,3).forEach(m=>{const b=document.createElement('button');b.className='poster';b.innerHTML='<img alt=""><span></span>';const im=b.firstChild;im.src=m.poster;im.onerror=()=>im.remove();b.lastChild.textContent=m.title;b.onclick=()=>choose(m);$('#posters').append(b)});
async function choose(m){$('#posters').classList.add('out');pl=false;v.pause();v.removeAttribute('src');v.load();fade(0,900);await type($('#bub'),m.praise);await sleep(1500);play(m)}
function play(m){$('#pick').style.opacity=0;v.style.display='block';$('#screen').classList.add('fk');pl=true;v.pause();v.src=m.video;v.load();v.muted=false;v.play().catch(()=>{});$('#out').style.display='block';
 v.onerror=()=>{v.style.display='none';const g=$('#vmsg');g.style.display='flex';g.textContent='(clip not added yet: '+m.video+')'};
 v.ontimeupdate=()=>{if(v.currentTime>=CFG.clip)toGarden()};v.onended=toGarden}
$('#out').onclick=toGarden;
function fx(t,x){const d=document.createElement('div');d.className='fx';d.textContent=t;d.style.left=x;$('.me').append(d);setTimeout(()=>d.remove(),1000)}
const eatPop=()=>{const p=$('.pop');if(p.classList.contains('eaten'))return;p.classList.add('eaten');fx('nom nom','calc(50% - 30px)')};
$('.pop').onclick=$('.bucket').onclick=eatPop;
$('#cup').onclick=()=>{const c=$('#cup');if(c.classList.contains('eaten'))return;c.classList.add('eaten');fx('slurp','calc(50% - 120px)')};
/* 4 garden: evening, flower, letter, then look up */
const F=(c,hand)=>`<svg viewBox="0 0 16 ${hand?30:26}" shape-rendering="crispEdges"><rect x="7" y="9" width="2" height="17" fill="#2f8a3a"/><rect x="9" y="16" width="4" height="2" fill="#3fa84a"/><rect x="3" y="19" width="4" height="2" fill="#3fa84a"/><rect x="4" y="2" width="8" height="8" fill="${c}"/><rect x="6" y="1" width="4" height="10" fill="${c}"/><rect x="2" y="4" width="12" height="4" fill="${c}"/><rect x="6" y="4" width="4" height="4" fill="#ffd23f"/>${hand?'<rect x="4" y="22" width="8" height="8" fill="#d9a07a"/><rect x="4" y="22" width="8" height="2" fill="#c48a64"/>':''}</svg>`;
[['#ff6fa0',22,76],['#ffd23f',38,84],['#c9a0ff',62,80],['#ff9a3c',80,86]].forEach(([c,l,t])=>{const b=document.createElement('button');b.className='fp';b.style.cssText=`left:${l}%;top:${t}%`;b.innerHTML=F(c);b.onclick=()=>pick(c);$('#fl').append(b)});
async function toGarden(){if(started)return;started=true;$('#out').style.display='none';v.pause();go(4);startGarden();fade(.5,2500);await sleep(700);type($('#itx'),'nice evening.')}
$('#down').onclick=()=>{$('#gw').style.transform='translate(-30vw,-50%)';$('#intro').style.opacity=0;$('#intro').style.pointerEvents='none';setTimeout(()=>{document.querySelectorAll('.fp').forEach(f=>f.classList.add('on'));hint('pick a flower.')},1400)};
const hint=t=>{const h=$('#hint');h.textContent=t||'';h.classList.toggle('on',!!t)};
function pick(c){hint('now open the note.');document.querySelectorAll('.fp').forEach(f=>{f.classList.remove('on')});$('#held').innerHTML=F(c,1);$('#held').classList.add('on');$('#paper').classList.add('on')}
$('#paper').onclick=()=>{hint('');startMusic(.16);$('#paper').classList.remove('on');$('#letter').style.display='flex';let i=0;const pg=$('#pg'),n=CFG.letter.length+1;
 function page(){pg.onclick=null;pg.innerHTML='';pg.classList.remove('f');void pg.offsetWidth;pg.classList.add('f');const t=document.createElement('div');pg.append(t);
  if(i<CFG.letter.length){t.textContent=CFG.letter[i];const s=document.createElement('small');s.textContent=(i+1)+' / '+n+' · tap';pg.append(s);pg.onclick=()=>{i++;page()}}else ask(pg,t)}
 page()};
function ask(pg,t){t.textContent=CFG.question;const r=document.createElement('div');r.className='row';r.innerHTML='<button id="no"></button>';pg.append(r);const no=$('#no');no.textContent=CFG.no;
 no.onclick=e=>{e.stopPropagation();pg.innerHTML='';const x=document.createElement('div');x.textContent=CFG.done;pg.append(x);pg.onclick=null;setTimeout(lookUp,4200)}}
async function lookUp(){$('#letter').style.display='none';$('#held').classList.remove('on');$('#gw').style.transform='translate(-30vw,0)';fade(.75,2500);await sleep(2300);seasonStart=performance.now();enableLook();hint('swipe to look around.');setTimeout(()=>hint(''),9000);await sleep(22000);if(started){$('#end').classList.add('on');$('#end').onclick=reset}}
function enableLook(){let lx=.5,ly=0,sx=0,sy=0,bx=0,by=0,d=false;const g=$('#gw'),s=$('#s4');
 s.onpointerdown=e=>{d=true;sx=e.clientX;sy=e.clientY;bx=lx;by=ly;g.style.transition='none'};
 s.onpointermove=e=>{if(!d)return;lx=Math.max(0,Math.min(1,bx-(e.clientX-sx)/(innerWidth*.6)));ly=Math.max(0,Math.min(1,by-(e.clientY-sy)/innerHeight));g.style.transform='translate('+(-lx*60)+'vw,'+(-ly*50)+'%)'};
 s.onpointerup=s.onpointercancel=()=>{d=false}}
function reset(){cancelAnimationFrame(raf);ss=[];const s4=$('#s4');s4.onpointerdown=s4.onpointermove=s4.onpointerup=s4.onpointercancel=null;started=false;seasonStart=0;fade(0,600);hint('');$('#end').classList.remove('on');$('#letter').style.display='none';$('#held').classList.remove('on');$('#paper').classList.remove('on');document.querySelectorAll('.fp').forEach(f=>f.classList.remove('on'));
 const g=$('#gw');g.style.transition='none';g.style.transform='';setTimeout(()=>g.style.transition='',80);$('#intro').style.opacity=1;$('#intro').style.pointerEvents='auto';$('#itx').textContent='';
 v.removeAttribute('src');v.style.display='none';$('#vmsg').style.display='none';$('#screen').classList.remove('fk');$('#posters').classList.remove('out');$('#pick').style.opacity=1;$('#bub').textContent='pick one. i have opinions.';go(0)}

/* garden canvas: pixel art, 2 screens tall (sky, then ground) */
const PAL=[
 {sky:['#4f86cf','#6f9bd6','#97aedb','#c9b6d0','#f0b8a4','#f7b080','#f9c474','#ffe08e'],g:['#5aa338','#4a8f30'],t:['#2e7330','#3d8a3b'],sun:'#fff3b8',p:null},
 {sky:['#82c4f2','#9fd0f4','#bcdcf3','#d9e5f0','#f1e2ea','#f7d3df','#f9c8d6','#ffdccf'],g:['#7ccf55','#68bd45'],t:['#f7a8c4','#fbc6d9'],sun:'#fff6c8',p:'#ffb3cc'},
 {sky:['#2a86dc','#439be6','#62b1ee','#86c5f2','#acd8f5','#d1e9f7','#fff2c0','#ffe590'],g:['#3f9d2e','#348a28'],t:['#1f7a2a','#2f9a38'],sun:'#fffbd0',p:null},
 {sky:['#566aa4','#8479a6','#b57fa0','#d58a86','#e99a6b','#f3ad5c','#f8c368','#fcd98a'],g:['#9c9a3a','#868630'],t:['#d9631b','#f2992a'],sun:'#ffe9a8',p:'#e8732a'},
 {sky:['#46597e','#6b83a6','#91a8c3','#b4c6d7','#cfdbe5','#e3eaef','#eff3f6','#fafcfd'],g:['#e1e9ef','#cfdae2'],t:['#97a5af','#bac5cd'],sun:'#f5f8ff',p:'#ffffff'}];
const cv=$('#gc'),ctx=cv.getContext('2d');let W,H,gy,trees,flowers,parts,flies,ss=[];
const circ=(x,y,r)=>{for(let d=-r;d<=r;d++){const w=Math.floor(Math.sqrt(r*r-d*d));ctx.fillRect(x-w,y+d,2*w+1,1)}};
const pcx=y=>W/2+Math.sin((y-gy)/18)*7,phw=y=>2+(y-gy)*.09;
function startGarden(){cancelAnimationFrame(raf);const sc=Math.max(2,Math.round(innerWidth/160));W=Math.ceil(innerWidth/sc);H=Math.ceil(2*innerHeight/sc);cv.width=W;cv.height=H;gy=Math.floor(H*.54);
 const cols=['#ff4d5e','#ff8fb1','#ffc93c','#2ec4b6','#f4ecd8','#b48cff','#ff9a3c'],R=Math.random;
 trees=Array.from({length:11},(_,i)=>({x:Math.floor((i+.5)*W/11+R()*10-5),r:14+Math.floor(R()*12),h:14+Math.floor(R()*12)}));
 flowers=[];for(let i=0;i<(H-gy)*W/42;i++){const x=Math.floor(R()*W),y=gy+4+Math.floor(R()*(H-gy-6));if(Math.abs(x-pcx(y))>phw(y)+2)flowers.push({x,y,c:cols[Math.floor(R()*cols.length)],b:y>gy+(H-gy)*.35&&R()<.5})}
 parts=Array.from({length:110},()=>({x:R()*W,y:R()*H*.55,v:.15+R()*.3,p:R()*6}));
 flies=Array.from({length:5},()=>({x:R()*W,y:gy+10+R()*(H-gy-30),a:R()*6,c:cols[Math.floor(R()*4)]}));
 (function loop(t){let c0=0,c1=0,k=0;
  if(seasonStart&&t>=seasonStart){const pos=(t-seasonStart)/5500,n=Math.floor(pos),fr=pos-n;c0=n===0?0:((n-1)%4)+1;c1=(n%4)+1;k=Math.max(0,(fr-.55)/.45);k=k*k*(3-2*k)}
  const A=PAL[c0],B=PAL[c1],ww=(c0===4?1-k:0)+(c1===4?k:0),M=(a,b)=>mix(a,b,k);
  const bh=gy/8;A.sky.forEach((s,i)=>{ctx.fillStyle=M(s,B.sky[i]);ctx.fillRect(0,Math.floor(i*bh),W,Math.ceil(bh)+1)});
  const sx=Math.floor(W*.34),sy=Math.floor(H*.37);ctx.globalAlpha=.14;ctx.fillStyle=M(A.sun,B.sun);circ(sx,sy,16);circ(sx,sy,11);ctx.globalAlpha=1;circ(sx,sy,6);
  ctx.fillStyle='#fff';ctx.globalAlpha=.7;[[.15,.2,3],[.6,.26,4],[.85,.14,3]].forEach(([bx,by,r],i)=>{const x=((t/(700+i*200)+bx*W)%(W+50))-25,y=Math.floor(H*by);circ(x|0,y,r);circ((x+r)|0,y+1,r-1);circ((x-r)|0,y+1,r-1)});ctx.globalAlpha=1;
  trees.forEach(tr=>{ctx.fillStyle='#5a3b22';ctx.fillRect(tr.x-1,gy-tr.h,3,tr.h);ctx.fillStyle=M(A.t[0],B.t[0]);circ(tr.x,gy-tr.h,tr.r);ctx.fillStyle=M(A.t[1],B.t[1]);circ(tr.x-4,gy-tr.h-4,Math.floor(tr.r*.55))});
  ctx.fillStyle=mix((k>.5?B:A).g[0],'#102a10',.35);ctx.fillRect(0,gy-5,W,7);
  ctx.fillStyle=M(A.g[0],B.g[0]);ctx.fillRect(0,gy+2,W,H-gy);ctx.fillStyle=M(A.g[1],B.g[1]);for(let y=gy+6;y<H;y+=7)ctx.fillRect(0,y,W,3);
  for(let y=gy+2;y<H;y++){const cx=pcx(y),hw=phw(y);ctx.fillStyle=mix('#c9b27c','#dfe6ec',ww);ctx.fillRect(cx-hw-1,y,2*hw+3,1);ctx.fillStyle=mix('#e8d3a2','#f2f5f8',ww);ctx.fillRect(cx-hw,y,2*hw+1,1)}
  ctx.globalAlpha=1-.85*ww;flowers.forEach(f=>{ctx.fillStyle='#1f6a2b';ctx.fillRect(f.x,f.y+1,1,3);ctx.fillStyle=f.c;ctx.fillRect(f.x,f.y,2,2);if(f.b){ctx.fillRect(f.x-2,f.y,2,2);ctx.fillRect(f.x+2,f.y,2,2);ctx.fillRect(f.x,f.y-2,2,2);ctx.fillStyle='#ffd23f';ctx.fillRect(f.x,f.y,2,2)}});ctx.globalAlpha=1;
  const bx=Math.floor(W*.3),by=gy+16;ctx.fillStyle='#8a5a34';ctx.fillRect(bx,by,28,3);ctx.fillRect(bx,by-6,28,2);ctx.fillRect(bx+2,by+3,2,6);ctx.fillRect(bx+24,by+3,2,6);ctx.fillStyle='#b97c45';ctx.fillRect(bx,by,28,1);
  if(ww<.5)flies.forEach(f=>{f.a+=.03;f.x+=Math.cos(f.a)*.4;f.y+=Math.sin(f.a*1.4)*.3;ctx.fillStyle=f.c;const o=Math.sin(t/90)>0?1:0;ctx.fillRect(f.x|0,(f.y|0)-o,2,1);ctx.fillRect((f.x|0)+3,(f.y|0)-o,2,1);ctx.fillStyle='#2a1f4a';ctx.fillRect((f.x|0)+2,f.y|0,1,1)});
  const pc=(k>.5?B:A).p;if(pc){ctx.fillStyle=pc;parts.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.p+p.y/9)*.35;if(p.y>H*.55){p.y=-2;p.x=Math.random()*W}ctx.fillRect(p.x|0,p.y|0,c1===4||c0===4?1:2,1)})}
  if(seasonStart&&t>=seasonStart){if(ss.length<3&&Math.random()<.007)ss.push({x:Math.random()*W*.8,y:Math.random()*H*.25,l:0});ss=ss.filter(s=>s.l<45);ss.forEach(s=>{s.x+=2.4;s.y+=1.2;s.l++;for(let i=0;i<9;i++){ctx.globalAlpha=Math.max(0,(1-i/9)*(1-s.l/45));ctx.fillStyle=i?'#fff6c8':'#fff';ctx.fillRect((s.x-i*2.4)|0,(s.y-i*1.2)|0,2,1)}});ctx.globalAlpha=1}
  raf=requestAnimationFrame(loop)})(0)}
let lw=innerWidth;addEventListener('resize',()=>{if(started&&cur===4&&Math.abs(innerWidth-lw)>40){lw=innerWidth;startGarden()}});
}
