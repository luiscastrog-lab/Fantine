
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

if(id==='puerta'){
  setTimeout(function(){
    if(isVR){
      var cam=document.querySelector('[camera]');
      var btn=document.createElement('a-text');
      btn.setAttribute('value','HAS COMPLETADO EL RECORRIDO

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

/* ═══ VIDEO (solo para modo PC/2D) ═══ */
function ov(){
  var vo=document.getElementById('vo');
  vo.style.display='flex';
  document.getElementById('vf').src='https://www.youtube.com/embed/xOyrZSaeZa0?autoplay=1';
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

/* ═══ ROMPECABEZAS COLABORATIVO ═══ */
function selectPiece(num){
  if(puzzleComplete)return;
  if(placedPieces[num])return;

  /* Deseleccionar pieza anterior */
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

  /* Feedback visual */
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

  /* Solo se puede colocar en el slot correcto */
  if(selectedPiece!==slotNum){
    /* Feedback: slot incorrecto */
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

  /* Colocar pieza correctamente */
  var piece=document.getElementById('piece-'+selectedPiece);
  var slot=document.getElementById('slot-'+slotNum);

  if(piece&&slot){
    /* Obtener posicion del slot */
    var slotPos=slot.getAttribute('position');

    /* Mover pieza al slot */
    piece.removeAttribute('animation');
    piece.setAttribute('position',slotPos.x+' '+slotPos.y+' '+(slotPos.z-0.02));
    piece.setAttribute('rotation','0 90 0');
    piece.setAttribute('width','0.75');
    piece.setAttribute('height','0.75');
    piece.classList.remove('clickable');
    piece.removeAttribute('data-piece');

    /* Ocultar numero del slot */
    slot.setAttribute('material','opacity','0');
    slot.classList.remove('clickable');
  }

  /* Registrar en Firebase */
  placedPieces[slotNum]=true;
  var totalPlaced=Object.keys(placedPieces).length;

  db.ref('puzzle/pieza_'+slotNum).set({
    colocadaPor:mn,
    tiempo:new Date().toISOString(),
    numero:slotNum
  });

  /* Actualizar HUD */
  if(pcEl)pcEl.textContent=totalPlaced;
  if(sr)sr.update({piecesPlaced:totalPlaced});

  /* Feedback: pieza colocada */
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

  /* Verificar si el puzzle esta completo */
  if(totalPlaced>=16){
    puzzleComplete=true;
    celebratePuzzle();
  }
}

function celebratePuzzle(){
  /* Reproducir Bingo.mp3 */
  if(ba){ba.pause();}
   if(bingo){bingo.currentTime=0;bingo.play().catch(function(){});}
setTimeout(function(){if(bingo){bingo.pause();bingo.currentTime=0;}if(ba){ba.play().catch(function(){});}},10000);
  /* Registrar en Firebase */
  db.ref('puzzle/completado').set({
    tiempo:new Date().toISOString(),
    totalParticipantes:Object.keys(placedPieces).length
  });

  /* Mensaje de celebracion */
  if(isVR){
    var world=document.getElementById('world');
    var msg=document.createElement('a-entity');
    msg.setAttribute('position','-4.5 2.4 24');
    msg.setAttribute('rotation','0 90 0');
    var h='<a-plane width="3.2" height="2" color="#1A1A2E" opacity="0.95" side="double"></a-plane>';
    h+='<a-text value="JUNTOS RECONSTRUIMOS\nA FANTINE!\n\nAsi como cada pieza\nfue necesaria\ncada persona importa\n- Victor Hugo" color="#C8A951" align="center" width="3.5" position="0 0 0.02" side="double"></a-text>';
    msg.innerHTML=h;
    world.appendChild(msg);
  } else {
    var fb=document.createElement('div');
    fb.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(26,26,46,0.9);display:flex;align-items:center;justify-content:center;z-index:300;flex-direction:column;';
    fb.innerHTML='<div style="text-align:center;color:#C8A951;font-family:Georgia,serif;"><h1 style="font-size:2.5em;">🧩 ¡ROMPECABEZAS COMPLETO!</h1><p style="font-size:1.3em;color:#FFE0C2;max-width:500px;">Juntos reconstruimos la imagen de Fantine.<br>Así como cada pieza fue necesaria,<br>cada persona importa.<br><em>— Victor Hugo</em></p><button onclick="this.parentNode.parentNode.remove();" style="margin-top:20px;padding:12px 32px;background:#FF5900;color:#FFFDF8;border:none;border-radius:12px;font-size:16px;cursor:pointer;font-weight:bold;">Continuar</button></div>';
    document.body.appendChild(fb);
  }
}

/* ═══ PUZZLE LISTENER (Firebase — ver piezas de otros) ═══ */
function startPuzzleListener(){
  db.ref('puzzle').on('child_added',function(snap){
    var key=snap.key;
    if(key==='completado')return;
    var data=snap.val();
    if(!data)return;

    var num=parseInt(key.replace('pieza_',''));
    if(isNaN(num))return;

    /* Si ya esta colocada localmente, ignorar */
    if(placedPieces[num])return;

    /* Colocar pieza visualmente */
    placedPieces[num]=true;
    var piece=document.getElementById('piece-'+num);
    var slot=document.getElementById('slot-'+num);

    if(piece&&slot){
      var slotPos=slot.getAttribute('position');
      piece.removeAttribute('animation');
      piece.setAttribute('position',slotPos.x+' '+slotPos.y+' '+(slotPos.z-0.02));
      piece.setAttribute('rotation','0 90 0');
      piece.setAttribute('width','0.75');
      piece.setAttribute('height','0.75');
      piece.classList.remove('clickable');
      piece.removeAttribute('data-piece');
      slot.setAttribute('material','opacity','0');
      slot.classList.remove('clickable');
    }

    /* Actualizar HUD */
    var totalPlaced=Object.keys(placedPieces).length;
    if(pcEl)pcEl.textContent=totalPlaced;

    /* Mostrar quien coloco la pieza */
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

    /* Verificar si completo */
    if(totalPlaced>=16&&!puzzleComplete){
      puzzleComplete=true;
      celebratePuzzle();
    }
  });
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

/* ═══ EMOJI 3D EN VR (local — sube flotando) ═══ */
function showVREmoji(type){
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

  requestAnimationFrame(function(){
    var startY=-0.3;
    var endY=0.5;
    var dur=2500;
    var t0=performance.now();
    function anim(now){
      if(!txt.parentNode){return;}
      var p=(now-t0)/dur;
      if(p>=1){
        try{txt.parentNode.removeChild(txt);}catch(e){}
        if(activeEmoji===txt)activeEmoji=null;
        return;
      }
      var y=startY+(endY-startY)*p;
      txt.setAttribute('position','0 '+y+' -1.5');
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);
  });
}

/* ═══ REACCIONES COMPARTIDAS (Firebase) ═══ */
function startReactionListener(){
  db.ref('reactions').orderByChild('time').limitToLast(1).on('child_added',function(snap){
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

    requestAnimationFrame(function(){
      var startY=2.5;
      var endY=4.0;
      var dur=3000;
      var t0=performance.now();
      function anim(now){
        if(!txt.parentNode){return;}
        var p=(now-t0)/dur;
        if(p>=1){
          try{txt.parentNode.removeChild(txt);}catch(e){}
          return;
        }
        var y=startY+(endY-startY)*p;
        txt.setAttribute('position',rx+' '+y+' '+rz);
        requestAnimationFrame(anim);
      }
      requestAnimationFrame(anim);
    });
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


