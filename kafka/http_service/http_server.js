const express = require( 'express' );
const path = require( 'path' );
const PORT = 3001;
const app = express();
const { Kafka, CompressionTypes, logLevel } = require('kafkajs');
const kafka = new Kafka({
   clientId: 'web-cinema-http-service',
   brokers: [ 'localhost:9092' ],
 });
const producer = kafka.producer()
/** Прослойка для парсинга JSON-объектов. */
app.use( express.json() );

/** Установка заголовков перед обработкой запросов. */
app.use( ( _, response, next ) => {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.header( 'Access-Control-Allow-Methods', 'GET, POST' );
  response.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With, content-type' );
  next();
});

/** Пересылка статических файлов при GET запросе "/". */
app.use( '/', express.static( path.join( __dirname, 'build' ) ) );

const getRandomNumber = () => Math.round(Math.random(10) * 1000)
const createMessage = num => ({
  key: `key-${num}`,
  value: `value-${num}-${new Date().toISOString()}`,
})

const initProducers = async () => {
  await producer.connect();
};
initProducers();

/** Продолжить просмотр. */
app.post( '/play', async ( req, res ) => {
  try {
      producer.send({
          topic: 'VideoTopic',
          messages: [{
            value: Buffer.from(JSON.stringify({code: 0}))
          }],
      });

    res.json({
      success: true
    });
  } catch {
    res.json({
      success: false
    });
  };
});

/** Поставить на паузу. */
app.post( '/pause', async ( req, res ) => {
  try {
    producer.send({
      topic: 'VideoTopic',
      messages: [{
        value: Buffer.from(JSON.stringify({code: 1}))
      }],
     });

    res.json({
      success: true
    });
  } catch {
    res.json({
      success: false
    });
  };
});

/** Установить тайм-код. */
app.post( '/timecode', async ( req, res ) => {
  try {
    producer.send({
      topic: 'VideoTopic',
      messages: [{
        value: Buffer.from(JSON.stringify({code: 2, timecode: req.body.timecode}))
      }],
    });

    res.json({
      success: true
    });
  } catch {
    res.json({
      success: false
    });
  };
});

/** Добавить нового клиента по идентификатору */
app.post( '/addclient', async ( req, res ) => {
  try {
      await producer.connect()
      await producer.send({
          topic: 'AddClientTopic',
          messages: [
              { value: req.body.clientid },
          ],
      })
      await producer.disconnect()

    console.log( req.body.clientid )

    res.json({
      success: true
    });
  } catch {
    res.json({
      success: false
    });
  };
});

/** Удалить клиента по его идентификатору */
app.post( '/deleteclient', async ( req, res ) => {
  try {
      await producer.connect()
      await producer.send({
          topic: 'DeleteClientTopic',
          messages: [
              { value: req.body.clientid },
          ],
      })
      await producer.disconnect()

    console.log( req.body.clientid )

    res.json({
      success: true
    });
  } catch {
    res.json({
      success: false
    });
  };
});

/** Прослушка по указанному порту. */
app.listen( PORT, () => {
  console.log( `Server listening on ${ PORT }.` );
});
