/* =====================================================================
   01 - ALMACENAMIENTO, SESIONES Y CÁLCULOS
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Crea datos iniciales de demostración cuando las colecciones todavía no existen.
function seed(){
 if(!localStorage.getItem(K.campaigns)) write(K.campaigns,[
  {id:'demo-c1',title:'Jornada de reciclaje comunitario',date:'2026-12-05',place:'Santa Cruz de la Sierra · ubicación de ejemplo',description:'Actividad demostrativa para reunir materiales previamente separados.',materials:'Plástico, papel y cartón',demo:true},
  {id:'demo-c2',title:'Semana de educación ambiental',date:'2026-12-12',place:'Actividad virtual · demostración',description:'Sesiones breves para aprender a preparar los residuos antes de entregarlos.',materials:'Todos los materiales',demo:true}
 ]);
 if(!localStorage.getItem(K.centers)) write(K.centers,[
  {id:'demo-p1',name:'Punto Eco demostrativo 01',zone:'Zona por confirmar',city:'Santa Cruz de la Sierra',materials:'Plástico, papel y cartón',hours:'Horario por confirmar',address:'Ubicación ilustrativa: completar con dirección verificada',demo:true},
  {id:'demo-p2',name:'Punto Eco demostrativo 02',zone:'Zona por confirmar',city:'Santa Cruz de la Sierra',materials:'Vidrio y aluminio',hours:'Horario por confirmar',address:'Ubicación ilustrativa: completar con dirección verificada',demo:true}
 ]);
 if(!localStorage.getItem(K.users)) write(K.users,[]);
 if(!localStorage.getItem(K.records)) write(K.records,[]);
 if(!localStorage.getItem(K.joins)) write(K.joins,[]);
}
// Obtiene el perfil ciudadano o los datos administrativos asociados a la sesión activa.
function current(){const s=read(K.session,null);if(!s)return null;if(s.role==='citizen')return read(K.users,[]).find(u=>u.email===s.email)||null;return s;}
// Recupera la sesión almacenada en el navegador.
function session(){return read(K.session,null);}
// Calcula puntos ilustrativos según cantidad y unidad: 10 por kg y 1 por unidad.
function materialPoints(record){return Math.round((Number(record.amount)||0)*(record.unit==='kg'?10:1));}
// Filtra los registros que fueron aprobados por el administrador.
function approvedRecords(email){return read(K.records,[]).filter(r=>r.status==='Aprobado'&&(!email||r.email===email));}
// Resume puntos, kilogramos y cantidad de registros aprobados de un ciudadano.
function citizenTotals(email){const rows=approvedRecords(email);return {points:rows.reduce((a,r)=>a+materialPoints(r),0),kg:rows.filter(r=>r.unit==='kg').reduce((a,r)=>a+Number(r.amount||0),0),count:rows.length};}
// Impide mostrar páginas privadas cuando no existe una sesión del rol correspondiente.
function authGuard(){if(ROLE==='citizen'&&session()?.role!=='citizen') {goLogin();return false;}if(ROLE==='admin'&&session()?.role!=='admin'){goLogin();return false;}return true;}
