
/* =========================================
   APP.JS V3.1 — La Fabrica de Fantine
   CORREGIDO: Emoticones desaparecen (3s),
   Paneles 3D auto-cierre (6s),
   No se enciman
   ========================================= */

/* ═══ VARIABLES GLOBALES ═══ */
var zi,oi,ci;
var db,mn='',mi='',sr,cr=null,ms=false,dc=0,disc={};
var ba,ca;
var ids=['pantalla','cartel','porton','letrero','instrucciones',
         'carta','cuentas','diario','decreto','espejo',
         'reloj','campana','muro','puerta'];
var titles={
  pantalla:'SALA DE CINE',cartel:'SE BUSCAN OBRERAS',
  porton:'PORTON DE LA FABRICA',letrero:'ZONA 1: ENTRADA',
  instrucciones:'COMO NAVEGAR',carta:'CARTA DE FANTINE',
  cuentas:'LIBRO DE CUENTAS',diario:'JORNADA DE UNA OBRERA',
  decreto:'DECRETO DEL ALCALDE',espejo:'ESPEJO — REFLEXION',
  reloj:'RELOJ — 5:45 AM',campana:'CAMPANA DE INICIO',
  muro:'MURO COLABORATIVO',puerta:'PUERTA DE SALIDA'
};
var contents={
  pantalla:'Observa la escena At the End of the Day.\nFantine busca trabajo en la fabrica.\n¿Que emociones identificas?',
  cartel:'Se buscan obreras para la fabrica.\nSalario: 15 sous por jornada de 16 horas.\nSin prestaciones. Sin descanso.',
  porton:'Bienvenido a la Fabrique Madeleine.\nAqui comienza tu recorrido por la\nhistoria de Fantine.',
  letrero:'ZONA 1: ENTRADA\nObserva los elementos de la entrada.\nCada objeto cuenta una historia.',
  instrucciones:'CONTROLES VR:\nJoystick izq = caminar\nMirar objeto 2 seg = activar\nEsferas de colores = reacciones',
  carta:'Querida Cosette: Trabajo sin descanso\npara enviarte dinero. Los Thenardier\npiden mas cada mes. Tu mama te ama.',
  cuentas:'Ingresos: 15 sous/dia\nRenta: 8 sous | Comida: 4 sous\nThenardier: 10 sous/mes\nDeuda acumulada: 45 francos',
  diario:'5:45 AM — Despertar\n6:00 AM — Caminar a la fabrica\n6:30-22:00 — Jornada laboral\n22:30 — Dormir exhausta',
  decreto:'DECRETO MUNICIPAL\nEl alcalde Madeleine ordena:\nTrato justo a los trabajadores.\nSalario minimo: 20 sous.',
  espejo:'Mirate en este espejo.\n¿Que ves? ¿Una obrera? ¿Una madre?\n¿Que dignidad queda cuando\ntodo te ha sido arrebatado?',
  reloj:'5:45 AM — La campana suena.\nOtra jornada de 16 horas comienza.\n¿Es esto vida o supervivencia?',
  campana:'La campana marca el inicio y el fin.\nPero para Fantine, el sufrimiento\nnunca termina.',
  muro:'Escribe tu reflexion final:\n¿Que aprendiste sobre la dignidad\nhumana en esta experiencia?',
  puerta:'Has completado el recorrido.\nLleva contigo esta reflexion:\nLa dignidad no se pierde,\nse arrebata.'
};
var isVR=false;
var activeVP=null;
var activeVPTimer=null;
var activeEmoji=null;
var activeEmojiTimer=null;
var hoveredEl=null;
var selectedPiece=null;
var selectedGPiece=null;
var puzzleComplete=0;
var galeriaComplete=0;
var sessionId='s'+Date.now();

/* ═══ FIREBASE ═══ */
firebase.initializeApp({databaseURL:'https://fantine-vr-default-rtdb.firebaseio.com/'});
db=firebase.database();

