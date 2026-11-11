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

// Copiado de datos de pago (Formato estándar bancario venezolano compatible con auto-pegado tipo Cashea)
function copiarDatosPago(btn) {
  // Las aplicaciones bancarias (BDV, Banesco, Mercantil, Bancamiga, etc.) exigen:
  // 1. Código numérico de 4 dígitos (0105)
  // 2. Prefijo V/J y Cédula sin puntos
  // 3. Teléfono de 11 dígitos continuos sin guiones
  const datos = "Banco: 0105 - Banco Mercantil\nCédula: V30682297\nTeléfono: 04128829844";
  copiarTextoUniversal(datos, btn, "¡Datos de Pago Móvil copiados!");
}

// Copiado individual de campos rápidos
function copiarCampoIndividual(texto, btn, nombreCampo) {
  copiarTextoUniversal(texto, btn, `¡${nombreCampo} copiado!`);
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

// Sincronización transparente en segundo plano (Zero-flicker & Anti-bloqueo)
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1ikLUsI2BQIuZy8TX8B_vdrjNxMCX_QJoEb64ggNQLDMneQzPFj2syzQQo5SO7wJh1qU-QNZZNDEv/pub?gid=0&single=true&output=csv";
const SHEET_GVIZ_URL = "https://docs.google.com/spreadsheets/d/1BLJJaoYRZSuFmsMlM6fCOWwi_tjFhtKGDzfZ6i-gbgY/gviz/tq?tqx=out:csv";

async function sincronizarCifrasRecaudacion() {
  const elRec = document.getElementById('stat-recaudado');
  const elInv = document.getElementById('stat-invertido');
  const elDisp = document.getElementById('stat-disponible');

  if (!elRec || !elInv || !elDisp) return;

  // Cargar inmediatamente desde caché si existe (0 milisegundos de espera)
  try {
    const cached = JSON.parse(localStorage.getItem('ergos_cifras_cache') || 'null');
    if (cached) {
      if (cached.rec) elRec.textContent = cached.rec;
      if (cached.inv) elInv.textContent = cached.inv;
      if (cached.disp) elDisp.textContent = cached.disp;
    }
  } catch(e) {}

  // Consulta en segundo plano con límite de tiempo de 3 segundos
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    let csvText = null;
    
    // Intento 1: URL publicada
    try {
      const res = await fetch(SHEET_CSV_URL, { signal: controller.signal, cache: 'no-cache' });
      if (res.ok) csvText = await res.text();
    } catch(err) {}

    // Intento 2: GViz API si falló el primero
    if (!csvText) {
      try {
        const res2 = await fetch(SHEET_GVIZ_URL, { signal: controller.signal, cache: 'no-cache' });
        if (res2.ok) csvText = await res2.text();
      } catch(err) {}
    }

    clearTimeout(timeoutId);

    if (!csvText) return; // Si Google bloquea por exceso de recargas, mantiene los valores actuales sin romper nada

    const rows = parseCSV(csvText);
    if (rows.length < 2) return;

    let headerIdx = -1, cRec = -1, cInv = -1, cDisp = -1;

    for (let r = 0; r < rows.length; r++) {
      const row = rows[r].map(c => (c || '').toUpperCase().trim());
      const idx = row.lastIndexOf('DISPONIBLE');
      if (idx !== -1) {
        headerIdx = r;
        cDisp = idx;
        cInv = row.lastIndexOf('INVERTIDO');
        cRec = row.lastIndexOf('RECAUDADO');
        break;
      }
    }

    if (headerIdx !== -1 && cDisp !== -1) {
      for (let r = rows.length - 1; r > headerIdx; r--) {
        const row = rows[r];
        const vDisp = row[cDisp]?.trim();
        const vInv = row[cInv]?.trim();
        const vRec = row[cRec]?.trim();

        if (vDisp || vRec) {
          const nRec = formatearMonto(vRec || '');
          const nInv = formatearMonto(vInv || '');
          const nDisp = formatearMonto(vDisp || '');

          if (nRec && elRec.textContent !== nRec) elRec.textContent = nRec;
          if (nInv && elInv.textContent !== nInv) elInv.textContent = nInv;
          if (nDisp && elDisp.textContent !== nDisp) elDisp.textContent = nDisp;

          try {
            localStorage.setItem('ergos_cifras_cache', JSON.stringify({ rec: nRec, inv: nInv, disp: nDisp }));
          } catch(e) {}
          break;
        }
      }
    }
  } catch(e) {
    // Falla silenciosa: nunca muestra "Cargando...", mantiene siempre las cifras reales
  }
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  return lines.map(line => {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

function formatearMonto(valor) {
  return valor.replace(/"/g, '').trim();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', sincronizarCifrasRecaudacion);
} else {
  sincronizarCifrasRecaudacion();
}
