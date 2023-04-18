const { Kafka } = require('kafkajs')
var request = require('request');
const addressWebsockerService = '';
const uriWebsockerService = 'http://127.0.0.1:3002';
var clients = [];

const kafka = new Kafka({
  clientId: 'roomService',
  brokers: ['127.0.0.1:9092'],
})

initConsumers();

async function initConsumers(){
const playConsumer = kafka.consumer({ groupId: 'PlayGroup' })
await playConsumer.connect()
await playConsumer.subscribe({ topic: 'VideoTopic', fromBeginning: true })
await playConsumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log('123');
    let address = uriWebsockerService + '/play';
    //обработка сообщений при запуске
    request.post({url: address, form: {clientIds: clients}}, function(error, response, body) {
      if (error) {
        return console.error('Ошибка при отправлении play websocketService:', error);
      }
      console.log('Play удачно отправился на websocketService ');
    });
  },
})

// const pauseConsumer = kafka.consumer({ groupId: 'PauseGroup' })
// await pauseConsumer.connect()
// await pauseConsumer.subscribe({ topic: 'VideoTopic', fromBeginning: true })
// await pauseConsumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     let address = uriWebsockerService + '/pause';
//     //обработка сообщений при паузе
//     request.post({url: address, form: {clientIds: clients}}, function(error, response, body) {
//       if (error) {
//         return console.error('Ошибка при отправлении pause websocketService:', error);
//       }
//       console.log('Pause удачно отправился на websocketService ');
//     });
//   },
// })

// const timeConsumer = kafka.consumer({ groupId: 'TimeGroup' })
// await timeConsumer.connect()
// await timeConsumer.subscribe({ topic: 'VideoTopic', fromBeginning: true })
// await timeConsumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     let timecode = message.value;
//     if(timecode == null)
//       return;

//     let address = uriWebsockerService + '/settimecode';
//     //обработка сообщений при выставлении времени
//     request.post({url: address, form: {clientIds: clients, timecode: timecode}}, function(error, response, body) {
//       if (error) {
//         return console.error('Ошибка при отправлении timecode websocketService:', error);
//       }
//       console.log('Timecode удачно отправился на websocketService ');
//     });
//   },
// })

// const addedClientConsumer = kafka.consumer({ groupId: 'AddClientGroup' })
// await addedClientConsumer.connect()
// await addedClientConsumer.subscribe({ topic: 'UserTopic', fromBeginning: true })
// await addedClientConsumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     //обработка сообщений при добавлении нового клиента
//     if(message.value != null){
//       let clientId =  message.value;
//       clients.push(clientId);
//     }
//   },
// })

// const deletedClientConsumer = kafka.consumer({ groupId: 'DeleteClientGroup' })
// await deletedClientConsumer.connect()
// await deletedClientConsumer.subscribe({ topic: 'UserTopic', fromBeginning: true })
// await deletedClientConsumer.run({
//   eachMessage: async ({ topic, partition, message }) => {
//     //обработка сообщений при удалении клиента
//     if(message.value != null){
//       let clientId = message.value;
//       const index = clients.indexOf(clientId);

//       if (index > -1) 
//         clients.splice(index, 1);
//     }
//   },
// })
}