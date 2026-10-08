
/* =========================================
   APP.JS V3.0 — La Fabrica de Fantine
   CORREGIDO: Reset PROF, puzzle offsets,
   Bingo texto temporal, emoji animacion
   ========================================= */

/* ═══ VARIABLES GLOBALES ═══ */
var zi,oi,ci,pcEl,gcEl;
var db,mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
var ba,ca,bingo;
var isVR=false;
var activeVP=null;
var activeEmoji=null;
var selectedPiece=null;
var placedPieces={};
var puzzleComplete=false;
var sessionId='';
var isProf=false;
var selectedLabel=null;
var placedLabels={};
var galeriaComplete=false;
var galeriaCount=0;
var ids=['pantalla','cartel','porton','letrero','instrucciones','carta','cuentas','diario','decreto','espejo','reloj','campana','muro','puerta'];

/* Posiciones aleatorias originales de las piezas (deben coincidir con escena.js V3.0) */
var pzOrigPos=[
{id:2, y:0.91,z:21.22},{id:10,y:0.76,z:22.57},{id:7, y:0.90,z:24.00},
{id:12,y:0.76,z:25.90},{id:13,y:1.66,z:21.11},{id:0, y:1.47,z:22.68},
{id:11,y:1.61,z:24.05},{id:15,y:1.59,z:25.66},{id:5, y:2.53,z:21.11},
{id:9, y:2.32,z:22.49},{id:4, y:2.48,z:23.93},{id:8, y:2.50,z:25.98},
{id:1, y:3.17,z:20.74},{id:6, y:3.32,z:22.64},{id:14,y:3.27,z:24.03},
{id:3, y:3.20,z:26.03}
];

/* ═══ QUEST-MOVE ═══ */
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
          p.x+=(dir.x*ay*speed)+(right.x*ax*speed);
          p.z+=(dir.z*ay*speed)+(right.z*ax*speed);
        }
      }
    }
  }
});

/* ═══ INICIALIZACION ═══ */
window.addEventListener('DOMContentLoaded',function(){

  zi=document.getElementById('zi');
  oi=document.getElementById('oi');
  pcEl=document.getElementById('pc');
  gcEl=document.getElementById('gc');

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
    var items=document.querySelectorAll('.clickable');
    for(var i=0;i<items.length;i++){
      items[i].addEventListener('click',function(){
        var panel=this.getAttribute('data-panel');
        var re=this.getAttribute('data-re');
        var piece=this.getAttribute('data-piece');
        var slot=this.getAttribute('data-slot');
        var pieceG=this.getAttribute('data-piece-g');
        var slotG=this.getAttribute('data-slot-g');

        if(re){
          sendReaction(re);
        } else if(panel){
          openPanel(panel);
        } else if(piece!==null && piece!==undefined){
          selectPiece(parseInt(piece));
        } else if(slot!==null && slot!==undefined){
          placePiece(parseInt(slot));
        } else if(pieceG!==null && pieceG!==undefined){
          selectGaleriaLabel(parseInt(pieceG));
        } else if(slotG!==null && slotG!==undefined){
          placeGaleriaLabel(parseInt(slotG));
        }
      });
    }
  },2000);

});

