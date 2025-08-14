 function goBack() { window.history.back(); }
    let animando = false;
    let pulmao, icon, svg, arco1, arco2, arco3, animFrame;
    let progress = 0;
    function toggleAnimacao() {
      animando = !animando;
      if (animando) {
        pulmao.style.animationPlayState = 'running';
        icon.setAttribute('d', 'M6 4h4v16H6zm8 0h4v16h-4z');
        animateSVG();
      } else {
        pulmao.style.animationPlayState = 'paused';
        icon.setAttribute('d', 'M8 5v14l11-7z');
        cancelAnimationFrame(animFrame);
      }
    }
    function animateSVG() {
      const dur = 5000;
      const start = performance.now() - (progress * dur);
      function frame(now) {
        let t = ((now - start) % dur) / dur;
        let s = 1 + 0.15 * Math.sin(t * 2 * Math.PI);
        let base = pulmao.offsetWidth / 2;
        arco1.setAttribute('r', (base * 0.72 * s).toFixed(1));
        arco2.setAttribute('r', (base * 0.52 * s).toFixed(1));
        arco3.setAttribute('r', (base * 0.33 * s).toFixed(1));
        progress = t;
        animFrame = requestAnimationFrame(frame);
      }
      animFrame = requestAnimationFrame(frame);
    }
    function setActive(el) {
      document.querySelectorAll('.dock-flutuante .dock-icon').forEach(icon => {
        icon.classList.remove('active');
      });
      el.classList.add('active');
    }
    window.onload = () => {
      pulmao = document.querySelector('.pulmao');
      icon = document.getElementById('icon-play');
      svg = document.getElementById('arcos-pulmao');
      arco1 = document.getElementById('arco1');
      arco2 = document.getElementById('arco2');
      arco3 = document.getElementById('arco3');
      pulmao.style.animationPlayState = 'paused';
    }
    window.addEventListener('resize', function() {
      if (pulmao && arco1 && arco2 && arco3) {
        let base = pulmao.offsetWidth / 2;
        arco1.setAttribute('r', (base * 0.72).toFixed(1));
        arco2.setAttribute('r', (base * 0.52).toFixed(1));
        arco3.setAttribute('r', (base * 0.33).toFixed(1));
      }
    });