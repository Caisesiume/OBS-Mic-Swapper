# OBS-Mic-Swapper

## Quick links

- Set up
- Program Description
- Example of Functionality
- FAQ

## Set up

1. Create an account on Twitch for your bot
2. Make sure your OBS version is >= 28.0.0.  
> If not, install OBS Websocket [here](https://github.com/obsproject/obs-websocket/)
3. Install the node modules for this program.
4. Provide the <a href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth" target="_blank">OAuth data</a> from your bot account in <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/client.json" target="_blank">``/twitch/client.json``</a> and <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/tokens.json" target="_blank">``/twitch/tokens.json``</a>
5. Fill in the websocket authentication details in <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/auth.json" target="_blank">``/twitch/auth.json``</a>
6. Change the CHANNEL and REWARD to your channel and your reward ID in [``/twitch/listener.js``](https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/listener.js#L4).
7. Make sure the values of <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/obsclient.js#L9" target="_blank">MIC</a> and <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/obsclient.js#L10" target="_blank">CAM</a> matches the names of the two OBS audio sources you want the script to mute/unmute.
> You can edit how long the toggle should last for by changing <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/obsclient.js#L11" target="_blank">TIMEOUT</a>
8. Now run the program
> Important: OBS needs to be open in order for the script to connect to the websocket
> 
> If you don't want to launch this manually each time you start your OBS, <a href="https://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot" target="_blank">check this out</a>.
## Program Description

The system contains two main parts, one interacting with OBS and the other one interacting with Twitch Chat.

#### The OBS part 

The system connects to your OBS locally using <a href="https://github.com/obsproject/obs-websocket/" target="_blank">OBS Websocket</a>. <br>
The connection to OBS is only first established upon a call from the other part, the twitch chat listener.

#### The Twitch part

The listener connects to twitch chat as a read only bot that listens for specific custom [channel point rewards](https://help.twitch.tv/s/article/channel-points-guide) redeemed by chatters. <br>
This part is active at all times when the program is running and executes the OBS part when the [channel point reward](https://help.twitch.tv/s/article/channel-points-guide) has been redeemed.

## Example of Functionality

A user redeems the [custom channel point reward](https://help.twitch.tv/s/article/channel-points-guide?language=en_US#managing) "Mute Mic for 10s".
This projects listener sees this reward in chat and tells the OBS part of the system to launch. 
<br> The OBS websocket client starts and tries to connect to <a href="https://github.com/obsproject/obs-websocket/" target="_blank">OBS Websocket</a>.
When connected, the audio state (muted/not muted) of the two input devices gets toggled. After 10 seconds, the input devices audio state gets once again toggled and returns to it's prior state.

## FAQ

### How to find the reward ID? 

You can check what the ID is by <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/listener.js#L37"> uncommenting line 37</a> before starting the program again. Keep in mind that the reward **needs** to have a text input field in twitch chat.

<hr>

### How do I install the correct node modules? 

If you already have Node.js installed, simply navigate your command line to the root of this project where you can find package.json and run `npm install`

<hr>

### How do I run the program?

You will need to have Node.js installed to execute the program in a command line or via a .bat file or similar. The program can only be connected to OBS websockets on the same network as where the script is running.

Start by navigating your command line to the root folder of this system where you can find index.js. Now launch the program using one of the following 
> npm start

or 

> node ./index.js

Leave it open throughout your stream.

<hr>

### Can I run this automatically when starting OBS? 

By default, no. Perhaps you can! I personally have not looked into this too much, but maybe <a href="https://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot" target="_blank">this</a> can be of some help?
