/**
* DEVELOPED AND PUBLISHED BY @Caisesiume on 2022-09-02
* GPL-3.0 LICENSE
*
* https://twitter.com/caisesiume
*/

const LISTENER = require('./twitch/listener')
const AUTH = require('./twitch/auth');

(async () => {
    await onBotStartUp();
    async function onBotStartUp() {
        const chatClient = await AUTH.auth();
        global.BOT_START_DATE = new Date();
        LISTENER.connect(chatClient);
        LISTENER.listen(chatClient);
    }
})();
