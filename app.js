
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
    'decreto':'NINGUN OBRERO SERA\nDESPEDIDO SIN CAUSA JUSTA\nPero el capataz despidio\na Fantine - Quien falla
