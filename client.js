const OBSWebSocket = require('obs-websocket-js').default;
const auth = require('./auth.json');
const obs = new OBSWebSocket();

const ip = 'ws://' + auth.ip + ':' + auth.port;
const pass = auth.pass;

connectToWs();

async function connectToWs() {
    try {
        await obs.connect()

        let data = await obs.call('GetInputList');
        console.log(data); 

    } catch (error) {
        console.error('Failed to connect', error.code, error.message);
    }
}
