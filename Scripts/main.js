/* =====================================================================
   09 - PUNTO DE ENTRADA DE LA APLICACIÓN
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Inicializa los datos de demostración, controla el acceso y dibuja la pantalla solicitada.
// Inicializa EcoPoints después de cargar los módulos y el documento HTML.
function start(){seed();if(!authGuard())return;$('#site-header').innerHTML=ROLE==='visitor'?visitorNav():accountNav();$('#site-footer').innerHTML=footer();let content=ROLE==='visitor'?renderVisitor():ROLE==='citizen'?renderCitizen():ROLE==='admin'?renderAdmin():renderWelcome();setLayout(content);}
start();
