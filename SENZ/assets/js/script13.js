  function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => {
        icon.classList.remove('active');
      });
      el.classList.add('active');
    }
    function goBack() {
      window.history.back();
    }
    // Hover e click highlight nos cards (opcional)
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.card-pausa').forEach(card => {
        card.addEventListener('click', function() {
          document.querySelectorAll('.card-pausa').forEach(c => c.classList.remove('active'));
          this.classList.add('active');
        });
      });
    });