// Função para enviar uma mensagem automática
const sendAutoResponse = (socket, message) => {
  const autoResponses = {
    'olá': 'Olá! Como posso ajudar?',
    'como você está?': 'Estou bem, obrigado por perguntar! E você?',
    'qual é o seu nome?': 'Meu nome é ChatBot. Como posso ajudar?',
    'onde você está localizado?': 'Estou em todos os lugares onde você precisar de mim!',
    'qual é a sua função?': 'Minha função é ajudar você a tirar dúvidas e fornecer informações.',
    'como posso te ajudar?': 'Você pode me fazer perguntas sobre produtos, serviços ou qualquer outra coisa que precisar.',
    'vai chover hoje?': 'Eu não tenho previsão do tempo, mas você pode conferir em um site de meteorologia.',
    'que horas são?': 'Agora são ' + new Date().toLocaleTimeString() + '.',
    'qual é o horário de funcionamento?': 'Nosso horário de funcionamento é das 9h às 18h, de segunda a sexta-feira.',
    'qual é o seu telefone de contato?': 'Nosso telefone de contato é (XX) XXXX-XXXX.',
    'qual é o seu endereço de e-mail?': 'Nosso endereço de e-mail é contato@empresa.com.',
    // Adicione mais perguntas e respostas automáticas conforme necessário
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
