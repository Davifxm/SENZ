  const firebaseConfig = {
      apiKey: "AIzaSyBOqDbKnGTkP-35Hjsga8hnPQFqQRp7AME",
      authDomain: "senz-bae74.firebaseapp.com",
      projectId: "senz-bae74",
      storageBucket: "senz-bae74.appspot.com",
      messagingSenderId: "604865943153",
      appId: "1:604865943153:web:b17d947e686a5becc4add0",
      measurementId: "G-3GNNQWFVGH"
    };
    firebase.initializeApp(firebaseConfig);

    function setActive(el) {
      document.querySelectorAll('.dock-icon').forEach(icon => {
        icon.classList.remove('active');
      });
      el.classList.add('active');
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const nome = user.displayName || 'Usuário';
        const foto = user.photoURL;
        const greeting = document.querySelector('.greeting');
        if (greeting) greeting.innerHTML = `Bem vindo(a) de volta,<br>${nome}`;
        const userCircle = document.querySelector('.user-circle');
        if (foto) {
          userCircle.innerHTML = `<img src="${foto}" alt="Foto de ${nome}" style="width:100%; height:100%; border-radius:50%;">`;
          userCircle.style.border = "none";
          userCircle.style.background = "transparent";
          userCircle.style.color = "transparent";
        } else {
          userCircle.textContent = nome.charAt(0).toUpperCase();
        }
      } else {
        window.location.href = "index.html";
      }
    });

    const firebaseSecret = "eGvu0jhnP7YMRVnuj4jGKxXmpq4fVW6x087THsVq";
    const userId = localStorage.getItem('firebaseUid');

    function getBpmValueElement() {
      return document.querySelector('#card-ansiedade .value');
    }

    async function buscarUltimoBPM() {
      const bpmValueEl = getBpmValueElement();
      if (!bpmValueEl) return;
      if (!userId) {
        bpmValueEl.textContent = "-- bpm";
        return;
      }
      const firebaseUrl = `https://senz-bae74-default-rtdb.firebaseio.com/users/${userId}/batimentos.json?auth=${firebaseSecret}`;
      try {
        const res = await fetch(firebaseUrl);
        const data = await res.json();
        if (!data || Object.keys(data).length === 0) {
          bpmValueEl.textContent = "-- bpm";
          return;
        }
        let ultimoBpm = null;
        let ultimoTimestamp = -1;
        Object.values(data).forEach(item => {
          if (item && item.timestamp > ultimoTimestamp) {
            ultimoTimestamp = item.timestamp;
            ultimoBpm = item.bpm;
          }
        });
        bpmValueEl.textContent = ultimoBpm !== null ? ultimoBpm + " bpm" : "-- bpm";
      } catch (e) {
        bpmValueEl.textContent = "-- bpm";
      }
    }

    buscarUltimoBPM();
    setInterval(buscarUltimoBPM, 10000);

    // Redireciona ao clicar em Nivel de Ansiedade
    document.getElementById('card-ansiedade').style.cursor = 'pointer';
    document.getElementById('card-ansiedade').addEventListener('click', () => {
      window.location.href = 'freqcard.html';
    });
  // Ativar clique no card de Atividade Galvânica (EDA)
  const cardEDA = document.getElementById('card-eda');
  if (cardEDA) {
    cardEDA.style.cursor = 'pointer';
    cardEDA.addEventListener('click', () => {
      window.location.href = 'eda.html';
    });
  }