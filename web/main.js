// Pega aquí los enlaces reales cuando subas los .exe (GitHub Releases, Drive, etc.).
const DOWNLOADS = {
  setup: '',
  portable: '',
};

const downloadDialog = document.getElementById('downloadDialog');

document.querySelectorAll('[data-download]').forEach((link) => {
  const url = DOWNLOADS[link.dataset.download];
  if (url) {
    link.href = url;
    return;
  }
  link.addEventListener('click', (event) => {
    event.preventDefault();
    downloadDialog.showModal();
  });
});

downloadDialog.addEventListener('click', (event) => {
  if (event.target === downloadDialog) downloadDialog.close();
});

const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const revealables = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealables.forEach((el) => observer.observe(el));
}
