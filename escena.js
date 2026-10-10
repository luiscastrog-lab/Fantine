
/* =========================================
   ESCENA.JS V3.0 — La Fabrica de Fantine
   PUERTAS ABIERTAS (hueco 3m al centro)
   ========================================= */

function buildScene(){
var w=document.getElementById('world');
var img='https://luiscastrog-lab.github.io/Fantine/';
var s='';

/* ═══ SALA DE CINE (z = -25 a -18) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="10" position="0 0 -21" material="color:#1A1A2E"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="10" position="0 4 -21" material="color:#0D0D1A"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 -26" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 -16" rotation="0 180 0" material="color:#2C1A1A"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 -16" rotation="0 180 0" material="color:#2C1A1A"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 -21" rotation="0 90 0" material="color:#2C1A1A"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 -21" rotation="0 -90 0" material="color:#2C1A1A"></a-plane>';
s+='<a-box width="0.3" height="3.5" depth="0.1" position="-3.2 2 -25.9" material="color:#8B0000"></a-box>';
s+='<a-box width="0.3" height="3.5" depth="0.1" position="3.2 2 -25.9" material="color:#8B0000"></a-box>';
s+='<a-box width="6.8" height="0.4" depth="0.1" position="0 3.8 -25.9" material="color:#8B0000"></a-box>';
s+='<a-box width="5.5" height="3.2" depth="0.05" position="0 2 -25.85" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.2"></a-box>';
s+='<a-plane width="5" height="2.8" position="0 2 -25.8" material="color:#111;emissive:#333;emissiveIntensity:0.3" class="clickable" data-panel="pantalla"></a-plane>';
var asientoZ=[-19,-20,-21,-22,-23];
var asientoX=[-3,-1.5,0,1.5,3];
for(var az=0;az<asientoZ.length;az++){
  for(var ax=0;ax<asientoX.length;ax++){
    s+='<a-box width="0.6" height="0.5" depth="0.6" position="'+asientoX[ax]+' 0.25 '+asientoZ[az]+'" material="color:#4A1A1A;emissive:#8B0000;emissiveIntensity:0.1"></a-box>';
  }
}
s+='<a-light type="point" intensity="0.3" distance="12" position="0 3.5 -21" color="#FFE0C2"></a-light>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -19" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -19"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 1.55 -19"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -19.8" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -19.8"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 1.55 -19.8"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -20.6" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -20.6"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 1.55 -20.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -21.4" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -21.4"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 1.55 -21.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -22.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -22.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 1.55 -22.2"></a-text>';
s+='<a-plane width="1.8" height="1" position="4.9 2.5 -19" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="SALA DE CINE\\nAt the End of the Day\\nObserva y reacciona\\ncon las esferas" color="#C8A951" align="center" width="2.5" position="4.85 2.5 -19" rotation="0 -90 0"></a-text>';

/* ═══ PASILLO CINE → ZONA 1 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 -16" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 -16" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 -16" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 -16" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ ENTRADA" color="#FFD700" align="center" width="3" position="3.8 2 -16" rotation="0 -90 0"></a-text>';
s+='<a-text value="← CINE" color="#FFD700" align="center" width="3" position="-3.8 2 -16" rotation="0 90 0"></a-text>';

/* ═══ ZONA 1: ENTRADA (z = -14 a -8) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="6" position="0 0 -11" material="color:#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="6" position="0 4 -11" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 -14" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 -14" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 -8" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 -8" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="6" height="4" position="-5 2 -11" rotation="0 90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="6" height="4" position="5 2 -11" rotation="0 -90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3" height="0.8" position="0 3.2 -13.95" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.3"></a-plane>';
s+='<a-text value="FABRIQUE MADELEINE" color="#1A1A2E" align="center" width="4" position="0 3.2 -13.9" font="mozillavr"></a-text>';
s+='<a-box width="2" height="2.5" depth="0.15" position="0 1.25 -13.9" material="color:#5C3A1E;emissive:#8B6914;emissiveIntensity:0.3" class="clickable" data-panel="porton"></a-box>';
s+='<a-plane width="1.2" height="0.8" position="-3 2 -13.95" material="color:#FFFDF8;emissive:#FFF;emissiveIntensity:0.2" class="clickable" data-panel="cartel"></a-plane>';
s+='<a-text value="SE BUSCAN\\nOBRERAS" color="#1A1A2E" align="center" width="2" position="-3 2 -13.9"></a-text>';
s+='<a-plane width="1.5" height="0.6" position="3 2.5 -13.95" material="color:#1A1A2E;emissive:#333;emissiveIntensity:0.2" class="clickable" data-panel="letrero"></a-plane>';
s+='<a-text value="ZONA 1:\\nENTRADA" color="#C8A951" align="center" width="2" position="2 2.5 -13.9"></a-text>';
s+='<a-plane width="1.2" height="0.8" position="3 1.2 -13.95" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.2" class="clickable" data-panel="instrucciones"></a-plane>';
s+='<a-text value="COMO\\nNAVEGAR" color="#FFFDF8" align="center" width="2" position="3 1.2 -13.9"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -12" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -12"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 1.55 -12"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -11.2" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -11.2"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 1.55 -11.2"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -10.4" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -10.4"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 1.55 -10.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -9.6" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -9.6"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 1.55 -9.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 -8.8" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 -8.8"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 1.55 -8.8"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 2.5 -11" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: ENTRADA" color="#C8A951" align="center" width="2" position="4.85 2.5 -11" rotation="0 -90 0"></a-text>';
s+='<a-text value="→ TALLER" color="#FFD700" align="center" width="3" position="4.9 1.5 -11" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="10" position="0 3.5 -11" color="#FFE0C2"></a-light>';


/* ═══ PASILLO ZONA 1 → ZONA 2 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 -6" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 -6" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 -6" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 -6" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ TALLER" color="#FFD700" align="center" width="3" position="4.9 2 -6" rotation="0 -90 0"></a-text>';
s+='<a-text value="← ENTRADA" color="#FFD700" align="center" width="3" position="-4.9 2 -6" rotation="0 90 0"></a-text>';

/* ═══ ZONA 2: TALLER (z = -4 a 4) — GALERIA ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 0" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 -4" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 -4" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 4" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 4" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="8" height="4" position="-5 2 0" rotation="0 90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="8" height="4" position="5 2 0" rotation="0 -90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3" height="0.6" position="0 3.5 -3.95" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 2: TALLER DE LAS OBRERAS" color="#C8A951" align="center" width="4" position="0 3.5 -3.9"></a-text>';

var galeriaNames=['ABUSO DE PODER','JUICIO SIN COMPASION','INJUSTICIA SOCIAL','DESESPERACION','DIGNIDAD EN EL SACRIFICIO','GRANDEZA DEL ALMA'];
var galeriaFiles=['Galeria1.png','Galeria2.png','Galeria3.png','Galeria4.jpg','Galeria5.png','Galeria6.png'];
var galeriaColors=['#EF4444','#7C3AED','#3B82F6','#F59E0B','#22C55E','#C8A951'];
for(var gi=0;gi<6;gi++){
  var gz=-3+(gi*1.3);
  s+='<a-plane width="1.15" height="0.95" position="-4.95 2 '+gz+'" rotation="0 90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.2"></a-plane>';
  s+='<a-plane id="gslot-'+gi+'" width="1" height="0.8" position="-4.9 2 '+gz+'" rotation="0 90 0" material="src:'+img+galeriaFiles[gi]+';color:#1A1A2E;opacity:0.5" class="clickable" data-slot-g="'+gi+'"></a-plane>';
}
var shuffled=[3,5,1,0,4,2];
for(var li=0;li<6;li++){
  var realIdx=shuffled[li];
  var lz=-3+(li*1.3);
  s+='<a-box id="glet-'+realIdx+'" width="1" height="0.3" depth="0.05" position="4.8 2 '+lz+'" rotation="0 -90 0" material="color:#1A1A2E;emissive:'+galeriaColors[realIdx]+';emissiveIntensity:0.4" class="clickable" data-piece-g="'+realIdx+'" animation="property:position;dir:alternate;dur:2500;easing:easeInOutSine;loop:true;to:4.8 2.1 '+lz+'"></a-box>';
  s+='<a-text value="'+galeriaNames[realIdx]+'" color="'+galeriaColors[realIdx]+'" align="center" width="2" position="4.75 2 '+lz+'" rotation="0 -90 0"></a-text>';
}

s+='<a-sphere radius="0.12" position="-4.5 1 -3" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -3"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 0.75 -3"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -2.2" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -2.2"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 0.75 -2.2"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -1.4" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -1.4"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 0.75 -1.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -0.6" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -0.6"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 0.75 -0.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 0.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 0.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 0.75 0.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 3.2 0" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: TALLER" color="#C8A951" align="center" width="2" position="4.85 3.2 0" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="12" position="0 3.5 0" color="#FFE0C2"></a-light>';

/* ═══ PASILLO ZONA 2 → ZONA 3 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 6" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 6" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 6" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 6" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ OFICINA" color="#FFD700" align="center" width="3" position="4.9 2 6" rotation="0 -90 0"></a-text>';
s+='<a-text value="← TALLER" color="#FFD700" align="center" width="3" position="-4.9 2 6" rotation="0 90 0"></a-text>';

/* ═══ ZONA 3: OFICINA (z = 8 a 16) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 12" material="color:#4A3728"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 12" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 8" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 8" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 16" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 16" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="-5 2 12" rotation="0 90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="5 2 12" rotation="0 -90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="0.6" position="0 3.5 8.05" rotation="0 180 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 3: OFICINA DEL PADRE MADELEINE" color="#C8A951" align="center" width="4.5" position="0 3.5 8.1" rotation="0 180 0"></a-text>';
s+='<a-box width="2.5" height="0.8" depth="1.2" position="0 0.4 12" material="color:#5C3A1E;emissive:#3D2B1F;emissiveIntensity:0.2"></a-box>';
s+='<a-plane width="0.5" height="0.35" position="-0.5 0.85 12" rotation="-90 0 0" material="color:#FFFDF8;emissive:#FFF;emissiveIntensity:0.3" class="clickable" data-panel="carta"></a-plane>';
s+='<a-text value="CARTA" color="#1A1A2E" align="center" width="1" position="-0.5 0.86 12" rotation="-90 0 0"></a-text>';
s+='<a-box width="0.4" height="0.08" depth="0.3" position="0.5 0.85 12" material="color:#8B0000;emissive:#8B0000;emissiveIntensity:0.3" class="clickable" data-panel="cuentas"></a-box>';
s+='<a-text value="CUENTAS" color="#C8A951" align="center" width="1.5" position="0.5 0.95 12" rotation="-20 0 0"></a-text>';
s+='<a-plane width="0.8" height="1" position="-4.9 2 12" rotation="0 90 0" material="color:#FFFDF8;emissive:#FFF;emissiveIntensity:0.2" class="clickable" data-panel="diario"></a-plane>';
s+='<a-text value="JORNADA\\nDE UNA\\nOBRERA" color="#1A1A2E" align="center" width="1.5" position="-4.85 2 12" rotation="0 90 0"></a-text>';
s+='<a-plane width="1.2" height="0.8" position="4.9 2.5 12" rotation="0 -90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.2" class="clickable" data-panel="decreto"></a-plane>';
s+='<a-text value="DECRETO\\nDEL ALCALDE" color="#1A1A2E" align="center" width="2" position="4.85 2.5 12" rotation="0 -90 0"></a-text>';
s+='<a-circle radius="0.5" position="0 2.5 15.95" material="color:#87CEEB;emissive:#87CEEB;emissiveIntensity:0.3;metalness:0.8;roughness:0.2" class="clickable" data-panel="espejo"></a-circle>';
s+='<a-text value="ESPEJO" color="#C8A951" align="center" width="1.5" position="0 1.8 15.95"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 9" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 9"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 1.55 9"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 9.8" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 9.8"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 1.55 9.8"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 10.6" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 10.6"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 1.55 10.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 11.4" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 11.4"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 1.55 11.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 12.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 12.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 1.55 12.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 1.5 12" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: OFICINA" color="#C8A951" align="center" width="2" position="4.85 1.5 12" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="12" position="0 3.5 12" color="#FFE0C2"></a-light>';


/* ═══ PASILLO ZONA 1 → ZONA 2 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 -6" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 -6" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 -6" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 -6" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ TALLER" color="#FFD700" align="center" width="3" position="4.9 2 -6" rotation="0 -90 0"></a-text>';
s+='<a-text value="← ENTRADA" color="#FFD700" align="center" width="3" position="-4.9 2 -6" rotation="0 90 0"></a-text>';

/* ═══ ZONA 2: TALLER (z = -4 a 4) — GALERIA ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 0" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 -4" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 -4" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 4" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 4" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="8" height="4" position="-5 2 0" rotation="0 90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="8" height="4" position="5 2 0" rotation="0 -90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3" height="0.6" position="0 3.5 -3.95" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 2: TALLER DE LAS OBRERAS" color="#C8A951" align="center" width="4" position="0 3.5 -3.9"></a-text>';

var galeriaNames=['ABUSO DE PODER','JUICIO SIN COMPASION','INJUSTICIA SOCIAL','DESESPERACION','DIGNIDAD EN EL SACRIFICIO','GRANDEZA DEL ALMA'];
var galeriaFiles=['Galeria1.png','Galeria2.png','Galeria3.png','Galeria4.jpg','Galeria5.png','Galeria6.png'];
var galeriaColors=['#EF4444','#7C3AED','#3B82F6','#F59E0B','#22C55E','#C8A951'];
for(var gi=0;gi<6;gi++){
  var gz=-3+(gi*1.3);
  s+='<a-plane width="1.15" height="0.95" position="-4.95 2 '+gz+'" rotation="0 90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.2"></a-plane>';
  s+='<a-plane id="gslot-'+gi+'" width="1" height="0.8" position="-4.9 2 '+gz+'" rotation="0 90 0" material="src:'+img+galeriaFiles[gi]+';color:#1A1A2E;opacity:0.5" class="clickable" data-slot-g="'+gi+'"></a-plane>';
}
var shuffled=[3,5,1,0,4,2];
for(var li=0;li<6;li++){
  var realIdx=shuffled[li];
  var lz=-3+(li*1.3);
  s+='<a-box id="glet-'+realIdx+'" width="1" height="0.3" depth="0.05" position="4.8 2 '+lz+'" rotation="0 -90 0" material="color:#1A1A2E;emissive:'+galeriaColors[realIdx]+';emissiveIntensity:0.4" class="clickable" data-piece-g="'+realIdx+'" animation="property:position;dir:alternate;dur:2500;easing:easeInOutSine;loop:true;to:4.8 2.1 '+lz+'"></a-box>';
  s+='<a-text value="'+galeriaNames[realIdx]+'" color="'+galeriaColors[realIdx]+'" align="center" width="2" position="4.75 2 '+lz+'" rotation="0 -90 0"></a-text>';
}

s+='<a-sphere radius="0.12" position="-4.5 1 -3" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -3"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 0.75 -3"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -2.2" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -2.2"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 0.75 -2.2"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -1.4" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -1.4"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 0.75 -1.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 -0.6" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 -0.6"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 0.75 -0.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1 0.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.15 0.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 0.75 0.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 3.2 0" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: TALLER" color="#C8A951" align="center" width="2" position="4.85 3.2 0" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="12" position="0 3.5 0" color="#FFE0C2"></a-light>';

/* ═══ PASILLO ZONA 2 → ZONA 3 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 6" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 6" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 6" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 6" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ OFICINA" color="#FFD700" align="center" width="3" position="4.9 2 6" rotation="0 -90 0"></a-text>';
s+='<a-text value="← TALLER" color="#FFD700" align="center" width="3" position="-4.9 2 6" rotation="0 90 0"></a-text>';

/* ═══ ZONA 3: OFICINA (z = 8 a 16) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 12" material="color:#4A3728"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 12" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 8" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 8" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 16" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 16" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="-5 2 12" rotation="0 90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="5 2 12" rotation="0 -90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="0.6" position="0 3.5 8.05" rotation="0 180 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 3: OFICINA DEL PADRE MADELEINE" color="#C8A951" align="center" width="4.5" position="0 3.5 8.1" rotation="0 180 0"></a-text>';
s+='<a-box width="2.5" height="0.8" depth="1.2" position="0 0.4 12" material="color:#5C3A1E;emissive:#3D2B1F;emissiveIntensity:0.2"></a-box>';
s+='<a-plane width="0.5" height="0.35" position="-0.5 0.85 12" rotation="-90 0 0" material="color:#FFFDF8;emissive:#FFF;emissiveIntensity:0.3" class="clickable" data-panel="carta"></a-plane>';
s+='<a-text value="CARTA" color="#1A1A2E" align="center" width="1" position="-0.5 0.86 12" rotation="-90 0 0"></a-text>';
s+='<a-box width="0.4" height="0.08" depth="0.3" position="0.5 0.85 12" material="color:#8B0000;emissive:#8B0000;emissiveIntensity:0.3" class="clickable" data-panel="cuentas"></a-box>';
s+='<a-text value="CUENTAS" color="#C8A951" align="center" width="1.5" position="0.5 0.95 12" rotation="-20 0 0"></a-text>';
s+='<a-plane width="0.8" height="1" position="-4.9 2 12" rotation="0 90 0" material="color:#FFFDF8;emissive:#FFF;emissiveIntensity:0.2" class="clickable" data-panel="diario"></a-plane>';
s+='<a-text value="JORNADA\\nDE UNA\\nOBRERA" color="#1A1A2E" align="center" width="1.5" position="-4.85 2 12" rotation="0 90 0"></a-text>';
s+='<a-plane width="1.2" height="0.8" position="4.9 2.5 12" rotation="0 -90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.2" class="clickable" data-panel="decreto"></a-plane>';
s+='<a-text value="DECRETO\\nDEL ALCALDE" color="#1A1A2E" align="center" width="2" position="4.85 2.5 12" rotation="0 -90 0"></a-text>';
s+='<a-circle radius="0.5" position="0 2.5 15.95" material="color:#87CEEB;emissive:#87CEEB;emissiveIntensity:0.3;metalness:0.8;roughness:0.2" class="clickable" data-panel="espejo"></a-circle>';
s+='<a-text value="ESPEJO" color="#C8A951" align="center" width="1.5" position="0 1.8 15.95"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 9" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 9"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 1.55 9"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 9.8" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 9.8"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 1.55 9.8"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 10.6" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 10.6"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 1.55 10.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 11.4" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 11.4"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 1.55 11.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 12.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 12.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 1.55 12.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 1.5 12" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: OFICINA" color="#C8A951" align="center" width="2" position="4.85 1.5 12" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="12" position="0 3.5 12" color="#FFE0C2"></a-light>';

/* ═══ PASILLO ZONA 3 → ZONA 4 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 18" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 18" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 18" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 18" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ PATIO" color="#FFD700" align="center" width="3" position="4.9 2 18" rotation="0 -90 0"></a-text>';
s+='<a-text value="← OFICINA" color="#FFD700" align="center" width="3" position="-4.9 2 18" rotation="0 90 0"></a-text>';


/* ═══ ZONA 4: EL PATIO — ROMPECABEZAS (z = 20 a 28) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 24" material="color:#4A6741"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 5 24" material="color:#1A1A2E;opacity:0.3"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 20" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 20" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 28" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 28" rotation="0 180 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="-5 2 24" rotation="0 90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="8" height="4" position="5 2 24" rotation="0 -90 0" material="color:#5C4033"></a-plane>';
s+='<a-plane width="3" height="0.6" position="0 3.5 20.05" rotation="0 180 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 4: EL PATIO — ROMPECABEZAS" color="#C8A951" align="center" width="4" position="0 3.5 20.1" rotation="0 180 0"></a-text>';
s+='<a-plane width="3.4" height="3.4" position="-4.95 2 23.7" rotation="0 90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.3"></a-plane>';
s+='<a-plane width="3.2" height="3.2" position="-4.9 2 23.7" rotation="0 90 0" material="color:#1A1A2E"></a-plane>';

var slotOffsets=[
  {id:0,x:0.75,y:0.75},{id:1,x:0.00,y:0.75},{id:2,x:0.50,y:0.75},{id:3,x:0.25,y:0.75},
  {id:4,x:0.75,y:0.50},{id:5,x:0.00,y:0.50},{id:6,x:0.50,y:0.50},{id:7,x:0.25,y:0.50},
  {id:8,x:0.75,y:0.25},{id:9,x:0.00,y:0.25},{id:10,x:0.50,y:0.25},{id:11,x:0.25,y:0.25},
  {id:12,x:0.75,y:0.00},{id:13,x:0.00,y:0.00},{id:14,x:0.50,y:0.00},{id:15,x:0.25,y:0.00}
];
for(var si=0;si<16;si++){
  var row=Math.floor(si/4);var col=si%4;
  var sy=3.2-(row*0.8);var sz=22.1+(col*0.8);var so=slotOffsets[si];
  s+='<a-plane id="slot-'+si+'" width="0.75" height="0.75" position="-4.85 '+sy+' '+sz+'" rotation="0 90 0" material="src:'+img+'Fabrica.jpg;repeat:0.25 0.25;offset:'+so.x+' '+so.y+';opacity:0.3;transparent:true" class="clickable" data-slot="'+si+'"></a-plane>';
}

var pzData=[
  {id:2,ox:0.50,oy:0.75,y:0.91,z:21.22},{id:10,ox:0.50,oy:0.25,y:0.76,z:22.57},
  {id:7,ox:0.25,oy:0.50,y:0.90,z:24.00},{id:12,ox:0.75,oy:0.00,y:0.76,z:25.90},
  {id:13,ox:0.00,oy:0.00,y:1.66,z:21.11},{id:0,ox:0.75,oy:0.75,y:1.47,z:22.68},
  {id:11,ox:0.25,oy:0.25,y:1.61,z:24.05},{id:15,ox:0.25,oy:0.00,y:1.59,z:25.66},
  {id:5,ox:0.00,oy:0.50,y:2.53,z:21.11},{id:9,ox:0.00,oy:0.25,y:2.32,z:22.49},
  {id:4,ox:0.75,oy:0.50,y:2.48,z:23.93},{id:8,ox:0.75,oy:0.25,y:2.50,z:25.98},
  {id:1,ox:0.00,oy:0.75,y:3.17,z:20.74},{id:6,ox:0.50,oy:0.50,y:3.32,z:22.64},
  {id:14,ox:0.50,oy:0.00,y:3.27,z:24.03},{id:3,ox:0.25,oy:0.75,y:3.20,z:26.03}
];
for(var pi=0;pi<pzData.length;pi++){
  var pd=pzData[pi];
  s+='<a-plane id="piece-'+pd.id+'" width="0.7" height="0.7" position="4.5 '+pd.y+' '+pd.z+'" rotation="0 -90 0" material="src:'+img+'Fabrica.jpg;repeat:0.25 0.25;offset:'+pd.ox+' '+pd.oy+';emissive:#FFF;emissiveIntensity:0.15" class="clickable" data-piece="'+pd.id+'" animation="property:position;dir:alternate;dur:2500;easing:easeInOutSine;loop:true;to:4.5 '+(pd.y+0.08)+' '+pd.z+'"></a-plane>';
}

s+='<a-sphere radius="0.12" position="-4.5 0.5 21" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 0.65 21"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 0.25 21"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 0.5 21.8" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 0.65 21.8"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 0.25 21.8"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 0.5 22.6" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 0.65 22.6"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 0.25 22.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 0.5 23.4" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 0.65 23.4"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 0.25 23.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 0.5 24.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 0.65 24.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 0.25 24.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 3.5 24" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: PATIO" color="#C8A951" align="center" width="2" position="4.85 3.5 24" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.7" distance="12" position="0 4 24" color="#FFE0C2"></a-light>';

/* ═══ PASILLO ZONA 4 → ZONA 5 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 30" material="color:#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="4" position="0 4 30" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="10" height="4" position="-5 2 30" rotation="0 90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-plane width="10" height="4" position="5 2 30" rotation="0 -90 0" material="color:#3D2B1F"></a-plane>';
s+='<a-text value="→ SALIDA" color="#FFD700" align="center" width="3" position="4.9 2 30" rotation="0 -90 0"></a-text>';
s+='<a-text value="← PATIO" color="#FFD700" align="center" width="3" position="-4.9 2 30" rotation="0 90 0"></a-text>';

/* ═══ ZONA 5: SALIDA (z = 32 a 38) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="6" position="0 0 35" material="color:#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="6" position="0 4 35" material="color:#1A1A2E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-3.25 2 32" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3.5" height="4" position="3.25 2 32" material="color:#4A3728"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 38" rotation="0 180 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="6" height="4" position="-5 2 35" rotation="0 90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="6" height="4" position="5 2 35" rotation="0 -90 0" material="color:#4A3728"></a-plane>';
s+='<a-plane width="3" height="0.6" position="0 3.5 32.05" rotation="0 180 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ZONA 5: LA PUERTA DE SALIDA" color="#C8A951" align="center" width="4" position="0 3.5 32.1" rotation="0 180 0"></a-text>';
s+='<a-circle radius="0.5" position="-4.9 2.5 35" rotation="0 90 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.3" class="clickable" data-panel="reloj"></a-circle>';
s+='<a-text value="5:45 AM" color="#1A1A2E" align="center" width="1.5" position="-4.85 2.5 35" rotation="0 90 0"></a-text>';
s+='<a-cone radius-bottom="0.3" radius-top="0.05" height="0.5" position="4.8 2.5 35" rotation="0 0 0" material="color:#C8A951;emissive:#C8A951;emissiveIntensity:0.3" class="clickable" data-panel="campana"></a-cone>';
s+='<a-text value="CAMPANA" color="#C8A951" align="center" width="1.5" position="4.85 1.9 35" rotation="0 -90 0"></a-text>';
s+='<a-plane width="3" height="2" position="0 2 37.95" material="color:#1A1A2E;emissive:#333;emissiveIntensity:0.15" class="clickable" data-panel="muro"></a-plane>';
s+='<a-text value="MURO COLABORATIVO\\nEscribe tu reflexion" color="#C8A951" align="center" width="3" position="0 2.5 37.9"></a-text>';
s+='<a-box width="2" height="2.5" depth="0.15" position="0 1.25 37.95" material="color:#5C3A1E;emissive:#C8A951;emissiveIntensity:0.2" class="clickable" data-panel="puerta"></a-box>';
s+='<a-text value="SALIDA" color="#C8A951" align="center" width="2" position="0 2.8 37.9"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 33" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.5" class="clickable" data-re="wow" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 33"></a-sphere>';
s+='<a-text value="WOW" color="#FF5900" align="center" width="2" position="-4.5 1.55 33"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 33.8" material="color:#3B82F6;emissive:#3B82F6;emissiveIntensity:0.5" class="clickable" data-re="triste" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 33.8"></a-sphere>';
s+='<a-text value="TRISTE" color="#3B82F6" align="center" width="2" position="-4.5 1.55 33.8"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 34.6" material="color:#EF4444;emissive:#EF4444;emissiveIntensity:0.5" class="clickable" data-re="no" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 34.6"></a-sphere>';
s+='<a-text value="NO!" color="#EF4444" align="center" width="2" position="-4.5 1.55 34.6"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 35.4" material="color:#7C3AED;emissive:#7C3AED;emissiveIntensity:0.5" class="clickable" data-re="hmm" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 35.4"></a-sphere>';
s+='<a-text value="HMM" color="#7C3AED" align="center" width="2" position="-4.5 1.55 35.4"></a-text>';
s+='<a-sphere radius="0.12" position="-4.5 1.8 36.2" material="color:#F59E0B;emissive:#F59E0B;emissiveIntensity:0.5" class="clickable" data-re="idea" animation="property:position;dir:alternate;dur:2000;easing:easeInOutSine;loop:true;to:-4.5 1.95 36.2"></a-sphere>';
s+='<a-text value="IDEA" color="#F59E0B" align="center" width="2" position="-4.5 1.55 36.2"></a-text>';
s+='<a-plane width="1.5" height="1" position="4.9 2.5 35" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE]→[1.ENTRADA]→[2.TALLER]\\n→[3.OFICINA]→[4.PATIO]→[5.SALIDA]\\n\\n★ ESTAS AQUI: SALIDA" color="#C8A951" align="center" width="2" position="4.85 2.5 35" rotation="0 -90 0"></a-text>';
s+='<a-light type="point" intensity="0.6" distance="10" position="0 3.5 35" color="#FFE0C2"></a-light>';

/* ═══ ILUMINACION GLOBAL ═══ */
s+='<a-light type="ambient" intensity="0.4" color="#FFE0C2"></a-light>';
s+='<a-light type="directional" intensity="0.3" position="0 4 0" color="#FFE0C2"></a-light>';

w.innerHTML=s;
}

