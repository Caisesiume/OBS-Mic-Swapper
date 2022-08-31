const OBSWebSocket = require('obs-websocket-js').default;
const auth = require('./auth.json');
const obs = new OBSWebSocket();

const ip = 'ws://' + auth.ip + ':' + auth.port;
const pass = auth.pass;

const MIC = 'Mic';
const CAM = 'Cam';
const TIMEOUT = 10*1000; // 10 sec


(async () => {
    await connectToWs();
    // await getMics();
    await swapActiveMic()
})();

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
 * Retrives all input devices and adds them to the array
 */
async function getMics() {
    let data = await obs.call('GetInputList'); 
        for (const key in data.inputs) {
            let currID = data.inputs[key];
            //console.log(currID.unversionedInputKind);
            if(currID.unversionedInputKind === 'wasapi_input_capture')
                MICS.push(data.inputs[key].inputName);
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

