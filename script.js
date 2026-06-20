/* ===================================================================
   SimpleServerPassword — site interactions
   - EN/ES language toggle (instant, persisted)
   - Mobile hamburger menu (closes on link click; never blocks anchors)
   - Live latest-release fetch from the GitHub API
   =================================================================== */

const I18N = {
  en: {
    nav_problem: "The problem", nav_how: "How it works", nav_setup: "Setup", nav_faq: "FAQ", nav_download: "Download",

    hero_tag: "FABRIC · MINECRAFT 1.20.1 · SERVER-SIDE",
    hero_title: 'Keep raiders out of<br />your friends\' <span class="mark">server.</span>',
    hero_sub: "One shared password. Until someone types it, they can't move, see, or touch a single thing on your server — not even an account that used to have OP. Made for small private servers, not corporations.",
    hero_download: "↓ Download the mod",
    hero_how: "How it works",
    screen_bar: "a stranger joins…",

    problem_tag: "THE REAL PROBLEM",
    problem_title: "Your server is way less hidden than you think",
    problem_p1: "Every Minecraft server answers a public ping with its status — version, players online, MOTD. Bots scan enormous ranges of IPs around the clock looking for anything that replies, especially servers with no whitelist or running in offline / \"cracked\" mode.",
    problem_p2: "When an organized raid group finds one, they pile in, hunt for anyone with OP (or just grief everything in reach), and leave the world in ruins. You didn't share your IP anywhere — they found it by scanning.",
    problem_p3: "And here's the nasty part: an old or leaked account that already played on your server is gold to them. It's \"known\", maybe still on your whitelist, and nobody's watching it anymore. A plain whitelist doesn't save you from that.",
    stat1_n: "24/7", stat1_l: "bots scanning IP ranges for open servers",
    stat2_n: "1 ping", stat2_l: "is all it takes for your server to show up",
    stat3_n: "0 warning", stat3_l: "before a known account logs in to look for OP",

    how_tag: "NO TECH DEGREE NEEDED",
    how_title: "How the gate works",
    how_lead: "No accounts, no database, no plugins to babysit. One password, and everyone's locked out until they prove they belong.",
    how1_t: "You set one password",
    how1_d: "It lives in a plain config file on your server. Change it whenever you want.",
    how2_t: "Anyone who joins is frozen",
    how2_d: "Black screen, can't move, can't chat, can't break blocks, can't run commands. Not even an account that used to have OP gets a free pass.",
    how3_t: "They type the password",
    how3_d: '<code class="ic">/password &lt;your password&gt;</code> — correct and they\'re in. Wrong a few times and their IP gets benched for a while.',
    how4_t: "That's it. Nothing to install for them",
    how4_d: "Players join with a normal client. Nothing is remembered between sessions, so a leaked account is useless without the current password.",

    why_tag: "WE'RE 5 FRIENDS, NOT A COMPANY",
    why_title: "Why not just a whitelist?",
    cmp1_t: "A whitelist",
    cmp1_d: "You add every username by hand. A leaked or old account that's still on the list walks right in. Keeping it tidy for a group that changes is a chore.",
    cmp2_t: "A login / auth plugin",
    cmp2_d: "Every player registers their own account and password, and you store all of that. Total overkill when you're five friends on a survival world.",
    cmp3_t: "SimpleServerPassword",
    cmp3_d: "One password everyone shares. No accounts to manage. Change it once and the whole server is re-locked. A stolen old account is just… locked out.",

    feat_tag: "WHAT IT DOES",
    feat_title: "Everything's locked until they log in",
    f1_t: "Frozen on join", f1_d: "Can't move, break or place blocks, open the inventory, chat, or take and deal damage. Nothing.",
    f2_t: "Even OP is locked out", f2_d: 'Commands are blocked before permissions are even checked, so an old OP account can\'t <code class="ic">/op</code> itself in.',
    f3_t: "Wrong tries = IP benched", f3_d: "Too many failed guesses and that IP is temporarily banned. Stops brute-forcing from one connection.",
    f4_t: "Blind until you're in", f4_d: "A blackout effect hides the world from anyone who hasn't typed the password yet. Clears the second they do.",
    f5_t: "Players install nothing", f5_d: "It's server-side only. Everyone joins with a normal vanilla or Fabric client.",
    f6_t: "English & Spanish", f6_d: "Ships bilingual, and you can add your own language with one JSON file. No code, no rebuild.",

    dl_tag: "LATEST RELEASE",
    dl_meta: "for Minecraft 1.20.1 · Fabric",
    dl_button: "↓ Download .jar",
    dl_requires: "Needs",
    dl_all: "All releases →",

    setup_tag: "FIVE MINUTES, TOPS",
    setup_title: "Get it running",
    setup_lead: "On a Fabric 1.20.1 server you already have. If you can edit a text file, you can do this.",
    s1_t: "Have Fabric + Fabric API ready", s1_d: "Your 1.20.1 server should already run Fabric Loader with Fabric API in its mods folder.",
    s2_t: "Drop in the jar", s2_d: "Copy the downloaded jar into the server's mods folder, next to Fabric API.",
    s3_t: "Start once to generate the config", s3_d: "Boot the server — it creates the config and language files — then stop it.",
    s4_t: "Set your password", s4_d: "Open the config and change the password. It's plain text, so don't reuse a password that matters elsewhere.",
    s5_t: "Restart — you're locked down", s5_d: 'Start the server again. Now everyone has to run <code class="ic">/password &lt;key&gt;</code> before they can do anything.',

    faq_tag: "QUICK ANSWERS",
    faq_title: "FAQ",
    q1: "Do players have to install the mod too?",
    a1: "Nope. It's server-side only. Everyone joins with a normal vanilla or Fabric client — there's nothing for them to install.",
    q2: "Is this actually a serious security tool?",
    a2: "It's a gate for small private servers, not enterprise security. It stops the stuff that actually happens to friend servers: opportunistic raid bots and known/leaked accounts logging in to hunt for OP.",
    q3: "An OP can't run commands. Bug?",
    a3: "No, that's the whole point. Commands are blocked before permissions are checked, so nobody — not even an OP — can run anything until they authenticate. Log in and everything comes back.",
    q4: "I forgot the password or banned myself.",
    a4: "The password is plain text in the config, so just read it. Bans live in memory — restart the server and every ban and attempt counter is wiped instantly.",
    q5: "Do logins stick between sessions?",
    a5: "No, on purpose. Every new connection — reconnects included — has to authenticate again. Nothing is stored between sessions, which is exactly why a leaked account can't sneak back in.",
    q6: "Why count failed tries per IP, not per account?",
    a6: "Because a raider cycles through several stolen accounts from the same connection. Benching the IP shuts the whole connection down after too many misses.",

    foot_releases: "Releases", foot_license: "MIT License",
    foot_note: "Built with Fabric. Not affiliated with Mojang or Microsoft. Made by someone who didn't want their friends' world wrecked again.",
  },

  es: {
    nav_problem: "El problema", nav_how: "Cómo funciona", nav_setup: "Instalación", nav_faq: "Preguntas", nav_download: "Descargar",

    hero_tag: "FABRIC · MINECRAFT 1.20.1 · LADO DEL SERVIDOR",
    hero_title: 'Sacá a los raiders del<br />server de tus <span class="mark">amigos.</span>',
    hero_sub: "Una sola contraseña compartida. Hasta que alguien la escribe, no puede moverse, ver ni tocar nada en tu server — ni siquiera una cuenta que antes tenía OP. Hecho para servers privados chicos, no para empresas.",
    hero_download: "↓ Descargar el mod",
    hero_how: "Cómo funciona",
    screen_bar: "entra un desconocido…",

    problem_tag: "EL PROBLEMA REAL",
    problem_title: "Tu server está mucho menos oculto de lo que creés",
    problem_p1: "Todo servidor de Minecraft responde un ping público con su estado — versión, jugadores online, MOTD. Hay bots que escanean rangos enormes de IPs las 24 horas buscando cualquier cosa que responda, sobre todo servers sin whitelist o en modo offline / \"cracked\".",
    problem_p2: "Cuando un grupo de raideo organizado encuentra uno, entran en masa, buscan a alguien con OP (o directamente destruyen todo lo que pillan) y dejan el mundo en ruinas. Vos no compartiste tu IP en ningún lado — la encontraron escaneando.",
    problem_p3: "Y acá viene lo peor: una cuenta vieja o filtrada que ya jugó en tu server es oro para ellos. Es \"conocida\", quizás sigue en tu whitelist, y ya nadie la está mirando. Una whitelist sola no te salva de eso.",
    stat1_n: "24/7", stat1_l: "bots escaneando rangos de IP buscando servers abiertos",
    stat2_n: "1 ping", stat2_l: "es todo lo que hace falta para que tu server aparezca",
    stat3_n: "0 aviso", stat3_l: "antes de que una cuenta conocida entre a buscar OP",

    how_tag: "NO HACE FALTA SER TÉCNICO",
    how_title: "Cómo funciona el gate",
    how_lead: "Sin cuentas, sin base de datos, sin plugins que cuidar. Una contraseña, y todos quedan afuera hasta demostrar que pertenecen.",
    how1_t: "Ponés una contraseña",
    how1_d: "Vive en un archivo de config en tu server. Cambiala cuando quieras.",
    how2_t: "El que entra queda congelado",
    how2_d: "Pantalla negra, no se puede mover, ni chatear, ni romper bloques, ni usar comandos. Ni siquiera una cuenta que antes tenía OP zafa.",
    how3_t: "Escribe la contraseña",
    how3_d: '<code class="ic">/password &lt;tu contraseña&gt;</code> — si acierta, entra. Si falla varias veces, su IP queda en el banco un rato.',
    how4_t: "Listo. Nada que instalar para ellos",
    how4_d: "Los jugadores entran con un cliente normal. No se recuerda nada entre sesiones, así que una cuenta filtrada no sirve sin la contraseña actual.",

    why_tag: "SOMOS 5 AMIGOS, NO UNA EMPRESA",
    why_title: "¿Por qué no una simple whitelist?",
    cmp1_t: "Una whitelist",
    cmp1_d: "Agregás cada usuario a mano. Una cuenta filtrada o vieja que sigue en la lista entra sin problema. Mantenerla ordenada con un grupo que cambia es un bajón.",
    cmp2_t: "Un plugin de login / auth",
    cmp2_d: "Cada jugador registra su propia cuenta y contraseña, y vos guardás todo eso. Es matar moscas a cañonazos cuando son cinco amigos en un survival.",
    cmp3_t: "SimpleServerPassword",
    cmp3_d: "Una contraseña que comparten todos. Sin cuentas que gestionar. La cambiás una vez y todo el server queda re-bloqueado. Una cuenta vieja robada queda… afuera.",

    feat_tag: "QUÉ HACE",
    feat_title: "Todo bloqueado hasta que inicien sesión",
    f1_t: "Congelado al entrar", f1_d: "No puede moverse, romper o poner bloques, abrir el inventario, chatear, ni recibir o hacer daño. Nada.",
    f2_t: "Hasta el OP queda afuera", f2_d: 'Los comandos se bloquean antes de chequear permisos, así que una cuenta vieja con OP no puede hacerse <code class="ic">/op</code>.',
    f3_t: "Fallás = IP al banco", f3_d: "Demasiados intentos fallidos y esa IP queda baneada temporalmente. Frena el fuerza bruta desde una conexión.",
    f4_t: "Ciego hasta entrar", f4_d: "Un efecto de oscuridad total oculta el mundo a quien todavía no escribió la contraseña. Se va en el instante en que lo hace.",
    f5_t: "Los jugadores no instalan nada", f5_d: "Es solo del lado del servidor. Todos entran con un cliente vanilla o Fabric normal.",
    f6_t: "Inglés y español", f6_d: "Viene bilingüe, y podés agregar tu propio idioma con un archivo JSON. Sin código, sin recompilar.",

    dl_tag: "ÚLTIMO RELEASE",
    dl_meta: "para Minecraft 1.20.1 · Fabric",
    dl_button: "↓ Descargar .jar",
    dl_requires: "Necesita",
    dl_all: "Todos los releases →",

    setup_tag: "CINCO MINUTOS, MÁXIMO",
    setup_title: "Ponelo a andar",
    setup_lead: "Sobre un server Fabric 1.20.1 que ya tengas. Si sabés editar un archivo de texto, podés hacerlo.",
    s1_t: "Tené Fabric + Fabric API listos", s1_d: "Tu server 1.20.1 ya debería correr Fabric Loader con Fabric API en la carpeta mods.",
    s2_t: "Soltá el jar", s2_d: "Copiá el jar descargado en la carpeta mods del server, junto a Fabric API.",
    s3_t: "Arrancá una vez para generar la config", s3_d: "Iniciá el server — crea la config y los archivos de idioma — y después paralo.",
    s4_t: "Poné tu contraseña", s4_d: "Abrí la config y cambiá la contraseña. Es texto plano, así que no reutilices una que uses en otro lado.",
    s5_t: "Reiniciá — estás blindado", s5_d: 'Volvé a arrancar el server. Ahora todos tienen que ejecutar <code class="ic">/password &lt;clave&gt;</code> antes de poder hacer nada.',

    faq_tag: "RESPUESTAS RÁPIDAS",
    faq_title: "Preguntas frecuentes",
    q1: "¿Los jugadores también tienen que instalar el mod?",
    a1: "No. Es solo del lado del servidor. Todos entran con un cliente vanilla o Fabric normal — no tienen nada que instalar.",
    q2: "¿Esto es de verdad una herramienta de seguridad seria?",
    a2: "Es un gate para servers privados chicos, no seguridad empresarial. Frena lo que realmente le pasa a un server de amigos: bots de raideo oportunistas y cuentas conocidas/filtradas que entran a buscar OP.",
    q3: "Un OP no puede usar comandos. ¿Bug?",
    a3: "No, es justamente la idea. Los comandos se bloquean antes de chequear permisos, así que nadie — ni siquiera un OP — puede ejecutar nada hasta autenticarse. Te logueás y vuelve todo.",
    q4: "Olvidé la contraseña o me baneé solo.",
    a4: "La contraseña está en texto plano en la config, así que leéla nomás. Los bans viven en memoria — reiniciás el server y se borran todos los bans y contadores al instante.",
    q5: "¿El login queda guardado entre sesiones?",
    a5: "No, a propósito. Cada conexión nueva — reconexiones incluidas — tiene que autenticarse de nuevo. No se guarda nada entre sesiones, que es justo por qué una cuenta filtrada no puede volver a colarse.",
    q6: "¿Por qué cuenta los intentos por IP y no por cuenta?",
    a6: "Porque un raider va rotando varias cuentas robadas desde la misma conexión. Mandar la IP al banco corta toda la conexión después de demasiados fallos.",

    foot_releases: "Releases", foot_license: "Licencia MIT",
    foot_note: "Hecho con Fabric. No afiliado con Mojang ni Microsoft. Hecho por alguien que no quería que le destruyeran el mundo de sus amigos otra vez.",
  },
};

