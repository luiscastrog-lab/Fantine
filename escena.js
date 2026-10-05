
/* =========================================
   ESCENA.JS V2.0 — La Fabrica de Fantine
   Construye toda la geometria 3D
   ========================================= */

function buildScene(){
var w=document.getElementById('world');
var s='';

/* ═══════════════════════════════════════
   SALA DE CINE (Z=-24 a -18)
   ═══════════════════════════════════════ */

// Piso cine
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 -21" color="#1A1A2E"></a-plane>';

// Paredes cine
s+='<a-box width="10" height="4" depth="0.2" position="0 2 -25" color="#1A1A2E"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="-5 2 -21" color="#1A1A2E"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="5 2 -21" color="#1A1A2E"></a-box>';

// Pantalla de cine (objeto interactivo)
s+='<a-box class="clickable" data-panel="pantalla" width="6" height="3" depth="0.1" position="0 2.2 -24.8" color="#111" material="emissive:#222;emissiveIntensity:0.2"></a-box>';

// Marco dorado pantalla
s+='<a-box width="6.4" height="3.4" depth="0.05" position="0 2.2 -24.85" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.15"></a-box>';

// Cortinas rojas
s+='<a-box width="1.5" height="3.5" depth="0.1" position="-3.8 2 -24.7" color="#8B0000" material="emissive:#8B0000;emissiveIntensity:0.1"></a-box>';
s+='<a-box width="1.5" height="3.5" depth="0.1" position="3.8 2 -24.7" color="#8B0000" material="emissive:#8B0000;emissiveIntensity:0.1"></a-box>';

// Butacas (3 filas x 5)
for(var r=0;r<3;r++){
  for(var c=0;c<5;c++){
    var bx=-3+(c*1.5);
    var bz=-20+(r*1.5);
    s+='<a-box width="0.8" height="0.6" depth="0.6" position="'+bx+' 0.3 '+bz+'" color="#4A1A1A" material="emissive:#4A1A1A;emissiveIntensity:0.05"></a-box>';
  }
}

// Letrero SALA DE CINE
s+='<a-text value="SALA DE CINE" color="#C8A951" align="center" width="6" position="0 3.8 -24.7"></a-text>';

// Luz tenue cine
s+='<a-light type="point" color="#FFE0C2" intensity="0.3" distance="12" position="0 3.5 -21"></a-light>';


/* ═══════════════════════════════════════
   PASILLO CINE → ZONA 1 (Z=-18 a -14)
   ═══════════════════════════════════════ */

s+='<a-plane rotation="-90 0 0" width="4" height="4" position="0 0 -16" color="#3D2B1F"></a-plane>';
s+='<a-box width="0.2" height="3" depth="4" position="-2 1.5 -16" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="3" depth="4" position="2 1.5 -16" color="#5C3A21"></a-box>';

// Flecha cine a Z1
s+='<a-entity position="0 0.05 -16">';
s+='<a-triangle vertex-a="0 0 -0.4" vertex-b="-0.3 0 0.2" vertex-c="0.3 0 0.2" rotation="-90 180 0" material="color:#FFD100;emissive:#FFD100;emissiveIntensity:0.4;side:double"></a-triangle>';
s+='</a-entity>';

s+='<a-light type="point" color="#FFE0C2" intensity="0.4" distance="8" position="0 2.5 -16"></a-light>';


/* ═══════════════════════════════════════
   ZONA 1: ENTRADA DE LA FABRICA (Z=-14 a -8)
   ═══════════════════════════════════════ */

// Piso Z1
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 -10" color="#8B7355"></a-plane>';

// Paredes Z1
s+='<a-box width="10" height="4" depth="0.2" position="0 2 -14" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="-5 2 -10" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="5 2 -10" color="#5C3A21"></a-box>';

// Porton (objeto interactivo)
s+='<a-box class="clickable" data-panel="porton" width="2.5" height="3" depth="0.3" position="0 1.5 -13.8" color="#4A3728" material="emissive:#FF5900;emissiveIntensity:0.15">';
s+='<a-text value="PORTON" color="#C8A951" align="center" width="3" position="0 0.8 0.2"></a-text>';
s+='</a-box>';

// Letrero fabrica (objeto interactivo)
s+='<a-box class="clickable" data-panel="letrero" width="3" height="0.8" depth="0.1" position="0 3.5 -13.8" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.3">';
s+='<a-text value="FABRIQUE MADELEINE" color="#1A1A2E" align="center" width="4" position="0 0 0.1"></a-text>';
s+='</a-box>';

// Cartel SE BUSCAN OBRERAS (objeto interactivo)
s+='<a-plane class="clickable" data-panel="cartel" width="1.2" height="1.5" position="-4.8 1.8 -12" rotation="0 90 0" color="#FFFDF8" material="emissive:#FF5900;emissiveIntensity:0.15">';
s+='<a-text value="SE BUSCAN\\nOBRERAS\\n15 sous/dia" color="#1A1A2E" align="center" width="2" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Panel instrucciones (objeto interactivo)
s+='<a-plane class="clickable" data-panel="instrucciones" width="1.2" height="1" position="4.8 1.8 -12" rotation="0 -90 0" color="#1A1A2E" material="emissive:#FF5900;emissiveIntensity:0.15">';
s+='<a-text value="COMO\\nNAVEGAR" color="#FFD100" align="center" width="2" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Mapa Z1
s+='<a-plane width="1.5" height="1" position="-4.8 3 -10" rotation="0 90 0" color="#1A1A2E" material="opacity:0.9">';
s+='<a-text value="[CINE]>[AQUI]>TALLER>\\nOFICINA>PATIO>SALIDA" color="#FFD100" align="center" width="2.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Luz Z1
s+='<a-light type="point" color="#FFE0C2" intensity="0.5" distance="12" position="0 3 -10"></a-light>';


/* ═══════════════════════════════════════
   PASILLO Z1 → Z2 (Z=-8 a -4)
   ═══════════════════════════════════════ */

s+='<a-plane rotation="-90 0 0" width="4" height="4" position="0 0 -6" color="#3D2B1F"></a-plane>';
s+='<a-box width="0.2" height="3" depth="4" position="-2 1.5 -6" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="3" depth="4" position="2 1.5 -6" color="#5C3A21"></a-box>';

// Flecha Z1 a Z2
s+='<a-entity position="0 0.05 -6">';
s+='<a-triangle vertex-a="0 0 -0.4" vertex-b="-0.3 0 0.2" vertex-c="0.3 0 0.2" rotation="-90 180 0" material="color:#FFD100;emissive:#FFD100;emissiveIntensity:0.4;side:double"></a-triangle>';
s+='</a-entity>';

// Letrero pared
s+='<a-text value="TALLER >" color="#FFD100" align="center" width="3" position="0 2.5 -5" rotation="0 0 0"></a-text>';

s+='<a-light type="point" color="#FFE0C2" intensity="0.4" distance="8" position="0 2.5 -6"></a-light>';


/* ═══════════════════════════════════════
   ZONA 2: TALLER DE LAS OBRERAS (Z=-4 a 4)
   ═══════════════════════════════════════ */

// Piso Z2
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 0" color="#6B5B4F"></a-plane>';

// Paredes Z2
s+='<a-box width="0.2" height="4" depth="8" position="-5 2 0" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="5 2 0" color="#5C3A21"></a-box>';

// Carta de Fantine (objeto interactivo)
s+='<a-plane class="clickable" data-panel="carta" width="0.8" height="1" position="-4.8 1.5 -1" rotation="0 90 0" color="#FFFDF8" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="Querida\\nFantine..." color="#1A1A2E" align="center" width="1.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Libro de cuentas (objeto interactivo)
s+='<a-box class="clickable" data-panel="cuentas" width="0.8" height="0.1" depth="0.6" position="2 0.9 1" color="#4A3728" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="CUENTAS" color="#C8A951" align="center" width="2" position="0 0.06 0" rotation="-90 0 0"></a-text>';
s+='</a-box>';

// Mesa para el libro
s+='<a-box width="1.5" height="0.8" depth="1" position="2 0.4 1" color="#5C3A21"></a-box>';

// Diario de obrera (objeto interactivo)
s+='<a-plane class="clickable" data-panel="diario" width="1" height="1.2" position="4.8 1.8 1" rotation="0 -90 0" color="#D4C5A9" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="JORNADA\\nDE UNA\\nOBRERA" color="#1A1A2E" align="center" width="1.8" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Mapa Z2
s+='<a-plane width="1.5" height="1" position="-4.8 3 2" rotation="0 90 0" color="#1A1A2E" material="opacity:0.9">';
s+='<a-text value="CINE>ENTRADA>[AQUI]>\\nOFICINA>PATIO>SALIDA" color="#FFD100" align="center" width="2.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Luz Z2
s+='<a-light type="point" color="#FFE0C2" intensity="0.5" distance="12" position="0 3 0"></a-light>';


/* ═══════════════════════════════════════
   PASILLO Z2 → Z3 (Z=4 a 8)
   ═══════════════════════════════════════ */

s+='<a-plane rotation="-90 0 0" width="4" height="4" position="0 0 6" color="#3D2B1F"></a-plane>';
s+='<a-box width="0.2" height="3" depth="4" position="-2 1.5 6" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="3" depth="4" position="2 1.5 6" color="#5C3A21"></a-box>';

// Flecha Z2 a Z3
s+='<a-entity position="0 0.05 6">';
s+='<a-triangle vertex-a="0 0 -0.4" vertex-b="-0.3 0 0.2" vertex-c="0.3 0 0.2" rotation="-90 180 0" material="color:#FFD100;emissive:#FFD100;emissiveIntensity:0.4;side:double"></a-triangle>';
s+='</a-entity>';

s+='<a-text value="OFICINA >" color="#FFD100" align="center" width="3" position="0 2.5 7" rotation="0 0 0"></a-text>';

s+='<a-light type="point" color="#FFE0C2" intensity="0.4" distance="8" position="0 2.5 6"></a-light>';


/* ═══════════════════════════════════════
   ZONA 3: OFICINA DEL PADRE MADELEINE (Z=8 a 16)
   ═══════════════════════════════════════ */

// Piso Z3
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 12" color="#5C4A3A"></a-plane>';

// Paredes Z3
s+='<a-box width="0.2" height="4" depth="8" position="-5 2 12" color="#4A3728"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="5 2 12" color="#4A3728"></a-box>';

// Escritorio
s+='<a-box width="2.5" height="0.8" depth="1.2" position="0 0.4 13" color="#3D2B1F"></a-box>';

// Decreto (objeto interactivo)
s+='<a-plane class="clickable" data-panel="decreto" width="1.2" height="1.5" position="-4.8 1.8 11" rotation="0 90 0" color="#FFFDF8" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="DECRETO\\nNINGUN OBRERO\\nSERA DESPEDIDO\\nSIN CAUSA JUSTA" color="#1A1A2E" align="center" width="2" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Espejo (objeto interactivo)
s+='<a-circle class="clickable" data-panel="espejo" radius="0.8" position="4.8 2 12" rotation="0 -90 0" color="#B8C4D0" material="emissive:#FF5900;emissiveIntensity:0.15;metalness:0.8;roughness:0.2">';
s+='<a-text value="?" color="#1A1A2E" align="center" width="2" position="0 0 0.01"></a-text>';
s+='</a-circle>';

// Marco espejo
s+='<a-ring position="4.78 2 12" rotation="0 -90 0" radius-inner="0.8" radius-outer="0.95" color="#C8A951" material="emissive:#C8A951;emissiveIntensity:0.2"></a-ring>';

// Mapa Z3
s+='<a-plane width="1.5" height="1" position="-4.8 3 14" rotation="0 90 0" color="#1A1A2E" material="opacity:0.9">';
s+='<a-text value="CINE>ENTRADA>TALLER>\\n[AQUI]>PATIO>SALIDA" color="#FFD100" align="center" width="2.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Luz Z3
s+='<a-light type="point" color="#FFE0C2" intensity="0.5" distance="12" position="0 3 12"></a-light>';


/* ═══════════════════════════════════════
   PASILLO Z3 → Z4 (Z=16 a 20)
   ═══════════════════════════════════════ */

s+='<a-plane rotation="-90 0 0" width="4" height="4" position="0 0 18" color="#3D2B1F"></a-plane>';
s+='<a-box width="0.2" height="3" depth="4" position="-2 1.5 18" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="3" depth="4" position="2 1.5 18" color="#5C3A21"></a-box>';

// Flecha Z3 a Z4
s+='<a-entity position="0 0.05 18">';
s+='<a-triangle vertex-a="0 0 -0.4" vertex-b="-0.3 0 0.2" vertex-c="0.3 0 0.2" rotation="-90 180 0" material="color:#FFD100;emissive:#FFD100;emissiveIntensity:0.4;side:double"></a-triangle>';
s+='</a-entity>';

s+='<a-text value="PATIO >" color="#FFD100" align="center" width="3" position="0 2.5 19" rotation="0 0 0"></a-text>';

s+='<a-light type="point" color="#FFE0C2" intensity="0.4" distance="8" position="0 2.5 18"></a-light>';


/* ═══════════════════════════════════════
   ZONA 4: EL PATIO (Z=20 a 28)
   ═══════════════════════════════════════ */

// Piso Z4 (piedra)
s+='<a-plane rotation="-90 0 0" width="10" height="8" position="0 0 24" color="#7A7A6D"></a-plane>';

// Paredes Z4
s+='<a-box width="0.2" height="4" depth="8" position="-5 2 24" color="#6B6B5E"></a-box>';
s+='<a-box width="0.2" height="4" depth="8" position="5 2 24" color="#6B6B5E"></a-box>';

// Cielo abierto (sin techo)
s+='<a-sky color="#2C3E50" radius="80"></a-sky>';

// Reloj (objeto interactivo)
s+='<a-cylinder class="clickable" data-panel="reloj" radius="0.5" height="0.1" position="-4.8 2.5 23" rotation="0 0 90" color="#C8A951" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="5:45" color="#1A1A2E" align="center" width="1.5" position="0 0 0.06" rotation="0 0 0"></a-text>';
s+='</a-cylinder>';

// Campana (objeto interactivo)
s+='<a-entity class="clickable" data-panel="campana" position="4.8 2.5 23">';
s+='<a-cone radius-bottom="0.4" radius-top="0.1" height="0.6" color="#C8A951" material="emissive:#FF5900;emissiveIntensity:0.2" rotation="0 0 0"></a-cone>';
s+='<a-text value="CAMPANA" color="#C8A951" align="center" width="2" position="0 -0.5 0"></a-text>';
s+='</a-entity>';

// Muro colaborativo (objeto interactivo)
s+='<a-box class="clickable" data-panel="muro" width="4" height="2.5" depth="0.2" position="0 1.5 27.8" color="#5C5C4E" material="emissive:#FF5900;emissiveIntensity:0.1">';
s+='<a-text value="MURO COLABORATIVO\\nEscribe tu reflexion" color="#FFD100" align="center" width="5" position="0 0.5 0.15"></a-text>';
s+='</a-box>';

// Mapa Z4
s+='<a-plane width="1.5" height="1" position="-4.8 3 26" rotation="0 90 0" color="#1A1A2E" material="opacity:0.9">';
s+='<a-text value="CINE>ENTRADA>TALLER>\\nOFICINA>[AQUI]>SALIDA" color="#FFD100" align="center" width="2.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Luz Z4
s+='<a-light type="point" color="#B0C4DE" intensity="0.5" distance="12" position="0 3 24"></a-light>';


/* ═══════════════════════════════════════
   PASILLO Z4 → Z5 (Z=28 a 32)
   ═══════════════════════════════════════ */

s+='<a-plane rotation="-90 0 0" width="4" height="4" position="0 0 30" color="#3D2B1F"></a-plane>';
s+='<a-box width="0.2" height="3" depth="4" position="-2 1.5 30" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="3" depth="4" position="2 1.5 30" color="#5C3A21"></a-box>';

// Flecha Z4 a Z5
s+='<a-entity position="0 0.05 30">';
s+='<a-triangle vertex-a="0 0 -0.4" vertex-b="-0.3 0 0.2" vertex-c="0.3 0 0.2" rotation="-90 180 0" material="color:#FFD100;emissive:#FFD100;emissiveIntensity:0.4;side:double"></a-triangle>';
s+='</a-entity>';

s+='<a-text value="SALIDA >" color="#FFD100" align="center" width="3" position="0 2.5 31" rotation="0 0 0"></a-text>';

s+='<a-light type="point" color="#FFE0C2" intensity="0.4" distance="8" position="0 2.5 30"></a-light>';


/* ═══════════════════════════════════════
   ZONA 5: LA PUERTA DE SALIDA (Z=32 a 38)
   ═══════════════════════════════════════ */

// Piso Z5
s+='<a-plane rotation="-90 0 0" width="10" height="6" position="0 0 35" color="#8B7355"></a-plane>';

// Paredes Z5
s+='<a-box width="10" height="4" depth="0.2" position="0 2 38" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="4" depth="6" position="-5 2 35" color="#5C3A21"></a-box>';
s+='<a-box width="0.2" height="4" depth="6" position="5 2 35" color="#5C3A21"></a-box>';

// Puerta de salida (objeto interactivo)
s+='<a-box class="clickable" data-panel="puerta" width="2" height="3" depth="0.3" position="0 1.5 37.8" color="#4A3728" material="emissive:#FF5900;emissiveIntensity:0.2">';
s+='<a-text value="SALIDA" color="#C8A951" align="center" width="3" position="0 0.8 0.2"></a-text>';
s+='</a-box>';

// Letrero final
s+='<a-text value="Donde termina la miseria\\ny donde empieza la\\ngrandeza del hombre?" color="#C8A951" align="center" width="6" position="0 3.2 37.8"></a-text>';

// Mapa Z5
s+='<a-plane width="1.5" height="1" position="-4.8 3 35" rotation="0 90 0" color="#1A1A2E" material="opacity:0.9">';
s+='<a-text value="CINE>ENTRADA>TALLER>\\nOFICINA>PATIO>[AQUI]" color="#FFD100" align="center" width="2.5" position="0 0 0.01"></a-text>';
s+='</a-plane>';

// Luz Z5
s+='<a-light type="point" color="#FFE0C2" intensity="0.5" distance="12" position="0 3 35"></a-light>';


/* ═══════════════════════════════════════
   TECHO GENERAL (excepto Z4 patio)
   ═══════════════════════════════════════ */

// Techos por zona
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 -21" color="#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 -10" color="#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 0" color="#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="8" position="0 4 12" color="#3D2B1F"></a-plane>';
s+='<a-plane rotation="90 0 0" width="10" height="6" position="0 4 35" color="#3D2B1F"></a-plane>';

// Techos pasillos
s+='<a-plane rotation="90 0 0" width="4" height="4" position="0 3 -16" color="#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="4" height="4" position="0 3 -6" color="#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="4" height="4" position="0 3 6" color="#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="4" height="4" position="0 3 18" color="#2C1A1A"></a-plane>';
s+='<a-plane rotation="90 0 0" width="4" height="4" position="0 3 30" color="#2C1A1A"></a-plane>';


w.innerHTML=s;
}

