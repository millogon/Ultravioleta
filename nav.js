// nav.js - shared navigation
function renderNav(activePage) {
  const pages = [
    { href: 'index.html', label: 'Inicio' },
    { href: 'productos.html', label: 'Productos' },
    { href: 'noticias.html', label: 'Noticias' },
    { href: 'faq.html', label: 'FAQ' },
    { href: 'contacto.html', label: 'Contáctenos' },
  ];

  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${p.href === activePage ? 'active' : ''}" style="font-size:0.85rem;letter-spacing:2px;text-transform:uppercase;">${p.label}</a></li>`
  ).join('');

  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${p.href === activePage ? 'active' : ''}">${p.label}</a>`
  ).join('');

  document.getElementById('nav-placeholder').innerHTML = `
    <nav>
      <a href="index.html" class="nav-logo">
        <img src="images/Hoja_Logo_Ultravioleta.gif" alt="Ultravioleta SA">
        <span>Ultravioleta S.A.</span>
      </a>
      <ul class="nav-links">${links}</ul>
      <div class="hamburger" onclick="toggleMenu()" id="hamburger">
        <span></span><span></span><span></span>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu">${mobileLinks}</div>
  `;
}

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

function renderFooter() {
  document.getElementById('footer-placeholder').innerHTML = `
    <div class="uv-divider"></div>
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="images/Hoja_Logo_Ultravioleta.gif" alt="Ultravioleta" style="height:50px;filter:drop-shadow(0 0 8px rgba(168,85,247,0.6))">
            <p>Tecnología ultravioleta para la esterilización del agua. Empresa ecuatoriana con patentes en Estados Unidos y Ecuador, comprometida con la salud y el medio ambiente.</p>
          </div>
          <div class="footer-col">
            <h4>Navegación</h4>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="productos.html">Productos</a></li>
              <li><a href="aplicaciones.html">Aplicaciones</a></li>
              <li><a href="noticias.html">Noticias</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Soporte</h4>
            <ul>
              <li><a href="faq.html">Preguntas Frecuentes</a></li>
              <li><a href="contacto.html">Contáctenos</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="#">Guayaquil, Ecuador</a></li>
              <li><a href="#">info@ultravioleta.ec</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 ULTRAVIOLETA S.A. — ESTERILIZACIÓN DE AGUAS</span>
          <span style="color:var(--uv-glow)">// TECNOLOGÍA UV</span>
        </div>
      </div>
    </footer>
  `;
}
