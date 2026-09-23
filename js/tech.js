// Staggered scroll reveals for .rv elements
(() => {
  const items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  items.forEach((el) => io.observe(el));
})();

// Light parallax on the hero art
(() => {
  const art = document.querySelector('.hero-art');
  if (!art || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const slabs = art.querySelectorAll('.k-dust, .k-orbit');
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const tick = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    slabs.forEach((s, i) => {
      const k = 6 + i * 3;
      s.style.transform = `translate(${cx * k}px, ${cy * k}px)`;
    });
    if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) raf = requestAnimationFrame(tick);
    else raf = 0;
  };
  window.addEventListener('pointermove', (e) => {
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: true });
})();
