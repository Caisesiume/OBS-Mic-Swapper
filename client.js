const OBSWebSocket = require('obs-websocket-js').default;
const auth = require('./auth.json');
const obs = new OBSWebSocket();


/**
 * __________________________________________________________
 * 
 * BELOW IS EVERYTHING THAT HAS TO DO WITH OBS AND ITS WS
 * 
 * EVERYTHING ABOVE THIS COMMENT IS TWITCH CHAT RELATED
 * __________________________________________________________
 */

 const ip = 'ws://' + auth.ip + ':' + auth.port;
 const pass = auth.pass;
 
 const MIC = 'Mic';
 const CAM = 'Cam';
 const TIMEOUT = 10*1000; // 10 sec

runOBS();

 /**
  * Runs in 3 steps
  * 
  * 1. Connects to the remote OBS app via Websocket
  * 2. Toggles the mute state of inputDevice MIC and CAM, and sets a timer of TIMEOUT seconds
  *    for both inputDevice's state to be reset to what they were before this function was executed.
  * 3. Disconnects the client from the websocket.
  */
async function runOBS() {
    await connectToWs();
    await swapActiveMic();
    setTimeout(closeConnection, TIMEOUT + 2000);
}


/**
 * Connection through websocket to OBS
 */
obs.on('ConnectionOpened', () => {
    console.log('Connection Opened');
});

/**
 * Connects to OBS server websocket
 */
async function connectToWs() {
    try {
        await obs.connect(ip,pass,auth.d)
    } catch (error) {
        console.error('Failed to connect', error.code, error.message);
    }
}

/**
 * Swaps what mic is active in the current OBS Scene
 */
async function swapActiveMic() {
    //console.log(MICS.length);
    let mic_status = await getMicStatus(MIC);
    let cam_status = await getMicStatus(CAM);
        
    if(!mic_status) {
        console.log("a");
        await setMicToggle(MIC);
        await setMicToggle(CAM);
    }
}


/**
 * 
 * @param {String} sourceName inputName of the source which muted status will be edited
 */
async function setMicToggle(sourceName) {
    await obs.call('ToggleInputMute',{inputName: sourceName})
    console.log("Toggled " + sourceName);
    console.log(`${sourceName} is ${await getMicStatus(sourceName)}`);

    setTimeout(async function unmute() {
        console.log("Re-Toggled " + sourceName);
        await obs.call('ToggleInputMute',{inputName: sourceName})
    }, TIMEOUT)
}


/**
 * 
 * @param {String} sourceName inputName of the source to request status from. If muted or not. True = muted
 * @returns 
 */
async function getMicStatus(sourceName) {
    let status = await obs.call('GetInputMute',{inputName: sourceName});
    return status.inputMuted;
}

/**
 * Disconnects the client from the OBS websocket
 */
async function closeConnection() {
    await obs.disconnect();
    console.log("Successfully closed connection");
}
