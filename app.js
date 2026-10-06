
/* =========================================
   APP.JS V2.5 — La Fabrica de Fantine
   INCLUYE: Rompecabezas colaborativo,
   audio Bingo, Firebase sync puzzle,
   controles corregidos, emoji sube
   ========================================= */

/* ═══ VARIABLES GLOBALES ═══ */
var zi,oi,ci,pcEl;
var db,mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
var ba,ca,bingo;
var isVR=false;
var activeVP=null;
var activeEmoji=null;
var selectedPiece=null;
var placedPieces={};
var puzzleComplete=false;
var ids=['pantalla','cartel','porton','letrero','instrucciones','carta','cuentas','diario','decreto','espejo','reloj','campana','muro','puerta'];

/* ═══ QUEST-MOVE (movimiento con joystick — direccion corregida) ═══ */
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
          var dir=new THREE.Vector3();
          cam.object3D.getWorldDirection(dir);
          var right=new THREE.Vector3();
          right.crossVectors(dir,new THREE.Vector3(0,1,0)).normalize();
          var speed=0.06;
          var rig=document.getElementById('rig');
          var p=rig.object3D.position;
          p.x+=(-dir.x*ay*speed)+(right.x*ax*speed);
          p.z+=(-dir.z*ay*speed)+(right.z*ax*speed);
        }
      }
    }
  }
});

/* ═══ INICIALIZACION ═══ */
window.addEventListener('DOMContentLoaded',function(){

  zi=document.getElementById('zi');
  oi=document.getElementById('oi');
  ci=document.getElementById('fc');
  pcEl=document.getElementById('pc');

  firebase.initializeApp({databaseURL:'https://fantine-vr-default-rtdb.firebaseio.com/'});
  db=firebase.database();

  ba=document.getElementById('bgm');
  ca=document.getElementById('sfx');
  bingo=document.getElementById('bingo');
  if(ba){ba.loop=true;ba.volume=0.3;}
  if(ca){ca.volume=0.5;}
  if(bingo){bingo.volume=0.8;}

  document.getElementById('eb').addEventListener('click',function(){
    go();
  });

  document.getElementById('ni').addEventListener('keypress',function(e){
    if(e.key==='Enter')go();
  });

  var sc=document.querySelector('a-scene');
  sc.addEventListener('enter-vr',function(){isVR=true;});
  sc.addEventListener('exit-vr',function(){isVR=false;});

  buildScene();

  cr=document.getElementById('rig');
  cr.setAttribute('quest-move','');

  setTimeout(function(){
    /* Clickables normales (paneles y reacciones) */
    var items=document.querySelectorAll('.clickable');
    for(var i=0;i<items.length;i++){
      items[i].addEventListener('click',function(){
        var panel=this.getAttribute('data-panel');
        var re=this.getAttribute('data-re');
        var piece=this.getAttribute('data-piece');
        var slot=this.getAttribute('data-slot');

        if(re){
          sendReaction(re);
        } else if(panel){
          openPanel(panel);
        } else if(piece!==null && piece!==undefined){
          selectPiece(parseInt(piece));
        } else if(slot!==null && slot!==undefined){
          placePiece(parseInt(slot));
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

  document.getElementById('login').style.display='none';
  document.getElementById('hud').style.display='block';
  document.getElementById('rbar').style.display='block';

  sr=db.ref('sessions/'+mi);
  sr.set({name:mn,entered:new Date().toISOString(),zone:'Sala de Cine',objects:0,piecesPlaced:0});
  db.ref('online/'+mi).set({name:mn,time:new Date().toISOString()});
  db.ref('online/'+mi).onDisconnect().remove();

  if(ba){
    ba.play().then(function(){ms=true;}).catch(function(){
      document.addEventListener('click',function tryAudio(){
        ba.play().then(function(){ms=true;});
        document.removeEventListener('click',tryAudio);
      });
    });
  }

  updateZone('Sala de Cine');
  startReactionListener();
  startPuzzleListener();
}

/* ═══ ABRIR PANEL ═══ */
function openPanel(id){
  cp();
  dc++;
  if(oi)oi.textContent=dc;
  if(sr)sr.update({objects:dc});

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

  if(ca){ca.currentTime=0;ca.play().catch(function(){});}
}

/* ═══ PANEL 3D EN VR — FIJO EN EL MUNDO ═══ */
function showVRPanel(id){
  if(activeVP){
    try{activeVP.parentNode.removeChild(activeVP);}catch(e){}
    activeVP=null;
  }

  var titles={
    'pantalla':'SALA DE CINE\nAt the End of the Day\nLes Miserables\n\nQue viste en los rostros\nde las obreras?\nQue escuchaste en sus voces?',
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
  var camPos=new THREE.Vector3();
  var camDir=new THREE.Vector3();
  cam.object3D.getWorldPosition(camPos);
  cam.object3D.getWorldDirection(camDir);

  var panelX=camPos.x - camDir.x*2.5;
  var panelY=camPos.y;
  var panelZ=camPos.z - camDir.z*2.5;

  var rotY=Math.atan2(camDir.x,camDir.z)*(180/Math.PI);

  var world=document.getElementById('world');
