// ----------------- Neural Network for Header -----------------
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 75;

// Random color generator for node glow
function getRandomColor() {
    const colors = ["#00FFFF", "#00FF00", "#FF00FF", "#FFA500", "#FF4500"];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Particle (Node) Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
        this.color = getRandomColor();
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }
}

// Initialize Particles (Nodes)
function init() {
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
}

// Draw Lines Between Nodes
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop for Header
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawLines();
    requestAnimationFrame(animate);
}

// Resize Canvas
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start Header Animation
init();
animate();

// ----------------- Neural Network for Footer -----------------
const footerCanvas = document.getElementById("footerCanvas");
const footerCtx = footerCanvas.getContext("2d");

function setupFooterCanvas() {
    footerCanvas.width = window.innerWidth;
    footerCanvas.height = document.querySelector(".footer").offsetHeight;
}

setupFooterCanvas();

const footerParticles = [];
const footerMaxParticles = 50;

// Footer Particle Class
class FooterParticle {
    constructor() {
        this.x = Math.random() * footerCanvas.width;
        this.y = Math.random() * footerCanvas.height;
        this.size = Math.random() * 4 + 1;
        this.dx = Math.random() * 2 - 1;
        this.dy = Math.random() * 2 - 1;
        this.color = "#00FFFF";
    }

    draw() {
        footerCtx.fillStyle = this.color;
        footerCtx.shadowBlur = 10;
        footerCtx.shadowColor = this.color;
        footerCtx.beginPath();
        footerCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        footerCtx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x < 0 || this.x > footerCanvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > footerCanvas.height) this.dy *= -1;
    }
}

// Initialize Footer Particles
function initFooter() {
    footerParticles.length = 0; // Clear existing particles before adding new ones
    for (let i = 0; i < footerMaxParticles; i++) {
        footerParticles.push(new FooterParticle());
    }
}

// Draw Footer Network Lines
function drawFooterLines() {
    for (let i = 0; i < footerParticles.length; i++) {
        for (let j = i + 1; j < footerParticles.length; j++) {
            const dx = footerParticles[i].x - footerParticles[j].x;
            const dy = footerParticles[i].y - footerParticles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                footerCtx.strokeStyle = "rgba(0, 255, 255, 0.3)";
                footerCtx.lineWidth = 1;
                footerCtx.beginPath();
                footerCtx.moveTo(footerParticles[i].x, footerParticles[i].y);
                footerCtx.lineTo(footerParticles[j].x, footerParticles[j].y);
                footerCtx.stroke();
            }
        }
    }
}

// Footer Animation Loop
function animateFooter() {
    footerCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
    footerParticles.forEach(p => {
        p.update();
        p.draw();
    });

    drawFooterLines();
    requestAnimationFrame(animateFooter);
}

// Ensure Footer Canvas Resizes Properly
function resizeFooterCanvas() {
    setupFooterCanvas();
    footerCtx.clearRect(0, 0, footerCanvas.width, footerCanvas.height);
    initFooter();
}

window.addEventListener("resize", resizeFooterCanvas);

// Delay to ensure canvas renders correctly
setTimeout(() => {
    initFooter();
    animateFooter();
}, 500);

// ----------------- Smooth Scrolling -----------------
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}

// ----------------- Background Music Controls -----------------
// 🎵 Playlist Array (Add your MP3 files here)
const playlist = [
  { name: "Space Walk", url: "assets/music/Space Walk.mp3" },
  { name: "Digital Horizons", url: "assets/music/Digital Horizons.mp3" },
  { name: "Samurai Code", url: "assets/music/Samurai Code.mp3" }
];

let currentSongIndex = 0;
const audio = document.getElementById("background-music");
const audioSource = document.getElementById("audio-source");
const currentSongDisplay = document.getElementById("current-song");
const playlistSelect = document.getElementById("playlist-select");

// Load playlist into dropdown
function loadPlaylist() {
  playlist.forEach((track, index) => {
      let option = document.createElement("option");
      option.value = index;
      option.textContent = track.name;
      playlistSelect.appendChild(option);
  });
}

// Play selected song
function changeSong(index) {
  currentSongIndex = index;
  audioSource.src = playlist[currentSongIndex].url;
  audio.load();
  playMusic();
}

// Update song name and highlight selected track
function updateSongInfo() {
  currentSongDisplay.textContent = playlist[currentSongIndex].name;
  playlistSelect.value = currentSongIndex;
}

// Play music
function playMusic() {
  audio.play();
  updateSongInfo();
}

// Pause music
function pauseMusic() {
  audio.pause();
}

// Next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  changeSong(currentSongIndex);
}

// Previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  changeSong(currentSongIndex);
}

// Initialize
window.onload = function () {
  loadPlaylist();
  changeSong(0);
};

const phoneMockup = document.querySelector(".phone-mockup");

document.addEventListener("mousemove", (event) => {
    const rect = phoneMockup.getBoundingClientRect();
    const isNear =
        event.clientX > rect.left - 100 &&
        event.clientX < rect.right + 100 &&
        event.clientY > rect.top - 100 &&
        event.clientY < rect.bottom + 100;

    if (isNear) {
        let x = (window.innerWidth / 2 - event.pageX) / 50;
        let y = (window.innerHeight / 2 - event.pageY) / 50;
        phoneMockup.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    } else {
        phoneMockup.style.transform = "rotateY(0deg) rotateX(0deg)";
    }
});
