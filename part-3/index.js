const discord = require('discord.js');
const client = new discord.Client({
    intents: Object.values(discord.GatewayIntentBits)
});

const ROLE_ID = 'ロールID';

client.on(discord.Events.ClientReady, async () => {
    console.log('Logged in as ' + client.user.tag);

    const commands = [
        new discord.SlashCommandBuilder()
            .setName('verify')
            .setDescription('認証パネルを表示')
    ];

    await client.application.commands.set(commands);
});

client.on(discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.commandName;

    if (command === 'verify') {
        const embed = new discord.EmbedBuilder()
            .setColor(discord.Colors.Green)
            .setTitle('認証パネル')
            .setDescription('以下のボタンを押して認証してください。');

        const button = new discord.ButtonBuilder()
            .setCustomId('verify_button')
            .setLabel('認証')
            .setStyle(discord.ButtonStyle.Primary);

        await interaction.reply({
            embeds: [embed],
            components: [new discord.ActionRowBuilder().addComponents(button)]
        });

    }
});

client.on(discord.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'verify_button') {
        await interaction.member.roles.add(ROLE_ID);

        await interaction.reply({
            content: '認証が完了しました！',
            ephemeral: true
        });
    }
});

client.login('BOTトークン');
