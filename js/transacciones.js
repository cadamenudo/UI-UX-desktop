// ========== FLATPICKR ==========
flatpickr("#desde", { dateFormat: "d/m/Y" });
flatpickr("#hasta", { dateFormat: "d/m/Y" });

// ========== MODALES ==========
function abrirModal() {
  document.getElementById("modalCategorias")?.classList.remove("oculto");
}
function cerrarModal() {
  document.getElementById("modalCategorias")?.classList.add("oculto");
}
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;

// ========== GRAFICO DONA INGRESOS ==========
const charts = {
  graficoIngresos: null,
  graficoAhorros: null
};

const dataValoresIngresos = [14000, 3500, 2100];

const centroDonaIngresos = {
  id: 'centroTextoIngresos',
  beforeDraw(chart) {
    const { width, height } = chart;
    const ctx = chart.ctx;
    const total = dataValoresIngresos.reduce((a, b) => a + b, 0);
    ctx.restore();
    ctx.font = '700 24px "Greycliff CF", sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(`$${total.toLocaleString("en-US")}`, width / 2, height / 2);
    ctx.save();
  }
};

function dibujarDonaIngresos() {
  const canvasIngresos = document.getElementById('graficoIngresos');
  if (!canvasIngresos) return;

  const totalIngresos = dataValoresIngresos.reduce((a, b) => a + b, 0);

  charts.graficoIngresos = new Chart(canvasIngresos, {
    type: 'doughnut',
    data: {
      labels: ['Sueldo', 'Freelance', 'Otros'],
      datasets: [{
        data: dataValoresIngresos,
        backgroundColor: ['#7D4AEA', '#9E75F0', '#C3B4FB'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '65%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#FFFFFF",
          titleColor: "#1e293b",
          bodyColor: "#1e293b",
          borderColor: "#E2E8F0",
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              const porcentaje = ((valor / totalIngresos) * 100).toFixed(1);
              return `${context.label}: $${valor.toLocaleString("en-US")} (${porcentaje}%)`;
            }
          }
        }
      }
    },
    plugins: [centroDonaIngresos]
  });
}

window.dibujarDonaIngresos = dibujarDonaIngresos;

// ========== GRAFICO DONA GASTOS ==========
const categorias = {
  general: {
    labels: ["Alimentación", "Transporte", "Hogar", "Deudas"],
    data: [600, 300, 400, 500],
    colors: ["#F472B6", "#FBBF24", "#60A5FA", "#A78BFA"]
  },
  alimentacion: {
    labels: ["Supermercado", "Restaurantes", "Café"],
    data: [350, 180, 70],
    colors: ["#FDA4AF", "#F9A8D4", "#FBCFE8"]
  },
  transporte: {
    labels: ["Gasolina", "Uber", "Seguro Auto"],
    data: [120, 100, 80],
    colors: ["#FCD34D", "#FDE68A", "#FEF9C3"]
  },
  hogar: {
    labels: ["Alquiler", "Electricidad", "Internet"],
    data: [300, 70, 30],
    colors: ["#93C5FD", "#BFDBFE", "#DBEAFE"]
  },
  deudas: {
    labels: ["Préstamo Estudiantil", "Tarjeta Crédito", "Préstamo Auto"],
    data: [200, 180, 120],
    colors: ["#DDD6FE", "#C4B5FD", "#A78BFA"]
  }
};

let chart;
let tipoActivo = "general";

function renderChart(tipo) {
  const ctx = document.getElementById("graficoGastos")?.getContext("2d");
  if (!ctx) return;
  const { labels, data, colors } = categorias[tipo];
  const total = data.reduce((a, b) => a + b, 0);
  tipoActivo = tipo;
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#FFFFFF",
          titleColor: "#0f172a",
          bodyColor: "#0f172a",
          borderColor: "#E5E7EB",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              const porcentaje = ((valor / total) * 100).toFixed(1);
              return `${context.label}: $${valor.toLocaleString("en-US")} (${porcentaje}%)`;
            }
          }
        }
      }
    },
    plugins: [{
      id: 'centroTexto',
      beforeDraw(chart) {
        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (tipoActivo !== 'general') {
          const nombre = tipoActivo.charAt(0).toUpperCase() + tipoActivo.slice(1);
          ctx.font = '600 16px "Greycliff CF", sans-serif';
          ctx.fillStyle = '#64748B';
          ctx.fillText(nombre, width / 2, height / 2 - 18);
          ctx.font = '700 32px "Greycliff CF", sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText(`$${total.toLocaleString("en-US")}`, width / 2, height / 2 + 12);
        } else {
          ctx.font = '700 32px "Greycliff CF", sans-serif';
          ctx.fillStyle = '#0f172a';
          ctx.fillText(`$${total.toLocaleString("en-US")}`, width / 2, height / 2);
        }

        ctx.save();
      }
    }]
  });

  cerrarModal();
}
renderChart("general");
window.renderChart = renderChart;