/* ═══ QUEST-MOVE COMPONENT ═══ */
AFRAME.registerComponent('quest-move',{
  tick:function(){
    var s=this.el.sceneEl;
    if(!s.is('vr-mode'))return;
    var session=s.xrSession;
    if(!session||!session.inputSources)return;
    for(var i=0;i<session.inputSources.length;i++){
      var src=session.inputSources[i];
      if(src.gamepad&&src.gamepad.axes.length>=4){
        var ax=src.gamepad.axes[2];
        var ay=src.gamepad.axes[3];
        if(Math.abs(ax)>0.15||Math.abs(ay)>0.15){
          var cam=document.querySelector('[camera]');
          var rot=cam.object3D.rotation;
          var speed=0.04;
          var dx=ax*Math.cos(rot.y)-ay*Math.sin(rot.y);
          var dz=ax*Math.sin(rot.y)+ay*Math.cos(rot.y);
          var rig=document.getElementById('rig');
          var pos=rig.getAttribute('position');
          rig.setAttribute('position',{x:pos.x+dx*speed,y:pos.y,z:pos.z+dz*speed});
        }
      }
    }
  }
});

/* ═══ INICIALIZACION ═══ */
window.addEventListener('DOMContentLoaded',function(){
  zi=document.getElementById('zi');
  oi=document.getElementById('oi');
  ci=document.getElementById('ci');
  ba=document.getElementById('bgm');
  ca=document.getElementById('sfx');

  /* ═══ BOTON ENTRAR ═══ */
  document.getElementById('eb').addEventListener('click',function(){
    mn=document.getElementById('ni').value.trim();
    if(!mn){alert('Escribe tu nombre');return;}
    mi=mn.replace(/\s/g,'_')+'_'+Date.now();
    sr=db.ref('sessions/'+mi);
    sr.set({name:mn,joined:Date.now(),session:sessionId});
    db.ref('online/'+mi).set({name:mn,t:Date.now()});
    db.ref('online/'+mi).onDisconnect().remove();
    document.getElementById('login').style.display='none';
    if(ba){ba.play().catch(function(){});}
    cr=document.getElementById('rig');
  });

  /* ═══ RESET PROFESOR ═══ */
  var rb=document.getElementById('resetBtn');
  if(rb){
    rb.addEventListener('click',function(){
      sessionId='s'+Date.now();
      db.ref('puzzle').remove();
      db.ref('galeria').remove();
      puzzleComplete=0;
      galeriaComplete=0;
      var slots=document.querySelectorAll('[data-slot]');
      slots.forEach(function(sl){
        sl.setAttribute('material','opacity',0.3);
      });
      alert('Grupo reseteado');
    });
  }

  /* ═══ VR MODE DETECTION ═══ */
  var sc=document.querySelector('a-scene');
  sc.addEventListener('enter-vr',function(){isVR=true;});
  sc.addEventListener('exit-vr',function(){isVR=false;});

  /* ═══ FUSE CURSOR — CLICK EN OBJETOS ═══ */
  sc.addEventListener('click',function(e){
    var el=e.target;
    if(!el)return;

    /* Reacciones (esferas) */
    var re=el.getAttribute('data-re');
    if(re){startReaction(re);return;}

    /* Puzzle */
    var piece=el.getAttribute('data-piece');
    if(piece!==null){selectedPiece=parseInt(piece);return;}
    var slot=el.getAttribute('data-slot');
    if(slot!==null&&selectedPiece!==null){placePiece(parseInt(slot));return;}

    /* Galeria */
    var gpiece=el.getAttribute('data-piece-g');
    if(gpiece!==null){selectedGPiece=parseInt(gpiece);return;}
    var gslot=el.getAttribute('data-slot-g');
    if(gslot!==null&&selectedGPiece!==null){placeGPiece(parseInt(gslot));return;}

    /* Paneles informativos */
    var panel=el.getAttribute('data-panel');
    if(panel){openPanel(panel);return;}
  });

  /* ═══ ESCUCHAR REACCIONES DE OTROS ═══ */
  db.ref('reactions').orderByChild('t').startAt(Date.now()).on('child_added',function(snap){
    var d=snap.val();
    if(d.mi!==mi){
      showVREmoji(d.type);
    }
  });

  /* ═══ ESCUCHAR PUZZLE DE OTROS ═══ */
  db.ref('puzzle').on('child_added',function(snap){
    var d=snap.val();
    var sl=document.getElementById('slot-'+d.slot);
    if(sl){
      sl.setAttribute('material','opacity',1.0);
    }
    var pc=document.getElementById('piece-'+d.piece);
    if(pc){pc.setAttribute('visible','false');}
  });

  /* ═══ ESCUCHAR GALERIA DE OTROS ═══ */
  db.ref('galeria').on('child_added',function(snap){
    var d=snap.val();
    var sl=document.getElementById('gslot-'+d.slot);
    if(sl){
      sl.setAttribute('material','opacity',1.0);
    }
    var pc=document.getElementById('glet-'+d.piece);
    if(pc){pc.setAttribute('visible','false');}
  });

  /* ═══ DETECCION DE ZONA ═══ */
  setInterval(function(){
    if(!cr)return;
    var p=cr.getAttribute('position');
    var z=p.z;
    var zona='';
    if(z<-16)zona='Sala de Cine';
    else if(z<-8)zona='Zona 1: Entrada';
    else if(z<4)zona='Zona 2: Taller';
    else if(z<16)zona='Zona 3: Oficina';
    else if(z<28)zona='Zona 4: Patio';
    else zona='Zona 5: Salida';
    if(zi&&zi.textContent!==zona){
      updateZone(zona);
    }
  },2000);
});

