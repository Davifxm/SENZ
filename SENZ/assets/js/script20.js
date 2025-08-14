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

  // Chat Popup Functions
  let conversationHistory = [];
  
  function toggleChat() {
    const chatPopup = document.getElementById('chatPopup');
    chatPopup.classList.toggle('active');
    
    if (chatPopup.classList.contains('active')) {
      document.getElementById('chatInput').focus();
      loadConversationHistory();
      scrollToBottom();
    }
  }

  // Carregar histórico de conversas do Firebase
  async function loadConversationHistory() {
    if (!userId) return;
    
    try {
      const firebaseUrl = `https://senz-bae74-default-rtdb.firebaseio.com/users/${userId}/chat_history.json?auth=${firebaseSecret}`;
      const response = await fetch(firebaseUrl);
      const data = await response.json();
      
      if (data && data.messages) {
        conversationHistory = data.messages;
        
        // Limpar mensagens atuais e recarregar
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        // Adicionar mensagem de boas-vindas se não há histórico
        if (conversationHistory.length === 0) {
          addMessage('Olá! Sou o Jarvis, seu assistente de bem-estar. Como posso ajudá-lo hoje?', false, false);
        } else {
          // Recarregar todas as mensagens do histórico
          conversationHistory.forEach(msg => {
            addMessage(msg.content, msg.role === 'user', false);
          });
        }
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      addMessage('Olá! Sou o Jarvis, seu assistente de bem-estar. Como posso ajudá-lo hoje?', false);
    }
  }

  // Salvar mensagem no histórico
  async function saveMessageToHistory(content, role) {
    if (!userId) return;
    
    const message = {
      content: content,
      role: role,
      timestamp: Date.now()
    };
    
    conversationHistory.push(message);
    
    try {
      const firebaseUrl = `https://senz-bae74-default-rtdb.firebaseio.com/users/${userId}/chat_history.json?auth=${firebaseSecret}`;
      await fetch(firebaseUrl, {
        method: 'PATCH',
        body: JSON.stringify({
          messages: conversationHistory,
          last_updated: Date.now()
        })
      });
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
  }

  function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addMessage(content, isUser = false, saveToHistory = true) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    messageDiv.innerHTML = `
      <div class="message-content">
        ${content}
      </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    
    // Salvar no histórico se necessário
    if (saveToHistory) {
      saveMessageToHistory(content, isUser ? 'user' : 'assistant');
    }
  }

  function showTypingIndicator() {
    const chatMessages = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Adiciona mensagem do usuário
    addMessage(message, true);
    input.value = '';
    
    // Mostra indicador de digitação
    showTypingIndicator();
    
    try {
      // Preparar mensagens para a API incluindo histórico
      const apiMessages = [
        {
          role: 'system',
          content: 'Você é o Jarvis, um assistente de bem-estar e saúde mental. Você ajuda usuários com técnicas de respiração, meditação, gerenciamento de estresse e ansiedade. Seja empático, profissional e sempre em português brasileiro. Mantenha as respostas concisas mas úteis. Lembre-se das conversas anteriores para dar respostas mais personalizadas.'
        }
      ];
      
      // Adicionar histórico de conversas (últimas 10 mensagens para não exceder limite)
      const recentHistory = conversationHistory.slice(-10);
      recentHistory.forEach(msg => {
        apiMessages.push({
          role: msg.role,
          content: msg.content
        });
      });
      
      // Adicionar mensagem atual
      apiMessages.push({
        role: 'user',
        content: message
      });
      
      // Chama a Groq API (URL correta da Groq)
      let response;
      try {
                 response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
           method: 'POST',
           headers: {
             'Authorization': `Bearer ${GROQ_API_KEY}`,
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             model: 'llama-3.1-8b-instant',
             messages: apiMessages,
             max_tokens: 500,
             temperature: 0.7
           })
         });
      } catch (corsError) {
        // Se der erro de CORS, tenta com proxy alternativo
        console.log('Tentando com proxy devido a CORS...');
        response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.groq.com/openai/v1/chat/completions'), {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
                     body: JSON.stringify({
             model: 'llama-3.1-8b-instant',
             messages: apiMessages,
             max_tokens: 500,
             temperature: 0.7
           })
        });
      }
      
      // Verificar status da resposta
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Erro HTTP:', response.status, errorData);
        throw new Error(`Erro HTTP ${response.status}: ${errorData.error?.message || 'Erro desconhecido'}`);
      }
      
      const data = await response.json();
      
      // Log da resposta para debug
      console.log('Resposta da API:', data);
      
      if (data.choices && data.choices[0]) {
        const botResponse = data.choices[0].message.content;
        hideTypingIndicator();
        addMessage(botResponse, false);
      } else {
        console.error('Resposta inválida:', data);
        throw new Error(`Resposta inválida da API: ${JSON.stringify(data)}`);
      }
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      hideTypingIndicator();
      
      // Mostrar erro mais específico
      let errorMessage = 'Desculpe, estou com dificuldades técnicas no momento.';
      
      if (error.message.includes('CORS')) {
        errorMessage = 'Erro de CORS detectado. Tentando solução alternativa...';
      } else if (error.message.includes('fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      } else if (error.message.includes('401')) {
        errorMessage = 'API key inválida. Verifique a configuração.';
      } else if (error.message.includes('429')) {
        errorMessage = 'Limite de requisições atingido. Tente novamente em alguns minutos.';
      } else if (error.message.includes('404')) {
        errorMessage = 'API não encontrada. Verifique a URL.';
      } else if (error.message.includes('403')) {
        errorMessage = 'Acesso negado. Verifique a API key.';
      } else if (error.message.includes('500')) {
        errorMessage = 'Erro interno do servidor. Tente novamente.';
      } else if (error.message.includes('Resposta inválida')) {
        errorMessage = 'Resposta inesperada da API. Verifique o console para detalhes.';
      }
      
      addMessage(errorMessage, false);
    }
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  // Limpar histórico de conversas
  async function clearChatHistory() {
    if (!userId) return;
    
    if (confirm('Tem certeza que deseja limpar todo o histórico de conversas?')) {
      try {
        // Limpar do Firebase
        const firebaseUrl = `https://senz-bae74-default-rtdb.firebaseio.com/users/${userId}/chat_history.json?auth=${firebaseSecret}`;
        await fetch(firebaseUrl, {
          method: 'DELETE'
        });
        
        // Limpar array local
        conversationHistory = [];
        
        // Limpar interface
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        
        // Adicionar mensagem de boas-vindas
        addMessage('Histórico limpo! Olá! Sou o Jarvis, seu assistente de bem-estar. Como posso ajudá-lo hoje?', false, false);
        
      } catch (error) {
        console.error('Erro ao limpar histórico:', error);
        alert('Erro ao limpar histórico. Tente novamente.');
      }
    }
  }