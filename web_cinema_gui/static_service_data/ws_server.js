const http = require( 'http' );
const ws = require( 'ws' );

const PORT = 3002;
const wss = new ws.Server({ noServer: true });

const webSocketClients = new Set();

function accept( req, res ) {
  if( !req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket' ) {
    res.end();
    return;
  }

  if( !req.headers.connection.match( /\bupgrade\b/i ) ) {
    res.end();
    return;
  }

  wss.handleUpgrade( req, req.socket, Buffer.alloc( 0 ), ( client, _request ) => {
    webSocketClients.add( client );

    client.onclose = () => {
      webSocketClients.delete( client );
    }
  });
}

// Todo Добавить логику получения запроса из сервиса комнат,
// после чего послать по WS соотвествующую команду

let i = 0
setInterval( () => {
  const responseCode = ( i++ ) % 3;

  webSocketClients.forEach( client => {
    client.send( JSON.stringify({ responseCode }) );
  });

  console.log( webSocketClients.size )

}, 5000 );

if( module.children ) {
  http.createServer( accept ).listen( PORT, () => {
    console.log( `Server listening on ${ PORT }.` );
  });
} else {
  exports.accept = accept;
}
