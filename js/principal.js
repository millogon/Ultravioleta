/* ============================================
   ULTRAVIOLETA S.A. — JAVASCRIPT PRINCIPAL
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar: cambio al hacer scroll ──
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const manejarScroll = () => {
      navbar.classList.toggle('con-fondo', window.scrollY > 60);
    };
    window.addEventListener('scroll', manejarScroll, { passive: true });
    manejarScroll();
  }

  // ── Menú móvil ──
  const hamburguesa = document.getElementById('hamburguesa');
  const navLinks    = document.getElementById('nav-links');

  if (hamburguesa && navLinks) {
    hamburguesa.addEventListener('click', () => {
      hamburguesa.classList.toggle('abierto');
      navLinks.classList.toggle('abierto');
      document.body.style.overflow = navLinks.classList.contains('abierto') ? 'hidden' : '';
    });

    // Cerrar al hacer click en un enlace
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburguesa.classList.remove('abierto');
        navLinks.classList.remove('abierto');
        document.body.style.overflow = '';
      });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('abierto')) {
        hamburguesa.classList.remove('abierto');
        navLinks.classList.remove('abierto');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Marcar enlace activo en navbar ──
  const paginaActual = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === paginaActual || (paginaActual === '' && href === 'index.html')) {
      a.classList.add('activo');
    }
  });

  // ── Animaciones reveal al hacer scroll ──
  const elementosRevelar = document.querySelectorAll('.revelar, .revelar-izq, .revelar-der');
  if (elementosRevelar.length > 0) {
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada, indice) => {
        if (entrada.isIntersecting) {
          setTimeout(() => {
            entrada.target.classList.add('visible');
          }, indice * 70);
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12 });

    elementosRevelar.forEach(el => observador.observe(el));
  }

  // ── Contador animado de estadísticas ──
  function animarNumero(el, meta, duracion, sufijo) {
    const inicio = performance.now();
    const esPunto = !Number.isInteger(meta);
    const actualizar = (ahora) => {
      const progreso = Math.min((ahora - inicio) / duracion, 1);
      const easeOut  = 1 - Math.pow(1 - progreso, 3);
      const valor    = easeOut * meta;
      el.textContent = (esPunto ? valor.toFixed(1) : Math.floor(valor)) + sufijo;
      if (progreso < 1) requestAnimationFrame(actualizar);
    };
    requestAnimationFrame(actualizar);
  }

  const barraStats = document.querySelector('.barra-stats');
  if (barraStats) {
    let yaEjecutado = false;
    const statsObservador = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting && !yaEjecutado) {
        yaEjecutado = true;
        document.querySelectorAll('[data-meta]').forEach(el => {
          const meta   = parseFloat(el.dataset.meta);
          const sufijo = el.dataset.sufijo || '';
          animarNumero(el, meta, 1800, sufijo);
        });
      }
    }, { threshold: 0.4 });
    statsObservador.observe(barraStats);
  }

  // ── Acordeón de preguntas frecuentes ──
  document.querySelectorAll('.faq-pregunta').forEach(boton => {
    boton.addEventListener('click', () => {
      const item      = boton.closest('.faq-item');
      const estaAbierto = item.classList.contains('abierto');

      // Cerrar todos
      document.querySelectorAll('.faq-item.abierto').forEach(i => i.classList.remove('abierto'));

      // Abrir el clickeado (si estaba cerrado)
      if (!estaAbierto) item.classList.add('abierto');
    });
  });

  // ── Año actual en footer ──
  const spanAnio = document.getElementById('anio');
  if (spanAnio) spanAnio.textContent = new Date().getFullYear();

  // ── Video hero: ocultar si no carga ──
  const videoHero = document.getElementById('video-hero');
  if (videoHero) {
    videoHero.addEventListener('error', () => {
      videoHero.style.display = 'none';
    });
  }

  // ── Formulario de contacto (prevención básica) ──
  const formulario = document.getElementById('formulario-contacto');
  if (formulario) {
    formulario.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = formulario.querySelector('button[type="submit"]');
      btn.textContent = '✓ Mensaje enviado';
      btn.disabled = true;
      btn.style.background = 'linear-gradient(135deg,#1a6b3a,#2d9b5c)';
      setTimeout(() => {
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
        btn.style.background = '';
        formulario.reset();
      }, 4000);
    });
  }

});
