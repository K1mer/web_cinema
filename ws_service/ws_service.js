const ws = require( 'ws' );
const express = require( 'express' );
const app = express();
app.use( express.json() );

const PORT = 3002;
const wss = new ws.Server({ noServer: true });

const webSocketClients = new Set();

app.post( '/play', async () => {
  console.log( '[WS] Request play.' );
  webSocketClients.forEach( client => {
    client.send( JSON.stringify({ responseCode: 0 }) );
  });
});

app.post( '/pause', async () => {
  console.log( '[WS] Request pause.' );
  webSocketClients.forEach( client =>
    client.send( JSON.stringify({ responseCode: 1 }) )
  );
});

app.post( '/settimecode', async ( req ) => {
  console.log( '[WS] Request settimecode.' );
  webSocketClients.forEach( client =>
    client.send( JSON.stringify({ responseCode: 2, timeCode: req.body.timecode}) )
  );
});

app.get( '/', req => {
  wss.handleUpgrade( req, req.socket, Buffer.alloc( 0 ), ( client, _request ) => {
    webSocketClients.add( client );
    client.onclose = () => webSocketClients.delete( client );
  });
});

app.listen( PORT, () => console.log( `Server listening on ${ PORT }.` ) );
