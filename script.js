/*
========================================================
CUSTOMIZATION — EDIT ONLY THIS SECTION
========================================================
*/
const CONFIG = {
  EVENT_NAME: "श्री ज्येष्ठगौरी पूजन",
  EVENT_DATE: "१८ सप्टेंबर २०२६",
  EVENT_TIME: "सायंकाळी ७.०० वाजता",
  VENUE_NAME: "आमच्या राहत्या घरी",
  ADDRESS: "आनंद नगर, अमरावती",
  GOOGLE_MAPS_URL: "https://maps.app.goo.gl/bqQzN6KXAXjdNGG58?g_st=ac",

  INVITATION_MESSAGE:
`नमस्कार,
दरवर्षीप्रमाणे यावर्षीही आमच्या घरी गौरी गणपतीचे आगमन होणार आहे. त्यानिमित्त महालक्ष्मी पूजन आणि महाप्रसादाचे आयोजन केले आहे. तरी आपण आपल्या परिवारासह उपस्थित राहून महालक्ष्मी मातेचा आशीर्वाद घ्यावा आणि महाप्रसादाचा लाभ घ्यावा, ही नम्र विनंती. 🙏`,

  FAMILY_MEMBERS: [
    { photo: "assets/family1.jpg", name: "श्री. योगेश वासनकर", role: "आमंत्रक" },
    { photo: "assets/family2.jpg", name: "सौ. मंजू योगेश वासनकर", role: "आमंत्रक" },
    { photo: "assets/family3.jpg", name: "गुंजन योगेश वासनकर", role: "कन्या" },
    { photo: "assets/family4.jpg", name: "भाग्यश्री योगेश वासनकर", role: "कन्या" }
  ],

  MAHALAXMI_IMAGES: [
    "assets/gallery1.jpg",
    "assets/gallery2.jpg",
    "assets/gallery3.jpg",
    "assets/gallery4.jpg"
  ],

  PROGRAM_ITEMS: [
    { date: "१७ सप्टेंबर २०२६", day: "गुरुवार", event: "ज्येष्ठगौरी आगमन", time: "", description: "" },
    { date: "१८ सप्टेंबर २०२६", day: "शुक्रवार", event: "ज्येष्ठगौरी पूजन", time: "सायंकाळी ७.०० वाजता", description: "ज्येष्ठगौरी पूजन आणि महाप्रसादाचे आयोजन" },
    { date: "१९ सप्टेंबर २०२६", day: "शनिवार", event: "ज्येष्ठगौरी विसर्जन", time: "", description: "" }
  ],

  GALLERY_IMAGES: [
    "assets/gallery1.jpg",
    "assets/gallery2.jpg",
    "assets/gallery3.jpg",
    "assets/gallery4.jpg"
  ],

  // YouTube background audio reference supplied by you.
  // For reliable audio playback on all devices, an MP3 you have permission to use is better.
  YOUTUBE_VIDEO_ID: "38sjlow5yeM",

  // Optional local audio. If you later add assets/music.mp3, set this to that path.
  MUSIC_FILE: "assets/music.mp3"
};

/* ---------- PAGE RENDERING ---------- */
document.getElementById("heroTitle").textContent = CONFIG.EVENT_NAME;
document.querySelector(".hero-date").textContent = `${CONFIG.EVENT_DATE} · ${CONFIG.EVENT_TIME}`;
document.getElementById("invitationMessage").textContent = CONFIG.INVITATION_MESSAGE;
document.getElementById("venueName").textContent = CONFIG.VENUE_NAME;
document.getElementById("address").textContent = CONFIG.ADDRESS;
document.getElementById("mapsLink").href = CONFIG.GOOGLE_MAPS_URL;

const familyGrid = document.getElementById("familyGrid");
CONFIG.FAMILY_MEMBERS.forEach((person, index) => {
  const card = document.createElement("article");
  card.className = "person-card js-reveal";
  card.innerHTML = `
    <div class="person-photo">
      <img src="${person.photo}" alt="${person.name}" loading="lazy">
    </div>
    <p class="person-name">${person.name}</p>
    <p class="person-role">${person.role || ""}</p>
  `;
  familyGrid.appendChild(card);
});

const mahalaxmiGallery = document.getElementById("mahalaxmiGallery");
CONFIG.MAHALAXMI_IMAGES.forEach((src, i) => {
  const fig = document.createElement("figure");
  fig.className = "js-reveal";
  fig.innerHTML = `<img src="${src}" alt="महालक्ष्मी पूजनाचा फोटो ${i+1}" loading="lazy">`;
  fig.querySelector("img").addEventListener("click", () => openLightbox(src, `महालक्ष्मी पूजनाचा फोटो ${i+1}`));
  mahalaxmiGallery.appendChild(fig);
});

