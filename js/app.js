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



// Sincronización automática de cifras en tiempo real desde Google Sheets
const SPREADSHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR1ikLUsI2BQIuZy8TX8B_vdrjNxMCX_QJoEb64ggNQLDMneQzPFj2syzQQo5SO7wJh1qU-QNZZNDEv/pub?gid=0&single=true&output=csv";

async function sincronizarCifrasRecaudacion() {
  const elRecaudado = document.getElementById('stat-recaudado');
  const elInvertido = document.getElementById('stat-invertido');
  const elDisponible = document.getElementById('stat-disponible');

  if (!elRecaudado || !elInvertido || !elDisponible) return;

  try {
    // Añadimos timestamp para evitar caché agresivo del navegador
    const response = await fetch(SPREADSHEET_CSV_URL + '&_t=' + Date.now());
    if (!response.ok) return;

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) return;

    // Buscar la fila de cabeceras que contenga las palabras clave
    let headerRowIdx = -1;
    let colRecaudado = -1;
    let colInvertido = -1;
    let colDisponible = -1;

    for (let r = 0; r < rows.length; r++) {
      const row = rows[r].map(c => c.toUpperCase().trim());
      const idxDisp = row.lastIndexOf('DISPONIBLE');
      if (idxDisp !== -1) {
        headerRowIdx = r;
        colDisponible = idxDisp;
        // Buscar el INVERTIDO y RECAUDADO asociados a ese bloque
        colInvertido = row.lastIndexOf('INVERTIDO');
        colRecaudado = row.lastIndexOf('RECAUDADO');
        break;
      }
    }

    if (headerRowIdx !== -1 && colDisponible !== -1) {
      // Buscar la última fila con datos válidos después de la cabecera
      for (let r = rows.length - 1; r > headerRowIdx; r--) {
        const row = rows[r];
        const valDisp = row[colDisponible]?.trim();
        const valInv = row[colInvertido]?.trim();
        const valRec = row[colRecaudado]?.trim();

        if (valDisp || valRec) {
          if (valRec) elRecaudado.textContent = formatearMonto(valRec);
          if (valInv) elInvertido.textContent = formatearMonto(valInv);
          if (valDisp) elDisponible.textContent = formatearMonto(valDisp);
          break;
        }
      }
    }
  } catch (error) {
    console.warn("Sincronización en vivo no disponible, mostrando valores base.", error);
  }
}

// Función auxiliar para parsear CSV respetando comillas y comas
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

// Formatear montos de la hoja preservando símbolo (€ o $)
function formatearMonto(valor) {
  let v = valor.replace(/"/g, '').trim();
  return v;
}

// Ejecutar inmediatamente al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', sincronizarCifrasRecaudacion);
} else {
  sincronizarCifrasRecaudacion();
}
