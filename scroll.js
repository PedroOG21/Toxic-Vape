const scrollPanel = document.getElementById('scroll-panel');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll) {
    scrollPanel.style.top = '-50px'; // Oculta solo panel de bienvenida
  } else {
    scrollPanel.style.top = '0'; // Muestra
  }
  lastScroll = currentScroll;
});
