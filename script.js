/* ============================================================
   SimpleServerPassword — site interactions
   - EN/ES language toggle (no reload, persisted)
   - Dynamic latest-release fetch from the GitHub API
   - Sticky-nav scroll state
   ============================================================ */

const I18N = {
  en: {
    nav_features: "Features",
    nav_setup: "Setup",
    nav_faq: "FAQ",

    hero_badge: "Fabric · Minecraft 1.20.1 · Server-side",
    hero_title: 'Lock your server<br />behind <span class="accent">one password.</span>',
    hero_lede: "A lightweight gate for private Fabric servers. Until a player types the password, they can't move, see, build, chat, or run a single command — not even an OP. No client install, no account system.",
    hero_download: "Download",
    hero_github: "View on GitHub",

    features_title: "Everything locked until they log in",
    features_sub: "One password gates the whole server. Here's what it covers.",
    f1_t: "Total lockdown",
    f1_d: "Unauthenticated players can't move, break or place blocks, touch the inventory, chat, or take and deal damage.",
    f2_t: "Even OPs are gated",
    f2_d: "Command blocking runs before permissions resolve, so a prior-OP account can't use /op, /gamemode or anything else until it authenticates.",
    f3_t: "Per-IP temporary ban",
    f3_d: "Failed attempts are counted per IP. Too many and that IP is blocked for a configurable time — stopping brute force from a single connection.",
    f4_t: "Blindness until login",
    f4_d: "A continuous Blindness effect hides the world from anyone who hasn't entered the password yet. It clears the instant they authenticate.",
    f5_t: "Server-side only",
    f5_d: "Players connect with a normal vanilla or Fabric client. There is nothing to install on their side.",
    f6_t: "Multilingual",
    f6_d: "Ships with English and Spanish. Add your own language with a single JSON file — no code, no rebuild.",

    dl_eyebrow: "Latest release",
    dl_meta: "for Minecraft 1.20.1 · Fabric",
    dl_button: "Download .jar",
    dl_requires: "Requires",
    dl_all: "All releases →",

    setup_title: "Up and running in five steps",
    setup_sub: "On an existing Fabric 1.20.1 server. Takes about five minutes.",
    s1_t: "Have Fabric + Fabric API ready",
    s1_d: "Make sure your 1.20.1 server runs Fabric Loader and has Fabric API in its mods folder.",
    s2_t: "Drop in the jar",
    s2_d: "Copy the downloaded jar into the server's mods folder, next to Fabric API.",
    s3_t: "Start once to generate config",
    s3_d: "Boot the server. The mod creates its config and language files automatically, then stop the server.",
    s4_t: "Set your password",
    s4_d: "Open the config and change the password field. It's plain text, so don't reuse an important password.",
    s5_t: "Restart — you're protected",
    s5_d: 'Start the server again. Players now have to run <code class="inline">/password &lt;key&gt;</code> before they can do anything.',

    faq_title: "FAQ",
    q1: "Do players need to install the mod too?",
    a1: "No. It's server-side only. Players join with a normal vanilla or Fabric client — there's nothing for them to install.",
    q2: "An OP can't run commands. Is that a bug?",
    a2: "No, it's intentional. Command blocking happens before permissions are resolved, so nobody — not even an OP — can run commands until they authenticate. Once they log in, all permissions come back.",
    q3: "I forgot the password or got banned. What now?",
    a3: "The password is plain text in the config file, so you can just read it. Bans live in memory, so restarting the server clears every ban and attempt counter instantly.",
    q4: "Do sessions persist between reconnects?",
    a4: "No, by design. Every new connection — including a reconnect — has to authenticate again. Nothing is stored between sessions.",
    q5: "Is the password hashed?",
    a5: "No. It's stored in plain text on purpose, for the simplicity of a private server. Don't reuse a password that matters elsewhere.",
    q6: "Why count failed attempts per IP instead of per account?",
    a6: "To stop an attacker cycling through several compromised accounts from the same connection. The per-IP counter shuts the whole connection down after too many tries.",

    foot_releases: "Releases",
    foot_license: "MIT License",
    foot_note: "Built with Fabric. Not affiliated with Mojang or Microsoft.",
  },

  es: {
    nav_features: "Características",
    nav_setup: "Instalación",
    nav_faq: "Preguntas",

    hero_badge: "Fabric · Minecraft 1.20.1 · Lado del servidor",
    hero_title: 'Protegé tu servidor<br />con <span class="accent">una contraseña.</span>',
    hero_lede: "Un gate liviano para servidores Fabric privados. Hasta que el jugador escribe la contraseña no puede moverse, ver, construir, chatear ni ejecutar un solo comando — ni siquiera un OP. Sin instalar nada en el cliente, sin sistema de cuentas.",
    hero_download: "Descargar",
    hero_github: "Ver en GitHub",

    features_title: "Todo bloqueado hasta que inicien sesión",
    features_sub: "Una contraseña protege todo el servidor. Esto es lo que cubre.",
    f1_t: "Bloqueo total",
    f1_d: "Sin autenticarse, el jugador no puede moverse, romper o poner bloques, tocar el inventario, chatear, ni recibir o hacer daño.",
    f2_t: "Hasta los OP quedan bloqueados",
    f2_d: "El bloqueo de comandos corre antes de resolver permisos, así que una cuenta con OP previo no puede usar /op, /gamemode ni nada hasta autenticarse.",
    f3_t: "Ban temporal por IP",
    f3_d: "Los intentos fallidos se cuentan por IP. Si son demasiados, esa IP queda bloqueada por un tiempo configurable — frenando el fuerza bruta desde una misma conexión.",
    f4_t: "Ceguera hasta loguear",
    f4_d: "Un efecto de Ceguera continuo oculta el mundo a quien todavía no ingresó la contraseña. Se quita en el instante en que se autentica.",
    f5_t: "Solo del lado del servidor",
    f5_d: "Los jugadores se conectan con un cliente vanilla o Fabric normal. No hay nada que instalar de su lado.",
    f6_t: "Multilenguaje",
    f6_d: "Viene con inglés y español. Agregá tu propio idioma con un solo archivo JSON — sin código, sin recompilar.",

    dl_eyebrow: "Último release",
    dl_meta: "para Minecraft 1.20.1 · Fabric",
    dl_button: "Descargar .jar",
    dl_requires: "Requiere",
    dl_all: "Todos los releases →",

    setup_title: "Funcionando en cinco pasos",
    setup_sub: "Sobre un servidor Fabric 1.20.1 existente. Lleva unos cinco minutos.",
    s1_t: "Tené Fabric + Fabric API listos",
    s1_d: "Asegurate de que tu servidor 1.20.1 use Fabric Loader y tenga Fabric API en la carpeta mods.",
    s2_t: "Soltá el jar",
    s2_d: "Copiá el jar descargado en la carpeta mods del servidor, junto a Fabric API.",
    s3_t: "Arrancá una vez para generar la config",
    s3_d: "Iniciá el servidor. El mod crea su config y los archivos de idioma automáticamente, después pará el servidor.",
    s4_t: "Poné tu contraseña",
    s4_d: "Abrí la config y cambiá el campo password. Es texto plano, así que no reutilices una contraseña importante.",
    s5_t: "Reiniciá — estás protegido",
    s5_d: 'Volvé a arrancar el servidor. Ahora los jugadores tienen que ejecutar <code class="inline">/password &lt;clave&gt;</code> antes de poder hacer nada.',

    faq_title: "Preguntas frecuentes",
    q1: "¿Los jugadores también tienen que instalar el mod?",
    a1: "No. Es solo del lado del servidor. Los jugadores entran con un cliente vanilla o Fabric normal — no tienen nada que instalar.",
    q2: "Un OP no puede usar comandos. ¿Es un bug?",
    a2: "No, es intencional. El bloqueo de comandos ocurre antes de resolver permisos, así que nadie — ni siquiera un OP — puede ejecutar comandos hasta autenticarse. Al loguearse, recupera todos los permisos.",
    q3: "Olvidé la contraseña o me banearon. ¿Y ahora?",
    a3: "La contraseña está en texto plano en el archivo de config, así que podés leerla directamente. Los bans viven en memoria, así que reiniciar el servidor borra todos los bans y contadores al instante.",
    q4: "¿Las sesiones persisten entre reconexiones?",
    a4: "No, por diseño. Cada conexión nueva — incluida una reconexión — tiene que autenticarse de nuevo. No se guarda nada entre sesiones.",
    q5: "¿La contraseña está hasheada?",
    a5: "No. Se guarda en texto plano a propósito, por la simplicidad de un servidor privado. No reutilices una contraseña que importe en otro lado.",
    q6: "¿Por qué contar los intentos por IP y no por cuenta?",
    a6: "Para frenar a un atacante que prueba varias cuentas comprometidas desde la misma conexión. El contador por IP corta toda la conexión después de demasiados intentos.",

    foot_releases: "Releases",
    foot_license: "Licencia MIT",
    foot_note: "Hecho con Fabric. No afiliado con Mojang ni Microsoft.",
  },
};

