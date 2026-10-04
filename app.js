
var zi,oi,ci;
var db,mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
var ba,ca;
var ids=['pantalla','cartel','porton','instrucciones','letrero','carta','diario','cuentas','decreto','espejo','reloj','campana','muro','puerta'];
var pids=['p0','p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13'];
var bis=[0.3,0.3,0.15,0.2,0.2,0.4,0.3,0.25,0.4,0.15,0.25,0.25,0.15,0.2];
var userEntered=false;
var isVR=false;
var activeVP=null;
var rnames=['asombro','tristeza','injusticia','reflexion','descubrimiento'];

window.addEventListener('DOMContentLoaded',function(){
firebase.initializeApp({databaseURL:'https://fantine-vr-default-rtdb.firebaseio.com/'});
db=firebase.database();
zi=document.getElementById('zi');
oi=document.getElementById('oi');
ci=document.getElementById('ci');
ba=new Audio('https://luiscastrog-lab.github.io/Fantine/musica.mp3');ba.loop=true;ba.volume=0.15;
ca=new Audio('https://luiscastrog-lab.github.io/Fantine/campana.mp3');ca.volume=0.5;

document.getElementById('ni').addEventListener('keypress',function(e){if(e.key==='Enter')go();});
db.ref('online').on('value',function(s){if(ci) ci.innerHTML='&#128994;'+s.numChildren();});

db.ref('reactions').orderByChild('timestamp').limitToLast(1).on('child_added',function(s){
var d=s.val();if(!d)return;
var el=document.createElement('div');
el.style.cssText='position:absolute;font-size:48px;pointer-events:none;animation:fu 4s ease-out forwards;left:'+Math.random()*80+10+'%;bottom:10%';
el.textContent=d.emoji;
document.getElementById('fr').appendChild(el);
setTimeout(function(){el.remove();},4500);
});

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

var st=document.createElement('style');
st.textContent='@keyframes fu{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-300px) scale(1.5)}}';
document.head.appendChild(st);

var scene=document.querySelector('a-scene');
if(scene){
scene.addEventListener('enter-vr',function(){isVR=true;});
scene.addEventListener('exit-vr',function(){isVR=false;});
scene.addEventListener('loaded',function(){

for(var i=0;i<ids.length;i++){(function(idx){
var el=document.getElementById(ids[idx]);
if(!el) return;
el.addEventListener('click',function(){openPanel(idx);});
el.addEventListener('mouseenter',function(){
if(userEntered) el.setAttribute('material','emissiveIntensity','0.8');
});
el.addEventListener('mouseleave',function(){
el.setAttribute('material','emissiveIntensity',String(bis[idx]));
});
})(i);}

for(var c=0;c<14;c++){(function(ci2){
var cb=document.getElementById('cx'+ci2);
if(!cb) return;
cb.addEventListener('click',function(){closeVP(ci2);});
})(c);}

var vp=document.getElementById('vplay');
if(vp){
vp.addEventListener('click',function(){ov();});
}

for(var r=0;r<5;r++){(function(ri){
var rb=document.getElementById('re'+ri);
if(!rb) return;
rb.addEventListener('click',function(){re(rnames[ri]);showVREmoji(rnames[ri]);});
rb.addEventListener('mouseenter',function(){rb.setAttribute('material','emissiveIntensity','0.6');});
rb.addEventListener('mouseleave',function(){rb.setAttribute('material','emissiveIntensity','0.2');});
})(r);}

var zclasses=['re-z2','re-z3','re-z4','re-z5'];
for(var zz=0;zz<zclasses.length;zz++){
var zels=document.querySelectorAll('.'+zclasses[zz]);
zels.forEach(function(zel){
zel.addEventListener('click',function(){
var rt=this.getAttribute('data-re');
if(rt){re(rt);showVREmoji(rt);}
});
zel.addEventListener('mouseenter',function(){this.setAttribute('material','emissiveIntensity','0.8');});
zel.addEventListener('mouseleave',function(){this.setAttribute('material','emissiveIntensity','0.5');});
});
}

var rp=document.getElementById('rpanel');
if(rp){setInterval(function(){if(!isVR||!userEntered)return;var cam=document.querySelector('a-camera');if(!cam)return;var dir=new THREE.Vector3(0,0,-1.5);dir.applyQuaternion(cam.object3D.quaternion);var cp=cam.object3D.getWorldPosition(new THREE.Vector3());rp.object3D.position.set(cp.x+dir.x,cp.y-0.4,cp.z+dir.z);rp.object3D.lookAt(cp.x,cp.y,cp.z);},100);}

var cm=document.querySelector('a-camera');
if(cm){setInterval(function(){if(!userEntered) return;var p=cm.object3D.getWorldPosition(new THREE.Vector3());var z2=zi?zi.textContent:'';var n='';if(p.z<-12&&p.x>-10)n='CINE';else if(p.x<-10)n='ZONA 5';else if(p.z<5&&p.x<=10)n='ZONA 1';else if(p.x>10)n='ZONA 3';else if(p.z>=18)n='ZONA 4';else if(p.z>=5)n='ZONA 2';if(n&&n!==z2){if(zi)zi.textContent=n;if(sr)sr.update({zone:n});}},2000);}

/* --- QUEST VR CLICK HANDLER --- */
function handleVRTrigger(hand){
if(!userEntered||!isVR) return;
var rc=hand.components.raycaster;
if(!rc) return;
var ints=rc.intersectedEls;
if(!ints||ints.length===0) return;
var hit=ints[0];
if(!hit) return;
hit.emit('click');
}

var rh=document.getElementById('rhand');
var lh=document.getElementById('lhand');
if(rh){
rh.addEventListener('triggerdown',function(){handleVRTrigger(rh);});
rh.addEventListener('gripdown',function(){handleVRTrigger(rh);});
}
if(lh){
lh.addEventListener('triggerdown',function(){handleVRTrigger(lh);});
}
/* --- FIN QUEST VR CLICK HANDLER --- */

});
}
});

