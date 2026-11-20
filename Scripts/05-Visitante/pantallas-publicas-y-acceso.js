/* =====================================================================
   05 - PANTALLAS PÚBLICAS, INICIO DE SESIÓN Y REGISTRO
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Genera la página de bienvenida principal de EcoPoints.
function renderWelcome(){return `<section class="hero"><div class="container hero-grid"><div><span class="eyebrow">♻ Reciclaje y participación ambiental</span><h1>Pequeñas acciones.<br><span>Grandes cambios.</span></h1><p>Aprende a separar tus residuos, encuentra lugares de entrega y descubre cómo cada acción puede contribuir a un entorno más limpio.</p><div class="hero-actions"><a class="btn" href="${visitorURL('1-inicio.html')}">Explorar EcoPoints →</a><a class="btn secondary" href="${visitorURL('7-crear-cuenta.html')}">Crear mi cuenta</a></div><div class="stats-strip"><div class="stat-mini"><strong>Aprende</strong><small>Guías claras para separar.</small></div><div class="stat-mini"><strong>Encuentra</strong><small>Consulta puntos de acopio.</small></div><div class="stat-mini"><strong>Participa</strong><small>Registra tus acciones.</small></div></div></div><div class="hero-art"><img src="${img('hero-eco.svg')}" alt="Ilustración de reciclaje, contenedor y naturaleza"></div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="kicker">Conoce la plataforma</span><h2>Tu camino para reciclar mejor</h2><p>EcoPoints reúne información y herramientas para ayudarte antes, durante y después de reciclar.</p></div></div><div class="grid three"><article class="card"><div class="iconbox">📘</div><h3>Aprende a clasificar</h3><p>Identifica plástico, papel, cartón, vidrio y aluminio, y conoce cómo prepararlos.</p><a class="card-link" href="${visitorURL('2-guia-reciclaje.html')}">Consultar la guía →</a></article><article class="card"><div class="iconbox">📍</div><h3>Encuentra dónde entregar</h3><p>Explora puntos de acopio y revisa qué materiales recibe cada lugar.</p><a class="card-link" href="${visitorURL('3-puntos-acopio.html')}">Ver puntos de acopio →</a></article><article class="card"><div class="iconbox">🌱</div><h3>Mantén el hábito</h3><p>Registra tus actividades, consulta tus avances y participa en campañas.</p><a class="card-link" href="${visitorURL('6-inicio-sesion.html')}">Comenzar ahora →</a></article></div></div></section><section class="section soft"><div class="container two-col"><div><span class="kicker">El valor de tu aporte</span><h2 class="page-title">Haz visible tu compromiso ambiental</h2><p class="muted">Con una cuenta personal puedes guardar tus registros, consultar puntos acumulados y observar tu progreso. Los puntos son un incentivo de participación, no una medida científica del impacto ambiental.</p><a class="btn" href="${visitorURL('7-crear-cuenta.html')}">Crear cuenta ciudadana</a></div><img src="${img('impact.svg')}" alt="Ilustración de impacto ambiental" style="border-radius:22px;width:100%"></div></section>`;}
// Selecciona y renderiza las páginas públicas según el identificador PAGE.
function renderVisitor(){
 // Página de bienvenida: explica el propósito y las principales rutas de la plataforma.
 if(PAGE==='welcome') return renderWelcome();
 // Inicio público: presenta accesos directos a guía, puntos de acopio y campañas.
 if(PAGE==='inicio') return `<section class="hero"><div class="container hero-grid"><div><span class="eyebrow">♻ Bienvenido a EcoPoints</span><h1>Reciclar mejor empieza con <span>información clara.</span></h1><p>Conoce cómo separar tus residuos, ubica puntos de acopio y descubre actividades ambientales para participar.</p><div class="hero-actions"><a class="btn" href="2-guia-reciclaje.html">Aprender a reciclar</a><a class="btn secondary" href="3-puntos-acopio.html">Encontrar un punto</a></div></div><div class="hero-art"><img src="${img('hero-eco.svg')}" alt="Ilustración de reciclaje"></div></div></section><section class="section"><div class="container"><div class="section-head"><div><span class="kicker">Empieza por aquí</span><h2>Herramientas para tus acciones diarias</h2></div></div><div class="grid three"><article class="card"><div class="iconbox">♻️</div><h3>Guía de reciclaje</h3><p>Consulta qué materiales se pueden separar y cómo prepararlos.</p><a class="card-link" href="2-guia-reciclaje.html">Ver guía →</a></article><article class="card"><div class="iconbox">📍</div><h3>Puntos de acopio</h3><p>Explora información de lugares de entrega.</p><a class="card-link" href="3-puntos-acopio.html">Explorar puntos →</a></article><article class="card"><div class="iconbox">🤝</div><h3>Campañas ambientales</h3><p>Conoce actividades comunitarias y formas de participar.</p><a class="card-link" href="4-campañas.html">Ver campañas →</a></article></div></div></section><section class="section soft"><div class="container two-col"><img src="${img('community.svg')}" alt="Comunidad participando en actividades ambientales"><div><span class="kicker">Participación continua</span><h2 class="page-title">No tienes que hacerlo solo.</h2><p class="muted">Crea tu cuenta para registrar reciclajes, establecer metas y visualizar tus avances.</p><a class="btn" href="7-crear-cuenta.html">Crear cuenta ciudadana</a></div></div></section>`;
 // Guía: muestra materiales, recomendaciones, búsqueda y filtros por categoría.
 if(PAGE==='guia') return `${pageHero('Aprende','Guía de reciclaje','Busca un material y revisa recomendaciones generales para prepararlo antes de llevarlo a un punto de acopio. La aceptación final depende de cada centro.') }<section class="page-content"><div class="container"><div class="search-row"><input id="material-search" placeholder="Buscar material o residuo..." aria-label="Buscar material"><button class="filter-chip active" data-material-filter="all">Todos</button><button class="filter-chip" data-material-filter="Plástico">Plástico</button><button class="filter-chip" data-material-filter="Papel y cartón">Papel y cartón</button><button class="filter-chip" data-material-filter="Vidrio">Vidrio</button><button class="filter-chip" data-material-filter="Aluminio">Aluminio</button></div><div class="grid two" id="material-grid">${materialsHTML()}</div><div class="notice info" style="margin-top:20px">Antes de entregar un material, consulta las condiciones del punto de acopio: algunos centros tienen requisitos específicos de limpieza, separación o presentación.</div></div></section>`;
 // Acopios públicos: muestra directorio, búsqueda y aviso de datos demostrativos.
 if(PAGE==='acopio') return `${pageHero('Encuentra','Puntos de acopio','Consulta qué materiales recibe cada lugar y verifica su dirección y horario antes de desplazarte. Los puntos actuales son datos ilustrativos para el prototipo.') }<section class="page-content"><div class="container content-stack"><div class="notice"><b>Datos de demostración:</b> los puntos que aparecen a continuación no son establecimientos verificados. Deben reemplazarse por direcciones y horarios confirmados antes de publicar la plataforma.</div><div class="search-row"><input id="center-search" placeholder="Buscar por nombre, ciudad o material..."></div><div class="two-col"><div class="map-placeholder"><div class="map-center"><div class="pin">📍</div><b>Mapa de puntos de acopio</b><div class="muted" style="font-size:.83rem">Vista ilustrativa del prototipo</div></div></div><div class="card"><span class="kicker">Antes de visitar</span><h3>Verifica la información</h3><p>Confirma que el punto esté activo, qué materiales recibe y cuál es su horario actualizado.</p><p class="muted">Los administradores podrán mantener este directorio desde su panel.</p></div></div><div class="grid two" id="center-grid">${centerCards()}</div></div></section>`;
 // Campañas públicas: permite conocer actividades antes de crear una cuenta.
 if(PAGE==='campanas') return `${pageHero('Participa','Campañas ambientales','Conoce actividades y oportunidades para colaborar con otras personas. Para inscribirte y guardar tu participación, crea una cuenta ciudadana.') }<section class="page-content"><div class="container"><div class="notice info" style="margin-bottom:18px">Las actividades señaladas como ejemplo son contenido demostrativo y no representan eventos confirmados.</div><div class="grid two">${campaignCards(false)}</div><div style="margin-top:24px"><a class="btn" href="7-crear-cuenta.html">Crear cuenta para participar</a></div></div></section>`;
 // Información institucional: describe propósito y ejes de EcoPoints.
 if(PAGE==='informacion') return `${pageHero('Conócenos','Sobre EcoPoints','Una propuesta digital para facilitar la educación, la participación y el seguimiento de acciones de reciclaje.') }<section class="page-content"><div class="container content-stack"><div class="two-col"><div class="card"><span class="kicker">Nuestro propósito</span><h2>Hacer que reciclar sea más sencillo y constante.</h2><p>EcoPoints busca responder a tres barreras: la falta de información para clasificar residuos, el desconocimiento de lugares de entrega y la desmotivación cuando las personas no perciben sus avances.</p></div><img src="${img('community.svg')}" alt="Ilustración de participación comunitaria" style="width:100%;border-radius:20px"></div><div class="grid three"><article class="card"><div class="iconbox">📚</div><h3>Educación</h3><p>Información sencilla para reconocer y preparar materiales reciclables.</p></article><article class="card"><div class="iconbox">📍</div><h3>Acceso</h3><p>Información organizada sobre puntos de acopio y campañas.</p></article><article class="card"><div class="iconbox">🌱</div><h3>Continuidad</h3><p>Herramientas para registrar actividades y visualizar avances.</p></article></div><div class="notice info">EcoPoints es un prototipo académico. La información de campañas, puntos, recompensas y resultados debe validarse antes de operar en un entorno real.</div></div></section>`;
 // Acceso: muestra los formularios de ingreso ciudadano y administrador.
 if(PAGE==='login') return renderLogin();
 // Registro: muestra el formulario independiente de creación de cuenta ciudadana.
 if(PAGE==='register') return renderRegister();
 return renderWelcome();
}


// Construye los formularios de inicio de sesión ciudadano y administrativo.
function renderLogin(){
 return `<section class="auth-wrap auth-login-page"><div class="container auth-grid">
  <aside class="auth-aside">
   <span class="eyebrow auth-eyebrow">Bienvenido a EcoPoints</span>
   <h2>Tu compromiso con el ambiente comienza aquí.</h2>
   <p>Accede a tu espacio para registrar tus actividades, consultar tus avances o gestionar la plataforma ambiental.</p>
   <img src="${img('hero-eco.svg')}" alt="Ilustración de reciclaje y naturaleza">
  </aside>
  <section class="auth-box">
   <div class="auth-tabs" role="tablist" aria-label="Tipo de acceso">
    <button class="active" type="button" data-auth-tab="citizen-login" role="tab" aria-selected="true">Ciudadano</button>
    <button type="button" data-auth-tab="admin-login" role="tab" aria-selected="false">Administrador</button>
   </div>
   <div class="auth-panel" id="panel-citizen-login" role="tabpanel">
    <div class="auth-heading"><span class="kicker">Cuenta ciudadana</span><h3>Iniciar sesión</h3><p>Ingresa con el correo y la contraseña que registraste.</p></div>
    <form id="citizen-login-form" class="content-stack">
     <div class="field"><label for="login-email">Correo electrónico *</label><input id="login-email" name="email" type="email" required autocomplete="email" placeholder="nombre@correo.com"></div>
     <div class="field"><label for="login-password">Contraseña *</label><input id="login-password" name="password" type="password" required autocomplete="current-password" placeholder="Tu contraseña"></div>
     <div id="login-error" class="help" role="alert"></div>
     <button class="btn auth-submit" type="submit">Ingresar a mi cuenta</button>
    </form>
    <div class="auth-register-cta">
     <div><strong>¿Todavía no tienes una cuenta?</strong><span>Regístrate para guardar tus actividades y consultar tus puntos.</span></div>
     <a class="btn secondary" href="${visitorURL('7-crear-cuenta.html')}">Registrarse</a>
    </div>
   </div>
   <div class="auth-panel" id="panel-admin-login" role="tabpanel" hidden>
    <div class="auth-heading"><span class="kicker">Acceso institucional</span><h3>Acceso administrativo</h3><p>Completa los datos del responsable e introduce la clave asignada a la demostración.</p></div>
    <form id="admin-login-form" class="content-stack">
     <div class="field"><label for="admin-name">Nombre del responsable *</label><input id="admin-name" name="name" required autocomplete="name" placeholder="Nombre completo"></div>
     <div class="field"><label for="admin-email">Correo de contacto *</label><input id="admin-email" name="email" type="email" required autocomplete="email" placeholder="organizacion@correo.com"></div>
     <div class="field"><label for="admin-org">Organización *</label><input id="admin-org" name="organization" required placeholder="Nombre de la organización"></div>
     <div class="field"><label for="admin-key">Clave administrativa *</label><input id="admin-key" name="key" type="password" required autocomplete="current-password" placeholder="Introduce la clave"></div>
     <div id="admin-error" class="help" role="alert"></div>
     <button class="btn auth-submit" type="submit">Entrar al panel administrativo</button>
    </form>
    <div class="notice auth-security-note">Acceso de demostración académica. La clave se valida en el navegador y no representa una protección adecuada para una aplicación publicada.</div>
   </div>
  </section>
 </div></section>`;
}
// Construye el formulario independiente de creación de cuenta ciudadana.
function renderRegister(){
 return `<section class="auth-wrap auth-register-page"><div class="container auth-grid">
  <aside class="auth-aside">
   <span class="eyebrow auth-eyebrow">Únete a EcoPoints</span>
   <h2>Empieza con una acción. Construye un hábito.</h2>
   <p>Crea tu cuenta para registrar tus reciclajes, encontrar tus avances y participar en actividades ambientales.</p>
   <img src="${img('community.svg')}" alt="Personas participando en acciones ambientales">
   <div class="auth-benefit-list"><span>✓ Guarda tus actividades</span><span>✓ Consulta tus puntos y logros</span><span>✓ Mantén actualizado tu perfil</span></div>
  </aside>
  <section class="auth-box auth-register-box">
   <div class="auth-heading"><span class="kicker">Registro ciudadano</span><h3>Crear cuenta</h3><p>Completa todos los campos obligatorios para configurar tu perfil.</p></div>
   <form id="citizen-register-form" class="form-grid">
    <div class="field full"><label for="reg-name">Nombre completo *</label><input id="reg-name" name="name" required minlength="3" autocomplete="name" placeholder="Nombre y apellidos"></div>
    <div class="field"><label for="reg-email">Correo electrónico *</label><input id="reg-email" name="email" type="email" required autocomplete="email" placeholder="nombre@correo.com"></div>
    <div class="field"><label for="reg-phone">Celular *</label><input id="reg-phone" name="phone" type="tel" required minlength="7" autocomplete="tel" placeholder="Ej. 70000000"></div>
    <div class="field"><label for="reg-city">Ciudad *</label><input id="reg-city" name="city" required autocomplete="address-level2" placeholder="Ej. Santa Cruz de la Sierra"></div>
    <div class="field"><label for="reg-zone">Zona o barrio *</label><input id="reg-zone" name="zone" required autocomplete="address-level3" placeholder="Tu zona o barrio"></div>
    <div class="field"><label for="reg-password">Contraseña *</label><input id="reg-password" name="password" type="password" required minlength="8" autocomplete="new-password" placeholder="Mínimo 8 caracteres"><span class="help">Utiliza al menos 8 caracteres.</span></div>
    <div class="field"><label for="reg-confirm">Confirmar contraseña *</label><input id="reg-confirm" name="confirm" type="password" required minlength="8" autocomplete="new-password" placeholder="Repite tu contraseña"></div>
    <div class="field full"><label for="reg-interests">Materiales que te interesa reciclar</label><select id="reg-interests" name="interests"><option value="Todos los materiales">Todos los materiales</option><option>Plástico</option><option>Papel y cartón</option><option>Vidrio</option><option>Aluminio</option></select></div>
    <div class="field full"><label class="checkline"><input type="checkbox" name="terms" required> Confirmo que los datos son correctos y acepto las condiciones de uso del prototipo.</label></div>
    <div class="field full"><div id="register-error" class="help" role="alert"></div><button class="btn auth-submit" type="submit">Crear mi cuenta</button></div>
   </form>
   <div class="auth-back-link"><span>¿Ya tienes una cuenta?</span><a href="${visitorURL('6-inicio-sesion.html')}">Volver a iniciar sesión</a></div>
   <p class="help auth-form-note">Después de registrarte, encontrarás tus datos en <strong>Mi perfil</strong>, donde podrás modificarlos cuando lo necesites.</p>
  </section>
 </div></section>`;
}
