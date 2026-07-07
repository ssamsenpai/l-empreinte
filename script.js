/* ============================================================
   L'EMPREINTE menu data + view routing
   ------------------------------------------------------------
   Navigation: a category grid (home) -> tap a category to open its
   own page of items -> "Catégories" goes back to pick another.
   Backed by the URL hash so the browser back button + deep links work.

   Photos: curated, professionally-shot images from Pexels (free, no
   API key, hotlink-friendly). Every image is requested at the same
   4:5 crop (cards) / 1:1 crop (category circles) so the whole menu
   reads as one consistent, classy set. Each <img> has an onerror
   handler swapping in an inline SVG placeholder so a dead link never
   breaks the layout. Swap any `px` id below to change a photo.
   ============================================================ */

const pxImg = (id, w, h) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
const cardImg  = (id) => pxImg(id, 560, 700);   // 4:5
const coverImg = (id) => pxImg(id, 500, 500);   // 1:1
// real in-house photo (assets/menu/*.jpg) wins over the Pexels stand-in when present
const itemSrc  = (it) => it.img || cardImg(it.px);

const MENU = [
  {
    id: "boissons-chaudes",
    title: "Boissons Chaudes",
    px: 6747870,
    cimg: "assets/menu/mocca.jpg",
    items: [
      { name: "Expresso",         note: "",             price: "50-100DA",  img: "assets/menu/espresso.jpg" },
      { name: "Capsule",          note: "Caps · L'Or",  price: "150-250DA", img: "assets/menu/capsule.jpg" },
      { name: "Lait au Chocolat", note: "",             price: "150DA",     px: 6313268 },
      { name: "Latte",            note: "",             price: "150DA",     px: 997670, img: "assets/menu/latte.jpg" },
      { name: "Mocca",            note: "",             price: "150DA",     img: "assets/menu/mocca.jpg" },
      { name: "Americano",        note: "",             price: "150DA",     px: 18604200 },
      { name: "Cappuccino",       note: "",             price: "200DA",     img: "assets/menu/cappuccino.jpg" },
      { name: "Macchiato",        note: "",             price: "200DA",     img: "assets/menu/macchiato.jpg" },
      { name: "Chocolat Chaud",   note: "",             price: "200DA",     img: "assets/menu/chocolat-chaud.jpg" },
      { name: "Thé Maison",       note: "",             price: "100DA",     px: 13110529 },
      { name: "Thé Lipton",       note: "",             price: "150DA",     px: 9136977 },
      { name: "Tisane Infusion",  note: "",             price: "150DA",     px: 230477 },
    ],
  },
  {
    id: "boissons-fraiches",
    title: "Boissons Fraîches",
    px: 18142624,
    cimg: "assets/menu/pina-colada.jpg",
    items: [
      { name: "Iced Americano", note: "",                                    price: "200DA", px: 35229818, img: "assets/menu/iced-americano.jpg" },
      { name: "Iced Latte",     note: "Vanille · Caramel · Noisette",        price: "200DA", px: 8605909, img: "assets/menu/iced-latte.jpg" },
      { name: "Iced Thé",       note: "",                                    price: "200DA", px: 37464365, img: "assets/menu/iced-the.jpg" },
      { name: "Café Bonbon",    note: "",                                    price: "200DA", px: 4869290 },
      { name: "Affogato",       note: "Café · Glace · Vanille",              price: "200DA", img: "assets/menu/affogato.jpg" },
      { name: "Glaces",         note: "",                                    price: "300DA", img: "assets/menu/glaces.jpg" },
      { name: "Frigo",          note: "Ifruit · Star · Ifri · Mozaya · Izem", price: "100DA", imgs: ["assets/menu/frigo-1.jpg", "assets/menu/frigo-2.jpg", "assets/menu/frigo-3.jpg"] },
      { name: "Canette",        note: "Hamoud · Selecto · Pepsi",            price: "150DA", imgs: ["assets/menu/hamoud.jpg", "assets/menu/selecto.jpg", "assets/menu/pepsi.jpg"] },
      { name: "Jus de Citron",  note: "",                                    price: "200DA", px: 33107433 },
      { name: "Panaché",        note: "",                                    price: "300DA", px: 33107437 },
      { name: "Jus Pressé",     note: "",                                    price: "400DA", px: 96620, img: "assets/menu/jus-presse.jpg" },
      { name: "Mojito",         note: "Menthe · Fraise · Bleu Hawaï",        price: "400DA", px: 8394976, img: "assets/menu/mojito.jpg" },
      { name: "Pina Colada",    note: "",                                    price: "450DA", px: 8771963, img: "assets/menu/pina-colada.jpg" },
      { name: "Frappé",         note: "Chocolat · Caramel · Café",           price: "500DA", px: 27626320 },
      { name: "Milkshake",      note: "Vanille · Fraise · Banane",           price: "500DA", imgs: ["assets/menu/milkshake-vanille.jpg", "assets/menu/milkshake.jpg", "assets/menu/milkshake-banane.jpg"] },
      { name: "Frappuccino",    note: "Chocolat · Caramel",                  price: "500DA", px: 32542054 },
      { name: "Oasis Thé Pêché", note: "",                                   price: "500DA", img: "assets/menu/oasis.jpg" },
      { name: "Luxe D'orge",    note: "Boisson maltée",                      price: "500DA", img: "assets/menu/luxe-dorge.jpg" },
      { name: "Orangina",       note: "",                                    price: "150DA", img: "assets/menu/orangina.jpg" },
      { name: "Barbican",       note: "Fraise",                              price: "500DA", img: "assets/menu/barbican.jpg" },
      { name: "Red Bull",       note: "Energy drink",                        price: "600DA", img: "assets/menu/redbull.jpg" },
      { name: "Coca-Cola Cherry", note: "",                                  price: "500DA", img: "assets/menu/coca-cherry.jpg" },
    ],
  },
  {
    id: "dessert-patisserie",
    title: "Dessert & Pâtisserie",
    px: 33335365,
    cimg: "assets/menu/cheesecake.jpg",
    items: [
      { name: "Millefeuille",         note: "", price: "100DA", px: 5978248 },
      { name: "Éclair",               note: "", price: "150DA", px: 13177922 },
      { name: "Tartelette",           note: "", price: "200DA", px: 15249752, img: "assets/menu/tartelette.jpg" },
      { name: "Tranche",              note: "", price: "250DA", px: 30924031 },
      { name: "Cookie",               note: "", price: "250DA", px: 8081574 },
      { name: "Brownie",              note: "", price: "250DA", img: "assets/menu/brownie.jpg" },
      { name: "Cookie Pistache",      note: "", price: "300DA", img: "assets/menu/cookie-pistache.jpg" },
      { name: "New York Roll",        note: "", price: "250DA", img: "assets/menu/ny-roll.jpg" },
      { name: "Tranche Raffaello",    note: "", price: "250DA", img: "assets/menu/raffaello.jpg" },
      { name: "Tranche Pistache",     note: "", price: "300DA", img: "assets/menu/cake-pistache.jpg" },
      { name: "Fondant Chocolat",     note: "", price: "300DA", px: 33312981 },
      { name: "Panna Cotta",          note: "", price: "300DA", px: 28594279 },
      { name: "Tarte Citron",         note: "", price: "300DA", px: 12124889, img: "assets/menu/tarte-citron.jpg" },
      { name: "Tiramisu",             note: "", price: "400DA", px: 19582734 },
      { name: "Crème Brûlée",         note: "", price: "400DA", img: "assets/menu/creme-brulee.jpg" },
      { name: "Cheesecake",           note: "", price: "400DA", px: 27959901, img: "assets/menu/cheesecake.jpg" },
      { name: "Cheesecake Pistache",  note: "", price: "450DA", px: 11653565 },
      { name: "Trompe l'Œil",         note: "", price: "450DA", px: 4669235 },
    ],
  },
  {
    id: "crepes-pancakes",
    title: "Crêpes & Pancakes",
    px: 35487016,
    items: [
      { name: "Pancake au Chocolat", note: "",                 price: "350DA",     px: 5377573 },
      { name: "Crêpe Moelleuse",     note: "Mordjan · Nutella", price: "350-400DA", px: 574111 },
      { name: "Crêpe Croustillante", note: "",                 price: "400DA",     img: "assets/menu/crepe-croustillante.jpg" },
      { name: "Crêpe Moelleuse",     note: "Fraise · Banane",   price: "500DA",     px: 4725654 },
    ],
  },
  {
    id: "viennoiserie",
    title: "Viennoiserie",
    px: 12660003,
    cimg: "assets/menu/croissant.jpg",
    items: [
      { name: "Croissant",        note: "", price: "50DA",  img: "assets/menu/croissant.jpg" },
      { name: "Pain au Chocolat", note: "", price: "50DA",  img: "assets/menu/pain-choco.jpg" },
      { name: "Pain au Raisin",   note: "", price: "100DA", img: "assets/menu/pain-raisin.jpg" },
      { name: "Napolitaine",      note: "", price: "100DA", img: "assets/menu/napolitaine.jpg" },
      { name: "Pain Suisse",      note: "", price: "100DA", img: "assets/menu/pain-suisse.jpg" },
      { name: "Jalousie",         note: "", price: "100DA", px: 13425794 },
    ],
  },
  {
    id: "les-sales",
    title: "Les Salés",
    px: 8305726,
    cimg: "assets/menu/mini-pizza.jpg",
    items: [
      { name: "Mini Pizza",     note: "",              price: "130DA", img: "assets/menu/mini-pizza.jpg" },
      { name: "Monchon",        note: "Poulet · Thon", price: "100DA", imgs: ["assets/menu/monchon-poulet.jpg", "assets/menu/monchon-thon.jpg"] },
      { name: "Chausson",       note: "Poulet fumé · 4 fromages · Viande hachée", price: "100DA", imgs: ["assets/menu/chausson-poulet.jpg", "assets/menu/chausson-fromages.jpg", "assets/menu/chausson-viande.jpg"] },
      { name: "Soufflé",        note: "",              price: "100DA", px: 19964400 },
      { name: "Quiche",         note: "",              price: "200DA", px: 109836 },
      { name: "Mini Burger",    note: "",              price: "200DA", img: "assets/menu/mini-burger.jpg" },
      { name: "Club Sandwich",  note: "Poulet · Thon", price: "350DA", px: 11441814 },
    ],
  },
];

