const discord = require('discord.js');
const client = new discord.Client({
    intents: Object.values(discord.GatewayIntentBits)
});

client.on(discord.Events.ClientReady, async () => {
    console.log('Logged in as ' + client.user.tag);

    const commands = [
        new discord.SlashCommandBuilder()
            .setName('test')
            .setDescription('テストコマンド')
            .addChannelOption(option => option
                .setName('チャンネル')
                .setDescription('チャンネルを選んで！')
                .setRequired(true)
            )
    ];

    await client.application.commands.set(commands);
});

client.on(discord.Events.MessageCreate, async (message) => {
    if (message.content === 'Hi') {
        await message.reply('Hello!');
    }
});

client.on(discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.commandName;

    if (command === 'test') {
        const arg = interaction.options.getChannel('チャンネル');

        await interaction.reply(arg.toString() + "に移動しよっか？");
    }
});

client.login('BOTトークン');
