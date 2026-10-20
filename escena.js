
/* =========================================
   ESCENA.JS V3.3 — La Fabrica de Fantine
   LIMPIO: Sin secciones duplicadas
   ========================================= */

function buildScene(){
var w=document.getElementById('world');
var img='https://luiscastrog-lab.github.io/Fantine/';
var s='';

/* ═══ SALA DE CINE (z = -25 a -18) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 -21.5" material="color:#1A0A0A"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 -25.5" material="color:#1A0505"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 -17.5" material="color:#1A0505"></a-plane>';
s+='<a-plane width="5" height="4" position="-5 2 -21.5" rotation="0 90 0" material="color:#1A0505"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 -19.75" rotation="0 -90 0" material="color:#1A0505"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 -23.25" rotation="0 -90 0" material="color:#1A0505"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 -21.5" rotation="-90 0 0" material="color:#0D0D0D"></a-plane>';
s+='<a-light type="point" intensity="0.3" color="#FFE0C2" position="0 3.5 -21.5"></a-light>';

/* — Pantalla de cine — */
s+='<a-plane width="6" height="3" position="0 2 -25.3" material="color:#FFFFFF;emissive:#FFFFFF;emissiveIntensity:0.1" class="clickable" data-panel="p-pantalla"></a-plane>';
s+='<a-box width="6.4" height="3.4" depth="0.1" position="0 2 -25.4" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';

/* — Cortinas rojas — */
s+='<a-box width="0.3" height="3.5" depth="0.1" position="-3.3 2 -25.2" material="color:#8B0000;emissive:#FF0000;emissiveIntensity:0.15"></a-box>';
s+='<a-box width="0.3" height="3.5" depth="0.1" position="3.3 2 -25.2" material="color:#8B0000;emissive:#FF0000;emissiveIntensity:0.15"></a-box>';
s+='<a-box width="7" height="0.3" depth="0.1" position="0 3.9 -25.2" material="color:#8B0000;emissive:#FF0000;emissiveIntensity:0.15"></a-box>';

/* — Asientos (cubos) — */
for(var row=0;row<3;row++){
  for(var seat=0;seat<5;seat++){
    var sx=-2+seat*1;
    var sz=-20+row*1.2;
    s+='<a-box width="0.6" height="0.5" depth="0.6" position="'+sx+' 0.25 '+sz+'" material="color:#4A0000;emissive:#8B0000;emissiveIntensity:0.1"></a-box>';
  }
}

/* — Esferas de reaccion CINE — */
s+='<a-sphere radius="0.15" position="-4.5 1.2 -24" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="-4.5 1.5 -24"></a-text>';
s+='<a-sphere radius="0.15" position="-4.5 1.2 -23.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="-4.5 1.5 -23.5"></a-text>';
s+='<a-sphere radius="0.15" position="-4.5 1.2 -23" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="-4.5 1.5 -23"></a-text>';
s+='<a-sphere radius="0.15" position="-4.5 1.2 -22.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="-4.5 1.5 -22.5"></a-text>';
s+='<a-sphere radius="0.15" position="-4.5 1.2 -22" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="-4.5 1.5 -22"></a-text>';

/* — Cartel informativo CINE — */
s+='<a-plane width="1.8" height="1" position="-4.5 2.5 -24" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="REACCIONES\\nToca una esfera\\npara expresar\\ntu emocion" color="#FFFFFF" align="center" width="2.5" position="-4.5 2.5 -23.95"></a-text>';

/* — Mapa CINE — */
s+='<a-plane width="1.5" height="1" position="4.5 2.5 -24" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\n[CINE] > Entrada >\\nTaller > Oficina >\\nPatio > Salida" color="#FFD700" align="center" width="2" position="4.5 2.5 -23.95"></a-text>';

/* ═══ PASILLO CINE → ZONA 1 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 -16" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="4" height="4" position="5 2 -16" rotation="0 -90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="4" height="4" position="-5 2 -16" rotation="0 90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 -16" rotation="-90 0 0" material="color:#1A0A0A"></a-plane>';
s+='<a-light type="point" intensity="0.4" color="#FFE0C2" position="0 3.5 -16"></a-light>';

/* — Flechas y letreros pasillo cine — */
s+='<a-text value=">>> ENTRADA >>>" color="#FFD700" align="center" width="3" position="0 0.1 -16" rotation="-90 0 0"></a-text>';
s+='<a-text value="ENTRADA" color="#FFD700" align="center" width="3" position="4 2 -16" rotation="0 -90 0"></a-text>';

/* ═══ ZONA 1: ENTRADA (z = -14 a -8) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="6" position="0 0 -11" material="color:#4A3728;roughness:0.9"></a-plane>';
s+='<a-plane width="6" height="4" position="0 2 -14" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 -11" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 -11" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 -9.75" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 -9.75" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 -11" rotation="-90 0 0" material="color:#2C1A1A"></a-plane>';
s+='<a-light type="point" intensity="0.5" color="#FFE0C2" position="0 3.5 -11"></a-light>';

/* — Porton con imagen — */
s+='<a-plane width="2" height="2.5" position="0 1.25 -13.9" material="src:'+img+'z1-porton.png;transparent:false" class="clickable" data-panel="p-porton"></a-plane>';
s+='<a-box width="2.2" height="2.7" depth="0.05" position="0 1.25 -13.95" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';

/* — Letrero fabrica con imagen — */
s+='<a-plane width="2.5" height="1" position="0 3.2 -13.9" material="src:'+img+'z1-letrero.png;transparent:false" class="clickable" data-panel="p-cartel"></a-plane>';
s+='<a-box width="2.7" height="1.2" depth="0.05" position="0 3.2 -13.95" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';

/* — Solicitud obreras con imagen — */
s+='<a-plane width="1.5" height="2" position="-4 1.5 -13.9" material="src:'+img+'z1-solicitud.png;transparent:false" class="clickable" data-panel="p-solicitud"></a-plane>';
s+='<a-box width="1.7" height="2.2" depth="0.05" position="-4 1.5 -13.95" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';

/* — Historia fabrica con imagen — */
s+='<a-plane width="1.5" height="2" position="4 1.5 -13.9" material="src:'+img+'z1-historia.png;transparent:false" class="clickable" data-panel="p-historia"></a-plane>';
s+='<a-box width="1.7" height="2.2" depth="0.05" position="4 1.5 -13.95" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';

/* — Logo A Anahuac — */
s+='<a-text value="A" color="#FF5900" align="center" width="8" position="0 2 -11" font="mozillavr"></a-text>';

/* — Esferas de reaccion ZONA 1 — */
s+='<a-sphere radius="0.15" position="4.5 1.2 -9" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="4.5 1.5 -9"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 -9.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="4.5 1.5 -9.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 -10" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="4.5 1.5 -10"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 -10.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="4.5 1.5 -10.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 -11" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="4.5 1.5 -11"></a-text>';

/* — Cartel informativo ZONA 1 — */
s+='<a-plane width="1.8" height="1" position="4.5 2.5 -9" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="REACCIONES\\nToca una esfera\\npara expresar\\ntu emocion" color="#FFFFFF" align="center" width="2.5" position="4.5 2.5 -8.95"></a-text>';

/* — Mapa ZONA 1 — */
s+='<a-plane width="1.5" height="1" position="-4.5 2.5 -9" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\nCine > [ENTRADA] >\\nTaller > Oficina >\\nPatio > Salida" color="#FFD700" align="center" width="2" position="-4.5 2.5 -8.95"></a-text>';

/* ═══ PASILLO ZONA 1 → ZONA 2 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 -6" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="4" height="4" position="5 2 -6" rotation="0 -90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="4" height="4" position="-5 2 -6" rotation="0 90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 -6" rotation="-90 0 0" material="color:#1A0A0A"></a-plane>';
s+='<a-light type="point" intensity="0.4" color="#FFE0C2" position="0 3.5 -6"></a-light>';

/* — Flechas pasillo Z1-Z2 — */
s+='<a-text value=">>> TALLER >>>" color="#FFD700" align="center" width="3" position="0 0.1 -6" rotation="-90 0 0"></a-text>';
s+='<a-text value="TALLER" color="#FFD700" align="center" width="3" position="4 2 -6" rotation="0 -90 0"></a-text>';

/* ═══ FIN BLOQUE 1 — CONTINUA EN BLOQUE 2 ═══ */


/* ═══ BLOQUE 2 — CONTINUA DESDE BLOQUE 1 ═══ */

/* ═══ ZONA 2: TALLER (z = -4 a 4) — GALERIA ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 0" material="color:#3E2723;roughness:0.9"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 -2" rotation="0 90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 -2" rotation="0 -90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 2" rotation="0 90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 2" rotation="0 -90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 0" rotation="-90 0 0" material="color:#2C1A1A"></a-plane>';
s+='<a-light type="point" intensity="0.5" color="#FFE0C2" position="0 3.5 0"></a-light>';

/* — Galeria: 6 imagenes en pared izquierda con marcos LED — */
var galeriaNames=['ABUSO DE PODER','JUICIO SIN COMPASION','INJUSTICIA SOCIAL','DESESPERACION','DIGNIDAD EN EL SACRIFICIO','GRANDEZA DEL ALMA'];
var galeriaFiles=['Galeria1.png','Galeria2.jpg','Galeria3.jpg','Galeria4.jpg','Galeria5.png','Galeria6.png'];
for(var gi=0;gi<6;gi++){
  var gz=-3+gi*1.2;
  s+='<a-plane width="1" height="0.8" position="-4.85 2 '+gz+'" rotation="0 90 0" material="src:'+img+galeriaFiles[gi]+';transparent:false"></a-plane>';
  s+='<a-box width="0.05" height="0.9" depth="1.1" position="-4.9 2 '+gz+'" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.3"></a-box>';
  s+='<a-text value="'+galeriaNames[gi]+'" color="#FFD700" align="center" width="1.5" position="-4.85 1.4 '+gz+'" rotation="0 90 0"></a-text>';
  s+='<a-plane width="1" height="0.8" position="-4.8 2 '+gz+'" rotation="0 90 0" material="color:transparent;opacity:0" class="clickable" data-slot-g="'+gi+'"></a-plane>';
}

/* — Letreros de conceptos flotantes al centro — */
var shuffled=[3,5,1,0,4,2];
for(var li=0;li<6;li++){
  var ci=shuffled[li];
  var lx=-1.5+li*0.6;
  s+='<a-box width="0.5" height="0.5" depth="0.5" position="'+lx+' 1.5 0" material="color:#FF5900;emissive:#FF5900;emissiveIntensity:0.3" class="clickable" data-piece-g="'+ci+'"></a-box>';
  s+='<a-text value="'+(ci+1)+'" color="#FFFFFF" align="center" width="2" position="'+lx+' 1.5 0.26"></a-text>';
}

/* — Cartel instrucciones galeria — */
s+='<a-plane width="2" height="1.2" position="4.85 2.5 0" rotation="0 -90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="GALERIA\\n1.Toca un cubo naranja\\n2.Luego toca la imagen\\nque corresponda\\nal concepto" color="#FFFFFF" align="center" width="2.5" position="4.8 2.5 0" rotation="0 -90 0"></a-text>';

/* — Esferas de reaccion ZONA 2 — */
s+='<a-sphere radius="0.15" position="4.5 1.2 3" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="4.5 1.5 3"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 2.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="4.5 1.5 2.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 2" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="4.5 1.5 2"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 1.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="4.5 1.5 1.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 1" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="4.5 1.5 1"></a-text>';

/* — Mapa ZONA 2 — */
s+='<a-plane width="1.5" height="1" position="-4.85 2.5 3" rotation="0 90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\nCine > Entrada >\\n[TALLER] > Oficina >\\nPatio > Salida" color="#FFD700" align="center" width="2" position="-4.8 2.5 3" rotation="0 90 0"></a-text>';

/* ═══ PASILLO ZONA 2 → ZONA 3 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 6" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="4" height="4" position="5 2 6" rotation="0 -90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="4" height="4" position="-5 2 6" rotation="0 90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 6" rotation="-90 0 0" material="color:#1A0A0A"></a-plane>';
s+='<a-light type="point" intensity="0.4" color="#FFE0C2" position="0 3.5 6"></a-light>';

/* — Flechas pasillo Z2-Z3 — */
s+='<a-text value=">>> OFICINA >>>" color="#FFD700" align="center" width="3" position="0 0.1 6" rotation="-90 0 0"></a-text>';
s+='<a-text value="OFICINA" color="#FFD700" align="center" width="3" position="4 2 6" rotation="0 -90 0"></a-text>';

/* ═══ ZONA 3: OFICINA (z = 8 a 16) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 12" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 10" rotation="0 90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 10" rotation="0 -90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 14" rotation="0 90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 14" rotation="0 -90 0" material="color:#4E342E"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 12" rotation="-90 0 0" material="color:#2C1A1A"></a-plane>';
s+='<a-light type="point" intensity="0.5" color="#FFE0C2" position="0 3.5 12"></a-light>';

/* — Escritorio — */
s+='<a-box width="2" height="0.8" depth="1" position="0 0.4 14" material="color:#5D4037;emissive:#8D6E63;emissiveIntensity:0.1"></a-box>';

/* — Decreto con imagen — */
s+='<a-plane width="1.2" height="1.5" position="0 1.5 15.8" material="color:#F5E6D0;emissive:#FFE0C2;emissiveIntensity:0.2" class="clickable" data-panel="p-decreto"></a-plane>';

/* — Silla — */
s+='<a-box width="0.8" height="1.2" depth="0.8" position="0 0.6 15" material="color:#3E2723;emissive:#5D4037;emissiveIntensity:0.1"></a-box>';

/* — Balanza — */
s+='<a-cone radius-bottom="0.3" height="0.6" position="-3 1 12" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.3" class="clickable" data-panel="p-balanza"></a-cone>';

/* — Libro — */
s+='<a-box width="0.6" height="0.1" depth="0.4" position="3 0.85 14" material="color:#8B0000;emissive:#FF0000;emissiveIntensity:0.2" class="clickable" data-panel="p-libro"></a-box>';

/* — Esferas de reaccion ZONA 3 — */
s+='<a-sphere radius="0.15" position="4.5 1.2 15" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="4.5 1.5 15"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 14.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="4.5 1.5 14.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 14" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="4.5 1.5 14"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 13.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="4.5 1.5 13.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 13" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="4.5 1.5 13"></a-text>';

/* — Mapa ZONA 3 — */
s+='<a-plane width="1.5" height="1" position="-4.85 2.5 15" rotation="0 90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\nCine > Entrada >\\nTaller > [OFICINA] >\\nPatio > Salida" color="#FFD700" align="center" width="2" position="-4.8 2.5 15" rotation="0 90 0"></a-text>';

/* ═══ PASILLO ZONA 3 → ZONA 4 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 18" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="4" height="4" position="5 2 18" rotation="0 -90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="4" height="4" position="-5 2 18" rotation="0 90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 18" rotation="-90 0 0" material="color:#1A0A0A"></a-plane>';
s+='<a-light type="point" intensity="0.4" color="#FFE0C2" position="0 3.5 18"></a-light>';

/* — Flechas pasillo Z3-Z4 — */
s+='<a-text value=">>> PATIO >>>" color="#FFD700" align="center" width="3" position="0 0.1 18" rotation="-90 0 0"></a-text>';
s+='<a-text value="PATIO" color="#FFD700" align="center" width="3" position="4 2 18" rotation="0 -90 0"></a-text>';

/* ═══ FIN BLOQUE 2 — CONTINUA EN BLOQUE 3 ═══ */


/* ═══ BLOQUE 3 — CONTINUA DESDE BLOQUE 2 ═══ */

/* ═══ ZONA 4: EL PATIO — ROMPECABEZAS COLABORATIVO (z = 20 a 28) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 24" material="color:#4A6741;roughness:0.9"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 22" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 22" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 26" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 26" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 28" material="color:#5D4037"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 24" rotation="-90 0 0" material="color:#2C1A1A"></a-plane>';
s+='<a-light type="point" intensity="0.5" color="#FFE0C2" position="0 3.5 24"></a-light>';

/* — Marco dorado para el rompecabezas (pared izquierda) — */
s+='<a-box width="0.05" height="3.2" depth="3.2" position="-4.95 2 24" material="color:#8B7500;emissive:#FFD700;emissiveIntensity:0.4"></a-box>';

/* — 16 SLOTS del rompecabezas (pared izquierda 4x4) — */
var pzImg=img+'Fabrica.jpg';
for(var pr=0;pr<4;pr++){
  for(var pc=0;pc<4;pc++){
    var pid=pr*4+pc;
    var py=3.2-pr*0.75;
    var pz=22.8+pc*0.75;
    var ox=(pc*0.25);
    var oy=(1-(pr+1)*0.25);
    s+='<a-plane width="0.7" height="0.7" position="-4.88 '+py+' '+pz+'" rotation="0 90 0" material="color:#2C1A1A;opacity:0.5" class="clickable" data-slot="'+pid+'" data-ox="'+ox+'" data-oy="'+oy+'"></a-plane>';
  }
}

/* — 16 PIEZAS del rompecabezas (pared derecha, desordenadas) — */
var pzOrder=[12,3,7,0,15,8,4,11,2,14,5,9,1,13,6,10];
for(var pi=0;pi<16;pi++){
  var origId=pzOrder[pi];
  var prow=Math.floor(pi/4);
  var pcol=pi%4;
  var ppx=4.88;
  var ppy=3.2-prow*0.75;
  var ppz=22.8+pcol*0.75;
  var origRow=Math.floor(origId/4);
  var origCol=origId%4;
  var pox=(origCol*0.25);
  var poy=(1-(origRow+1)*0.25);
  s+='<a-plane width="0.65" height="0.65" position="'+ppx+' '+ppy+' '+ppz+'" rotation="0 -90 0" material="src:'+pzImg+';repeat:0.25 0.25;offset:'+pox+' '+poy+'" class="clickable" data-piece="'+origId+'" data-ox="'+pox+'" data-oy="'+poy+'"></a-plane>';
}

/* — Cartel instrucciones puzzle — */
s+='<a-plane width="2" height="1.2" position="0 3 27.9" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="ROMPECABEZAS\\n1.Toca una pieza (derecha)\\n2.Luego toca el lugar\\ncorrecto (izquierda)\\nColabora con tu equipo!" color="#FFFFFF" align="center" width="2.5" position="0 3 27.85"></a-text>';

/* — Esferas de reaccion ZONA 4 — */
s+='<a-sphere radius="0.15" position="4.5 1.2 27" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="4.5 1.5 27"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 26.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="4.5 1.5 26.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 26" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="4.5 1.5 26"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 25.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="4.5 1.5 25.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 25" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="4.5 1.5 25"></a-text>';

/* — Mapa ZONA 4 — */
s+='<a-plane width="1.5" height="1" position="-4.85 2.5 27" rotation="0 90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\nCine > Entrada >\\nTaller > Oficina >\\n[PATIO] > Salida" color="#FFD700" align="center" width="2" position="-4.8 2.5 27" rotation="0 90 0"></a-text>';

/* ═══ PASILLO ZONA 4 → ZONA 5 ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="4" position="0 0 30" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="4" height="4" position="5 2 30" rotation="0 -90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="4" height="4" position="-5 2 30" rotation="0 90 0" material="color:#3E2723"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 30" rotation="-90 0 0" material="color:#1A0A0A"></a-plane>';
s+='<a-light type="point" intensity="0.4" color="#FFE0C2" position="0 3.5 30"></a-light>';

/* — Flechas pasillo Z4-Z5 — */
s+='<a-text value=">>> SALIDA >>>" color="#FFD700" align="center" width="3" position="0 0.1 30" rotation="-90 0 0"></a-text>';
s+='<a-text value="SALIDA" color="#FFD700" align="center" width="3" position="4 2 30" rotation="0 -90 0"></a-text>';

/* ═══ ZONA 5: SALIDA (z = 32 a 38) ═══ */
s+='<a-plane rotation="-90 0 0" width="10" height="6" position="0 0 35" material="color:#2C1810;roughness:0.8"></a-plane>';
s+='<a-plane width="10" height="4" position="0 2 38" material="color:#5D4037"></a-plane>';
s+='<a-plane width="6" height="4" position="0 2 32" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 33.25" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 33.25" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="-5 2 36.75" rotation="0 90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="3.5" height="4" position="5 2 36.75" rotation="0 -90 0" material="color:#5D4037"></a-plane>';
s+='<a-plane width="10" height="0.1" position="0 4 35" rotation="-90 0 0" material="color:#2C1A1A"></a-plane>';
s+='<a-light type="point" intensity="0.5" color="#FFE0C2" position="0 3.5 35"></a-light>';

/* — Puerta de salida — */
s+='<a-box width="2" height="2.5" depth="0.2" position="0 1.25 37.8" material="color:#8B4513;emissive:#A0522D;emissiveIntensity:0.2" class="clickable" data-panel="p-salida"></a-box>';

/* — Muro colaborativo — */
s+='<a-plane width="4" height="2.5" position="-2.5 2 37.9" material="color:#1A1A2E;opacity:0.9" class="clickable" data-panel="p-muro"></a-plane>';
s+='<a-text value="MURO DE REFLEXIONES\\nEscribe tu reflexion\\nen el panel" color="#FFD700" align="center" width="3" position="-2.5 2 37.85"></a-text>';

/* — Esferas de reaccion ZONA 5 — */
s+='<a-sphere radius="0.15" position="4.5 1.2 37" material="color:#FFD700;emissive:#FFD700;emissiveIntensity:0.5" class="clickable" data-re="wow"></a-sphere>';
s+='<a-text value="WOW" color="#FFD700" align="center" width="1.5" position="4.5 1.5 37"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 36.5" material="color:#4FC3F7;emissive:#4FC3F7;emissiveIntensity:0.5" class="clickable" data-re="triste"></a-sphere>';
s+='<a-text value="TRISTE" color="#4FC3F7" align="center" width="1.5" position="4.5 1.5 36.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 36" material="color:#EF5350;emissive:#EF5350;emissiveIntensity:0.5" class="clickable" data-re="enojo"></a-sphere>';
s+='<a-text value="NO!" color="#EF5350" align="center" width="1.5" position="4.5 1.5 36"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 35.5" material="color:#AB47BC;emissive:#AB47BC;emissiveIntensity:0.5" class="clickable" data-re="hmm"></a-sphere>';
s+='<a-text value="HMM..." color="#AB47BC" align="center" width="1.5" position="4.5 1.5 35.5"></a-text>';
s+='<a-sphere radius="0.15" position="4.5 1.2 35" material="color:#66BB6A;emissive:#66BB6A;emissiveIntensity:0.5" class="clickable" data-re="idea"></a-sphere>';
s+='<a-text value="IDEA" color="#66BB6A" align="center" width="1.5" position="4.5 1.5 35"></a-text>';

/* — Mapa ZONA 5 — */
s+='<a-plane width="1.5" height="1" position="-4.85 2.5 37" rotation="0 90 0" material="color:#1A1A2E;opacity:0.9"></a-plane>';
s+='<a-text value="MAPA DE RUTA\\nCine > Entrada >\\nTaller > Oficina >\\nPatio > [SALIDA]" color="#FFD700" align="center" width="2" position="-4.8 2.5 37" rotation="0 90 0"></a-text>';

/* ═══ ILUMINACION GLOBAL ═══ */
s+='<a-light type="ambient" intensity="0.4" color="#FFE0C2"></a-light>';
s+='<a-light type="directional" intensity="0.3" color="#FFFFFF" position="0 4 0"></a-light>';

w.innerHTML=s;
}

