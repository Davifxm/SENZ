# Chat do Jarvis - Integração com Groq API

### 1. Obter API Key da Groq
1. Acesse https://console.groq.com/
2. Faça login ou crie uma conta gratuita
3. Vá em "API Keys" no menu lateral
4. Clique em "Create API Key"
5. Copie a chave gerada

### 2. Configurar a API Key
1. Abra o arquivo `config.js`
2. Substitua `gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` pela sua API key real
3. Salve o arquivo

## Como usar

1. Clique no ícone do Jarvis (jarves.png) na tela inicial
2. O chat popup abrirá
3. Digite sua mensagem e pressione Enter ou clique no botão de enviar
4. O Jarvis responderá usando o modelo **llama-3.1-8b-instant** da Groq

## Modelo usado

- **llama-3.1-8b-instant**: Modelo rápido e eficiente da Groq
- Respostas em português brasileiro
- Focado em bem-estar e saúde mental
- Máximo de 500 tokens por resposta
- **Histórico de conversas**: Lembra das conversas anteriores

## Funcionalidades

- ✅ Chat popup responsivo
- ✅ Indicador de digitação
- ✅ Integração com Groq API
- ✅ Interface moderna e intuitiva
- ✅ Foco automático no input
- ✅ Scroll automático para novas mensagens
- ✅ **Histórico de conversas persistente** (Firebase)
- ✅ **Lembrança de contexto** (últimas 10 mensagens)
- ✅ **Botão para limpar histórico**
- ✅ **Sincronização automática** entre sessões

## Segurança

⚠️ **IMPORTANTE**: Em produção, nunca exponha sua API key no frontend!
Use um backend para fazer as chamadas da API de forma segura.

## Personalização

O Jarvis está configurado como um assistente de bem-estar. Você pode modificar o prompt do sistema no arquivo `script20.js` para adaptar o comportamento da IA.
