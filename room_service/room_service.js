const { Kafka } = require('kafkajs')
const request = require('request');

const uriWebsockerService = 'http://ws_server:3002';
const clients = [];

const kafka = new Kafka({
  clientId: 'roomService',
  brokers: ['kafka:9092'],
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
          console.log( '[RS] Request Play.' );
          break;

        case 1:
          request.post({url: uriWebsockerService + '/pause'});
          console.log( '[RS] Request Pause.' );
          break;

        case 2:
          request.post({
            url: uriWebsockerService + '/settimecode', 
            method: 'POST',
            json: {timecode: paramsMessage.timecode}});  
          console.log( '[RS] Request Settimecode.' );
          break;
      }
    },
  })
}