function go(){
var n=document.getElementById('ni').value.trim();
if(!n){alert('Escribe tu nombre');return;}
mn=n;
mi=n.replace(/\s/g,'_')+'_'+Date.now();
document.getElementById('ls').style.display='none';
document.getElementById('tm').style.display='flex';
document.getElementById('wn').textContent='Bienvenido, '+mn;
document.getElementById('rb').style.display='block';
userEntered=true;
sr=db.ref('sessions/'+mi);
sr.set({name:mn,joinedAt:new Date().toISOString(),zone:'MENU',objectsFound:0});
sr.onDisconnect().update({leftAt:new Date().toISOString(),status:'offline'});
db.ref('online/'+mi).set(true);
db.ref('online/'+mi).onDisconnect().remove();
db.ref('activity').push({user:mn,type:'joined',timestamp:new Date().toISOString()});
}

function re(t){
if(!mi)return;
db.ref('reactions').push({user:mn,emoji:t,zone:zi?zi.textContent:'',timestamp:new Date().toISOString()});
}

function sm(){
var t=document.getElementById('mt').value.trim();
if(!t)return;
db.ref('muro').push({user:mn,text:t,timestamp:new Date().toISOString()});
document.getElementById('mt').value='';
document.getElementById('mb').style.display='none';
}

function tp(x,z,zona){
document.getElementById('tm').style.display='none';
document.getElementById('tb').style.display='block';
if(!ms){ms=true;try{ba.play();}catch(e){}}
var rig=document.getElementById('rig');
if(rig){
rig.object3D.position.set(x,0,z);
rig.setAttribute('position',x+' 0 '+z);
}
var rp=document.getElementById('rpanel');
if(rp&&isVR){rp.object3D.position.set(x,1.2,z-1.5);rp.setAttribute('visible','true');}
if(zi) zi.textContent=zona;
if(sr) sr.update({zone:zona});
}

function ov(){
if(isVR){
window.open('https://www.youtube.com/watch?v=xOyrZSaeZa0','_blank');
return;
}
var p0=document.getElementById('p0');
if(p0) p0.style.display='none';
document.getElementById('vo').classList.add('a');
document.getElementById('yp').src='https://www.youtube.com/embed/xOyrZSaeZa0?autoplay=1&rel=0';
if(ba) ba.pause();
}

function cv(){
document.getElementById('yp').src='';
document.getElementById('vo').classList.remove('a');
if(ms&&ba) ba.play();
}

function openPanel(idx){
if(!userEntered) return;
if(isVR){
if(activeVP!==null){var o=document.getElementById('vp'+activeVP);if(o)o.setAttribute('visible','false');}
var v=document.getElementById('vp'+idx);
if(v){v.setAttribute('visible','true');activeVP=idx;}
} else {
for(var j=0;j<pids.length;j++) document.getElementById(pids[j]).style.display='none';
document.getElementById(pids[idx]).style.display='block';
}
if(ids[idx]==='campana'){try{ca.currentTime=0;ca.play();}catch(e){}}
if(!disc[ids[idx]]){disc[ids[idx]]=true;dc++;if(oi)oi.textContent=dc+'/14';if(sr)sr.update({objectsFound:dc});var f=document.getElementById('fc');if(f)f.textContent=dc;}
}

function closeVP(idx){
var v=document.getElementById('vp'+idx);
if(v) v.setAttribute('visible','false');
activeVP=null;
}

function showVREmoji(type){
var labels={'asombro':'WOW!','tristeza':'TRISTE','injusticia':'NO!','reflexion':'HMM...','descubrimiento':'IDEA!'};
var colors={'asombro':'#FF6B35','tristeza':'#4A90D9','injusticia':'#DC2626','reflexion':'#7C3AED','descubrimiento':'#F59E0B'};
var lb=labels[type]||'?';
var cl=colors[type]||'#FFF';
var sc=document.querySelector('a-scene');
if(!sc) return;
var cam=document.querySelector('a-camera');
if(!cam) return;
var pos=cam.object3D.getWorldPosition(new THREE.Vector3());
var txt=document.createElement('a-text');
txt.setAttribute('value',lb);
txt.setAttribute('color',cl);
txt.setAttribute('align','center');
txt.setAttribute('width','6');
txt.setAttribute('position',pos.x+' '+(pos.y+1)+' '+(pos.z-1));
txt.setAttribute('look-at','[camera]');
txt.setAttribute('animation','property:position;to:'+pos.x+' '+(pos.y+4)+' '+(pos.z-1)+';dur:3000;easing:easeOutQuad');
txt.setAttribute('animation__fade','property:material.opacity;from:1;to:0;dur:3000');
sc.appendChild(txt);
setTimeout(function(){txt.remove();},3500);
}

