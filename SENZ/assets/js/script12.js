    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => icon.classList.remove('active'));
      el.classList.add('active');
    }

    document.querySelectorAll('.music-box').forEach(box => {
      box.addEventListener('click', () => {
        const destino = box.getAttribute('data-link');
        if (destino) {
          window.location.href = destino;
        }
      });
    });