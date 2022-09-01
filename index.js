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
