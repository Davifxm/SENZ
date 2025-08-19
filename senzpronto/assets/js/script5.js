    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => {
        icon.classList.remove('active');
      });
      el.classList.add('active');
    }

    function gerarDadosFrequencia() {
      let dados = [];
      let base = Math.floor(Math.random() * 20) + 60; // entre 60 e 80 bpm
      for (let i = 0; i < 20; i++) {
        dados.push(base + Math.floor(Math.random() * 10 - 5));
      }
      return dados;
    }

    function calcularAnsiedade(bpm) {
      if (bpm < 60) return "Muito baixa (possível bradicardia)";
      if (bpm <= 80) return "Normal e saudável";
      if (bpm <= 100) return "Levemente elevada";
      return "Alta ansiedade (possível taquicardia)";
    }

    const ctx = document.getElementById("graficoCardiaco").getContext("2d");
    const dados = gerarDadosFrequencia();
    const bpmAtual = dados[dados.length - 1];

    document.getElementById("bpmDisplay").textContent = bpmAtual + " bpm";
    document.getElementById("interpretacaoBPM").textContent = `${bpmAtual} bpm é ${calcularAnsiedade(bpmAtual).toLowerCase()}.`;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: dados.length }, (_, i) => i + 1),
        datasets: [{
          label: 'Frequência Cardíaca',
          data: dados,
          borderColor: '#3866A9',
          backgroundColor: 'rgba(56, 102, 169, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        scales: { y: { suggestedMin: 50, suggestedMax: 120 } },
        plugins: { legend: { display: false } },
        responsive: true,
        maintainAspectRatio: false
      }
    });