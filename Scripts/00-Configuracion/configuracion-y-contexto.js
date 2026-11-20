/* =====================================================================
   00 - CONFIGURACIÓN Y CONTEXTO GLOBAL
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Identifica los datos de la página actual para decidir qué interfaz mostrar.
const body = document.body;
const ROLE = body.dataset.role || 'visitor';
const PAGE = body.dataset.page || 'welcome';
const ROOT = body.dataset.root || './';
// Clave fija solicitada para la demostración administrativa; no es segura para producción.
const KEY = 'EcoPoints2026'; // Clave de demostración solicitada; no es un mecanismo seguro para producción.
// Nombres de las colecciones guardadas en localStorage.
const K = {users:'ep_users',session:'ep_session',records:'ep_records',campaigns:'ep_campaigns',centers:'ep_centers',joins:'ep_joins',org:'ep_org'};
const $ = (s,ctx=document)=>ctx.querySelector(s);
const $$ = (s,ctx=document)=>[...ctx.querySelectorAll(s)];
// Lee información del navegador y devuelve un valor alternativo si no existe o está dañada.
const read = (key, fallback=[]) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
// Guarda información serializada en el almacenamiento local del navegador.
const write = (key,value) => localStorage.setItem(key,JSON.stringify(value));
// Protege los textos insertados en plantillas HTML frente a caracteres especiales.
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const moneyless = n => new Intl.NumberFormat('es-BO',{maximumFractionDigits:1}).format(Number(n)||0);
const today = () => new Date().toISOString().slice(0,10);
const img = name => `${ROOT}Imagen/${name}`;
// Construye rutas para cada área de la plataforma, respetando la carpeta raíz de la página.
const visitorURL = name => `${ROOT}Barra-Visitante/${name}`;
const citizenURL = name => `${ROOT}Usuario-Registrado/User-ciudadano/${name}`;
const adminURL = name => `${ROOT}Usuario-Registrado/User-administrador/${name}`;
const goLogin = () => { location.href = visitorURL('6-inicio-sesion.html'); };
