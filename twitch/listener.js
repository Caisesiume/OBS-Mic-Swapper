/**
* DEVELOPED AND PUBLISHED BY @Caisesiume on 2022-09-02
* GPL-3.0 LICENSE
*/

const OBS = require('../obs/obsclient');
const TIME = require('../utils/time.js');

const CHANNEL = "#caisesiume" // The twitch channel the bot should join
const REWARD = "c8bcf550-d812-4bb2-98a1-9c0cf44b56d1" // The custom-reward-id of the reward that is redeemed to activate the OBS script

/**
 * Connects to twitch chat and joins CHANNEL (defined at the top of the file)
 * @param {Object} twitchClient the connection object used to interact with twitch api
 */
module.exports.connect = async function (twitchClient) {
    try {
        console.log("Connecting to Twitch...");
        await twitchClient.connect();
        console.log("Connected to Twitch!");
        await twitchClient.waitForRegistration();
        console.log("Joining channels...");
        await twitchClient.join(CHANNEL);
        console.log("Joined " + CHANNEL);
    } catch (error) {
        console.log("Error when connecting to Twitch: \n" + error);
    }

}


/**
 * Listens for a specific reward (REWARD) to be redeemed in a channel (CHANNEL)
 * REWARD & CHANNEL defined at top of file.
 * When the specified reward is redeemed this listener opens the OBS websocket connection, in obsclient.js.
 * @param {Object} twitchClient the connection object used to interact with twitch api
 */
module.exports.listen = async function (twitchClient) {
    twitchClient.onPrivmsg(async(channel,user,message,msg) => {
        try {
            let rewardID = msg.tags.get("custom-reward-id");
            // console.log(rewardID);
            if (rewardID !== undefined) {
                if (rewardID === REWARD) {
                   OBS.runOBS();
                   console.log(`${TIME.getTime()} | ${msg.userInfo.displayName} redeemed a reward`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    })
}
