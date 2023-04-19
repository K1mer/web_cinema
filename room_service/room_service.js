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

  const pauseConsumer = kafka.consumer({ groupId: 'VideoGroup' })
  await pauseConsumer.connect()
  await pauseConsumer.subscribe({ topic: 'VideoTopic', fromBeginning: true })
  await pauseConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const paramsMessage = JSON.parse(message.value.toString());
      switch (paramsMessage.code) {
        case 0:
          request.post({url: uriWebsockerService + '/play'});
          console.log('request play');
          break;

        case 1:
          request.post({url: uriWebsockerService + '/pause'});
          console.log('request pause');
          break;

        case 2:
          request.post({
            url: uriWebsockerService + '/settimecode', 
            method: 'POST',
            json: {timecode: paramsMessage.timecode}});  
          console.log('request settimecode');
          break;
      }
    },
  })
}