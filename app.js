
firebase.initializeApp({databaseURL:'https://fantine-vr-default-rtdb.firebaseio.com/'});
var db=firebase.database(),mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
window.addEventListener('load',function(){cr=document.getElementById('rig');});
var zi=document.getElementById('zi'),oi=document.getElementById('oi'),ci=document.getElementById('ci');
var ba=new Audio('https://luiscastrog-lab.github.io/Fantine/musica.mp3');ba.loop=true;ba.volume=0.15;
var ca=new Audio('https://luiscastrog-lab.github.io/Fantine/campana.mp3');ca.volume=0.5;

function go(){
var n=document.getElementById('ni').value.trim();
if(!n){alert('Escribe tu nombre');return;}
mn=n;
mi=n.replace(/\s/g,'_')+'_'+Date.now();
document.getElementById('ls').style.display='none';
document.getElementById('tm').style.display='flex';
document.getElementById('wn').textContent='Bienvenido, '+mn;
document.getElementById('rb').style.display='block';
sr=db.ref('sessions/'+mi);
sr.set({name:mn,joinedAt:new Date().toISOString(),zone:'MENU',objectsFound:0});
sr.onDisconnect().update({leftAt:new Date().toISOString(),status:'offline'});
db.ref('online/'+mi).set(true);
db.ref('online/'+mi).onDisconnect().remove();
db.ref('activity').push({user:mn,type:'joined',timestamp:new Date().toISOString()});
}

document.getElementById('ni').addEventListener('keypress',function(e){if(e.key==='Enter')go();});
db.ref('online').on('value',function(s){ci.innerHTML='&#128994;'+s.numChildren();});

function re(t){
if(!mi)return;
db.ref('reactions').push({user:mn,emoji:t,zone:zi.textContent,timestamp:new Date().toISOString()});
}

db.ref('reactions').orderByChild('timestamp').limitToLast(1).on('child_added',function(s){
var d=s.val();if(!d)return;
var el=document.createElement('div');
el.style.cssText='position:absolute;font-size:48px;pointer-events:none;animation:fu 4s ease-out forwards;left:'+Math.random()*80+10+'%;bottom:10%';
el.textContent=d.emoji;
document.getElementById('fr').appendChild(el);
setTimeout(function(){el.remove()},4500);
});

var st=document.createElement('style');
st.textContent='@keyframes fu{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-300px) scale(1.5)}}';
document.head.appendChild(st);

function sm(){
var t=document.getElementById('mt').value.trim();
if(!t)return;
db.ref('muro').push({user:mn,text:t,timestamp:new Date().toISOString()});
document.getElementById('mt').value='';
document.getElementById('mb').style.display='none';
}

db.ref('muro').orderByChild('timestamp').limitToLast(20).on('value',function(s){
var b=document.getElementById('mm');if(!b)return;b.innerHTML='';
s.forEach(function(c){
var d=c.val();
var v=document.createElement('div');
v.style.cssText='margin:6px 0;padding:6px 10px;background:rgba(90,70,50,0.3);border-radius:6px;border-left:3px solid #FF5900';
v.innerHTML='<b style="color:#FFB347">'+d.user+':</b> '+d.text;
b.appendChild(v);
});
});

function tp(x,z,zona){
document.getElementById('tm').style.display='none';
document.getElementById('tb').style.display='block';
if(!ms){ms=true;try{ba.play()}catch(e){}}
if(cr)cr.setAttribute('position',x+' 0 '+z);
zi.textContent=zona;
if(sr)sr.update({zone:zona});
}

function ov(){
document.getElementById('p0').style.display='none';
document.getElementById('vo').classList.add('a');
document.getElementById('yp').src='https://www.youtube.com/embed/xOyrZSaeZa0?autoplay=1&rel=0';
ba.pause();
}

function cv(){
document.getElementById('yp').src='';
document.getElementById('vo').classList.remove('a');
if(ms)ba.play();
}

