
/* =========================================
   APP.JS V2.0 — La Fabrica de Fantine
   Logica: Firebase, login, clics, reacciones,
   quest-move, audio, paneles 3D
   ========================================= */

/* ═══ VARIABLES GLOBALES ═══ */
var zi,oi,ci;
var db,mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
var ba,ca;
var isVR=false;
var activeVP=null;
var ids=['pantalla','cartel','porton','letrero','instrucciones','carta','cuentas','diario','decreto','espejo','reloj','campana','muro','puerta'];

/* ═══ QUEST-MOVE (movimiento con joystick) ═══ */
AFRAME.registerComponent('quest-move',{
  tick:function(){
    var s=this.el.sceneEl;
    if(!s.is('vr-mode'))return;
    var session=s.xrSession;
    if(!session||!session.inputSources)return;
    var sources=session.inputSources;
    for(var i=0;i<sources.length;i++){
      var src=sources[i];
      if(src.handedness==='left'&&src.gamepad&&src.gamepad.axes.length>=4){
        var ax=src.gamepad.axes[2];
        var ay=src.gamepad.axes[3];
        if(Math.abs(ax)>0.15||Math.abs(ay)>0.15){
          var cam=document.querySelector('[camera]');
          var rot=cam.object3D.rotation.y;
          var dx=ax*0.06;
          var dz=ay*0.06;
          var mx=dx*Math.cos(rot)-dz*Math.sin(rot);
          var mz=dx*Math.sin(rot)+dz*Math.cos(rot);
          var rig=document.getElementById('rig');
          var p=rig.object3D.position;
          p.x+=mx;
          p.z+=mz;
        }
      }
    }
  }
});

/* ═══ INICIALIZACION ═══ */
window.addEventListener('DOMContentLoaded',function(){

  /* Referencias DOM */
  zi=document.getElementById('zi');
  oi=document.getElementById('oi');
  ci=document.getElementById('fc');

  /* Firebase */
  firebase.initializeApp({databaseURL:'https://fantine-vr-default-rtdb.firebaseio.com/'});
  db=firebase.database();

  /* Audio */
  ba=document.getElementById('bgm');
  ca=document.getElementById('sfx');
  if(ba){ba.loop=true;ba.volume=0.3;}
  if(ca){ca.volume=0.5;}

  /* Boton entrar */
  document.getElementById('eb').addEventListener('click',function(){
    go();
  });

  /* Enter con teclado */
  document.getElementById('ni').addEventListener('keypress',function(e){
    if(e.key==='Enter')go();
  });

  /* Detectar VR */
  var sc=document.querySelector('a-scene');
  sc.addEventListener('enter-vr',function(){isVR=true;});
  sc.addEventListener('exit-vr',function(){isVR=false;});

  /* Construir escena */
  buildScene();

  /* Asignar rig */
  cr=document.getElementById('rig');

  /* Quest-move */
  cr.setAttribute('quest-move','');

  /* Clics en objetos interactivos */
  setTimeout(function(){
    var items=document.querySelectorAll('.clickable');
    for(var i=0;i<items.length;i++){
      items[i].addEventListener('click',function(){
        var panel=this.getAttribute('data-panel');
        var re=this.getAttribute('data-re');
        if(re){
          sendReaction(re);
        } else if(panel){
          openPanel(panel);
        }
      });
    }
  },2000);

});

/* ═══ FUNCION LOGIN ═══ */
function go(){
  var n=document.getElementById('ni').value.trim();
  if(!n){alert('Escribe tu nombre');return;}
  mn=n;
  mi=n.replace(/\s/g,'_')+'_'+Date.now();

  /* Ocultar login, mostrar HUD */
  document.getElementById('login').style.display='none';
  document.getElementById('hud').style.display='block';

  /* Registrar en Firebase */
  sr=db.ref('sessions/'+mi);
  sr.set({name:mn,entered:new Date().toISOString(),zone:'Sala de Cine',objects:0});
  db.ref('online/'+mi).set({name:mn,time:new Date().toISOString()});
  db.ref('online/'+mi).onDisconnect().remove();

  /* Iniciar audio */
  if(ba){
    ba.play().then(function(){ms=true;}).catch(function(){
      document.addEventListener('click',function tryAudio(){
        ba.play().then(function(){ms=true;});
        document.removeEventListener('click',tryAudio);
      });
    });
  }

  /* Actualizar zona */
  updateZone('Sala de Cine');
}