/* ═══ FUNCION LOGIN ═══ */
function go(){
  var n=document.getElementById('ni').value.trim();
  if(!n){alert('Escribe tu nombre');return;}

  if(n.toUpperCase().indexOf('PROF-')===0){
    isProf=true;
    mn=n.substring(5);
  } else {
    isProf=false;
    mn=n;
  }

  mi=mn.replace(/\s/g,'_')+'_'+Date.now();

  db.ref('currentSession').once('value',function(snap){
    var val=snap.val();
    if(val){
      sessionId=val;
    } else {
      sessionId='sesion_'+Date.now();
      db.ref('currentSession').set(sessionId);
    }

    document.getElementById('login').style.display='none';
    document.getElementById('hud').style.display='block';
    document.getElementById('rbar').style.display='flex';

    if(isProf){
      var resetBtn=document.getElementById('resetBtn');
      if(resetBtn)resetBtn.style.display='inline-block';
    }

    sr=db.ref('data/'+sessionId+'/sessions/'+mi);
    sr.set({name:mn,entered:new Date().toISOString(),zone:'Sala de Cine',objects:0,piecesPlaced:0,galeriaPlaced:0,isProf:isProf});
    db.ref('data/'+sessionId+'/online/'+mi).set({name:mn,time:new Date().toISOString()});
    db.ref('data/'+sessionId+'/online/'+mi).onDisconnect().remove();

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
    startGaleriaListener();

    /* Cargar piezas puzzle ya colocadas */
    db.ref('data/'+sessionId+'/puzzle').once('value',function(psnap){
      var pdata=psnap.val();
      if(!pdata)return;
      for(var key in pdata){
        if(key==='completado')continue;
        var num=parseInt(key.replace('pieza_',''));
        if(isNaN(num))continue;
        if(placedPieces[num])continue;
        placedPieces[num]=true;
        var piece=document.getElementById('piece-'+num);
        var slotEl=document.getElementById('slot-'+num);
        if(piece&&slotEl){
          var slotPos=slotEl.getAttribute('position');
          piece.removeAttribute('animation');
          piece.setAttribute('position',slotPos.x+' '+slotPos.y+' '+(slotPos.z-0.02));
          piece.setAttribute('rotation','0 90 0');
          piece.setAttribute('width','0.75');
          piece.setAttribute('height','0.75');
          piece.classList.remove('clickable');
          piece.removeAttribute('data-piece');
          slotEl.setAttribute('material','opacity','0');
          slotEl.classList.remove('clickable');
        }
      }
      var totalPlaced=Object.keys(placedPieces).length;
      if(pcEl)pcEl.textContent=totalPlaced;
      if(totalPlaced>=16)puzzleComplete=true;
    });

    /* Cargar galeria ya colocada */
    db.ref('data/'+sessionId+'/galeria').once('value',function(gsnap){
      var gdata=gsnap.val();
      if(!gdata)return;
      for(var key in gdata){
        if(key==='completado')continue;
        var num=parseInt(key.replace('concepto_',''));
        if(isNaN(num))continue;
        if(placedLabels[num])continue;
        placedLabels[num]=true;
        galeriaCount++;
        var letrero=document.getElementById('glet-'+num);
        var slotEl2=document.getElementById('gslot-'+num);
        if(letrero){
          letrero.removeAttribute('animation');
          letrero.classList.remove('clickable');
          letrero.removeAttribute('data-piece-g');
          letrero.setAttribute('material','emissiveIntensity','0.1');
        }
        if(slotEl2){
          slotEl2.setAttribute('material','color','#22C55E');
          slotEl2.setAttribute('material','opacity','0.8');
          slotEl2.classList.remove('clickable');
        }
      }
      if(gcEl)gcEl.textContent=galeriaCount;
      if(galeriaCount>=6)galeriaComplete=true;
    });
  });
}

/* ═══ RESET (solo profesor) ═══ */
function resetSession(){
  if(!isProf)return;
  if(!confirm('Reiniciar TODO para el siguiente grupo?\nSe borraran: puzzle, galeria, reacciones y muro.'))return;

  sessionId='sesion_'+Date.now();
  db.ref('currentSession').set(sessionId);

  placedPieces={};
  puzzleComplete=false;
  selectedPiece=null;
  placedLabels={};
  galeriaComplete=false;
  galeriaCount=0;
  selectedLabel=null;
  dc=0;
  if(oi)oi.textContent='0';
  if(pcEl)pcEl.textContent='0';
  if(gcEl)gcEl.textContent='0';

  /* Resetear piezas puzzle a posiciones ALEATORIAS originales */
  for(var i=0;i<pzOrigPos.length;i++){
    var pd=pzOrigPos[i];
    var piece=document.getElementById('piece-'+pd.id);
    var slotEl=document.getElementById('slot-'+pd.id);
    if(piece){
      piece.setAttribute('position','4.5 '+pd.y+' '+pd.z);
      piece.setAttribute('rotation','0 -90 0');
      piece.setAttribute('width','0.7');
      piece.setAttribute('height','0.7');
      piece.setAttribute('data-piece',pd.id.toString());
      piece.classList.add('clickable');
    }
    if(slotEl){
      slotEl.setAttribute('material','opacity','0.3');
      slotEl.classList.add('clickable');
    }
  }

  /* Resetear galeria */
  var conceptColors=['#EF4444','#7C3AED','#3B82F6','#F59E0B','#22C55E','#C8A951'];
  var shuffled=[3,5,1,0,4,2];
  for(var g=0;g<6;g++){
    var realIdx=shuffled[g];
    var letrero=document.getElementById('glet-'+realIdx);
    var slotEl2=document.getElementById('gslot-'+realIdx);
    if(letrero){
      var cz=-3+(g*1.3);
      letrero.setAttribute('position','4.8 2 '+cz);
      letrero.setAttribute('data-piece-g',realIdx.toString());
      letrero.classList.add('clickable');
      letrero.setAttribute('material','emissive',conceptColors[realIdx]);
      letrero.setAttribute('material','emissiveIntensity','0.4');
    }
    if(slotEl2){
      slotEl2.setAttribute('material','color','#1A1A2E');
      slotEl2.setAttribute('material','opacity','0.5');
      slotEl2.classList.add('clickable');
    }
  }

  /* Remover mensajes de celebracion VR que quedaron fijos */
  var oldMsgs=document.querySelectorAll('[data-celebrate]');
  for(var m=0;m<oldMsgs.length;m++){
    try{oldMsgs[m].parentNode.removeChild(oldMsgs[m]);}catch(e){}
  }

  sr=db.ref('data/'+sessionId+'/sessions/'+mi);
  sr.set({name:mn,entered:new Date().toISOString(),zone:zi?zi.textContent:'',objects:0,piecesPlaced:0,galeriaPlaced:0,isProf:true,resetAt:new Date().toISOString()});

  startPuzzleListener();
  startReactionListener();
  startGaleriaListener();

  alert('Sesion reiniciada. El siguiente grupo puede entrar.');
}

