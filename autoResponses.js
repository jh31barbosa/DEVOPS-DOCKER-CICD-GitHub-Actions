// Função para enviar uma mensagem automática
const sendAutoResponse = (socket, message) => {
  const autoResponses = {
    'ola': 'Ola! Como posso ajudar?',
    'gostaria de tirar uma duvida': 'Claro, qual seria sua dúvida?',
    'gostaria de saber como posso retirar meu boleto?': 'Me informe o cpf completo, por favor',
    '123456789': 'Encontrei seu boleto! Aqui está a fatura referente a esse mês',
    'qual e o seu nome?': 'Meu nome é ChatBot. Como posso ajudar?',
    'onde você está localizado?': 'Estou em todos os lugares onde você precisar de mim!',
    'qual e a sua função?': 'Minha função é ajudar você a tirar dúvidas e fornecer informações.',
    'como posso te ajudar?': 'Você pode me fazer perguntas sobre produtos, serviços ou qualquer outra coisa que precisar.',
    'vai chover hoje?': 'Eu não tenho previsão do tempo, mas você pode conferir em um site de meteorologia.',
    'que horas são?': 'Agora são ' + new Date().toLocaleTimeString() + '.',
    'qual e o horário de funcionamento?': 'Nosso horário de funcionamento é das 9h às 18h, de segunda a sexta-feira.',
    'qual e o seu telefone de contato?': 'Nosso telefone de contato é (31) 1234-5678.',
    'qual e o seu endereco de e-mail?': 'Nosso endereço de e-mail é chatbot@empresa.com.',
    
  };

  const response = autoResponses[message.toLowerCase()];
  if (response) {
    setTimeout(() => {
      socket.emit('message', {
        name: 'ChatBot',
        message: response
      });
    }, 1000); 
  }
};

module.exports = { sendAutoResponse };