/* ═══ ABRIR PANEL ═══ */
function openPanel(id){
  cp();
  dc++;
  if(oi)oi.textContent=dc;
  if(ci)ci.textContent=dc;
  if(sr)sr.update({objects:dc});

  /* Registrar actividad */
  db.ref('activity/'+mi).push({
    action:'open',
    object:id,
    zone:zi?zi.textContent:'',
    time:new Date().toISOString()
  });

  if(isVR){
    showVRPanel(id);
  } else {
    var p=document.getElementById('p-'+id);
    if(p)p.style.display='block';
  }

  /* Sonido campana */
  if(ca){ca.currentTime=0;ca.play().catch(function(){});}
}

/* ═══ PANEL 3D EN VR — STORYTELLING V2.0 ═══ */
function showVRPanel(id){
  if(activeVP){activeVP.parentNode.removeChild(activeVP);activeVP=null;}

  var titles={
    'pantalla':'LA JORNADA QUE CAMBIO TODO\nAt the End of the Day\nQue diferencia hay entre\nvivir y sobrevivir?',
    'porton':'LA PUERTA DE LA NECESIDAD\nFrankl: Al hombre se le puede\narrebatar todo salvo elegir\nsu actitud - Reflexiona',
    'letrero':'FABRIQUE MADELEINE\nBasta la buena intencion\npara hacer justicia?\n- Tomas de Aquino',
    'cartel':'SE BUSCAN OBRERAS\n15 sous x 12 horas\nPascal: La costumbre es\nnuestra naturaleza',
    'instrucciones':'COMO NAVEGAR\nJoystick: caminar\nMira 2 seg: activar\nFlechas amarillas: ruta',
    'carta':'QUERIDA COSETTE\nMarcel: Tener vs Ser\nFantine no tenia nada\npero ERA madre',
    'cuentas':'LOS NUMEROS DE LA MISERIA\nIngresos: 360 Gastos: 420\nDeficit: -60 sous\nEs justo pedir sentido\na quien no puede comer?',
    'diario':'JORNADA DE UNA OBRERA\n5:45AM-8PM sin descanso\nAgustin: Nuestro corazon\nesta inquieto...',
    'decreto':'NINGUN OBRERO SERA\nDESPEDIDO SIN CAUSA JUSTA\nPero el capataz despidio\na Fantine - Quien falla?',
    'espejo':'QUIEN ERES REALMENTE?\nPascal: El hombre supera\ninfinitamente al hombre\nValjean eligio la verdad',
    'reloj':'5:45 AM - TU TIEMPO\nNO TE PERTENECE\nAgustin: En ti alma mia\nmido los tiempos',
    'campana':'LA CAMPANA DEL CAPATAZ\nFrankl: sufrimiento con\nsentido vs absurdo\nCuando el trabajo destruye?',
    'muro':'MURO COLABORATIVO\nEscribe tu reflexion\nQue te movio?\nQue pregunta te llevas?',
    'puerta':'LA PREGUNTA QUE TE LLEVAS\nHugo: El espectaculo mas\ngrande es el interior\ndel alma'
  };

  var txt=titles[id]||id;
  var cam=document.querySelector('[camera]');
  var panel=document.createElement('a-entity');
  panel.setAttribute('position','0 0 -1.5');
  panel.innerHTML='<a-plane width="2" height="1.2" color="#1A1A2E" opacity="0.92" side="double"></a-plane>'+
    '<a-text value="'+txt+'" color="#C8A951" align="center" width="3" position="0 0.1 0.01" side="double"></a-text>'+
    '<a-text value="[Mira otro objeto para cerrar]" color="#FF5900" align="center" width="2.5" position="0 -0.45 0.01" side="double"></a-text>';
  cam.appendChild(panel);
  activeVP=panel;

  setTimeout(function(){
    if(activeVP===panel){
      panel.parentNode.removeChild(panel);
      activeVP=null;
    }
  },8000);

  if(id==='pantalla'){
    setTimeout(function(){
      window.open('https://www.youtube.com/watch?v=xOyrZSaeZa0','_blank');
    },2000);
  }
}