/* ═══ ABRIR PANEL ═══ */
function openPanel(id){
  cp();
  dc++;
  if(oi)oi.textContent=dc;
  if(sr)sr.update({objects:dc});

  db.ref('data/'+sessionId+'/activity/'+mi).push({
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

  if(id==='puerta'){
    setTimeout(function(){
      if(isVR){
        var cam=document.querySelector('[camera]');
        var btn=document.createElement('a-text');
        btn.setAttribute('value','HAS COMPLETADO EL RECORRIDO\nGracias por tu reflexion\nQuitate el visor y\ncompleta el Post-test\nen Brightspace');
        btn.setAttribute('color','#C8A951');
        btn.setAttribute('align','center');
        btn.setAttribute('width','4');
        btn.setAttribute('side','double');
        btn.setAttribute('position','0 0 -2');
        cam.appendChild(btn);
        setTimeout(function(){try{btn.parentNode.removeChild(btn);}catch(e){}},15000);
      } else {
        var end=document.createElement('div');
        end.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(26,26,46,0.95);display:flex;align-items:center;justify-content:center;z-index:300;';
        end.innerHTML='<div style="text-align:center;color:#C8A951;font-family:Georgia,serif;"><h1>Has completado el recorrido</h1><p style="color:#FFE0C2;font-size:1.2em;">Gracias por tu reflexion.<br>Ahora completa el <strong>Post-test</strong> en Brightspace.</p><button onclick="this.parentNode.parentNode.remove();" style="margin-top:20px;padding:12px 32px;background:#FF5900;color:#FFFDF8;border:none;border-radius:12px;font-size:16px;cursor:pointer;font-weight:bold;">Cerrar</button></div>';
        document.body.appendChild(end);
      }
      if(ba)ba.pause();
      db.ref('data/'+sessionId+'/sessions/'+mi).update({completed:new Date().toISOString()});
    },2000);
  }
}

/* ═══ PANEL 3D EN VR ═══ */
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

  var panelX=camPos.x + camDir.x*2.5;
  var panelY=camPos.y;
  var panelZ=camPos.z + camDir.z*2.5;

  var rotY=Math.atan2(-camDir.x,-camDir.z)*(180/Math.PI);

  var world=document.getElementById('world');

  var panel=document.createElement('a-entity');
  panel.setAttribute('position',panelX+' '+panelY+' '+panelZ);
  panel.setAttribute('rotation','0 '+rotY+' 0');

  var h='<a-plane width="3" height="2.2" color="#1A1A2E" opacity="0.92" side="double"></a-plane>';
  h+='<a-text value="'+txt+'" color="#C8A951" align="center" width="4" position="0 0.3 0.02" side="double"></a-text>';
  h+='<a-text value="[Mira otro objeto para cerrar]" color="#FF5900" align="center" width="2.5" position="0 -0.9 0.02" side="double"></a-text>';

  panel.innerHTML=h;
  world.appendChild(panel);
  activeVP=panel;

  setTimeout(function(){
    if(activeVP===panel){
      try{panel.parentNode.removeChild(panel);}catch(e){}
      activeVP=null;
    }
  },20000);
}

/* ═══ CERRAR PANEL 2D ═══ */
function cp(){
  var ps=document.querySelectorAll('.ip');
  for(var i=0;i<ps.length;i++){ps[i].style.display='none';}
  var mi2=document.getElementById('mi');
  if(mi2)mi2.style.display='none';
  if(activeVP){
    try{activeVP.parentNode.removeChild(activeVP);}catch(e){}
    activeVP=null;
  }
}

/* ═══ VIDEO ═══ */
function ov(){
  window.open('https://www.youtube.com/watch?v=xOyrZSaeZa0','_blank');
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
  db.ref('data/'+sessionId+'/muro').push({
    name:mn,
    text:t,
    zone:zi?zi.textContent:'',
    time:new Date().toISOString()
  });
  document.getElementById('mt').value='';
  document.getElementById('mi').style.display='none';
  alert('Tu reflexion fue enviada al muro.');
}

/* ═══ GALERIA INTERACTIVA — ZONA 2 ═══ */
function selectGaleriaLabel(num){
  if(galeriaComplete)return;
  if(placedLabels[num])return;

  if(selectedLabel!==null){
    var prev=document.getElementById('glet-'+selectedLabel);
    var conceptColors=['#EF4444','#7C3AED','#3B82F6','#F59E0B','#22C55E','#C8A951'];
    if(prev)prev.setAttribute('material','emissiveIntensity','0.4');
  }

  selectedLabel=num;
  var letrero=document.getElementById('glet-'+num);
  if(letrero){
    letrero.setAttribute('material','emissive','#FF5900');
    letrero.setAttribute('material','emissiveIntensity','0.9');
  }

  if(ca){ca.currentTime=0;ca.play().catch(function(){});}

  var conceptNames=['ABUSO DE PODER','JUICIO SIN COMPASION','INJUSTICIA SOCIAL','DESESPERACION','DIGNIDAD EN EL SACRIFICIO','GRANDEZA DEL ALMA'];

  if(isVR){
    var cam=document.querySelector('[camera]');
    var fb=document.createElement('a-text');
    fb.setAttribute('value',conceptNames[num]+' SELECCIONADO\nMira la imagen correcta');
    fb.setAttribute('color','#FF5900');
    fb.setAttribute('align','center');
    fb.setAttribute('width','4');
    fb.setAttribute('side','double');
    fb.setAttribute('position','0 -0.5 -1.5');
    cam.appendChild(fb);
    setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},3000);
  }
}

