const ws = require( 'ws' );
const express = require( 'express' );
const app = express();
app.use( express.json() );

const PORT = 3002;
const wss = new ws.Server({ noServer: true });

const webSocketClients = new Set();

app.post( '/play', async ( req, res ) => {
  console.log('123');
});

app.post( '/pause', async ( req, res ) => {

});

app.post( '/settimecode', async ( req, res ) => {

});

app.get('/', (req, res) => {
  wss.handleUpgrade( req, req.socket, Buffer.alloc( 0 ), ( client, _request ) => {
    webSocketClients.add( client );

    client.onclose = () => {
      webSocketClients.delete( client );
    }
  });
});

function accept( req, res ) {
  if( !req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket' ) {
    res.end();
    return;
  }

  if( !req.headers.connection.match( /\bupgrade\b/i ) ) {
    res.end();
    return;
  }

  
}

let i = 0
setInterval( () => {
  const responseCode = ( i++ ) % 3;

  webSocketClients.forEach( client => {
    client.send( JSON.stringify({ responseCode }) );
  });

  console.log( webSocketClients.size )

}, 5000 );

app.listen( PORT, () => {
  console.log( `Server listening on ${ PORT }.` );
});