/* ═══ ACTUALIZAR ZONA ═══ */
function updateZone(zona){
  if(zi)zi.textContent=zona;
  if(sr)sr.update({zone:zona,t:Date.now()});
}

/* ═══ REACCIONES ═══ */
function startReaction(type){
  /* Limpiar emoji anterior */
  if(activeEmoji){
    activeEmoji.parentNode.removeChild(activeEmoji);
    activeEmoji=null;
  }
  if(activeEmojiTimer){
    clearTimeout(activeEmojiTimer);
    activeEmojiTimer=null;
  }

  var labels={wow:'¡WOW!',triste:'TRISTE',no:'¡NO!',hmm:'HMM...',idea:'¡IDEA!'};
  var colors={wow:'#FF5900',triste:'#3B82F6',no:'#EF4444',hmm:'#7C3AED',idea:'#F59E0B'};

  /* Guardar en Firebase */
  db.ref('reactions').push({type:type,name:mn,mi:mi,t:Date.now(),session:sessionId});
  if(sr)sr.update({lastReaction:type,t:Date.now()});

  /* Sonido */
  if(ca){ca.currentTime=0;ca.play().catch(function(){});}

  /* Mostrar emoji flotante */
  showVREmoji(type);
}

function showVREmoji(type){
  /* Limpiar anterior */
  if(activeEmoji){
    try{activeEmoji.parentNode.removeChild(activeEmoji);}catch(e){}
    activeEmoji=null;
  }
  if(activeEmojiTimer){
    clearTimeout(activeEmojiTimer);
    activeEmojiTimer=null;
  }

  var labels={wow:'WOW!',triste:'TRISTE',no:'NO!',hmm:'HMM...',idea:'IDEA!'};
  var colors={wow:'#FF5900',triste:'#3B82F6',no:'#EF4444',hmm:'#7C3AED',idea:'#F59E0B'};

  var txt=document.createElement('a-text');
  txt.setAttribute('value',labels[type]||type);
  txt.setAttribute('color',colors[type]||'#FFF');
  txt.setAttribute('align','center');
  txt.setAttribute('width','6');
  txt.setAttribute('position','0 0.5 -3');
  txt.setAttribute('animation','property:position;to:0 2.5 -3;dur:3000;easing:easeOutQuad');
  txt.setAttribute('animation__fade','property:material.opacity;from:1;to:0;dur:3000;easing:easeInQuad');

  var cam=document.querySelector('[camera]');
  if(cam){
    cam.appendChild(txt);
    activeEmoji=txt;
    activeEmojiTimer=setTimeout(function(){
      try{txt.parentNode.removeChild(txt);}catch(e){}
      if(activeEmoji===txt)activeEmoji=null;
    },3500);
  }
}

/* ═══ PANELES INFORMATIVOS ═══ */
function openPanel(id){
  if(isVR){
    showVRPanel(id);
  }else{
    /* Modo PC — paneles HTML */
    ids.forEach(function(pid){
      var el=document.getElementById('p-'+pid);
      if(el)el.style.display='none';
    });
    var p=document.getElementById('p-'+id);
    if(p)p.style.display='block';
  }
}

