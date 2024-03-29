<h1 align="center">OBS-Mic-Swapper</h1>

<h2 align="center">Shortcuts</h2>

<ul align="center">
   <a href="https://github.com/Caisesiume/OBS-Mic-Swapper#set-up">Set up</a>
 </ul>
 <ul align="center">
  <a href="https://github.com/Caisesiume/OBS-Mic-Swapper#program-description">Program Description</a>
 </ul>
 <ul align="center">
  <a href="https://github.com/Caisesiume/OBS-Mic-Swapper#example-of-functionality">
    Example of Functionality
  </a>
 </ul>
 <ul align="center">
  <a href="https://github.com/Caisesiume/OBS-Mic-Swapper#faq">
    FAQ
  </a>
 </ul>
 <ul align="center">
  <a href="https://github.com/Caisesiume/OBS-Mic-Swapper#contact">
    Contact Info
  </a>
 </ul>
<br>
<br>

## Set up

1. Create an account on Twitch for your bot
2. Make sure your OBS version is >= 28.0.0.  
> If not, install OBS Websocket [here](https://github.com/obsproject/obs-websocket/)
3. Install the node modules for this program.
4. Provide the <a href="https://dev.twitch.tv/docs/authentication/getting-tokens-oauth" target="_blank">OAuth data</a> from your bot account in <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/client.json" target="_blank">``/twitch/client.json``</a> and <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/tokens.json" target="_blank">``/twitch/tokens.json``</a>
5. Fill in the websocket authentication details in <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/auth.json" target="_blank">``/twitch/auth.json``</a>
6. Change the CHANNEL and REWARD to your channel and your reward ID in [``/twitch/listener.js``](https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/twitch/listener.js#L9-L10).
7. Make sure the values of <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/obsclient.js#L14-L15" target="_blank">MIC and CAM</a> matches the names of the two OBS **audio sources** you want the script to activate / deactivate.
> You can edit how long the toggle should last for by changing <a href="https://github.com/Caisesiume/OBS-Mic-Swapper/blob/master/obs/obsclient.js#L16" target="_blank">TIMEOUT</a>
8. Now run the program
> Important: OBS needs to be open in order for the script to connect to the websocket
> 
> If you don't want to launch this manually each time you start your OBS, <a href="https://stackoverflow.com/questions/20445599/auto-start-node-js-server-on-boot" target="_blank">check this out</a>.

<br>
<br>

## Program Description

The system contains two main parts, one interacting with OBS and the other one interacting with Twitch Chat.

#### The OBS part 

The system connects to your OBS locally using <a href="https://github.com/obsproject/obs-websocket/" target="_blank">OBS Websocket</a>. <br>
The connection to OBS is only first established upon a call from the other part, the twitch chat listener.

#### The Twitch part

The listener connects to twitch chat as a read only bot that listens for specific custom [channel point rewards](https://help.twitch.tv/s/article/channel-points-guide) redeemed by chatters. <br>
This part is active at all times when the program is running and executes the OBS part when the [channel point reward](https://help.twitch.tv/s/article/channel-points-guide) has been redeemed.

<br>
<br>

## Example of Functionality (Use cases)

A user redeems the [custom channel point reward](https://help.twitch.tv/s/article/channel-points-guide?language=en_US#managing) "Mute Mic for 10s".
This projects listener sees this reward in chat and tells the OBS part of the system to launch. 
<br> The OBS websocket client starts and tries to connect to your <a href="https://github.com/obsproject/obs-websocket/" target="_blank">OBS Websocket</a>.
When connected, the audio state (muted/not muted) of the two defined audio input devices gets toggled. After 10 seconds, the input devices audio state gets once again toggled and returns to it's initial state.

A user redeems the [custom channel point reward](https://help.twitch.tv/s/article/channel-points-guide?language=en_US#managing) "Swap to webcam mic for 10s"
This projects listener sees this reward in chat and tells the OBS part of the system to launch. 
<br> The OBS websocket client starts and tries to connect to your <a href="https://github.com/obsproject/obs-websocket/" target="_blank">OBS Websocket</a>.
When connected, the audio state (muted/not muted) of the two defined audio input devices gets toggled. Meaning that your primary microphone gets muted and your secondary microphone (webcam) gets unmuted. After 10 seconds, the input devices audio state gets once again toggled and returns to it's initial state.

<br>
<br>

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

<br>
<br>

<h2 align="center"><strong>Contact<strong></h2>
<p align="center">
Questions? Reach me on Twitter or Discord! 

<p align="center"><a href="https://twitter.com/caisesiume" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/sco/thumb/9/9f/Twitter_bird_logo_2012.svg/1200px-Twitter_bird_logo_2012.svg.png" alt="Twitter Logo" width="28"/></a>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<a href="https://discordapp.com/users/277883519017943042" target="_blank"><img src="https://discord.com/assets/3437c10597c1526c3dbd98c737c2bcae.svg" alt="Discord Logo" width="28"/></a></p>