/* ---------- Language ---------- */
function applyLang(lang) {
  const dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n")];
    if (v != null) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const v = dict[el.getAttribute("data-i18n-html")];
    if (v != null) el.innerHTML = v;
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

/* ---------- Mobile menu ----------
   The menu closes when a nav link is clicked, but we DON'T call
   preventDefault — the browser handles the anchor jump natively. */
function initMenu() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("hamburger");
  if (!nav || !burger) return;

  const close = () => { nav.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); };
  const toggle = () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  };

  burger.addEventListener("click", toggle);

  // Close after picking any link inside the menu (lets the anchor scroll happen).
  document.querySelectorAll("#nav-menu a").forEach((a) => a.addEventListener("click", close));

  // Close on Escape or when clicking outside the nav.
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("open") && !nav.contains(e.target)) close();
  });
}

/* ---------- Latest release (GitHub API) ---------- */
async function loadLatestRelease() {
  const REPO = "mateosmudarg/SimpleServerPassword";
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return; // keep the static fallback baked into the HTML
    const data = await res.json();

    const versionEl = document.getElementById("dl-version");
    if (versionEl && data.tag_name) versionEl.textContent = data.tag_name;

    const jar = (data.assets || []).find((a) => a.name.endsWith(".jar"));
    const btn = document.getElementById("dl-button");
    if (btn && jar) btn.href = jar.browser_download_url;
  } catch (e) {
    /* offline or rate-limited — static fallback stays */
  }
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initLang();
  initMenu();
  loadLatestRelease();
});