function showVRPanel(id){
  /* Limpiar panel anterior */
  if(activeVP){
    try{activeVP.parentNode.removeChild(activeVP);}catch(e){}
    activeVP=null;
  }
  if(activeVPTimer){
    clearTimeout(activeVPTimer);
    activeVPTimer=null;
  }

  var title=titles[id]||id.toUpperCase();
  var content=contents[id]||'';

  var panel=document.createElement('a-entity');
  panel.setAttribute('position','0 0.3 -2');

  /* Fondo oscuro */
  var bg=document.createElement('a-plane');
  bg.setAttribute('width','2.5');
  bg.setAttribute('height','1.5');
  bg.setAttribute('color','#1A1A2E');
  bg.setAttribute('opacity','0.95');
  panel.appendChild(bg);

  /* Titulo */
  var t=document.createElement('a-text');
  t.setAttribute('value',title);
  t.setAttribute('color','#C8A951');
  t.setAttribute('align','center');
  t.setAttribute('width','3');
  t.setAttribute('position','0 0.5 0.01');
  panel.appendChild(t);

  /* Contenido */
  var c=document.createElement('a-text');
  c.setAttribute('value',content);
  c.setAttribute('color','#FFFDF8');
  c.setAttribute('align','center');
  c.setAttribute('width','2.5');
  c.setAttribute('position','0 0 0.01');
  c.setAttribute('baseline','center');
  panel.appendChild(c);

  /* Instruccion de cierre */
  var x=document.createElement('a-text');
  x.setAttribute('value','[ Se cierra automaticamente ]');
  x.setAttribute('color','#FF5900');
  x.setAttribute('align','center');
  x.setAttribute('width','2');
  x.setAttribute('position','0 -0.55 0.01');
  panel.appendChild(x);

  var cam=document.querySelector('[camera]');
  if(cam){
    cam.appendChild(panel);
    activeVP=panel;

    /* Auto-cierre despues de 6 segundos */
    activeVPTimer=setTimeout(function(){
      try{panel.parentNode.removeChild(panel);}catch(e){}
      if(activeVP===panel)activeVP=null;
    },6000);
  }
}

/* ═══ PUZZLE ═══ */
function placePiece(slotId){
  if(selectedPiece===null)return;
  if(selectedPiece===slotId){
    /* Correcto */
    var sl=document.getElementById('slot-'+slotId);
    if(sl)sl.setAttribute('material','opacity',1.0);
    var pc=document.getElementById('piece-'+selectedPiece);
    if(pc)pc.setAttribute('visible','false');
    db.ref('puzzle/p'+slotId).set({piece:selectedPiece,slot:slotId,by:mn,t:Date.now(),session:sessionId});
    puzzleComplete++;
    if(ca){ca.currentTime=0;ca.play().catch(function(){});}
    if(puzzleComplete>=16){
      /* Puzzle completo — Bingo! */
      var bingo=document.getElementById('bingo');
      if(bingo){bingo.play().catch(function(){});}
      if(ba){ba.pause();}
      showVREmoji('wow');
      db.ref('log').push({event:'puzzle_complete',by:mn,t:Date.now(),session:sessionId});
    }
    selectedPiece=null;
  }else{
    /* Incorrecto */
    selectedPiece=null;
  }
}

/* ═══ GALERIA ═══ */
function placeGPiece(slotId){
  if(selectedGPiece===null)return;
  if(selectedGPiece===slotId){
    /* Correcto */
    var sl=document.getElementById('gslot-'+slotId);
    if(sl)sl.setAttribute('material','opacity',1.0);
    var pc=document.getElementById('glet-'+selectedGPiece);
    if(pc)pc.setAttribute('visible','false');
    db.ref('galeria/g'+slotId).set({piece:selectedGPiece,slot:slotId,by:mn,t:Date.now(),session:sessionId});
    galeriaComplete++;
    if(ca){ca.currentTime=0;ca.play().catch(function(){});}
    if(galeriaComplete>=6){
      /* Galeria completa — Bingo! */
      var bingo=document.getElementById('bingo');
      if(bingo){bingo.play().catch(function(){});}
      if(ba){ba.pause();}
      showVREmoji('wow');
      db.ref('log').push({event:'galeria_complete',by:mn,t:Date.now(),session:sessionId});
    }
    selectedGPiece=null;
  }else{
    /* Incorrecto */
    selectedGPiece=null;
  }
}

