var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var { sendAutoResponse } = require('./autoResponses');

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


app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');

    // Verifica se a mensagem é uma resposta automática e envia para a função correspondente
    if (req.body.name !== 'ChatBot') {
      io.emit('message', req.body);
      sendAutoResponse(io, req.body.message);
    }
    
    var censored = await Message.findOne({message:'badword'});
    if(censored)
      await Message.remove({_id: censored.id})
    res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
})

io.on('connection', (socket) =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,{useNewUrlParser : true }, (err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(5000, () => {
  console.log('server is running on port', server.address().port);
});
