/* =====================================================================
   03 - NAVEGACIÓN Y ESTRUCTURA COMPARTIDA
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Construye la barra de navegación pública para visitantes.
function visitorNav(){const links=[['inicio','1-inicio.html','Inicio'],['guia','2-guia-reciclaje.html','Guía de reciclaje'],['acopio','3-puntos-acopio.html','Puntos de acopio'],['campanas','4-campañas.html','Campañas'],['informacion','5-informacion.html','Información']];return `<div class="topbar"><div class="container navwrap"><a class="brand" href="${visitorURL('1-inicio.html')}"><img src="${img('eco-logo.svg')}" alt=""><span>EcoPoints</span></a><button class="mobile-toggle" data-menu-toggle aria-label="Abrir navegación">☰</button><nav class="navlinks" id="navlinks">${links.map(([p,f,t])=>`<a class="${PAGE===p?'active':''}" href="${visitorURL(f)}">${t}</a>`).join('')}</nav><div class="nav-actions"><a class="btn small" href="${visitorURL('6-inicio-sesion.html')}">Iniciar sesión</a></div></div></div>`;}
// Construye la navegación del ciudadano o administrador según el rol activo.
function accountNav(){const isCitizen=ROLE==='citizen';const links=isCitizen?[
 ['inicio','index.html','⌂','Inicio'],['registrar','2-registrar-reciclaje.html','＋','Registrar reciclaje'],['acopio','3-puntos-acopio.html','⌖','Puntos de acopio'],['puntos','4-mis-puntos.html','★','Mis puntos'],['campanas','5-campañas.html','♧','Campañas'],['impacto','6-mi-impacto.html','↗','Mi impacto'],['historial','7-historial.html','◷','Historial'],['perfil','8-mi-perfil.html','◎','Mi perfil']
 ]:[['inicio','index.html','⌂','Dashboard'],['usuarios','1-usuarios.html','♙','Usuarios'],['campanas','2-campañas.html','♧','Campañas'],['acopio','3-puntos-acopio.html','⌖','Puntos de acopio'],['registros','4-registros-reciclaje.html','▤','Registros'],['estadisticas','5-estadisticas.html','▥','Estadísticas'],['reportes','6-reportes.html','⇩','Reportes'],['configuracion','7-configuracion.html','⚙','Configuración']];
 const home=isCitizen?citizenURL('index.html'):adminURL('index.html');
 return `<div class="topbar"><div class="container navwrap"><a class="brand" href="${home}"><img src="${img('eco-logo.svg')}" alt=""><span>EcoPoints <small style="font:600 .67rem 'DM Sans';color:#6b796e">${isCitizen?'CIUDADANO':'ADMIN'}</small></span></a><button class="mobile-toggle" data-menu-toggle aria-label="Abrir navegación">☰</button><nav class="navlinks" id="navlinks">${links.map(([p,f,ico,t])=>`<a class="${PAGE===p?'active':''}" href="${isCitizen?citizenURL(f):adminURL(f)}">${ico} ${t}</a>`).join('')}</nav><div class="nav-actions"><span class="muted" style="font-size:.83rem">${esc(current()?.name||'Usuario')}</span><button class="btn outline small" data-logout>Cerrar sesión</button></div></div></div>`;
}
// Genera el pie de página compartido por las distintas áreas.
function footer(){return `<footer class="footer"><div class="container footer-inner"><div><a class="brand" style="color:#fff" href="${visitorURL('1-inicio.html')}"><img src="${img('eco-logo.svg')}" alt="">EcoPoints</a><p>Pequeñas acciones, grandes cambios.</p></div><div class="footer-links"><a href="${visitorURL('2-guia-reciclaje.html')}">Guía de reciclaje</a><a href="${visitorURL('3-puntos-acopio.html')}">Puntos de acopio</a><a href="${visitorURL('4-campañas.html')}">Campañas</a><a href="${visitorURL('6-inicio-sesion.html')}">Acceso</a></div></div></footer>`;}
// Genera el encabezado de una sección con título, subtítulo y descripción.
function pageHero(kicker,title,desc){return `<section class="page-hero"><div class="container"><span class="kicker">${kicker}</span><h1 class="page-title">${title}</h1><p>${desc}</p></div></section>`;}
// Inserta el contenido renderizado dentro del contenedor principal de la página.
function setLayout(content, sidebar=false){$('#page-content').innerHTML=content;}
