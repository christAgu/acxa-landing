// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const links = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

links.addEventListener('click', (e) => {
  if (e.target.classList.contains('nav-link')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Particle wave (pages with #wave-canvas only)
const canvas = document.getElementById('wave-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let W, H, dpr;
let particles = [];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = canvas.clientWidth;
  H = canvas.clientHeight;
  canvas.width = W * dpr;
  canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function field(x, t) {
  // wave surface height at x, time t — slightly below middle
  const c = H * 0.66;
  return c
    + Math.sin(x * 0.0021 + t * 0.9) * H * 0.075
    + Math.sin(x * 0.0043 - t * 0.55) * H * 0.045
    + Math.sin(x * 0.0009 + t * 0.28) * H * 0.05;
}

function spawn() {
  particles = [];
  const n = Math.floor((W * H) / 3800);
  for (let i = 0; i < n; i++) {
    particles.push({
      x: Math.random() * W,
      u: Math.random(),          // progress along its wave ride
      speed: 0.4 + Math.random() * 1.1,
      size: 0.6 + Math.random() * 1.9,
      layer: Math.random(),      // depth: 0 back .. 1 front
      drift: (Math.random() - 0.5) * 60,
    });
  }
}

function draw(t) {
  ctx.clearRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'lighter';

  for (const p of particles) {
    p.x += p.speed;
    if (p.x > W + 10) { p.x = -10; p.drift = (Math.random() - 0.5) * 60; }

    const y = field(p.x, t) + p.drift + (p.layer - 0.5) * 46;
    // fade particles under the text column (left ~40% of the hero)
    const fade = Math.min(1, Math.max(0.12, (p.x - W * 0.10) / (W * 0.30)));
    const a = (0.12 + p.layer * 0.5) * (0.75 + 0.25 * Math.sin(t * 2 + p.x * 0.01)) * fade;
    const r = p.size * (0.6 + p.layer * 0.9);

    ctx.beginPath();
    ctx.arc(p.x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${90 + p.layer * 60}, ${140 + p.layer * 60}, 255, ${a})`;
    ctx.fill();
  }

  // soft ridge line along the wave
  ctx.beginPath();
  for (let x = 0; x <= W; x += 6) {
    const y = field(x, t);
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = 'rgba(91, 141, 255, 0.22)';
  ctx.lineWidth = 1.4;
  ctx.stroke();
}

function loop(now) {
  draw(now / 1000);
  requestAnimationFrame(loop);
}

if (canvas) {
  resize();
  spawn();
  window.addEventListener('resize', () => { resize(); spawn(); });

  if (reducedMotion) {
    draw(0);
  } else {
    requestAnimationFrame(loop);
  }
}

// Reveal sections as they scroll into view
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length) {
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    revealEls.forEach((el) => revealObserver.observe(el));
  }
}
