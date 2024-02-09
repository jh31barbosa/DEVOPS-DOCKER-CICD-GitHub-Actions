var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var Message = mongoose.model('Message',{
  name : String,
  message : String
})

var dbUrl = 'mongodb+srv://jh29-dev:S7Nz55z6wMBr7ba2@cluster0.2pezk32.mongodb.net/?retryWrites=true&w=majority'

app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


// Alteração na função de tratamento de mensagens POST
app.post('/messages', async (req, res) => {
  try {
    var message = new Message(req.body);

    // Verificar se a mensagem é uma resposta automática e salvá-la no banco de dados
    if (req.body.name === 'ChatBot') {
      console.log('Mensagem automática recebida:', req.body.message);
      var autoResponse = new Message({ name: req.body.name, message: req.body.message });
      await autoResponse.save();
    } else {
      // Se não for uma resposta automática, salvar a mensagem normalmente
      var savedMessage = await message.save();
      console.log('saved');
    }

    var censored = await Message.findOne({ message: 'badword' });
    if (censored)
      await Message.remove({ _id: censored.id });
    else
      io.emit('message', req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.log('error', error);
  } finally {
    console.log('Message Posted');
  }
})


// Nova feature - Respostas automáticas
//Início
io.on('connection', (socket) => {
  console.log('a user is connected');

  // Função para enviar uma mensagem automática
  const sendAutoResponse = (message) => {
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

  // Evento de recebimento de uma nova mensagem
  socket.on('message', (message) => {
    console.log('Message received: ', message);
    
    // Verifica se a mensagem recebida corresponde a uma mensagem pré-definida
    sendAutoResponse(message.message);
  });
});

//Fim


mongoose.connect(dbUrl ,{useNewUrlParser : true }, (err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(5000, () => {
  console.log('server is running on port', server.address().port);
});