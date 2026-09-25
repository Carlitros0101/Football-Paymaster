(() => {
  const ACTIONS = new Map([
    ["Reporte WhatsApp", "share"],
    ["Reporte de Fondo", "funds"],
    ["Programar Partido", "schedule"],
    ["Importar Lista", "import"],
    ["Recordatorio Masivo", "reminder"],
    ["Gastos Extra", "expenses"],
    ["Vista Pública", "public"],
    ["Código QR", "qr"],
    ["Mis Jugadores", "players"],
    ["Sortear Equipos", "teams"]
  ]);
  const METRICS = new Set(["Recaudado", "Faltante", "Confirmados"]);

  const norm = (value) => (value || "").replace(/\s+/g, " ").trim();

  function nearestCard(node) {
    let el = node;
    for (let i = 0; el && i < 5; i += 1, el = el.parentElement) {
      const cls = String(el.className || "");
      if (cls.includes("rounded") && (cls.includes("bg-") || cls.includes("shadow"))) return el;
    }
    return node.parentElement;
  }

  function enhance() {
    const root = document.getElementById("root");
    if (!root) return;

    root.querySelectorAll("button, a, [role='button']").forEach((el) => {
      const text = norm(el.textContent);
      for (const [label, kind] of ACTIONS) {
        if (text === label || text.includes(label)) {
          el.classList.add("fp-action-card", `fp-action-${kind}`);
          el.dataset.fpAction = kind;
          break;
        }
      }
    });

    root.querySelectorAll("h1, h2, h3, p, span, div").forEach((el) => {
      const text = norm(el.textContent);
      if (text === "Mi Pichanga") {
        el.classList.add("fp-hero-title");
        let parent = el.parentElement;
        for (let i = 0; parent && i < 5; i += 1, parent = parent.parentElement) {
          if (String(parent.className || "").includes("bg-emerald")) {
            parent.classList.add("fp-hero");
            break;
          }
        }
      }
      if (METRICS.has(text)) {
        const card = nearestCard(el);
        if (card) card.classList.add("fp-metric-card", `fp-metric-${text.toLowerCase()}`);
      }
      if (text === "Progreso") {
        const container = nearestCard(el) || el.parentElement;
        if (container) container.classList.add("fp-progress-block");
      }
    });

    document.querySelectorAll("replit-pill, .replit-pill, [data-replit-pill], iframe[src*='replit-pill']").forEach((el) => el.remove());
  }

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      enhance();
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", schedule, { once: true });
  else schedule();

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
