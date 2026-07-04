/* ============================================================
   DELL CONSTRUCTIONS — SITE SCRIPT
   ============================================================

   HOW TO ADD YOUR OWN PHOTOS AND REVIEWS
   ---------------------------------------------------------
   1. GALLERY PHOTOS
      - Upload your photo files into an "images" folder in your
        GitHub repo (create it the same way you create a file,
        just type "images/your-photo-name.jpg" as the file path
        when uploading, GitHub will make the folder for you).
      - Then add a line below in the GALLERY array, e.g:
          { src: "images/kitchen-1.jpg", caption: "Modern kitchen, Casula" }
      - Until you add real photos, placeholder boxes will show
        so you can see the layout.

   2. GOOGLE REVIEWS
      - Copy the text of a real review from your Google Business
        Profile and add it to the REVIEWS array below in the same
        format as the examples.
      - rating should be a number from 1 to 5.
   ---------------------------------------------------------- */

const GALLERY = [
  // { src: "images/kitchen-1.jpg", caption: "Custom kitchen — Casula" },
  // { src: "images/exterior-1.jpg", caption: "Family home — Liverpool" },
  // Add more lines like the ones above, remove the placeholders
  // below once you have at least 6 real photos.
];

const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "Dell Constructions built our family home from the ground up. Communication was clear the whole way through and the finish is exactly what we pictured.",
  },
  {
    name: "James T.",
    rating: 5,
    text: "Custom build, tricky block, no issues. The team worked around our budget without cutting corners on quality.",
  },
  {
    name: "Priya K.",
    rating: 5,
    text: "From the first consult to handover everything was on schedule. Would recommend Dell Constructions to anyone building in southwest Sydney.",
  },
];

/* ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGallery();
  initReviews();
  initHeroDraw();
  initContactForm();
});

/* Mobile nav toggle */
function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

/* Render gallery grid from GALLERY array, fall back to placeholders */
function initGallery() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const items = GALLERY.length > 0 ? GALLERY : Array.from({ length: 6 });

  grid.innerHTML = items
    .map((item, i) => {
      if (item) {
        return `
          <div class="gallery-item">
            <img src="${item.src}" alt="${item.caption || "Dell Constructions build"}">
            <div class="caption">${item.caption || ""}</div>
          </div>`;
      }
      return `
        <div class="gallery-item">
          <div class="gallery-placeholder">Photo ${i + 1}<br>Add via GALLERY array in script.js</div>
        </div>`;
    })
    .join("");
}

/* Render review cards from REVIEWS array */
function initReviews() {
  const grid = document.querySelector(".reviews-grid");
  if (!grid) return;

  grid.innerHTML = REVIEWS.map(
    (r) => `
    <div class="review-card">
      <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      <p>${r.text}</p>
      <div class="reviewer">${r.name} — Google Review</div>
    </div>`
  ).join("");
}

/* Trigger the blueprint house line-drawing when it scrolls into view */
function initHeroDraw() {
  const el = document.querySelector(".hero-blueprint");
  if (!el) return;
  // Draw immediately on load since it's above the fold
  requestAnimationFrame(() => el.classList.add("drawn"));
}

/* Contact form: build a mailto link so no backend/server is needed */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const project = data.get("project") || "";
    const message = data.get("message") || "";

    // CHANGE THIS to your real business email address
    const businessEmail = "info@dellconstructions.com.au";

    const subject = encodeURIComponent(`New enquiry from ${name} — ${project}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject type: ${project}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  });
}
