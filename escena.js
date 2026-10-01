function initScene(){
var s=document.createElement('a-scene');
s.setAttribute('embedded','');
s.setAttribute('vr-mode-ui','enabled:true');
s.setAttribute('renderer','antialias:true');
s.setAttribute('fog','type:exponential;color:#4A3A2A;density:0.002');
s.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%';

var h='<a-sky color="#1a1a2e"></a-sky>';

// PISO GENERAL
h+='<a-plane position="0 0 0" rotation="-90 0 0" width="80" height="100" material="color:#6B635B;roughness:0.9"></a-plane>';

// === SALA DE CINE ===
h+='<a-plane position="0 0.01 -20" rotation="-90 0 0" width="16" height="16" material="color:#0a0a0a"></a-plane>';
h+='<a-box position="-8 3 -20" width="0.5" height="6" depth="16" material="color:#2C1A1A"></a-box>';
h+='<a-box position="8 3 -20" width="0.5" height="6" depth="16" material="color:#2C1A1A"></a-box>';
h+='<a-box position="0 3 -28" width="16" height="6" depth="0.5" material="color:#1a1a1a"></a-box>';
h+='<a-box position="-5 3 -12" width="6" height="6" depth="0.5" material="color:#2C1A1A"></a-box>';
h+='<a-box position="5 3 -12" width="6" height="6" depth="0.5" material="color:#2C1A1A"></a-box>';
h+='<a-plane position="0 6 -20" rotation="90 0 0" width="16" height="16" material="color:#0a0a0a"></a-plane>';
// Pantalla
h+='<a-box id="pantalla" class="clickable" position="0 3.5 -27.5" width="9.5" height="5" depth="0.05" material="color:#222;emissive:#333;emissiveIntensity:0.3"></a-box>';
h+='<a-text value="[ PANTALLA ]" color="#DAA520" align="center" width="5" position="0 0.8 -27.3"></a-text>';
h+='<a-text value="At the End of the Day" color="#FFF" align="center" width="5" position="0 5.5 -27.3"></a-text>';
// Marco dorado
h+='<a-box position="0 6.3 -27.6" width="10.2" height="0.15" depth="0.15" material="color:#DAA520;metalness:0.8"></a-box>';
h+='<a-box position="0 0.7 -27.6" width="10.2" height="0.15" depth="0.15" material="color:#DAA520;metalness:0.8"></a-box>';
h+='<a-box position="-5.1 3.5 -27.6" width="0.15" height="5.8" depth="0.15" material="color:#DAA520;metalness:0.8"></a-box>';
h+='<a-box position="5.1 3.5 -27.6" width="0.15" height="5.8" depth="0.15" material="color:#DAA520;metalness:0.8"></a-box>';
// Cortinas rojas
h+='<a-box position="-7.5 3 -20" width="1" height="6" depth="16" material="color:#8B0000;roughness:0.9"></a-box>';
h+='<a-box position="7.5 3 -20" width="1" height="6" depth="16" material="color:#8B0000;roughness:0.9"></a-box>';
// Asientos
for(var bz=-23;bz>=-17;bz+=3){for(var bx=-4;bx<=4;bx+=2){h+='<a-box position="'+bx+' 0.4 '+bz+'" width="1.2" height="0.8" depth="0.8" material="color:#3A1A1A"></a-box>';}}

// === ZONA 1: ENTRADA ===
h+='<a-text value="ZONA 1" color="#FFF" align="center" width="4" position="0 0.15 -11.5" rotation="-90 0 0"></a-text>';
h+='<a-plane position="0 0.02 -2" rotation="-90 0 0" width="20" height="12" material="color:#8B7355"></a-plane>';
h+='<a-box position="0 3 -8" width="20" height="6" depth="0.5" material="color:#7A7068"></a-box>';
// Porton
h+='<a-box id="porton" class="clickable" position="0 1.8 -7.7" width="3.5" height="3.6" depth="0.15" material="color:#2C2C2C;emissive:#FFB347;emissiveIntensity:0.15"></a-box>';
h+='<a-text value="[ PORTON ]" color="#FFB347" align="center" width="3" position="0 3.8 -7.5"></a-text>';
// Letrero
h+='<a-box id="letrero" class="clickable" position="0 5 -7.7" width="6" height="1.2" depth="0.15" material="color:#5C3A1E;emissive:#D4A574;emissiveIntensity:0.2"></a-box>';
h+='<a-text value="FABRIQUE MADELEINE" color="#D4A574" align="center" width="5.5" position="0 5.2 -7.5"></a-text>';
h+='<a-text value="Montreuil-sur-Mer, 1823" color="#A0896E" align="center" width="3.5" position="0 4.7 -7.5"></a-text>';
// Paredes laterales
h+='<a-box position="-10 3 0" width="0.5" height="6" depth="20" material="color:#7A7068"></a-box>';
h+='<a-box position="10 3 0" width="0.5" height="6" depth="20" material="color:#7A7068"></a-box>';
// Cartel
h+='<a-box id="cartel" class="clickable" position="-9.7 2.5 -2" width="0.15" height="1.8" depth="1.4" material="color:#C4A882;emissive:#C4A882;emissiveIntensity:0.3"></a-box>';
h+='<a-text value="[ CARTEL ]" color="#FFB347" align="center" width="2.5" position="-9.5 1.3 -2" rotation="0 90 0"></a-text>';
// Instrucciones
h+='<a-box id="instrucciones" class="clickable" position="9.7 2.5 0" width="0.15" height="1.8" depth="1.4" material="color:#1A1A2E;emissive:#FF5900;emissiveIntensity:0.2"></a-box>';
h+='<a-text value="[ AYUDA ]" color="#FF5900" align="center" width="2.5" position="9.5 1.3 0" rotation="0 -90 0"></a-text>';

// === ZONA 2: TALLER ===
h+='<a-text value="ZONA 2" color="#FFF" align="center" width="4" position="0 0.15 4.5" rotation="-90 0 0"></a-text>';
h+='<a-plane position="0 0.02 11" rotation="-90 0 0" width="20" height="13" material="color:#5C3A1E"></a-plane>';
h+='<a-box position="-7 3 5" width="6" height="6" depth="0.5" material="color:#6B5D52"></a-box>';
h+='<a-box position="7 3 5" width="6" height="6" depth="0.5" material="color:#6B5D52"></a-box>';
h+='<a-text value="TALLER DE LAS OBRERAS" color="#D4A574" align="center" width="5" position="0 5.5 5.3"></a-text>';
h+='<a-box position="0 3 18" width="20" height="6" depth="0.5" material="color:#6B5D52"></a-box>';
h+='<a-box position="-10 3 11.5" width="0.5" height="6" depth="13" material="color:#6B5D52"></a-box>';
h+='<a-box position="10 3 11.5" width="0.5" height="6" depth="13" material="color:#6B5D52"></a-box>';
// Mesa + Carta
h+='<a-box position="-4 0.75 9" width="2.5" height="0.08" depth="1" material="color:#5C3A1E"></a-box>';
h+='<a-box id="carta" class="clickable" position="-4 0.95 9" width="0.5" height="0.3" depth="0.4" material="color:#F5E6C8;emissive:#F5E6C8;emissiveIntensity:0.4"></a-box>';
h+='<a-text value="[ CARTA ]" color="#FFB347" align="center" width="2.5" position="-4 1.5 9"></a-text>';
// Mesa + Cuentas
h+='<a-box position="4 0.75 9" width="2.5" height="0.08" depth="1" material="color:#5C3A1E"></a-box>';
h+='<a-box id="cuentas" class="clickable" position="4 0.95 9" width="0.6" height="0.4" depth="0.5" material="color:#1A1A1A;emissive:#FFB347;emissiveIntensity:0.25"></a-box>';
h+='<a-text value="[ CUENTAS ]" color="#FFB347" align="center" width="2.5" position="4 1.5 9"></a-text>';
// Diario
h+='<a-box id="diario" class="clickable" position="-9.6 1.7 12" width="0.12" height="0.3" depth="0.25" material="color:#6B3A1E;emissive:#D4A574;emissiveIntensity:0.3"></a-box>';
h+='<a-text value="[ DIARIO ]" color="#FFB347" align="center" width="2.5" position="-9.4 1.2 12" rotation="0 90 0"></a-text>';
h+='<a-text value="ZONA 3 >>>" color="#FFF" align="center" width="4" position="7 0.15 17.5" rotation="-90 0 0"></a-text>';

// === ZONA 3: OFICINA ===
h+='<a-box position="10 3 20" width="0.5" height="6" depth="4" material="color:#5C4A3A"></a-box>';
h+='<a-box position="10 3 28" width="0.5" height="6" depth="4" material="color:#5C4A3A"></a-box>';
h+='<a-box position="17 3 18" width="0.5" height="6" depth="14" material="color:#5C4A3A"></a-box>';
h+='<a-box position="10.5 3 32" width="14" height="6" depth="0.5" material="color:#5C4A3A"></a-box>';
h+='<a-box position="10.5 3 18" width="14" height="6" depth="0.5" material="color:#5C4A3A"></a-box>';
h+='<a-plane position="13.5 0.01 25" rotation="-90 0 0" width="7" height="14" material="color:#4A2E15"></a-plane>';
h+='<a-text value="OFICINA MADELEINE" color="#D4A574" align="center" width="4" position="10.3 5 25" rotation="0 -90 0"></a-text>';
// Mesa + Decreto
h+='<a-box position="14 0.75 28" width="2.5" height="0.08" depth="1.2" material="color:#4A2E15"></a-box>';
h+='<a-box id="decreto" class="clickable" position="14 0.95 28" width="0.6" height="0.35" depth="0.45" material="color:#F5E6C8;emissive:#D4A574;emissiveIntensity:0.4"></a-box>';
h+='<a-text value="[ DECRETO ]" color="#FFB347" align="center" width="2.5" position="14 1.5 28"></a-text>';
// Espejo
h+='<a-box id="espejo" class="clickable" position="16.65 3 22" width="0.08" height="1.3" depth="0.8" material="color:#B8C4D0;metalness:0.95;emissive:#B8C4D0;emissiveIntensity:0.15"></a-box>';
h+='<a-text value="[ ESPEJO ]" color="#FFB347" align="center" width="2" position="16.5 2 22" rotation="0 -90 0"></a-text>';

// === ZONA 4: EL PATIO ===
h+='<a-plane position="0 0.01 28" rotation="-90 0 0" width="18" height="18" material="color:#6B7B6B"></a-plane>';
h+='<a-box position="-9 2.5 28" width="0.5" height="5" depth="18" material="color:#7A7068"></a-box>';
h+='<a-box position="9 2.5 28" width="0.5" height="5" depth="18" material="color:#7A7068"></a-box>';
h+='<a-box position="0 2.5 37" width="18" height="5" depth="0.5" material="color:#7A7068"></a-box>';
h+='<a-text value="EL PATIO" color="#D4A574" align="center" width="5" position="0 5 18.3"></a-text>';
h+='<a-text value="ZONA 4" color="#FFF" align="center" width="4" position="0 0.15 18.5" rotation="-90 0 0"></a-text>';
// Reloj
h+='<a-box id="reloj" class="clickable" position="-8.7 3.5 25" width="0.15" height="1.2" depth="1.2" material="color:#2C2C2C;emissive:#FFB347;emissiveIntensity:0.25"></a-box>';
h+='<a-circle position="-8.6 3.5 25" rotation="0 90 0" radius="0.5" material="color:#F5E6C8"></a-circle>';
h+='<a-text value="5:45" color="#1A1A2E" align="center" width="1.5" position="-8.55 3.5 25" rotation="0 90 0"></a-text>';
h+='<a-text value="[ RELOJ ]" color="#FFB347" align="center" width="2.5" position="-8.5 2.5 25" rotation="0 90 0"></a-text>';
// Campana
h+='<a-cone id="campana" class="clickable" position="5 3.7 32" radius-bottom="0.4" radius-top="0.05" height="0.6" material="color:#D4A574;metalness:0.85;emissive:#D4A574;emissiveIntensity:0.25"></a-cone>';
h+='<a-text value="[ CAMPANA ]" color="#FFB347" align="center" width="2.5" position="5 3 32"></a-text>';
// Muro
h+='<a-box id="muro" class="clickable" position="0 2 36.7" width="6" height="3.5" depth="0.3" material="color:#5C4A3A;emissive:#FF5900;emissiveIntensity:0.15"></a-box>';
h+='<a-text value="[ MURO ]" color="#FF5900" align="center" width="4" position="0 0.8 36.4"></a-text>';

// === ZONA 5: SALIDA ===
h+='<a-text value="ZONA 5" color="#FFF" align="center" width="4" position="-5 0.15 -7.5" rotation="-90 0 0"></a-text>';
h+='<a-plane position="-13 0.01 -12" rotation="-90 0 0" width="6" height="8" material="color:#3A2A1A"></a-plane>';
h+='<a-box position="-13 3 -8" width="6" height="6" depth="0.5" material="color:#5C4A3A"></a-box>';
h+='<a-box position="-16 3 -12" width="0.5" height="6" depth="8" material="color:#5C4A3A"></a-box>';
h+='<a-box position="-10 3 -12" width="0.5" height="6" depth="8" material="color:#5C4A3A"></a-box>';
h+='<a-box position="-13 3 -16" width="6" height="6" depth="0.5" material="color:#5C4A3A"></a-box>';
h+='<a-text value="SALIDA" color="#FF5900" align="center" width="4" position="-10.3 5 -12" rotation="0 -90 0"></a-text>';
// Puerta
h+='<a-box id="puerta" class="clickable" position="-13 2.5 -15.7" width="3" height="4.5" depth="0.3" material="color:#4A2E15;emissive:#FF5900;emissiveIntensity:0.2"></a-box>';
h+='<a-text value="[ PUERTA ]" color="#FF5900" align="center" width="3" position="-13 0.5 -15.3"></a-text>';
h+='<a-text value="Fin del recorrido" color="#D4A574" align="center" width="3" position="-13 4.8 -15.3"></a-text>';

// === ILUMINACION ===
h+='<a-light type="ambient" color="#C4A882" intensity="0.45"></a-light>';
h+='<a-light type="point" color="#FFB347" intensity="0.7" distance="12" position="-4 4 -6"></a-light>';
h+='<a-light type="point" color="#FFB347" intensity="0.7" distance="12" position="4 4 -6"></a-light>';
h+='<a-light type="point" color="#FFB347" intensity="0.5" distance="10" position="0 4 12"></a-light>';
h+='<a-light type="point" color="#FFB347" intensity="0.6" distance="8" position="14 3.5 25"></a-light>';
h+='<a-light type="point" color="#FFB347" intensity="0.5" distance="12" position="0 4 28"></a-light>';
h+='<a-light type="point" color="#DAA520" intensity="0.3" distance="10" position="0 4 -22"></a-light>';
h+='<a-light type="point" color="#D4A574" intensity="0.5" distance="15" position="0 4 -9"></a-light>';
h+='<a-light type="point" color="#D4A574" intensity="0.5" distance="15" position="0 4 4"></a-light>';
h+='<a-light type="point" color="#FF5900" intensity="0.3" distance="8" position="-13 3 -12"></a-light>';

// === CAMARA + CONTROLES ===
h+='<a-entity id="rig" position="0 0 0">';
h+='<a-camera look-controls wasd-controls="acceleration:25">';
h+='<a-cursor fuse="true" fuse-timeout="1500" color="#FF5900" raycaster="objects:.clickable" geometry="primitive:ring;radiusInner:0.02;radiusOuter:0.03" material="color:#FF5900;shader:flat"></a-cursor>';
h+='</a-camera>';
h+='<a-entity laser-controls="hand:right" raycaster="objects:.clickable;far:30" line="color:#FF5900;opacity:0.75"></a-entity>';
h+='<a-entity laser-controls="hand:left" raycaster="objects:.clickable;far:30" line="color:#FFB347;opacity:0.75"></a-entity>';
h+='</a-entity>';

s.innerHTML=h;
document.body.appendChild(s);

// === INTERACCIONES ===
s.addEventListener('loaded',function(){
cr=document.getElementById('rig');
var ids=['pantalla','cartel','porton','instrucciones','letrero','carta','diario','cuentas','decreto','espejo','reloj','campana','muro','puerta'];
var pids=['p0','p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13'];
var bis=[0.3,0.3,0.15,0.2,0.2,0.4,0.3,0.25,0.4,0.15,0.25,0.25,0.15,0.2];

for(var i=0;i<ids.length;i++){
(function(idx){
var el=document.getElementById(ids[idx]);
if(el){
el.addEventListener('click',function(){
for(var j=0;j<pids.length;j++) document.getElementById(pids[j]).style.display='none';
document.getElementById(pids[idx]).style.display='block';
if(ids[idx]==='campana'){try{ca.currentTime=0;ca.play()}catch(e){}}
if(!disc[ids[idx]]){
disc[ids[idx]]=true;
dc++;
oi.textContent=dc+'/14';
if(sr) sr.update({objectsFound:dc});
var f=document.getElementById('fc');
if(f) f.textContent=dc;
}
});
el.addEventListener('mouseenter',function(){el.setAttribute('material','emissiveIntensity','0.8')});
el.addEventListener('mouseleave',function(){el.setAttribute('material','emissiveIntensity',String(bis[idx]))});
}
})(i);
}

// Deteccion de zona
var cm=document.querySelector('a-camera');
setInterval(function(){
var p=cm.object3D.getWorldPosition(new THREE.Vector3());
var z=zi.textContent;
var n='';
if(p.z<-12 && p.x>-10) n='CINE';
else if(p.x<-10) n='ZONA 5';
else if(p.z<5 && p.x<=10) n='ZONA 1';
else if(p.x>10) n='ZONA 3';
else if(p.z>=18) n='ZONA 4';
else if(p.z>=5) n='ZONA 2';
if(n && n!==z){zi.textContent=n; if(sr) sr.update({zone:n});}
},2000);
});
}
