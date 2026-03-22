const discord = require('discord.js');
const client = new discord.Client({
    intents: Object.values(discord.GatewayIntentBits)
});

client.on(discord.Events.ClientReady, () => {
    console.log('Logged in as ' + client.user.tag);
});

client.on(discord.Events.MessageCreate, async (message) => {
    if (message.content === 'Hi') {
        await message.reply('Hello!');
    }
});

client.login('BOTトークン');
