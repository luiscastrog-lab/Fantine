
/* =========================================
   ESCENA.JS V2.5 — La Fabrica de Fantine
   Incluye: Sala de Cine, Zonas 1-5,
   Rompecabezas Colaborativo en Zona 4,
   Señaletica, Esferas de Reaccion
   ========================================= */

function buildScene(){
var w=document.getElementById('world');
var s='';

/* ═══ SALA DE CINE (z: -28 a -18) ═══ */
s+='<a-plane position="0 0 -28" rotation="0 0 0" width="10" height="0.1" color="#1A1A2E"></a-plane>';
s+='<a-box position="0 0 -28" width="10" height="5" depth="0.2" color="#1A1A2E"></a-box>';
s+='<a-plane position="0 2.5 -27.8" width="6" height="3.5" color="#0A0A15" material="emissive:#0A0A15;emissiveIntensity:0.1" class="clickable" data-panel="pantalla"></a-plane>';
s+='<a-box position="-3.2 2.5 -27.7" width="0.3" height="4" depth="0.1" color="#8B0000" material="emissive:#8B0000;emissiveIntensity:0.2"></a-box>';
s+='<a-box position="3.2 2.5 -27.7" width="0.3" height="4" depth="0.1" color="#8B0000" material="emissive:#8B0000;emissiveIntensity:0.2"></a-box>';
s+='<a-box position="0 4.5 -27.7" width="6.7" height="0.3" depth="0.1" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.3"></a-box>';
/* Butacas */
for(var row=0;row<3;row++){
  for(var col=-2;col<=2;col++){
    s+='<a-box position="'+(col*1.2)+' 0.4 '+(-24+row*1.5)+'" width="0.8" height="0.8" depth="0.8" color="#4A1A2E" material="emissive:#4A1A2E;emissiveIntensity:0.1"></a-box>';
  }
}
s+='<a-entity light="type:point;color:#C8A951;intensity:0.3;distance:15" position="0 4 -23"></a-entity>';
/* Piso cine */
s+='<a-plane position="0 0 -23" rotation="-90 0 0" width="10" height="12" color="#1A1A2E"></a-plane>';
/* Paredes cine */
s+='<a-box position="-5 2.5 -23" width="0.2" height="5" depth="12" color="#2C1A1A"></a-box>';
s+='<a-box position="5 2.5 -23" width="0.2" height="5" depth="12" color="#2C1A1A"></a-box>';
/* Techo cine */
s+='<a-plane position="0 5 -23" rotation="90 0 0" width="10" height="12" color="#0A0A15"></a-plane>';

/* ═══ PASILLO CINE → ENTRADA (z: -18 a -14) ═══ */
s+='<a-plane position="0 0 -16" rotation="-90 0 0" width="4" height="4" color="#3D2B1F" material="emissive:#3D2B1F;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-2 2 -16" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-box position="2 2 -16" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-text value="ZONA 1 →" color="#FFD700" align="center" width="3" position="0 2.5 -17.9" side="double"></a-text>';
/* Flecha piso */
s+='<a-triangle vertex-a="0 0.02 -17" vertex-b="-0.3 0.02 -16.5" vertex-c="0.3 0.02 -16.5" color="#FFD700" material="emissive:#FFD700;emissiveIntensity:0.5;side:double"></a-triangle>';

/* ═══ ZONA 1: ENTRADA (z: -14 a -8) ═══ */
s+='<a-plane position="0 0 -11" rotation="-90 0 0" width="8" height="6" color="#5C4033" material="emissive:#5C4033;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-4 2.5 -11" width="0.2" height="5" depth="6" color="#4A3728"></a-box>';
s+='<a-box position="4 2.5 -11" width="0.2" height="5" depth="6" color="#4A3728"></a-box>';
/* Porton */
s+='<a-box position="0 2 -13.8" width="3" height="4" depth="0.3" color="#3D2B1F" class="clickable" data-panel="porton" material="emissive:#C8A951;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="FABRIQUE MADELEINE" color="#C8A951" align="center" width="4" position="0 4.2 -13.7" side="double"></a-text>';
/* Letrero */
s+='<a-plane position="-3.5 2.5 -10" rotation="0 90 0" width="1.5" height="1" color="#2C1A1A" class="clickable" data-panel="letrero" material="emissive:#C8A951;emissiveIntensity:0.2"></a-plane>';
s+='<a-text value="FABRIQUE\nMADELEINE" color="#C8A951" align="center" width="2" position="-3.4 2.5 -10" rotation="0 90 0" side="double"></a-text>';
/* Cartel */
s+='<a-plane position="3.5 2.5 -12" rotation="0 -90 0" width="1.5" height="1" color="#2C1A1A" class="clickable" data-panel="cartel" material="emissive:#C8A951;emissiveIntensity:0.2"></a-plane>';
s+='<a-text value="SE BUSCAN\nOBRERAS" color="#FF5900" align="center" width="2" position="3.4 2.5 -12" rotation="0 -90 0" side="double"></a-text>';
/* Instrucciones */
s+='<a-plane position="3.5 1.5 -10" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" class="clickable" data-panel="instrucciones" material="emissive:#3B82F6;emissiveIntensity:0.2"></a-plane>';
s+='<a-text value="COMO\nNAVEGAR" color="#3B82F6" align="center" width="1.5" position="3.4 1.5 -10" rotation="0 -90 0" side="double"></a-text>';
/* Esferas reaccion Z1 */
s+='<a-sphere position="-3.5 1.8 -13" radius="0.15" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="1.5" position="-3.5 2.1 -13" side="double"></a-text>';
s+='<a-sphere position="-3.5 1.4 -13" radius="0.15" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="1.5" position="-3.5 1.1 -13" side="double"></a-text>';
s+='<a-sphere position="-3.5 0.7 -13" radius="0.15" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 0.3 -13" radius="0.15" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 2.2 -13.5" radius="0.15" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5"></a-sphere>';
/* Flecha Z1→Z2 */
s+='<a-text value="ZONA 2 →" color="#FFD700" align="center" width="3" position="0 2.5 -8.1" side="double"></a-text>';
s+='<a-triangle vertex-a="0 0.02 -8.5" vertex-b="-0.3 0.02 -8" vertex-c="0.3 0.02 -8" color="#FFD700" material="emissive:#FFD700;emissiveIntensity:0.5;side:double"></a-triangle>';

/* ═══ PASILLO ENTRADA → TALLER (z: -8 a -4) ═══ */
s+='<a-plane position="0 0 -6" rotation="-90 0 0" width="4" height="4" color="#3D2B1F" material="emissive:#3D2B1F;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-2 2 -6" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-box position="2 2 -6" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';

/* ═══ ZONA 2: TALLER (z: -4 a 4) ═══ */
s+='<a-plane position="0 0 0" rotation="-90 0 0" width="8" height="8" color="#5C4033" material="emissive:#5C4033;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-4 2.5 0" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
s+='<a-box position="4 2.5 0" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
/* Carta */
s+='<a-plane position="-3.5 2 1" rotation="0 90 0" width="1" height="0.7" color="#FFFDF8" class="clickable" data-panel="carta" material="emissive:#C8A951;emissiveIntensity:0.15"></a-plane>';
s+='<a-text value="CARTA A\nCOSETTE" color="#1A1A2E" align="center" width="1.5" position="-3.4 2 1" rotation="0 90 0" side="double"></a-text>';
/* Cuentas */
s+='<a-plane position="3.5 2 -1" rotation="0 -90 0" width="1.2" height="0.8" color="#2C1A1A" class="clickable" data-panel="cuentas" material="emissive:#FF5900;emissiveIntensity:0.2"></a-plane>';
s+='<a-text value="CUENTAS\nDE FANTINE" color="#FF5900" align="center" width="1.5" position="3.4 2 -1" rotation="0 -90 0" side="double"></a-text>';
/* Diario */
s+='<a-box position="0 1 0" width="0.8" height="0.1" depth="0.6" color="#8B7355" class="clickable" data-panel="diario" material="emissive:#C8A951;emissiveIntensity:0.2"></a-box>';
s+='<a-text value="DIARIO" color="#C8A951" align="center" width="1.5" position="0 1.3 0" side="double"></a-text>';
/* Esferas reaccion Z2 */
s+='<a-sphere position="-3.5 1.8 -2" radius="0.15" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.4 -2" radius="0.15" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.0 -2" radius="0.15" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 0.6 -2" radius="0.15" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 2.2 -2" radius="0.15" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5"></a-sphere>';
/* Flecha Z2→Z3 */
s+='<a-text value="ZONA 3 →" color="#FFD700" align="center" width="3" position="0 2.5 3.9" side="double"></a-text>';
s+='<a-triangle vertex-a="0 0.02 3.5" vertex-b="-0.3 0.02 4" vertex-c="0.3 0.02 4" color="#FFD700" material="emissive:#FFD700;emissiveIntensity:0.5;side:double"></a-triangle>';

/* ═══ PASILLO TALLER → OFICINA (z: 4 a 8) ═══ */
s+='<a-plane position="0 0 6" rotation="-90 0 0" width="4" height="4" color="#3D2B1F" material="emissive:#3D2B1F;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-2 2 6" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-box position="2 2 6" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';

/* ═══ ZONA 3: OFICINA (z: 8 a 16) ═══ */
s+='<a-plane position="0 0 12" rotation="-90 0 0" width="8" height="8" color="#5C4033" material="emissive:#5C4033;emissiveIntensity:0.08"></a-plane>';
s+='<a-box position="-4 2.5 12" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
s+='<a-box position="4 2.5 12" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
/* Decreto */
s+='<a-plane position="0 2.5 8.2" width="2" height="1.5" color="#FFFDF8" class="clickable" data-panel="decreto" material="emissive:#C8A951;emissiveIntensity:0.15"></a-plane>';
s+='<a-text value="DECRETO\nDEL ALCALDE" color="#1A1A2E" align="center" width="2.5" position="0 2.5 8.3" side="double"></a-text>';
/* Espejo */
s+='<a-circle position="-3.5 2.5 12" rotation="0 90 0" radius="0.6" color="#87CEEB" class="clickable" data-panel="espejo" material="emissive:#87CEEB;emissiveIntensity:0.3;metalness:0.8;roughness:0.2"></a-circle>';
s+='<a-text value="ESPEJO" color="#C8A951" align="center" width="1.5" position="-3.4 3.3 12" rotation="0 90 0" side="double"></a-text>';
/* Reloj */
s+='<a-circle position="3.5 3 12" rotation="0 -90 0" radius="0.5" color="#2C1A1A" class="clickable" data-panel="reloj" material="emissive:#C8A951;emissiveIntensity:0.2"></a-circle>';
s+='<a-text value="5:45" color="#C8A951" align="center" width="1.5" position="3.4 3 12" rotation="0 -90 0" side="double"></a-text>';
/* Esferas reaccion Z3 */
s+='<a-sphere position="-3.5 1.8 10" radius="0.15" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.4 10" radius="0.15" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.0 10" radius="0.15" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 0.6 10" radius="0.15" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 2.2 10" radius="0.15" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5"></a-sphere>';
/* Flecha Z3→Z4 */
s+='<a-text value="ZONA 4 →" color="#FFD700" align="center" width="3" position="0 2.5 15.9" side="double"></a-text>';
s+='<a-triangle vertex-a="0 0.02 15.5" vertex-b="-0.3 0.02 16" vertex-c="0.3 0.02 16" color="#FFD700" material="emissive:#FFD700;emissiveIntensity:0.5;side:double"></a-triangle>';

/* ═══ PASILLO OFICINA → PATIO (z: 16 a 20) ═══ */
s+='<a-plane position="0 0 18" rotation="-90 0 0" width="4" height="4" color="#3D2B1F" material="emissive:#3D2B1F;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-2 2 18" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-box position="2 2 18" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';

/* ═══ ZONA 4: PATIO + ROMPECABEZAS (z: 20 a 28) ═══ */
s+='<a-plane position="0 0 24" rotation="-90 0 0" width="10" height="8" color="#6B8E23" material="emissive:#6B8E23;emissiveIntensity:0.08"></a-plane>';
s+='<a-box position="-5 2.5 24" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
s+='<a-box position="5 2.5 24" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
/* Campana */
s+='<a-cone position="3.5 3.5 22" radius-bottom="0.3" radius-top="0.05" height="0.5" color="#C8A951" class="clickable" data-panel="campana" material="emissive:#C8A951;emissiveIntensity:0.3"></a-cone>';
s+='<a-text value="CAMPANA" color="#C8A951" align="center" width="1.5" position="3.5 4.2 22" side="double"></a-text>';

/* --- MARCO DEL ROMPECABEZAS (pared izquierda) --- */
s+='<a-text value="ROMPECABEZAS COLABORATIVO" color="#C8A951" align="center" width="4" position="-4.7 4.3 24" rotation="0 90 0" side="double"></a-text>';
s+='<a-text value="Mira una pieza 2 seg → luego mira su lugar en el marco" color="#FFE0C2" align="center" width="3.5" position="-4.7 0.5 24" rotation="0 90 0" side="double"></a-text>';

/* Marco dorado */
s+='<a-box position="-4.8 2.4 24" rotation="0 90 0" width="3.4" height="3.4" depth="0.05" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.2"></a-box>';
/* Fondo oscuro del marco */
s+='<a-box position="-4.75 2.4 24" rotation="0 90 0" width="3.2" height="3.2" depth="0.06" color="#1A1A2E"></a-box>';

/* 16 SLOTS vacios en el marco (4x4) — cada slot es 0.75 x 0.75 */
var slotSize=0.75;
var startY=0.975; /* fila 0 abajo */
var startZ=22.875; /* col 0 izquierda */
for(var row=0;row<4;row++){
  for(var col=0;col<4;col++){
    var pn=row*4+col;
    var sy=startY+(row*slotSize)+(slotSize/2);
    var sz=startZ+(col*slotSize)+(slotSize/2);
    s+='<a-plane id="slot-'+pn+'" class="clickable" data-slot="'+pn+'" position="-4.7 '+sy+' '+sz+'" rotation="0 90 0" width="'+slotSize+'" height="'+slotSize+'" color="#2C2C4E" material="emissive:#2C2C4E;emissiveIntensity:0.1;side:double" opacity="0.8"></a-plane>';
    s+='<a-text value="'+(pn+1)+'" color="rgba(200,169,81,0.3)" align="center" width="1" position="-4.68 '+sy+' '+sz+'" rotation="0 90 0" side="double"></a-text>';
  }
}

/* 16 PIEZAS flotando desordenadas por el patio */
var piecePositions=[
  {x:2,y:1.5,z:21},{x:-2,y:2,z:22},{x:3,y:1,z:23},{x:-1,y:2.5,z:21.5},
  {x:1,y:1.2,z:25},{x:-3,y:1.8,z:26},{x:2.5,y:2.2,z:27},{x:0,y:1.5,z:22.5},
  {x:-2.5,y:1,z:23.5},{x:3.5,y:2,z:24.5},{x:-1.5,y:2.3,z:25.5},{x:1.5,y:1.7,z:26.5},
  {x:-0.5,y:1.3,z:21.2},{x:2.8,y:2.1,z:22.8},{x:-3.2,y:1.6,z:24.2},{x:0.5,y:2.4,z:27.5}
];
var offsets=[
  [0,0],[0.25,0],[0.5,0],[0.75,0],
  [0,0.25],[0.25,0.25],[0.5,0.25],[0.75,0.25],
  [0,0.5],[0.25,0.5],[0.5,0.5],[0.75,0.5],
  [0,0.75],[0.25,0.75],[0.5,0.75],[0.75,0.75]
];
for(var i=0;i<16;i++){
  var pp=piecePositions[i];
  var ox=offsets[i][0];
  var oy=offsets[i][1];
  s+='<a-plane id="piece-'+i+'" class="clickable" data-piece="'+i+'" ';
  s+='position="'+pp.x+' '+pp.y+' '+pp.z+'" ';
  s+='rotation="0 '+(Math.random()*60-30)+' 0" ';
  s+='width="0.7" height="0.7" ';
  s+='material="src:Fantine.jpg;repeat:0.25 0.25;offset:'+ox+' '+oy+';emissive:#FFF;emissiveIntensity:0.15;side:double" ';
  s+='animation="property:position;to:'+pp.x+' '+(pp.y+0.1)+' '+pp.z+';dir:alternate;dur:2000;loop:true;easing:easeInOutSine">';
  s+='</a-plane>';
}

/* Esferas reaccion Z4 */
s+='<a-sphere position="4.5 1.8 22" radius="0.15" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="4.5 1.4 22" radius="0.15" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="4.5 1.0 22" radius="0.15" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="4.5 0.6 22" radius="0.15" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="4.5 2.2 22" radius="0.15" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5"></a-sphere>';

/* Flecha Z4→Z5 */
s+='<a-text value="ZONA 5 →" color="#FFD700" align="center" width="3" position="0 2.5 27.9" side="double"></a-text>';
s+='<a-triangle vertex-a="0 0.02 27.5" vertex-b="-0.3 0.02 28" vertex-c="0.3 0.02 28" color="#FFD700" material="emissive:#FFD700;emissiveIntensity:0.5;side:double"></a-triangle>';

/* ═══ PASILLO PATIO → SALIDA (z: 28 a 32) ═══ */
s+='<a-plane position="0 0 30" rotation="-90 0 0" width="4" height="4" color="#3D2B1F" material="emissive:#3D2B1F;emissiveIntensity:0.05"></a-plane>';
s+='<a-box position="-2 2 30" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';
s+='<a-box position="2 2 30" width="0.2" height="4" depth="4" color="#4A3728"></a-box>';

/* ═══ ZONA 5: SALIDA (z: 32+) ═══ */
s+='<a-plane position="0 0 36" rotation="-90 0 0" width="8" height="8" color="#5C4033" material="emissive:#5C4033;emissiveIntensity:0.08"></a-plane>';
s+='<a-box position="-4 2.5 36" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
s+='<a-box position="4 2.5 36" width="0.2" height="5" depth="8" color="#4A3728"></a-box>';
/* Muro */
s+='<a-box position="0 2 33" width="3" height="2.5" depth="0.2" color="#4A3728" class="clickable" data-panel="muro" material="emissive:#C8A951;emissiveIntensity:0.1"></a-box>';
s+='<a-text value="MURO\nCOLABORATIVO" color="#C8A951" align="center" width="3" position="0 2 33.2" side="double"></a-text>';
/* Puerta salida */
s+='<a-box position="0 2 39.8" width="3" height="4" depth="0.3" color="#3D2B1F" class="clickable" data-panel="puerta" material="emissive:#C8A951;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="SALIDA" color="#C8A951" align="center" width="3" position="0 4.2 39.7" side="double"></a-text>';
/* Esferas reaccion Z5 */
s+='<a-sphere position="-3.5 1.8 35" radius="0.15" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.4 35" radius="0.15" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 1.0 35" radius="0.15" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 0.6 35" radius="0.15" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5"></a-sphere>';
s+='<a-sphere position="-3.5 2.2 35" radius="0.15" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5"></a-sphere>';

/* ═══ ILUMINACION GENERAL ═══ */
s+='<a-entity light="type:ambient;color:#FFF;intensity:0.6"></a-entity>';
s+='<a-entity light="type:point;color:#C8A951;intensity:0.5;distance:20" position="0 4 -11"></a-entity>';
s+='<a-entity light="type:point;color:#C8A951;intensity:0.5;distance:20" position="0 4 0"></a-entity>';
s+='<a-entity light="type:point;color:#C8A951;intensity:0.5;distance:20" position="0 4 12"></a-entity>';
s+='<a-entity light="type:point;color:#C8A951;intensity:0.5;distance:20" position="0 4 24"></a-entity>';
s+='<a-entity light="type:point;color:#C8A951;intensity:0.5;distance:20" position="0 4 36"></a-entity>';

/* Cielo */
s+='<a-sky color="#0A0A15"></a-sky>';

/* Techo general */
s+='<a-plane position="0 5 12" rotation="90 0 0" width="12" height="70" color="#2C1A1A" material="emissive:#2C1A1A;emissiveIntensity:0.02"></a-plane>';

w.innerHTML=s;
}