/* ═══ CERRAR PANEL 2D ═══ */
function cp(){
  var ps=document.querySelectorAll('.ip');
  for(var i=0;i<ps.length;i++){ps[i].style.display='none';}
  var mi2=document.getElementById('mi');
  if(mi2)mi2.style.display='none';
  if(activeVP){activeVP.parentNode.removeChild(activeVP);activeVP=null;}
}

/* ═══ VIDEO ═══ */
function ov(){
  if(isVR){
    window.open('https://www.youtube.com/watch?v=xOyrZSaeZa0','_blank');
  } else {
    var vo=document.getElementById('vo');
    vo.style.display='flex';
    document.getElementById('vf').src='https://www.youtube.com/embed/xOyrZSaeZa0?autoplay=1';
  }
}

function cv(){
  document.getElementById('vo').style.display='none';
  document.getElementById('vf').src='';
}

/* ═══ MURO COLABORATIVO ═══ */
function sm(){
  document.getElementById('mi').style.display='block';
}

function wm(){
  var t=document.getElementById('mt').value.trim();
  if(!t)return;
  db.ref('muro').push({
    name:mn,
    text:t,
    zone:zi?zi.textContent:'',
    time:new Date().toISOString()
  });
  document.getElementById('mt').value='';
  document.getElementById('mi').style.display='none';
  alert('Tu reflexion fue enviada al muro.');
}

/* ═══ REACCIONES ═══ */
function sendReaction(type){
  db.ref('reactions').push({
    name:mn,
    reaction:type,
    zone:zi?zi.textContent:'',
    time:new Date().toISOString()
  });

  if(isVR){
    showVREmoji(type);
  } else {
    var labels={'wow':'WOW!','triste':'TRISTE','no':'NO!','hmm':'HMM...','idea':'IDEA!'};
    var colors={'wow':'#FF5900','triste':'#3B82F6','no':'#EF4444','hmm':'#7C3AED','idea':'#F59E0B'};
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;top:30%;left:50%;transform:translateX(-50%);font-size:48px;font-weight:bold;color:'+colors[type]+';z-index:999;text-shadow:2px 2px 4px rgba(0,0,0,0.5);pointer-events:none;';
    fb.textContent=labels[type]||type;
    document.body.appendChild(fb);
    setTimeout(function(){fb.remove();},2000);
  }
}

/* ═══ EMOJI 3D EN VR ═══ */
function showVREmoji(type){
  var labels={'wow':'WOW!','triste':'TRISTE','no':'NO!','hmm':'HMM...','idea':'IDEA!'};
  var colors={'wow':'#FF5900','triste':'#3B82F6','no':'#EF4444','hmm':'#7C3AED','idea':'#F59E0B'};
  var cam=document.querySelector('[camera]');
  var txt=document.createElement('a-text');
  txt.setAttribute('value',labels[type]||type);
  txt.setAttribute('color',colors[type]||'#FFF');
  txt.setAttribute('align','center');
  txt.setAttribute('width','4');
  txt.setAttribute('position','0 -0.3 -1.5');
  txt.setAttribute('side','double');
  cam.appendChild(txt);
  setTimeout(function(){txt.remove();},3500);
}

/* ═══ ACTUALIZAR ZONA ═══ */
function updateZone(name){
  if(zi)zi.textContent=name;
  if(sr)sr.update({zone:name});
  db.ref('activity/'+mi).push({
    action:'zone',
    zone:name,
    time:new Date().toISOString()
  });
}

/* ═══ DETECCION DE ZONA POR POSICION ═══ */
setInterval(function(){
  if(!cr)return;
  var z=cr.object3D.position.z;
  var zona='';
  if(z<-18)zona='Sala de Cine';
  else if(z<-14)zona='Pasillo Cine-Entrada';
  else if(z<-8)zona='Zona 1: Entrada';
  else if(z<-4)zona='Pasillo Entrada-Taller';
  else if(z<4)zona='Zona 2: Taller';
  else if(z<8)zona='Pasillo Taller-Oficina';
  else if(z<16)zona='Zona 3: Oficina';
  else if(z<20)zona='Pasillo Oficina-Patio';
  else if(z<28)zona='Zona 4: Patio';
  else if(z<32)zona='Pasillo Patio-Salida';
  else zona='Zona 5: Salida';

  if(zona && zi && zi.textContent!==zona){
    updateZone(zona);
  }
},2000);


