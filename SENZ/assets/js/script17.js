    let playing = true;

    function toggleMusic() {
      const btn = document.querySelector('.pause-button');
      if (playing) {
        btn.innerHTML = 'Reproduzir';
        playing = false;
      } else {
        btn.innerHTML = 'Pausar';
        playing = true;
      }
    }

    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => icon.classList.remove('active'));
      el.classList.add('active');
    }