/* =====================================================================
   04 - COMPONENTES REUTILIZABLES Y CATÁLOGOS
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Catálogo de materiales y recomendaciones generales utilizado por la guía y los paneles.
// Obtiene el directorio de puntos de acopio guardado localmente.
function sampleCenters(){return read(K.centers,[]);}
// Convierte los puntos de acopio en tarjetas informativas.
function centerCards(){return sampleCenters().map(c=>`<article class="card"><div class="iconbox">📍</div><div style="display:flex;justify-content:space-between;gap:10px;align-items:center;margin-top:12px"><h3>${esc(c.name)}</h3>${c.demo?'<span class="tag gold">Ejemplo</span>':''}</div><p>${esc(c.address)}</p><p><b>Materiales:</b> ${esc(c.materials)}<br><b>Horario:</b> ${esc(c.hours)}<br><b>Zona:</b> ${esc(c.zone||'Por confirmar')}</p></article>`).join('');}
// Muestra campañas y, cuando corresponde, un botón para inscribirse.
function campaignCards(joinable=false){const rows=read(K.campaigns,[]), joins=read(K.joins,[]), email=current()?.email;return rows.map(c=>`<article class="card campaign-card"><div style="display:flex;justify-content:space-between;gap:10px;align-items:center"><span class="tag">${esc(c.date)}</span>${c.demo?'<span class="tag gold">Ejemplo</span>':''}</div><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p><div class="campaign-meta"><span>⌖ ${esc(c.place)}</span><span>♻ ${esc(c.materials||'Participación ambiental')}</span></div>${joinable?`<button class="btn small" data-join-campaign="${esc(c.id)}" ${joins.some(j=>j.id===c.id&&j.email===email)?'disabled':''}>${joins.some(j=>j.id===c.id&&j.email===email)?'Inscrito':'Participar'}</button>`:''}</article>`).join('')||'<div class="empty"><strong>No hay campañas registradas.</strong>Vuelve más adelante para consultar nuevas actividades.</div>';}


const materialData=[['Plástico','🧴','Botellas y envases','Enjuaga los envases, retira restos de contenido y aplástalos cuando sea posible. Verifica el tipo de plástico admitido por el centro.'],['Papel y cartón','📦','Hojas, cajas y cartones','Mantén el material seco y limpio. Retira cintas, restos de comida y elementos que no sean de papel cuando sea posible.'],['Vidrio','🍾','Botellas y frascos','Vacía y enjuaga los recipientes. Manipula con cuidado los envases rotos y consulta si el punto los recibe.'],['Aluminio','🥫','Latas y envases metálicos','Vacía y enjuaga las latas. Aplástalas solo si el centro de acopio lo recomienda.']];
// Genera las tarjetas educativas para los cuatro grupos de materiales incluidos.
function materialsHTML(){return materialData.map(m=>`<article class="card material-item" data-material="${m[0]}"><div class="material-card"><div class="material-swatch">${m[1]}</div><div><span class="tag">${m[0]}</span><h3 style="margin:7px 0 2px">${m[2]}</h3></div></div><p style="margin-top:12px">${m[3]}</p></article>`).join('');}
