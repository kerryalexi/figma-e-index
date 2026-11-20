/* =====================================================================
   08 - EVENTOS, ACCIONES Y ENVÍO DE FORMULARIOS
   Proyecto: EcoPoints | Caso de Estudio 2
   Este archivo contiene las funciones indicadas en el encabezado.
   ===================================================================== */
'use strict';

// Eventos globales: navegación móvil, cierre de sesión, campañas, validación y exportación.
// Se usa delegación de eventos porque el contenido de las páginas se genera dinámicamente.
// Mobile navigation and page interactions.
document.addEventListener('click',e=>{
 const tab=e.target.closest('[data-auth-tab]');if(tab){renderLoginTabs(tab.dataset.authTab);return;}
 if(e.target.closest('[data-menu-toggle]')){$('#navlinks')?.classList.toggle('open');return;}
 if(e.target.closest('[data-logout]')){localStorage.removeItem(K.session);goLogin();return;}
 const join=e.target.closest('[data-join-campaign]');if(join){const s=session();if(s?.role!=='citizen'){goLogin();return;}const joins=read(K.joins,[]);if(!joins.some(j=>j.id===join.dataset.joinCampaign&&j.email===s.email)){joins.push({id:join.dataset.joinCampaign,email:s.email,date:today()});write(K.joins,joins);join.textContent='Inscrito';join.disabled=true;toast('Tu participación quedó registrada en este navegador.');}return;}
 const review=e.target.closest('[data-review-record]');if(review){const rows=read(K.records,[]),r=rows.find(x=>x.id===review.dataset.reviewRecord);if(r){r.status=review.dataset.status; r.reviewedAt=today();write(K.records,rows);toast(`Registro ${r.status.toLowerCase()}.`);setTimeout(()=>location.reload(),350);}return;}
 const delCamp=e.target.closest('[data-delete-campaign]');if(delCamp){write(K.campaigns,read(K.campaigns,[]).filter(x=>x.id!==delCamp.dataset.deleteCampaign));location.reload();return;}
 const delCenter=e.target.closest('[data-delete-center]');if(delCenter){write(K.centers,read(K.centers,[]).filter(x=>x.id!==delCenter.dataset.deleteCenter));location.reload();return;}
 const exp=e.target.closest('[data-export]');if(exp){if(exp.dataset.export==='records'){csvDownload('ecopoints-registros.csv',[['Fecha','Correo','Material','Cantidad','Unidad','Punto','Estado'],...read(K.records,[]).map(r=>[r.date,r.email,r.material,r.amount,r.unit,r.center,r.status])]);}else{csvDownload('ecopoints-usuarios.csv',[['Nombre','Correo','Celular','Ciudad','Zona','Material de interés','Fecha de registro'],...read(K.users,[]).map(u=>[u.name,u.email,u.phone,u.city,u.zone,u.interests,u.createdAt])]);}toast('Se generó el archivo CSV.');}
});
// Búsqueda en tiempo real dentro de la guía y del directorio de acopio.
document.addEventListener('input',e=>{
 if(e.target.id==='material-search'){const q=e.target.value.toLowerCase();$$('.material-item').forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(q));}
 if(e.target.id==='center-search'){const q=e.target.value.toLowerCase();$$('#center-grid .card').forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(q));}
});
// Filtros por categoría de material en la guía educativa.
document.addEventListener('click',e=>{const filter=e.target.closest('[data-material-filter]');if(filter){$$('[data-material-filter]').forEach(b=>b.classList.toggle('active',b===filter));$$('.material-item').forEach(card=>card.hidden=filter.dataset.materialFilter!=='all'&&card.dataset.material!==filter.dataset.materialFilter);}});
// Formularios: autenticación, registro, reciclaje, perfil, campañas, puntos y organización.
document.addEventListener('submit',async e=>{
 const form=e.target;
 // Inicio de sesión del ciudadano: valida correo y contraseña contra el perfil guardado.
 if(form.id==='citizen-login-form'){e.preventDefault();const fd=new FormData(form),email=String(fd.get('email')).trim().toLowerCase(),password=await hashPassword(String(fd.get('password'))),u=read(K.users,[]).find(x=>x.email===email&&x.passwordHash===password);if(!u){$('#login-error').textContent='No se encontró una cuenta con esos datos. Revisa tu correo y contraseña.';return;}write(K.session,{role:'citizen',email:u.email,name:u.name});location.href=citizenURL('index.html');}
 // Registro del ciudadano: valida datos, evita correos duplicados y crea la sesión inicial.
 if(form.id==='citizen-register-form'){e.preventDefault();const fd=new FormData(form),name=String(fd.get('name')).trim(),email=String(fd.get('email')).trim().toLowerCase(),password=String(fd.get('password')),confirm=String(fd.get('confirm'));const err=$('#register-error');if(password!==confirm){err.textContent='Las contraseñas no coinciden.';return;}if(password.length<8){err.textContent='La contraseña debe tener al menos 8 caracteres.';return;}const users=read(K.users,[]);if(users.some(u=>u.email===email)){err.textContent='Ya existe una cuenta con ese correo electrónico.';return;}const user={id:crypto.randomUUID?.()||String(Date.now()),name,email,phone:String(fd.get('phone')).trim(),city:String(fd.get('city')).trim(),zone:String(fd.get('zone')).trim(),interests:String(fd.get('interests')),passwordHash:await hashPassword(password),createdAt:new Date().toISOString()};users.push(user);write(K.users,users);write(K.session,{role:'citizen',email:user.email,name:user.name});toast('Cuenta creada correctamente.');location.href=citizenURL('index.html');}
 // Acceso administrativo de demostración: verifica la clave fija y guarda datos del responsable.
 if(form.id==='admin-login-form'){e.preventDefault();const fd=new FormData(form);if(String(fd.get('key'))!==KEY){$('#admin-error').textContent='La clave administrativa no es correcta.';return;}const admin={role:'admin',name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim().toLowerCase(),organization:String(fd.get('organization')).trim()};write(K.session,admin);write(K.org,{name:admin.organization,email:admin.email,city:'Santa Cruz de la Sierra'});location.href=adminURL('index.html');}
 // Registro de reciclaje: guarda la entrega como Pendiente para revisión administrativa.
 if(form.id==='recycle-form'){e.preventDefault();const fd=new FormData(form),rows=read(K.records,[]),s=session();rows.push({id:crypto.randomUUID?.()||String(Date.now()),email:s.email,material:String(fd.get('material')),amount:Number(fd.get('amount')),unit:String(fd.get('unit')),date:String(fd.get('date')),center:String(fd.get('center')),note:String(fd.get('note')),status:'Pendiente',createdAt:new Date().toISOString()});write(K.records,rows);form.reset();toast('Registro enviado. Está pendiente de validación.');setTimeout(()=>location.href=citizenURL('7-historial.html'),700);}
 // Edición del perfil: actualiza los datos del ciudadano y conserva las relaciones por correo.
 if(form.id==='profile-form'){e.preventDefault();const fd=new FormData(form),users=read(K.users,[]),s=session(),u=users.find(x=>x.email===s.email),email=String(fd.get('email')).trim().toLowerCase();if(users.some(x=>x.email===email&&x.id!==u.id)){ $('#profile-message').textContent='Ese correo ya está asociado a otra cuenta.';return;}u.name=String(fd.get('name')).trim();u.email=email;u.phone=String(fd.get('phone')).trim();u.city=String(fd.get('city')).trim();u.zone=String(fd.get('zone')).trim();u.interests=String(fd.get('interests'));const activityRecords=read(K.records,[]);activityRecords.forEach(r=>{if(r.email===s.email)r.email=email;});write(K.records,activityRecords);const campaignJoins=read(K.joins,[]);campaignJoins.forEach(j=>{if(j.email===s.email)j.email=email;});write(K.joins,campaignJoins);write(K.users,users);write(K.session,{role:'citizen',email:u.email,name:u.name});$('#profile-message').textContent='Tus datos se actualizaron correctamente.';toast('Perfil actualizado.');}
 // Cambio de contraseña: comprueba la clave actual y la longitud de la nueva.
 if(form.id==='password-form'){e.preventDefault();const fd=new FormData(form),users=read(K.users,[]),s=session(),u=users.find(x=>x.email===s.email),oldHash=await hashPassword(String(fd.get('old')));if(u.passwordHash!==oldHash){$('#password-message').textContent='La contraseña actual no coincide.';return;}if(String(fd.get('next')).length<8){$('#password-message').textContent='La nueva contraseña debe tener al menos 8 caracteres.';return;}u.passwordHash=await hashPassword(String(fd.get('next')));write(K.users,users);form.reset();$('#password-message').textContent='La contraseña se actualizó correctamente.';}
 // Gestión de campañas: crea una nueva actividad ambiental.
 if(form.id==='admin-campaign-form'){e.preventDefault();const fd=new FormData(form),rows=read(K.campaigns,[]);rows.push({id:crypto.randomUUID?.()||String(Date.now()),title:String(fd.get('title')).trim(),date:String(fd.get('date')),place:String(fd.get('place')).trim(),materials:String(fd.get('materials')).trim(),description:String(fd.get('description')).trim(),demo:false});write(K.campaigns,rows);location.reload();}
 // Gestión de acopios: agrega un nuevo punto de recepción de materiales.
 if(form.id==='admin-center-form'){e.preventDefault();const fd=new FormData(form),rows=read(K.centers,[]);rows.push({id:crypto.randomUUID?.()||String(Date.now()),name:String(fd.get('name')).trim(),city:String(fd.get('city')).trim(),zone:String(fd.get('zone')).trim(),hours:String(fd.get('hours')).trim(),address:String(fd.get('address')).trim(),materials:String(fd.get('materials')).trim(),demo:false});write(K.centers,rows);location.reload();}
 // Configuración institucional: actualiza los datos de la organización.
 if(form.id==='org-form'){e.preventDefault();const fd=new FormData(form);write(K.org,{name:String(fd.get('name')).trim(),email:String(fd.get('email')).trim(),city:String(fd.get('city')).trim()});toast('Configuración guardada.');}
});
