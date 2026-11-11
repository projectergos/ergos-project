/**
 * ERGOS PROJECT - LÓGICA DE INTERACCIÓN Y NAVEGACIÓN
 */

// Navegación fluida entre pestañas
function showSection(sectionId) {
  const viewInicio = document.getElementById('view-inicio');
  const viewQuienes = document.getElementById('view-quienes-somos');
  const viewServicios = document.getElementById('view-servicios');

  const btnInicio = document.getElementById('btn-nav-inicio');
  const btnQuienes = document.getElementById('btn-nav-quienes');
  const btnServicios = document.getElementById('btn-nav-servicios');

  const mBtnInicio = document.getElementById('m-btn-inicio');
  const mBtnQuienes = document.getElementById('m-btn-quienes');
  const mBtnServicios = document.getElementById('m-btn-servicios');

  // Ocultar todas las vistas
  viewInicio.classList.add('hidden');
  viewQuienes.classList.add('hidden');
  viewServicios.classList.add('hidden');

  // Resetear estados de escritorio
  [btnInicio, btnQuienes, btnServicios].forEach(btn => {
    if (btn) {
      btn.classList.remove('bg-gray-100', 'text-gray-900');
      btn.classList.add('text-gray-600');
    }
  });

  // Resetear estados móviles
  [mBtnInicio, mBtnQuienes, mBtnServicios].forEach(btn => {
    if (btn) {
      btn.classList.remove('bg-gray-100', 'text-gray-900');
      btn.classList.add('text-gray-600');
    }
  });

  // Activar la vista correspondiente
  if (sectionId === 'quienes-somos') {
    viewQuienes.classList.remove('hidden');
    btnQuienes.classList.add('bg-gray-100', 'text-gray-900');
    btnQuienes.classList.remove('text-gray-600');
    if (mBtnQuienes) {
      mBtnQuienes.classList.add('bg-gray-100', 'text-gray-900');
      mBtnQuienes.classList.remove('text-gray-600');
    }
  } else if (sectionId === 'servicios') {
    viewServicios.classList.remove('hidden');
    btnServicios.classList.add('bg-gray-100', 'text-gray-900');
    btnServicios.classList.remove('text-gray-600');
    if (mBtnServicios) {
      mBtnServicios.classList.add('bg-gray-100', 'text-gray-900');
      mBtnServicios.classList.remove('text-gray-600');
    }
  } else {
    viewInicio.classList.remove('hidden');
    btnInicio.classList.add('bg-gray-100', 'text-gray-900');
    btnInicio.classList.remove('text-gray-600');
    if (mBtnInicio) {
      mBtnInicio.classList.add('bg-gray-100', 'text-gray-900');
      mBtnInicio.classList.remove('text-gray-600');
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Desplazamiento a canales de colaboración
function irAColaboracion() {
  const viewInicio = document.getElementById('view-inicio');
  if (viewInicio.classList.contains('hidden')) {
    showSection('inicio');
  }
  setTimeout(() => {
    const target = document.getElementById('colaboracion');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 80);
}

// Control del menú lateral en móviles
function toggleMobileMenu(abrir) {
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const container = document.getElementById('drawer-container');

  if (abrir) {
    container.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
  } else {
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    drawer.classList.remove('translate-x-0');
    drawer.classList.add('translate-x-full');
    setTimeout(() => {
      container.classList.add('pointer-events-none');
    }, 300);
  }
}

// Copiado de datos de pago
function copiarDatosPago(btn) {
  const datos = "Banco: Mercantil\nC.I.: 30.682.297\nTeléfono: 0412-8829844";
  copiarTextoUniversal(datos, btn, "¡Copiado con éxito!");
}

// Copiado de Instagram
function copiarInstagram(btn) {
  copiarTextoUniversal("@ergosproject", btn, "¡Usuario copiado!");
}

// Función universal de copiado con fallback
function copiarTextoUniversal(texto, elemento, mensajeExito) {
  const textoOriginal = elemento.innerHTML;
  
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto).then(() => {
      mostrarFeedback(elemento, textoOriginal, mensajeExito);
    }).catch(() => {
      fallbackCopiaManual(texto, elemento, textoOriginal, mensajeExito);
    });
  } else {
    fallbackCopiaManual(texto, elemento, textoOriginal, mensajeExito);
  }
}

function fallbackCopiaManual(texto, elemento, textoOriginal, mensajeExito) {
  try {
    const areaTemp = document.createElement("textarea");
    areaTemp.value = texto;
    areaTemp.style.position = "fixed";
    areaTemp.style.left = "-9999px";
    areaTemp.style.top = "0";
    document.body.appendChild(areaTemp);
    areaTemp.focus();
    areaTemp.select();
    document.execCommand('copy');
    document.body.removeChild(areaTemp);
    mostrarFeedback(elemento, textoOriginal, mensajeExito);
  } catch (err) {
    alert("Información:\n" + texto);
  }
}

function mostrarFeedback(elemento, originalHTML, mensaje) {
  elemento.innerHTML = `<i class="fa-solid fa-check mr-2"></i>${mensaje}`;
  elemento.classList.add('bg-emerald-600');
  setTimeout(() => {
    elemento.innerHTML = originalHTML;
    elemento.classList.remove('bg-emerald-600');
  }, 2200);
}