const PLACEHOLDER = `
  <div class="card__ph" role="img" aria-label="Photo indisponible">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
      <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/>
      <line x1="14" y1="1" x2="14" y2="4"/>
    </svg>
  </div>`;

const imgTag = (src, alt, cls) => `
  ${PLACEHOLDER}
  <img class="${cls}" src="${src}" alt="${alt}" loading="lazy"
       onload="this.previousElementSibling.style.display='none'"
       onerror="this.style.display='none'; this.previousElementSibling.style.display='flex';" />`;

/* media: single image, or a swipeable gallery (item.imgs) with dot indicator */
function mediaHTML(item) {
  if (item.imgs && item.imgs.length > 1) {
    const slides = item.imgs
      .map((src) => `<div class="slide">${imgTag(src, item.name, "card__img")}</div>`)
      .join("");
    const dots = item.imgs
      .map((_, i) => `<i class="dot${i === 0 ? " is-active" : ""}"></i>`)
      .join("");
    return `<div class="slider"><div class="slider__track">${slides}</div><div class="slider__dots">${dots}</div></div>`;
  }
  return imgTag(itemSrc(item), item.name, "card__img");
}

/* wire each gallery: sync dots with swipe position, dots jump to slide */
function setupSliders() {
  document.querySelectorAll(".slider").forEach((sl) => {
    const track = sl.querySelector(".slider__track");
    const dots = [...sl.querySelectorAll(".dot")];
    const sync = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      dots.forEach((d, j) => d.classList.toggle("is-active", j === i));
    };
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    dots.forEach((d, i) =>
      d.addEventListener("click", () =>
        track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" })
      )
    );
  });
}