function placeGaleriaLabel(slotNum){
  if(galeriaComplete)return;
  if(selectedLabel===null)return;
  if(placedLabels[slotNum])return;

  if(selectedLabel!==slotNum){
    if(isVR){
      var cam=document.querySelector('[camera]');
      var fb=document.createElement('a-text');
      fb.setAttribute('value','NO CORRESPONDE\nIntenta otra imagen');
      fb.setAttribute('color','#EF4444');
      fb.setAttribute('align','center');
      fb.setAttribute('width','4');
      fb.setAttribute('side','double');
      fb.setAttribute('position','0 -0.5 -1.5');
      cam.appendChild(fb);
      setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},2000);
    } else {
      alert('No corresponde. Intenta otra imagen.');
    }

    db.ref('data/'+sessionId+'/galeria_intentos').push({
      name:mn,
      concepto:selectedLabel,
      imagen:slotNum,
      correcto:false,
      time:new Date().toISOString()
    });

    return;
  }

  placedLabels[slotNum]=true;
  galeriaCount++;

  var letrero=document.getElementById('glet-'+selectedLabel);
  var slotEl=document.getElementById('gslot-'+slotNum);

  if(letrero){
    letrero.removeAttribute('animation');
    letrero.classList.remove('clickable');
    letrero.removeAttribute('data-piece-g');
    letrero.setAttribute('material','emissiveIntensity','0.1');
  }

  if(slotEl){
    slotEl.setAttribute('material','color','#22C55E');
    slotEl.setAttribute('material','opacity','0.8');
    slotEl.classList.remove('clickable');
  }

  db.ref('data/'+sessionId+'/galeria/concepto_'+slotNum).set({
    colocadoPor:mn,
    concepto:slotNum,
    tiempo:new Date().toISOString()
  });

  db.ref('data/'+sessionId+'/galeria_intentos').push({
    name:mn,
    concepto:selectedLabel,
    imagen:slotNum,
    correcto:true,
    time:new Date().toISOString()
  });

  if(gcEl)gcEl.textContent=galeriaCount;
  if(sr)sr.update({galeriaPlaced:galeriaCount});

  if(ca){ca.currentTime=0;ca.play().catch(function(){});}

  if(isVR){
    var cam2=document.querySelector('[camera]');
    var fb2=document.createElement('a-text');
    fb2.setAttribute('value','CORRECTO!\n'+galeriaCount+'/6');
    fb2.setAttribute('color','#22C55E');
    fb2.setAttribute('align','center');
    fb2.setAttribute('width','4');
    fb2.setAttribute('side','double');
    fb2.setAttribute('position','0 -0.3 -1.5');
    cam2.appendChild(fb2);
    setTimeout(function(){try{fb2.parentNode.removeChild(fb2);}catch(e){}},2500);
  }

  selectedLabel=null;

  if(galeriaCount>=6){
    galeriaComplete=true;
    celebrateGaleria();
  }
}