/* ---------- Language ---------- */
function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key] != null) el.innerHTML = dict[key];
  });

  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.classList.toggle("is-active", b.dataset.lang === lang);
  });

  try { localStorage.setItem("ssp-lang", lang); } catch (e) {}
}

function initLang() {
  let lang = "en";
  try { lang = localStorage.getItem("ssp-lang") || (navigator.language || "en").slice(0, 2); } catch (e) {}
  if (!I18N[lang]) lang = "en";
  applyLang(lang);

  document.querySelectorAll(".lang-toggle button").forEach((b) => {
    b.addEventListener("click", () => applyLang(b.dataset.lang));
  });
}

/* ---------- Latest release (GitHub API, client-side) ---------- */
async function loadLatestRelease() {
  const REPO = "mateosmudarg/SimpleServerPassword";
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return; // keep the hardcoded fallback already in the HTML
    const data = await res.json();

    const versionEl = document.getElementById("dl-version");
    if (versionEl && data.tag_name) versionEl.textContent = data.tag_name;

    const jar = (data.assets || []).find((a) => a.name.endsWith(".jar"));
    const btn = document.getElementById("dl-button");
    if (btn && jar) btn.href = jar.browser_download_url;
  } catch (e) {
    /* offline or rate-limited — the static fallback link stays in place */
  }
}

/* ---------- Sticky nav state ---------- */
function initNavScroll() {
  const nav = document.querySelector(".nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initLang();
  initNavScroll();
  loadLatestRelease();
});
