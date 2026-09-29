(() => {
// Smooth scrolling (webapp feel)
const lenis = window.Lenis ? new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true }) : null;
if (lenis) {
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

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

// ---------- Contact modal ----------
(() => {
  const links = document.querySelectorAll('a[href^="mailto:contact@acxa.io"]');
  if (!links.length) return;

  const modal = document.createElement('div');
  modal.className = 'contact-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Formulaire de contact');
  modal.innerHTML = `
    <div class="contact-panel">
      <button type="button" class="contact-close" aria-label="Fermer">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <span class="contact-chip">Contact</span>
      <h2 class="contact-title">Écrivez-nous</h2>
      <p class="contact-sub">Un projet, une question ? Notre équipe vous répond rapidement.</p>
      <form id="contact-form" novalidate>
        <div class="contact-field">
          <label for="cf-name">Nom complet</label>
          <input id="cf-name" name="name" type="text" placeholder="Votre nom" required>
        </div>
        <div class="contact-field">
          <label for="cf-email">Adresse e-mail</label>
          <input id="cf-email" name="email" type="email" placeholder="vous@exemple.com" required>
        </div>
        <div class="contact-field">
          <label for="cf-message">Votre message</label>
          <textarea id="cf-message" name="message" placeholder="Décrivez votre besoin…" required></textarea>
        </div>
        <button type="submit" class="contact-submit">
          Envoyer le message
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
        <p class="contact-note">Ou écrivez-nous directement à <a href="mailto:contact@acxa.io">contact@acxa.io</a></p>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const open = () => { modal.classList.add('open'); document.body.style.overflow = 'hidden'; if (lenis) lenis.stop(); };
  const close = () => { modal.classList.remove('open'); document.body.style.overflow = ''; if (lenis) lenis.start(); };

  links.forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      open();
      modal.querySelector('#cf-name').focus();
    });
  });

  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  modal.querySelector('.contact-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  modal.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    const name = f.querySelector('#cf-name').value.trim();
    const email = f.email.value.trim();
    const message = f.message.value.trim();
    if (!name || !email || !message) {
      [['#cf-name', name], ['#cf-email', email], ['#cf-message', message]]
        .filter(([, v]) => !v)
        .forEach(([sel]) => { modal.querySelector(sel).style.borderColor = '#ff5b7f'; });
      return;
    }
    const submitBtn = f.querySelector('.contact-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    fetch('https://formspree.io/f/mnpnldyb', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    }).then((res) => {
      if (res.ok) {
        f.innerHTML = `
          <div class="contact-success">
            <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12.5l2.7 2.7L16 9.5"/></svg>
            <p>Message envoyé — merci ${name} !</p>
            <span>Notre équipe vous répondra très vite, <b>${name}</b>.</span>
          </div>`;
        setTimeout(close, 3500);
      } else {
        throw new Error('formspree ' + res.status);
      }
    }).catch(() => {
      const subject = encodeURIComponent(`Contact site ACXA — ${name}`);
      const body = encodeURIComponent(`Nom : ${name}\nE-mail : ${email}\n\n${message}`);
      window.location.href = `mailto:contact@acxa.io?subject=${subject}&body=${body}`;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    });
  });
})();
})();