function celebrateGaleria(){
  if(ba)ba.pause();
  if(bingo){bingo.currentTime=0;bingo.play().catch(function(){});}
  setTimeout(function(){if(bingo){bingo.pause();bingo.currentTime=0;}if(ba){ba.play().catch(function(){});}},10000);

  db.ref('data/'+sessionId+'/galeria/completado').set({
    tiempo:new Date().toISOString(),
    completadoPor:mn
  });

  if(isVR){
    var world=document.getElementById('world');
    var msg=document.createElement('a-entity');
    msg.setAttribute('position','-4.5 2.8 0');
    msg.setAttribute('rotation','0 90 0');
    msg.setAttribute('data-celebrate','galeria');
    var h='<a-plane width="3.2" height="1.5" color="#1A1A2E" opacity="0.95" side="double"></a-plane>';
    h+='<a-text value="GALERIA COMPLETA!\n\nCada concepto revela\nuna dimension de la\nmiseria y la grandeza\ndel ser humano" color="#C8A951" align="center" width="3.5" position="0 0 0.02" side="double"></a-text>';
    msg.innerHTML=h;
    world.appendChild(msg);
    /* Remover despues de 15 segundos */
    setTimeout(function(){try{msg.parentNode.removeChild(msg);}catch(e){}},15000);
  } else {
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(26,26,46,0.9);display:flex;align-items:center;justify-content:center;z-index:300;flex-direction:column;';
    fb.innerHTML='<div style="text-align:center;color:#C8A951;font-family:Georgia,serif;"><h1 style="font-size:2.5em;">GALERIA COMPLETA!</h1><p style="font-size:1.3em;color:#FFE0C2;max-width:500px;">Cada concepto revela una dimension de la miseria y la grandeza del ser humano.<br><em>La verdadera comprension nace de mirar con el corazon.</em></p><button onclick="this.parentNode.parentNode.remove();" style="margin-top:20px;padding:12px 32px;background:#FF5900;color:#FFFDF8;border:none;border-radius:12px;font-size:16px;cursor:pointer;font-weight:bold;">Continuar</button></div>';
    document.body.appendChild(fb);
  }
}

/* ═══ GALERIA LISTENER (Firebase) ═══ */
function startGaleriaListener(){
  db.ref('data/'+sessionId+'/galeria').on('child_added',function(snap){
    var key=snap.key;
    if(key==='completado')return;
    var data=snap.val();
    if(!data)return;

    var num=parseInt(key.replace('concepto_',''));
    if(isNaN(num))return;
    if(placedLabels[num])return;

    placedLabels[num]=true;
    galeriaCount++;

    var letrero=document.getElementById('glet-'+num);
    var slotEl=document.getElementById('gslot-'+num);

    if(letrero){
      letrero.removeAttribute('animation');
      letrero.classList.remove('clickable');
      letrero.removeAttribute('data-piece-g');
      letrero.setAttribute('material','emissiveIntensity','0.1');
    }

    if(slotEl){
      slotEl.setAttribute('material','color','#22C55E');
      slotEl.setAttribute('material','opacity','0.8');
      slotEl.classList.remove('clickable');
    }

    if(gcEl)gcEl.textContent=galeriaCount;

    if(data.colocadoPor!==mn){
      if(isVR){
        var cam=document.querySelector('[camera]');
        var fb=document.createElement('a-text');
        fb.setAttribute('value',data.colocadoPor+' emparejo un concepto!');
        fb.setAttribute('color','#22C55E');
        fb.setAttribute('align','center');
        fb.setAttribute('width','3');
        fb.setAttribute('side','double');
        fb.setAttribute('position','0 0.5 -2');
        cam.appendChild(fb);
        setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},3000);
      }
    }

    if(galeriaCount>=6&&!galeriaComplete){
      galeriaComplete=true;
      celebrateGaleria();
    }
  });
}

