const OBSWebSocket = require('obs-websocket-js').default;
const auth = require('./auth.json');
const TIME = require('../utils/time.js');
const obs = new OBSWebSocket();

 const ip = 'ws://' + auth.ip + ':' + auth.port;
 const pass = auth.pass;
 
 const MIC = 'Mic';
 const CAM = 'Cam';
 const TIMEOUT = 10*1000; // 10 sec

 /**
  * Runs in 3 steps
  * 
  * 1. Connects to the remote OBS app via Websocket
  * 2. Toggles the mute state of inputDevice MIC and CAM, and sets a timer of TIMEOUT seconds
  *    for both inputDevice's state to be reset to what they were before this function was executed.
  * 3. Disconnects the client from the websocket.
  */
module.exports.runOBS =  async function() {
    await connectToWs();
    await swapActiveMic();
    setTimeout(closeConnection, TIMEOUT + 2000);
}


/**
 * Connection through websocket to OBS
 */
obs.on('ConnectionOpened', () => {
    console.log('Connected to OBS');
});

/**
 * Connects to OBS server websocket
 */
async function connectToWs() {
    try {
        await obs.connect(ip,pass,auth.d)
    } catch (error) {
        console.error('Failed to connect to OBS', error.code, error.message);
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
        console.log(`${TIME.getTime()} | Swapping mics...`);
        await setMicToggle(MIC);
        await setMicToggle(CAM);
    }
}


/**
 * 
 * @param {String} sourceName inputName of the source which muted status will be edited
 */
async function setMicToggle(sourceName) {
    try {
        await obs.call('ToggleInputMute',{inputName: sourceName})
        setTimeout(async function unmute() {
            console.log(TIME.getTime() + " | Set " + sourceName + " to default audio state");
            await obs.call('ToggleInputMute',{inputName: sourceName})
        }, TIMEOUT)
    } catch (error) {
        console.log("Failed to change the state of input devices! \n" + error);
    }
}


/**
 * 
 * @param {String} sourceName inputName of the source to request status from. If muted or not. True = muted
 * @returns 
 */
async function getMicStatus(sourceName) {
    try {
        let status = await obs.call('GetInputMute',{inputName: sourceName});
        return status.inputMuted;
    } catch (error) {
        console.log('Could not retrive data from sourceName! \n' + error);
    }
}

/**
 * Disconnects the client from the OBS websocket
 */
async function closeConnection() {
    try {
        await obs.disconnect();
        console.log("Disconnected from OBS  \n");
    } catch (error) {
        console.log("Failed to disconnect from OBS! \n" + error);
    }
   
}
