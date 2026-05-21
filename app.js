// Animate timer in phone mock
const timerEl = document.querySelector('.mock-timer');
if (timerEl) {
  let seconds = 42 * 60 + 17;
  setInterval(() => {
    seconds++;
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

// Track APK download
const apkBtn = document.getElementById('apk-download');
if (apkBtn) {
  apkBtn.addEventListener('click', (e) => {
    // If the APK file doesn't exist yet, show a friendly message
    fetch('./download/billar-pos.apk', { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          e.preventDefault();
          showToast('El APK estará disponible próximamente.');
        }
      })
      .catch(() => {
        e.preventDefault();
        showToast('El APK estará disponible próximamente.');
      });
  });
}

// Simple toast
function showToast(msg) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%);
    background: #1B5E20; color: #fff; padding: 12px 24px;
    border-radius: 10px; font-size: 14px; font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    z-index: 999; animation: fadeUp 0.3s ease;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Intersection observer for scroll animations on feature cards
const cards = document.querySelectorAll('.feature-card, .step, .download-card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});