/* ---------- category grid (home) ---------- */
function buildHome() {
  const grid = document.getElementById("catGrid");
  MENU.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "cat-card";
    btn.type = "button";
    btn.innerHTML = `
      <span class="cat-card__circle">${imgTag(cat.cimg || coverImg(cat.px), cat.title, "")}</span>
      <span class="cat-card__name">${cat.title}</span>`;
    btn.addEventListener("click", () => { location.hash = "#/" + cat.id; });
    grid.appendChild(btn);
  });
}

/* ---------- one category page ---------- */
function renderCategory(cat) {
  document.getElementById("catTitle").textContent = cat.title;
  const wrap = document.getElementById("catItems");
  wrap.innerHTML = "";
  cat.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";
    const note = item.note ? `<p class="card__note">${item.note}</p>` : "";
    card.innerHTML = `
      <div class="card__media">${mediaHTML(item)}</div>
      <div class="card__overlay">
        <h3 class="card__name">${item.name}</h3>
        ${note}
        <span class="card__price">${item.price}</span>
      </div>`;
    wrap.appendChild(card);
  });
  revealCards();
  setupSliders();
}

/* ---------- routing ---------- */
const home = document.getElementById("view-home");
const detail = document.getElementById("view-category");

function route() {
  const m = location.hash.match(/^#\/(.+)$/);
  const cat = m && MENU.find((c) => c.id === m[1]);
  if (cat) {
    home.hidden = true;
    detail.hidden = false;
    renderCategory(cat);
  } else {
    detail.hidden = true;
    home.hidden = false;
  }
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------- reveal cards on scroll ---------- */
function revealCards() {
  const cards = document.querySelectorAll(".card");
  if (!("IntersectionObserver" in window)) {
    cards.forEach((c) => c.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); o.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  cards.forEach((c) => obs.observe(c));
}

/* ---------- back-to-top visibility ---------- */
function setupToTop() {
  const toTop = document.getElementById("toTop");
  const hero = document.querySelector(".hero");
  new IntersectionObserver((entries) => {
    toTop.classList.toggle("is-shown", !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(hero);
}

document.addEventListener("DOMContentLoaded", () => {
  buildHome();
  const goHome = () => { if (location.hash) location.hash = ""; else route(); };
  document.getElementById("backBtn").addEventListener("click", goHome);
  document.getElementById("backBtnFoot").addEventListener("click", goHome);
  window.addEventListener("hashchange", route);
  setupToTop();
  route();
});