/* ═══ ROMPECABEZAS COLABORATIVO — ZONA 4 ═══ */
function selectPiece(num){
  if(puzzleComplete)return;
  if(placedPieces[num])return;

  if(selectedPiece!==null){
    var prev=document.getElementById('piece-'+selectedPiece);
    if(prev)prev.setAttribute('material','emissive','#FFF');
    if(prev)prev.setAttribute('material','emissiveIntensity','0.15');
  }

  selectedPiece=num;
  var piece=document.getElementById('piece-'+num);
  if(piece){
    piece.setAttribute('material','emissive','#FF5900');
    piece.setAttribute('material','emissiveIntensity','0.8');
  }

  if(ca){ca.currentTime=0;ca.play().catch(function(){});}

  if(isVR){
    var cam=document.querySelector('[camera]');
    var fb=document.createElement('a-text');
    fb.setAttribute('value','PIEZA '+(num+1)+' SELECCIONADA\nMira su lugar en el marco');
    fb.setAttribute('color','#FF5900');
    fb.setAttribute('align','center');
    fb.setAttribute('width','4');
    fb.setAttribute('side','double');
    fb.setAttribute('position','0 -0.5 -1.5');
    cam.appendChild(fb);
    setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},3000);
  }
}

function placePiece(slotNum){
  if(puzzleComplete)return;
  if(selectedPiece===null)return;
  if(placedPieces[slotNum])return;

  if(selectedPiece!==slotNum){
    if(isVR){
      var cam=document.querySelector('[camera]');
      var fb=document.createElement('a-text');
      fb.setAttribute('value','ESE NO ES SU LUGAR\nIntenta otro espacio');
      fb.setAttribute('color','#EF4444');
      fb.setAttribute('align','center');
      fb.setAttribute('width','4');
      fb.setAttribute('side','double');
      fb.setAttribute('position','0 -0.5 -1.5');
      cam.appendChild(fb);
      setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},2000);
    }
    return;
  }

  var piece=document.getElementById('piece-'+selectedPiece);
  var slotEl=document.getElementById('slot-'+slotNum);

  if(piece&&slotEl){
    var slotPos=slotEl.getAttribute('position');
    piece.removeAttribute('animation');
    piece.setAttribute('position',slotPos.x+' '+slotPos.y+' '+(slotPos.z-0.02));
    piece.setAttribute('rotation','0 90 0');
    piece.setAttribute('width','0.75');
    piece.setAttribute('height','0.75');
    piece.classList.remove('clickable');
    piece.removeAttribute('data-piece');
    slotEl.setAttribute('material','opacity','0');
    slotEl.classList.remove('clickable');
  }

  placedPieces[slotNum]=true;
  var totalPlaced=Object.keys(placedPieces).length;

  db.ref('data/'+sessionId+'/puzzle/pieza_'+slotNum).set({
    colocadaPor:mn,
    tiempo:new Date().toISOString(),
    numero:slotNum
  });

  if(pcEl)pcEl.textContent=totalPlaced;
  if(sr)sr.update({piecesPlaced:totalPlaced});

  if(ca){ca.currentTime=0;ca.play().catch(function(){});}

  if(isVR){
    var cam2=document.querySelector('[camera]');
    var fb2=document.createElement('a-text');
    fb2.setAttribute('value','PIEZA '+(slotNum+1)+' COLOCADA!\n'+totalPlaced+'/16');
    fb2.setAttribute('color','#22C55E');
    fb2.setAttribute('align','center');
    fb2.setAttribute('width','4');
    fb2.setAttribute('side','double');
    fb2.setAttribute('position','0 -0.3 -1.5');
    cam2.appendChild(fb2);
    setTimeout(function(){try{fb2.parentNode.removeChild(fb2);}catch(e){}},2500);
  }

  selectedPiece=null;

  if(totalPlaced>=16){
    puzzleComplete=true;
    celebratePuzzle();
  }
}

