
/* =========================================
   ESCENA.JS V2.8 — La Fabrica de Fantine
   INCLUYE: Sala de Cine, Zonas 1-5,
   Rompecabezas Zona 4, GALERIA Zona 2,
   Esferas reaccion, Senaletica, Mapas
   ========================================= */

function buildScene(){
var w=document.getElementById('world');
var s='';

/* ═══ SALA DE CINE (z=-22 a z=-18) ═══ */
s+='<a-plane position="0 0 -26" rotation="-90 0 0" width="8" height="10" color="#1A1A2E"></a-plane>';
s+='<a-box position="0 3 -27" width="8" height="6" depth="0.2" color="#0D0D1A"></a-box>';
s+='<a-plane position="0 2.5 -26.8" width="6" height="3.5" color="#000" class="clickable" data-panel="pantalla"></a-plane>';
s+='<a-box position="-3.2 2.5 -26.5" width="0.3" height="4" depth="0.1" color="#8B0000"></a-box>';
s+='<a-box position="3.2 2.5 -26.5" width="0.3" height="4" depth="0.1" color="#8B0000"></a-box>';
s+='<a-box position="0 4.6 -26.5" width="6.8" height="0.25" depth="0.1" color="#C8A951"></a-box>';
/* Butacas */
for(var row=0;row<3;row++){
  for(var col=0;col<5;col++){
    var bx=-2+(col*1);
    var bz=-23+(row*1.2);
    s+='<a-box position="'+bx+' 0.35 '+bz+'" width="0.6" height="0.7" depth="0.5" color="#4A0E0E" material="emissive:#2A0808;emissiveIntensity:0.2"></a-box>';
  }
}
s+='<a-light type="point" color="#C8A951" intensity="0.3" distance="12" position="0 4 -24"></a-light>';

/* Esferas reaccion — Cine */
s+='<a-sphere position="3.5 1.2 -24" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -24;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="3.5 0.9 -24" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -23" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -23;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="3.5 0.9 -23" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -22" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -22;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="3.5 0.9 -22" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -21" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -21;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="3.5 0.9 -21" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -20" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -20;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="3.5 0.9 -20" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* ═══ PASILLO CINE → ENTRADA (z=-18 a z=-14) ═══ */
s+='<a-plane position="0 0 -16" rotation="-90 0 0" width="4" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-2 1.5 -16" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="2 1.5 -16" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-text value=">>> ENTRADA >>>" position="0 0.1 -16" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.5" distance="8" position="0 2.5 -16"></a-light>';

/* ═══ ZONA 1: ENTRADA (z=-14 a z=-8) ═══ */
s+='<a-plane position="0 0 -11" rotation="-90 0 0" width="8" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-4 1.5 -11" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="4 1.5 -11" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
/* Porton */
s+='<a-box position="0 1.5 -14.8" width="3" height="3" depth="0.3" color="#5C3A1E" class="clickable" data-panel="porton" material="emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="PORTON" position="0 3.2 -14.8" align="center" color="#C8A951" width="4" side="double"></a-text>';
/* Letrero */
s+='<a-plane position="-3.8 2 -12" rotation="0 90 0" width="2" height="1" color="#1A1A2E" class="clickable" data-panel="letrero" material="emissive:#C8A951;emissiveIntensity:0.3"></a-plane>';
s+='<a-text value="FABRIQUE\\nMADELEINE" position="-3.7 2 -12" rotation="0 90 0" align="center" color="#C8A951" width="3" side="double"></a-text>';
/* Cartel */
s+='<a-plane position="3.8 2 -10" rotation="0 -90 0" width="1.5" height="1" color="#FFFDF8" class="clickable" data-panel="cartel" material="emissive:#FF5900;emissiveIntensity:0.2"></a-plane>';
s+='<a-text value="SE BUSCAN\\nOBRERAS" position="3.7 2 -10" rotation="0 -90 0" align="center" color="#FF5900" width="3" side="double"></a-text>';
/* Instrucciones */
s+='<a-plane position="-3.8 1.5 -9" rotation="0 90 0" width="1.5" height="1" color="#1A1A2E" class="clickable" data-panel="instrucciones" material="emissive:#3B82F6;emissiveIntensity:0.3"></a-plane>';
s+='<a-text value="COMO\\nNAVEGAR" position="-3.7 1.5 -9" rotation="0 90 0" align="center" color="#3B82F6" width="2.5" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.6" distance="10" position="0 2.8 -11"></a-light>';

/* Esferas reaccion — Zona 1 */
s+='<a-sphere position="3.5 1.2 -13" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -13;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="3.5 0.9 -13" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -12" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -12;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="3.5 0.9 -12" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -11" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -11;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="3.5 0.9 -11" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -10" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -10;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="3.5 0.9 -10" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 -9" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 -9;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="3.5 0.9 -9" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* Mapa Zona 1 */
s+='<a-plane position="3.8 2.5 -13" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" material="opacity:0.9"></a-plane>';
s+='<a-text value="[CINE]>[AQUI]>[ ]>[ ]>[ ]>[ ]" position="3.7 2.5 -13" rotation="0 -90 0" align="center" color="#FF5900" width="2.5" side="double"></a-text>';

/* Flecha Zona 1 → Zona 2 */
s+='<a-text value=">>> TALLER >>>" position="0 0.1 -8.5" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';

/* ═══ PASILLO ENTRADA → TALLER (z=-8 a z=-4) ═══ */
s+='<a-plane position="0 0 -6" rotation="-90 0 0" width="4" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-2 1.5 -6" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="2 1.5 -6" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-text value=">>> TALLER >>>" position="0 0.1 -6" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.5" distance="8" position="0 2.5 -6"></a-light>';

/* ═══ ZONA 2: TALLER DE LAS OBRERAS (z=-4 a z=4) ═══ */
s+='<a-plane position="0 0 0" rotation="-90 0 0" width="10" height="10" color="#2C1A1A"></a-plane>';
s+='<a-box position="-5 1.5 0" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';
s+='<a-box position="5 1.5 0" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';

/* --- GALERIA: 6 cuadros en pared izquierda --- */
var galeriaImgs=['Galeria1.png','Galeria2.jpg','Galeria3.jpg','Galeria4.png','Galeria5.png','Galeria6.png'];
var galeriaNames=['ABUSO DE PODER','JUICIO SIN\\nCOMPASION','INJUSTICIA\\nSOCIAL','DESESPERACION','DIGNIDAD EN\\nEL SACRIFICIO','GRANDEZA\\nDEL ALMA'];
for(var gi=0;gi<6;gi++){
  var gz=-3+(gi*1.3);
  /* Marco con luz LED */
  s+='<a-box position="-4.85 2 '+gz+'" rotation="0 90 0" width="1.1" height="0.85" depth="0.06" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.6"></a-box>';
  /* Imagen */
  s+='<a-plane id="gimg-'+gi+'" position="-4.8 2 '+gz+'" rotation="0 90 0" width="0.95" height="0.7" src="'+galeriaImgs[gi]+'" class="clickable" data-slot-g="'+gi+'"></a-plane>';
  /* Numero del cuadro */
  s+='<a-text value="'+(gi+1)+'" position="-4.7 1.45 '+gz+'" rotation="0 90 0" align="center" color="#C8A951" width="2" side="double"></a-text>';
  /* Espacio para letrero debajo */
  s+='<a-plane id="gslot-'+gi+'" position="-4.8 1.15 '+gz+'" rotation="0 90 0" width="0.95" height="0.3" color="#1A1A2E" material="opacity:0.5;emissive:#C8A951;emissiveIntensity:0.1"></a-plane>';
  /* Luz LED por cuadro */
  s+='<a-light type="point" color="#C8A951" intensity="0.3" distance="3" position="-4.5 2.6 '+gz+'"></a-light>';
}

/* --- GALERIA: 6 letreros en pared derecha --- */
var conceptos=['ABUSO DE\\nPODER','JUICIO SIN\\nCOMPASION','INJUSTICIA\\nSOCIAL','DESESPERACION','DIGNIDAD EN\\nEL SACRIFICIO','GRANDEZA\\nDEL ALMA'];
var conceptColors=['#EF4444','#7C3AED','#3B82F6','#F59E0B','#22C55E','#C8A951'];
/* Orden mezclado para que no coincidan posicion con cuadro */
var shuffled=[3,5,1,0,4,2];
for(var ci2=0;ci2<6;ci2++){
  var cz=-3+(ci2*1.3);
  var realIdx=shuffled[ci2];
  s+='<a-plane id="glet-'+realIdx+'" position="4.8 2 '+cz+'" rotation="0 -90 0" width="1" height="0.5" color="#1A1A2E" class="clickable" data-piece-g="'+realIdx+'" material="emissive:'+conceptColors[realIdx]+';emissiveIntensity:0.4" animation="property:position;to:4.8 2.08 '+cz+';dir:alternate;dur:2000;loop:true"></a-plane>';
  s+='<a-text value="'+conceptos[realIdx]+'" position="4.7 2 '+cz+'" rotation="0 -90 0" align="center" color="'+conceptColors[realIdx]+'" width="2.2" side="double"></a-text>';
}

/* Titulo galeria */
s+='<a-text value="GALERIA: MISERIA Y GRANDEZA" position="0 2.8 -3.9" align="center" color="#C8A951" width="5" side="double"></a-text>';
s+='<a-text value="Toma un letrero de la derecha\\ny colocalo en la imagen correcta" position="0 2.5 -3.9" align="center" color="#FFE0C2" width="3.5" side="double"></a-text>';

/* Objetos originales Zona 2 */
s+='<a-box position="-3 0.5 1" width="2" height="1" depth="1" color="#5C3A1E" class="clickable" data-panel="carta" material="emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="CARTA" position="-3 1.2 1" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-box position="3 0.5 -1" width="1.5" height="1" depth="1" color="#3D2B2B" class="clickable" data-panel="cuentas" material="emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="CUENTAS" position="3 1.2 -1" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-box position="0 0.4 2" width="1" height="0.8" depth="0.5" color="#4A3728" class="clickable" data-panel="diario" material="emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="DIARIO" position="0 1 2" align="center" color="#C8A951" width="3" side="double"></a-text>';

s+='<a-light type="point" color="#FF5900" intensity="0.6" distance="12" position="0 2.8 0"></a-light>';

/* Esferas reaccion — Zona 2 */
s+='<a-sphere position="4.5 1.2 3" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 3;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="4.5 0.9 3" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 2" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 2;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="4.5 0.9 2" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 1" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 1;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="4.5 0.9 1" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 0" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 0;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="4.5 0.9 0" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 -1" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 -1;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="4.5 0.9 -1" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* Mapa Zona 2 */
s+='<a-plane position="4.8 2.8 3.5" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" material="opacity:0.9"></a-plane>';
s+='<a-text value="[ ]>[AQUI]>[ ]>[ ]>[ ]" position="4.7 2.8 3.5" rotation="0 -90 0" align="center" color="#FF5900" width="2.5" side="double"></a-text>';

/* Flecha Zona 2 → Zona 3 */
s+='<a-text value=">>> OFICINA >>>" position="0 0.1 3.5" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';

/* ═══ PASILLO TALLER → OFICINA (z=4 a z=8) ═══ */
s+='<a-plane position="0 0 6" rotation="-90 0 0" width="4" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-2 1.5 6" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="2 1.5 6" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-text value=">>> OFICINA >>>" position="0 0.1 6" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.5" distance="8" position="0 2.5 6"></a-light>';

/* ═══ ZONA 3: OFICINA DEL PADRE MADELEINE (z=8 a z=16) ═══ */
s+='<a-plane position="0 0 12" rotation="-90 0 0" width="8" height="10" color="#2C1A1A"></a-plane>';
s+='<a-box position="-4 1.5 12" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';
s+='<a-box position="4 1.5 12" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';
s+='<a-box position="0 0.5 14" width="2.5" height="1" depth="1.2" color="#5C3A1E" class="clickable" data-panel="decreto" material="emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
s+='<a-text value="DECRETO" position="0 1.2 14" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-plane position="-3.8 2 12" rotation="0 90 0" width="1.5" height="1.5" color="#3D2B2B" class="clickable" data-panel="espejo" material="emissive:#C8A951;emissiveIntensity:0.3"></a-plane>';
s+='<a-text value="ESPEJO" position="-3.7 2 12" rotation="0 90 0" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-cylinder position="3.5 1 10" radius="0.15" height="1.5" color="#C8A951" class="clickable" data-panel="reloj" material="emissive:#FF5900;emissiveIntensity:0.3"></a-cylinder>';
s+='<a-text value="RELOJ" position="3.5 2 10" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-light type="point" color="#C8A951" intensity="0.6" distance="10" position="0 2.8 12"></a-light>';

/* Esferas reaccion — Zona 3 */
s+='<a-sphere position="3.5 1.2 14" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 14;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="3.5 0.9 14" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 13" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 13;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="3.5 0.9 13" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 12" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 12;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="3.5 0.9 12" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 11" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 11;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="3.5 0.9 11" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 10" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 10;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="3.5 0.9 10" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* Mapa Zona 3 */
s+='<a-plane position="3.8 2.5 14.5" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" material="opacity:0.9"></a-plane>';
s+='<a-text value="[ ]>[ ]>[AQUI]>[ ]>[ ]" position="3.7 2.5 14.5" rotation="0 -90 0" align="center" color="#FF5900" width="2.5" side="double"></a-text>';

/* Flecha Zona 3 → Zona 4 */
s+='<a-text value=">>> PATIO >>>" position="0 0.1 15.5" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';

/* ═══ PASILLO OFICINA → PATIO (z=16 a z=20) ═══ */
s+='<a-plane position="0 0 18" rotation="-90 0 0" width="4" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-2 1.5 18" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="2 1.5 18" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-text value=">>> PATIO >>>" position="0 0.1 18" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.5" distance="8" position="0 2.5 18"></a-light>';

/* ═══ ZONA 4: EL PATIO — ROMPECABEZAS (z=20 a z=28) ═══ */
s+='<a-plane position="0 0 24" rotation="-90 0 0" width="10" height="10" color="#2C1A1A"></a-plane>';
s+='<a-box position="-5 1.5 24" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';
s+='<a-box position="5 1.5 24" width="0.2" height="3" depth="10" color="#3D2B2B"></a-box>';
s+='<a-box position="0 0.5 26" width="1" height="1" depth="0.5" color="#5C3A1E" class="clickable" data-panel="campana" material="emissive:#C8A951;emissiveIntensity:0.3"></a-box>';
s+='<a-text value="CAMPANA" position="0 1.2 26" align="center" color="#C8A951" width="3" side="double"></a-text>';

/* Marco dorado del rompecabezas */
s+='<a-box position="-4.85 2 24" rotation="0 90 0" width="3.2" height="3.2" depth="0.08" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.4"></a-box>';
s+='<a-plane position="-4.8 2 24" rotation="0 90 0" width="3" height="3" color="#1A1A2E"></a-plane>';
s+='<a-text value="ROMPECABEZAS\\nCOLABORATIVO" position="-4.7 3.8 24" rotation="0 90 0" align="center" color="#C8A951" width="3" side="double"></a-text>';

/* 16 slots en el marco */
for(var sr2=0;sr2<4;sr2++){
  for(var sc2=0;sc2<4;sc2++){
    var si=sr2*4+sc2;
    var sy=3.1-(sr2*0.75);
    var sz=22.9+(sc2*0.75);
    s+='<a-plane id="slot-'+si+'" position="-4.78 '+sy+' '+sz+'" rotation="0 90 0" width="0.7" height="0.7" color="#2D1B4E" material="opacity:0.3;emissive:#C8A951;emissiveIntensity:0.1" class="clickable" data-slot="'+si+'"></a-plane>';
  }
}

/* 16 piezas flotantes */
for(var pr=0;pr<4;pr++){
  for(var pc2=0;pc2<4;pc2++){
    var pi=pr*4+pc2;
    var px=4.5;
    var py=1.0+(pr*0.9);
    var pz=20.5+(pc2*1.8);
    var offX=(pi%4)*0.25;
    var offY=Math.floor(pi/4)*0.25;
    s+='<a-plane id="piece-'+pi+'" position="'+px+' '+py+' '+pz+'" rotation="0 90 0" width="0.7" height="0.7" src="Fantine.jpg#offset='+offX+' '+offY+'" material="emissive:#FFF;emissiveIntensity:0.15;repeat:0.25 0.25;offset:'+offX+' '+offY+'" class="clickable" data-piece="'+pi+'" animation="property:position;to:'+px+' '+(py+0.1)+' '+pz+';dir:alternate;dur:2000;loop:true"></a-plane>';
  }
}

s+='<a-light type="point" color="#C8A951" intensity="0.6" distance="12" position="0 2.8 24"></a-light>';

/* Esferas reaccion — Zona 4 */
s+='<a-sphere position="4.5 1.2 27" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 27;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="4.5 0.9 27" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 26" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 26;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="4.5 0.9 26" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 25" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 25;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="4.5 0.9 25" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 24" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 24;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="4.5 0.9 24" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="4.5 1.2 23" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:4.5 1.35 23;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="4.5 0.9 23" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* Mapa Zona 4 */
s+='<a-plane position="4.8 2.5 27.5" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" material="opacity:0.9"></a-plane>';
s+='<a-text value="[ ]>[ ]>[ ]>[AQUI]>[ ]" position="4.7 2.5 27.5" rotation="0 -90 0" align="center" color="#FF5900" width="2.5" side="double"></a-text>';

/* Flecha Zona 4 → Zona 5 */
s+='<a-text value=">>> SALIDA >>>" position="0 0.1 27.5" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';

/* ═══ PASILLO PATIO → SALIDA (z=28 a z=32) ═══ */
s+='<a-plane position="0 0 30" rotation="-90 0 0" width="4" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-2 1.5 30" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="2 1.5 30" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-text value=">>> SALIDA >>>" position="0 0.1 30" rotation="-90 0 0" color="#FFD700" align="center" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#FF5900" intensity="0.5" distance="8" position="0 2.5 30"></a-light>';

/* ═══ ZONA 5: LA PUERTA DE SALIDA (z=32 a z=38) ═══ */
s+='<a-plane position="0 0 35" rotation="-90 0 0" width="8" height="8" color="#2C1A1A"></a-plane>';
s+='<a-box position="-4 1.5 35" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-box position="4 1.5 35" width="0.2" height="3" depth="8" color="#3D2B2B"></a-box>';
s+='<a-plane position="0 2 37" width="3" height="2" color="#1A1A2E" class="clickable" data-panel="muro" material="emissive:#C8A951;emissiveIntensity:0.3"></a-plane>';
s+='<a-text value="MURO\\nCOLABORATIVO" position="0 2 36.9" align="center" color="#C8A951" width="3" side="double"></a-text>';
s+='<a-box position="0 1.5 37.8" width="2" height="3" depth="0.3" color="#5C3A1E" class="clickable" data-panel="puerta" material="emissive:#C8A951;emissiveIntensity:0.3"></a-box>';
s+='<a-text value="SALIDA" position="0 3.2 37.8" align="center" color="#C8A951" width="4" side="double"></a-text>';
s+='<a-light type="point" color="#C8A951" intensity="0.6" distance="10" position="0 2.8 35"></a-light>';

/* Esferas reaccion — Zona 5 */
s+='<a-sphere position="3.5 1.2 35" radius="0.18" color="#FF5900" class="clickable" data-re="wow" material="emissive:#FF5900;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 35;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="WOW" position="3.5 0.9 35" align="center" color="#FF5900" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 34" radius="0.18" color="#3B82F6" class="clickable" data-re="triste" material="emissive:#3B82F6;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 34;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="TRISTE" position="3.5 0.9 34" align="center" color="#3B82F6" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 33" radius="0.18" color="#EF4444" class="clickable" data-re="no" material="emissive:#EF4444;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 33;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="NO!" position="3.5 0.9 33" align="center" color="#EF4444" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 32" radius="0.18" color="#7C3AED" class="clickable" data-re="hmm" material="emissive:#7C3AED;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 32;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="HMM" position="3.5 0.9 32" align="center" color="#7C3AED" width="2" side="double"></a-text>';
s+='<a-sphere position="3.5 1.2 31" radius="0.18" color="#F59E0B" class="clickable" data-re="idea" material="emissive:#F59E0B;emissiveIntensity:0.5" animation="property:position;to:3.5 1.35 31;dir:alternate;dur:1500;loop:true"></a-sphere>';
s+='<a-text value="IDEA" position="3.5 0.9 31" align="center" color="#F59E0B" width="2" side="double"></a-text>';

/* Mapa Zona 5 */
s+='<a-plane position="3.8 2.5 35" rotation="0 -90 0" width="1.2" height="0.8" color="#1A1A2E" material="opacity:0.9"></a-plane>';
s+='<a-text value="[ ]>[ ]>[ ]>[ ]>[AQUI]" position="3.7 2.5 35" rotation="0 -90 0" align="center" color="#FF5900" width="2.5" side="double"></a-text>';

/* ═══ TECHO