// ========== GRAFICO DONA AHORRO ==========
  const ctx = canvasAhorros.getContext("2d");
  charts.graficoAhorros = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: etiquetas,
      datasets: [{
        data: dataValores,
        backgroundColor: colores,
        borderWidth: 0
      }]
    },
        function dibujarDonaAhorro() {
  const dataValores = [700, 400, 300];
  const etiquetas = ["Emergencia", "Retiro", "Vacaciones"];
  const colores = ["#34D399", "#6EE7B7", "#A7F3D0"];
  const total = dataValores.reduce((a, b) => a + b, 0);
  const canvasAhorros = document.getElementById("graficoAhorros");
  if (!canvasAhorros) return;
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#FFFFFF",
          titleColor: "#0f172a",
          bodyColor: "#0f172a",
          borderColor: "#E5E7EB",
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          callbacks: {
            label: function(context) {
              const valor = context.raw;
              const porcentaje = ((valor / total) * 100).toFixed(1);
              return `${context.label}: $${valor.toLocaleString("en-US")} (${porcentaje}%)`;
            }
          }
        }
      }
    },
    plugins: [{
      id: 'centroTextoAhorro',
      beforeDraw(chart) {
        const { width, height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '700 32px "Greycliff CF", sans-serif';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(`$${total.toLocaleString("en-US")}`, width / 2, height / 2);
        ctx.save();
      }
    }]
  });
}

window.dibujarDonaAhorro = dibujarDonaAhorro;


// ========== CAMBIAR TABS ==========
function cambiarTab(tabId, boton) {
  document.querySelectorAll('.bloque-tab').forEach(el => el.classList.add('oculto'));
  document.getElementById(`resumen-${tabId}`)?.classList.remove('oculto');
  document.getElementById(`dona-${tabId}`)?.classList.remove('oculto');
  document.querySelectorAll('.contenedor-tabs button').forEach(b => b.classList.remove('activo'));
  boton.classList.add('activo');

  if (tabId === "gastos") setTimeout(() => renderChart("general"), 10);
  if (tabId === "ahorro" && !charts.graficoAhorros) dibujarDonaAhorro();
}
window.cambiarTab = cambiarTab;

// ========== MODAL NUEVA TRANSACCIÓN ==========
function activarModalNuevaTransaccion() {
  const btnNuevaTransaccion = document.getElementById("btnNuevaTransaccion");
  const modalNueva = document.getElementById("modalNueva");
  const contenidoModal = document.getElementById("contenidoModalNueva");

  if (!btnNuevaTransaccion || !modalNueva || !contenidoModal) return;

  btnNuevaTransaccion.addEventListener("click", () => {
    modalNueva.classList.remove("oculto");
  });

  window.addEventListener("click", (e) => {
    if (!contenidoModal.contains(e.target) && !btnNuevaTransaccion.contains(e.target)) {
      modalNueva.classList.add("oculto");
    }
  });
}

window.activarModalNuevaTransaccion = activarModalNuevaTransaccion;

// ========== CATEGORIAS Y DETALLES ==========
document.querySelectorAll('.categoria').forEach(categoria => {
  const bloques = categoria.querySelectorAll('.bloque-categoria');
  bloques.forEach(bloque => {
    const header = bloque.querySelector('h5');
    header.addEventListener('click', () => {
      bloques.forEach(b => {
        if (b !== bloque) b.classList.remove('abierto');
      });
      bloque.classList.toggle('abierto');
    });
  });
});
