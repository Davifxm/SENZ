    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(i => i.classList.remove('active'));
      el.classList.add('active');
    }