const programList = document.getElementById("programList");
CONFIG.PROGRAM_ITEMS.forEach(item => {
  const card = document.createElement("article");
  card.className = "event-card js-reveal";
  card.innerHTML = `
    <div class="event-date">${item.date} · ${item.day}</div>
    <div class="event-title">${item.event}</div>
    ${item.time ? `<p class="event-time">🕖 ${item.time}</p>` : ""}
    ${item.description ? `<p class="event-desc">${item.description}</p>` : ""}
  `;
  programList.appendChild(card);
});

const galleryGrid = document.getElementById("galleryGrid");
CONFIG.GALLERY_IMAGES.forEach((src, i) => {
  const figure = document.createElement("figure");
  figure.className = "gallery-item js-reveal";
  figure.innerHTML = `<img src="${src}" alt="आमंत्रण आठवण ${i+1}" loading="lazy">`;
  figure.addEventListener("click", () => openLightbox(src, `आठवण ${i+1}`));
  galleryGrid.appendChild(figure);
});

document.getElementById("closingNames").innerHTML =
  CONFIG.FAMILY_MEMBERS.map(p => `<span>${p.name}</span>`).join("<span aria-hidden='true'>•</span>");

/* ---------- SMOOTH OPEN ---------- */
document.getElementById("openInvitation").addEventListener("click", () => {
  startMusic();
  document.getElementById("welcome").scrollIntoView({ behavior: "smooth" });
});

/* ---------- SCROLL REVEALS ---------- */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".js-reveal").forEach(el => observer.observe(el));

/* ---------- LIGHTBOX ---------- */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.hidden = true;
  lightboxImage.src = "";
  document.body.style.overflow = "";
}
document.getElementById("closeLightbox").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

/* ---------- MUSIC ---------- */
/*
  YouTube does not expose a normal MP3 URL from a video page.
  This site therefore creates a tiny YouTube player after the visitor
  taps "आमंत्रण पहा". The player is controlled with YouTube's iframe API.
  For a guaranteed, lightweight background track, upload a permitted MP3
  and set CONFIG.MUSIC_FILE = "assets/music.mp3".
*/
let ytPlayer = null;
let musicOn = false;
let localAudio = null;

const musicToggle = document.getElementById("musicToggle");
const musicText = document.getElementById("musicText");

function setMusicUI(on) {
  musicOn = on;
  musicText.textContent = on ? "संगीत बंद" : "संगीत";
  musicToggle.setAttribute("aria-label", on ? "संगीत बंद करा" : "संगीत सुरू करा");
}

function loadYouTubePlayer() {
  if (ytPlayer || !CONFIG.YOUTUBE_VIDEO_ID) return;
  const iframe = document.createElement("iframe");
  iframe.id = "yt-iframe";
  iframe.width = "1";
  iframe.height = "1";
  iframe.allow = "autoplay; encrypted-media";
  iframe.src =
    `https://www.youtube.com/embed/${CONFIG.YOUTUBE_VIDEO_ID}` +
    `?enablejsapi=1&autoplay=0&controls=0&loop=1&playlist=${CONFIG.YOUTUBE_VIDEO_ID}` +
    `&playsinline=1&rel=0&modestbranding=1`;
  document.getElementById("youtube-player").appendChild(iframe);
  ytPlayer = iframe;
}

function ytCommand(func) {
  if (!ytPlayer) return;
  ytPlayer.contentWindow.postMessage(JSON.stringify({
    event: "command", func, args: []
  }), "https://www.youtube.com");
}

function startMusic() {
  if (CONFIG.MUSIC_FILE) {
    if (!localAudio) {
      localAudio = new Audio(CONFIG.MUSIC_FILE);
      localAudio.loop = true;
      localAudio.preload = "auto";
    }
    localAudio.play().then(() => setMusicUI(true)).catch(() => {});
    return;
  }
  loadYouTubePlayer();
  setTimeout(() => {
    ytCommand("playVideo");
    setMusicUI(true);
  }, 450);
}

function stopMusic() {
  if (localAudio) localAudio.pause();
  ytCommand("pauseVideo");
  setMusicUI(false);
}

musicToggle.addEventListener("click", () => {
  if (musicOn) stopMusic();
  else startMusic();
});

/* If the browser starts the site from another user interaction, do not force autoplay. */
setMusicUI(false);
