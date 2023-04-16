const express = require( 'express' );
const path = require( 'path' );

const PORT = 3001;
const app = express();

// const { Kafka } = require( 'kafkajs' );

// const kafka = new Kafka({
//   clientId: 'web-cinema-http-service',
//   brokers: [ 'kafka1:9092', 'kafka2:9092' ],
// });

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

/** Продолжить просмотр. */
app.post( '/play', ( req, res ) => {
  try {
    // Todo Послать запрос в Kafka

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
app.post( '/pause', ( req, res ) => {
  try {
    // Todo Послать запрос в Kafka

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
app.post( '/timecode', ( req, res ) => {
  try {
    // Todo Послать запрос с телом в Kafka
    // Указать значение, хранимое в req.body.timecode
    console.log( req.body.timecode )

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
