const pages = [...document.querySelectorAll(".page")];
const start = Date.now();
const counter = document.getElementById("counter");

setInterval(() => {
  counter.textContent = Math.floor((Date.now() - start) / 1000);
}, 1000);

function show(id) {
  pages.forEach(page => page.classList.toggle("active", page.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => show(button.dataset.next));
});

document.getElementById("restart").onclick = () => show("page1");

/* Music */
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

musicBtn.onclick = async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "❚❚";
      musicBtn.classList.add("playing");
    } else {
      music.pause();
      musicBtn.textContent = "♫";
      musicBtn.classList.remove("playing");
    }
  } catch (e) {
    alert("Put your own music.mp3 inside the assets folder first.");
  }
};

music.addEventListener("pause", () => {
  musicBtn.textContent = "♫";
  musicBtn.classList.remove("playing");
});

music.addEventListener("play", () => {
  musicBtn.textContent = "❚❚";
  musicBtn.classList.add("playing");
});

/* Forgiveness meter */
document.getElementById("calculateBtn").onclick = () => {
  const number = document.getElementById("meterNumber");
  const fill = document.getElementById("barFill");
  const status = document.getElementById("meterStatus");

  number.textContent = "???%";
  fill.style.width = "0%";
  status.textContent = "⚡ CALCULATING...";

  setTimeout(() => {
    number.textContent = "120%";
    fill.style.width = "100%";
    status.textContent = "💥 ERROR: TOO MUCH CUTENESS DETECTED";
  }, 900);
};

/* Image lightbox */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll("[data-lightbox]").forEach(card => {
  card.addEventListener("click", () => {
    const source = card.dataset.lightbox;
    const image = card.querySelector("img");

    if (!image || image.closest(".missing")) return;

    lightboxImage.src = source;
    lightboxImage.alt = image.alt || "Memory";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

/* Prevent two videos from playing at once */
document.querySelectorAll("video").forEach(video => {
  video.addEventListener("play", () => {
    document.querySelectorAll("video").forEach(other => {
      if (other !== video) other.pause();
    });
  });
});
