// Preserve scroll position on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.onload = function () {
  const savedScrollPosition = localStorage.getItem('lastScrollPosition');
  if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      localStorage.removeItem('lastScrollPosition');
  }
};

window.addEventListener('scroll', () => {
  localStorage.setItem('lastScrollPosition', window.pageYOffset);
});

// ----------------- Neural Network for Header -----------------
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const maxParticles = 75;

// Rest of your existing JavaScript code here...
function getRandomColor() {
  const colors = ["#00FFFF", "#00FF00", "#FF00FF", "#FFA500", "#FF4500"];
  return colors[Math.floor(Math.random() * colors.length)];
}

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

function init() {
  for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
  }
}

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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
      p.update();
      p.draw();
  });

  drawLines();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

init();
animate();

// ----------------- Neural Network for Footer -----------------
// ... (rest of your footer code remains the same)

// ----------------- Smooth Scrolling -----------------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({
      behavior: "smooth"
  });
}

// ----------------- Background Music Controls -----------------
// ... (rest of your music code remains the same)

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
