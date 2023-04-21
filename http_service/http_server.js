const express = require( 'express' );
const path = require( 'path' );
const app = express();
const { Kafka } = require('kafkajs');

const PORT = 3001;

const producer = new Kafka({
  clientId: 'web-cinema-http-service',
  brokers: [ 'kafka:9092' ],
 }).producer();

/** Прослойка для парсинга JSON-объектов. */
app.use( express.json() );

/** Пересылка статических файлов при GET запросе "/". */
app.use( '/', express.static( path.join( __dirname, 'build' ) ) );

/** Установка заголовков перед обработкой запросов. */
app.use( ( _, response, next ) => {
  response.setHeader( 'Access-Control-Allow-Origin', '*' );
  response.header( 'Access-Control-Allow-Methods', 'GET, POST' );
  response.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With, content-type' );
  next();
});

/** Инициализация Kafka-producer. */
const initProducers = async () => {
  await producer.connect();
};
initProducers();

/** Продолжить просмотр. */
app.post( '/play', async ( _, res ) => {
  try {
      producer.send({
          topic: 'VideoTopic',
          messages: [{
            value: Buffer.from( JSON.stringify({
              code: 0
            }) )
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
app.post( '/pause', async ( _, res ) => {
  try {
    producer.send({
      topic: 'VideoTopic',
      messages: [{
        value: Buffer.from( JSON.stringify({
          code: 1
        }) )
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
        value: Buffer.from( JSON.stringify({
          code: 2, timecode: req.body.timecode
        }) )
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

/** Todo Добавить нового клиента по идентификатору. */
app.post( '/addclient', async ( req, res ) => {
  try {
    producer.send({
      topic: 'AddClientTopic',
      messages: [
        { value: req.body.clientid },
      ],
    })

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

/** Todo Удалить клиента по его идентификатору. */
app.post( '/deleteclient', async ( req, res ) => {
  try {
    producer.send({
      topic: 'DeleteClientTopic',
      messages: [
        { value: req.body.clientid },
      ],
    })

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
