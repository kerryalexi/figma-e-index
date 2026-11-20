/* =====================================================================
   02 - UTILIDADES: MENSAJES, CONTRASEÑAS Y EXPORTACIÓN
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Muestra mensajes temporales de confirmación o error en la interfaz.
function toast(message){ const el=$('#toast'); if(!el)return; el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),3200); }


// Cambia la pestaña visible entre el acceso ciudadano y el acceso administrativo.
function renderLoginTabs(tab){$$('[data-auth-tab]').forEach(b=>{const active=b.dataset.authTab===tab;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active));});['citizen-login','admin-login'].forEach(t=>{const p=$(`#panel-${t}`);if(p)p.hidden=t!==tab;});}
// Genera una huella SHA-256 de la contraseña cuando Web Crypto está disponible; el respaldo base64 no es cifrado.
async function hashPassword(value){const data=new TextEncoder().encode(value);if(window.crypto?.subtle){const digest=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('');}return btoa(unescape(encodeURIComponent(value)));}
// Construye y descarga un archivo CSV a partir de filas de datos.
function csvDownload(filename,rows){const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;a.click();URL.revokeObjectURL(a.href);}
