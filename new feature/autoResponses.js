// Função para enviar uma mensagem automática
const sendAutoResponse = (socket, message) => {
    const autoResponses = {
      'olá': 'Olá! Como posso ajudar?',
      'tudo bem?': 'Tudo ótimo, e você?',
      // Adicione mais respostas automáticas conforme necessário
    };
  
    const response = autoResponses[message.toLowerCase()];
    if (response) {
      setTimeout(() => {
        socket.emit('message', {
          name: 'ChatBot',
          message: response
        });
      }, 1000); // Espera 1 segundo antes de enviar a resposta automática
    }
  };
  
  module.exports = { sendAutoResponse };
  