function celebratePuzzle(){
  if(ba)ba.pause();
  if(bingo){bingo.currentTime=0;bingo.play().catch(function(){});}
  setTimeout(function(){if(bingo){bingo.pause();bingo.currentTime=0;}if(ba){ba.play().catch(function(){});}},10000);

  db.ref('data/'+sessionId+'/puzzle/completado').set({
    tiempo:new Date().toISOString(),
    totalParticipantes:Object.keys(placedPieces).length
  });

  if(isVR){
    var world=document.getElementById('world');
    var msg=document.createElement('a-entity');
    msg.setAttribute('position','-4.5 2.4 24');
    msg.setAttribute('rotation','0 90 0');
    msg.setAttribute('data-celebrate','puzzle');
    var h='<a-plane width="3.2" height="2" color="#1A1A2E" opacity="0.95" side="double"></a-plane>';
    h+='<a-text value="JUNTOS RECONSTRUIMOS\nA FANTINE!\n\nAsi como cada pieza\nfue necesaria\ncada persona importa\n- Victor Hugo" color="#C8A951" align="center" width="3.5" position="0 0 0.02" side="double"></a-text>';
    msg.innerHTML=h;
    world.appendChild(msg);
    /* Remover despues de 15 segundos */
    setTimeout(function(){try{msg.parentNode.removeChild(msg);}catch(e){}},15000);
  } else {
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(26,26,46,0.9);display:flex;align-items:center;justify-content:center;z-index:300;flex-direction:column;';
    fb.innerHTML='<div style="text-align:center;color:#C8A951;font-family:Georgia,serif;"><h1 style="font-size:2.5em;">ROMPECABEZAS COMPLETO!</h1><p style="font-size:1.3em;color:#FFE0C2;max-width:500px;">Juntos reconstruimos la imagen de Fantine.<br>Asi como cada pieza fue necesaria,<br>cada persona importa.<br><em>- Victor Hugo</em></p><button onclick="this.parentNode.parentNode.remove();" style="margin-top:20px;padding:12px 32px;background:#FF5900;color:#FFFDF8;border:none;border-radius:12px;font-size:16px;cursor:pointer;font-weight:bold;">Continuar</button></div>';
    document.body.appendChild(fb);
  }
}

/* ═══ PUZZLE LISTENER (Firebase) ═══ */
function startPuzzleListener(){
  db.ref('data/'+sessionId+'/puzzle').on('child_added',function(snap){
    var key=snap.key;
    if(key==='completado')return;
    var data=snap.val();
    if(!data)return;

    var num=parseInt(key.replace('pieza_',''));
    if(isNaN(num))return;
    if(placedPieces[num])return;

    placedPieces[num]=true;
    var piece=document.getElementById('piece-'+num);
    var slotEl=document.getElementById('slot-'+num);

    if(piece&&slotEl){
      var slotPos=slotEl.getAttribute('position');
      piece.removeAttribute('animation');
      piece.setAttribute('position',slotPos.x+' '+slotPos.y+' '+(slotPos.z-0.02));
      piece.setAttribute('rotation','0 90 0');
      piece.setAttribute('width','0.75');
      piece.setAttribute('height','0.75');
      piece.classList.remove('clickable');
      piece.removeAttribute('data-piece');
      slotEl.setAttribute('material','opacity','0');
      slotEl.classList.remove('clickable');
    }

    var totalPlaced=Object.keys(placedPieces).length;
    if(pcEl)pcEl.textContent=totalPlaced;

    if(data.colocadaPor!==mn){
      if(isVR){
        var cam=document.querySelector('[camera]');
        var fb=document.createElement('a-text');
        fb.setAttribute('value',data.colocadaPor+' coloco pieza '+(num+1)+'!');
        fb.setAttribute('color','#22C55E');
        fb.setAttribute('align','center');
        fb.setAttribute('width','3');
        fb.setAttribute('side','double');
        fb.setAttribute('position','0 0.5 -2');
        cam.appendChild(fb);
        setTimeout(function(){try{fb.parentNode.removeChild(fb);}catch(e){}},3000);
      }
    }

    if(totalPlaced>=16&&!puzzleComplete){
      puzzleComplete=true;
      celebratePuzzle();
    }
  });
}

