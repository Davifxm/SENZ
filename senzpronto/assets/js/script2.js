    // Controle visual do ativo ao clicar
    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => icon.classList.remove('active'));
      el.classList.add('active');
    }

    // Enter na busca (opcional)
    const busca = document.getElementById('busca');
    if (busca) {
      busca.addEventListener('keydown', e => {
        if (e.key === 'Enter') e.target.blur();
      });
    }

    // Detecta a página e ativa o ícone correto
    (function () {
      const file = location.pathname.split('/').pop().toLowerCase();
      const dockIcons = document.querySelectorAll('.dock-icon');
      if (!dockIcons.length) return;

      // ordem: home, coração, relógio, barras, perfil
      const indexPorPagina = {
        'telainicial.html': 0,
        'intervencoes.html': 1,
        'historico.html':    2,
        'dados.html':        3,
        'perfil.html':       4,
      };

      const idx = indexPorPagina[file];
      if (idx !== undefined) {
        dockIcons.forEach(i => i.classList.remove('active'));
        dockIcons[idx].classList.add('active');
      }
    })();