/* ═══ REACCIONES ═══ */
function sendReaction(type){
  db.ref('data/'+sessionId+'/reactions').push({
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

/* ═══ EMOJI 3D EN VR — CORREGIDO: sube y desaparece ═══ */
function showVREmoji(type){
  /* Limpiar emoji anterior si existe */
  if(activeEmoji){
    try{activeEmoji.parentNode.removeChild(activeEmoji);}catch(e){}
    activeEmoji=null;
  }

  var labels={'wow':'WOW!','triste':'TRISTE','no':'NO!','hmm':'HMM...','idea':'IDEA!'};
  var colors={'wow':'#FF5900','triste':'#3B82F6','no':'#EF4444','hmm':'#7C3AED','idea':'#F59E0B'};
  var cam=document.querySelector('[camera]');
  var txt=document.createElement('a-text');
  txt.setAttribute('value',labels[type]||type);
  txt.setAttribute('color',colors[type]||'#FFF');
  txt.setAttribute('align','center');
  txt.setAttribute('width','5');
  txt.setAttribute('side','double');
  txt.setAttribute('position','0 -0.3 -1.5');
  cam.appendChild(txt);
  activeEmoji=txt;

  /* Animacion: sube de -0.3 a 0.5 en 2.5s y luego se elimina */
  var startY=-0.3;
  var endY=0.5;
  var dur=2500;
  var t0=performance.now();
  var currentTxt=txt;

  function anim(now){
    if(!currentTxt.parentNode)return;
    var p=(now-t0)/dur;
    if(p>=1){
      try{currentTxt.parentNode.removeChild(currentTxt);}catch(e){}
      if(activeEmoji===currentTxt)activeEmoji=null;
      return;
    }
    var y=startY+(endY-startY)*p;
    currentTxt.setAttribute('position','0 '+y+' -1.5');
    requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
}

/* ═══ REACCIONES COMPARTIDAS (Firebase) ═══ */
function startReactionListener(){
  db.ref('data/'+sessionId+'/reactions').orderByChild('time').limitToLast(1).on('child_added',function(snap){
    var data=snap.val();
    if(!data||data.name===mn)return;
    showSharedReaction(data.reaction,data.name);
  });
}

function showSharedReaction(type,name){
  var labels={'wow':'WOW!','triste':'TRISTE','no':'NO!','hmm':'HMM...','idea':'IDEA!'};
  var colors={'wow':'#FF5900','triste':'#3B82F6','no':'#EF4444','hmm':'#7C3AED','idea':'#F59E0B'};

  if(isVR){
    var world=document.getElementById('world');
    var rigPos=cr?cr.object3D.position:{x:0,y:0,z:0};
    var rx=rigPos.x+(Math.random()*4-2);
    var rz=rigPos.z+(Math.random()*4-2);
    var txt=document.createElement('a-text');
    txt.setAttribute('value',(labels[type]||type)+' - '+name);
    txt.setAttribute('color',colors[type]||'#FFF');
    txt.setAttribute('align','center');
    txt.setAttribute('width','3');
    txt.setAttribute('side','double');
    txt.setAttribute('position',rx+' 2.5 '+rz);
    world.appendChild(txt);

    var startY=2.5;
    var endY=4.0;
    var dur=3000;
    var t0=performance.now();
    var currentTxt=txt;

    function anim(now){
      if(!currentTxt.parentNode)return;
      var p=(now-t0)/dur;
      if(p>=1){
        try{currentTxt.parentNode.removeChild(currentTxt);}catch(e){}
        return;
      }
      var y=startY+(endY-startY)*p;
      currentTxt.setAttribute('position',rx+' '+y+' '+rz);
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  } else {
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;top:20%;left:'+(20+Math.random()*60)+'%;font-size:32px;font-weight:bold;color:'+colors[type]+';z-index:999;text-shadow:2px 2px 4px rgba(0,0,0,0.5);pointer-events:none;opacity:0.8;';
    fb.textContent=(labels[type]||type)+' - '+name;
    document.body.appendChild(fb);
    setTimeout(function(){fb.remove();},3000);
  }
}

/* ═══ ACTUALIZAR ZONA ═══ */
function updateZone(name){
  if(zi)zi.textContent=name;
  if(sr)sr.update({zone:name});
  db.ref('data/'+sessionId+'/activity/'+mi).push({
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

