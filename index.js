const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('ready', () => {
    console.log(`Bot đã đăng nhập với tên: ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'thamgiaevent') {
        const tenIngame = interaction.options.getString('teningame');

        const channelToSend = client.channels.cache.get('1291644635688599603 '); // Thay ID_KÊNH_CẦN_GỬI bằng ID của kênh đích
        if (channelToSend.type === ChannelType.GuildText) {
            const webhook = await channelToSend.createWebhook(tenIngame, {
                avatar: 'https://minecraftvn.net/favicon.ico ', // Tùy chỉnh avatar nếu cần
            });

            await webhook.send(`Người chơi ${tenIngame} đã tham gia event!`);

            await interaction.reply(`Webhook cho **${tenIngame}** đã được tạo và gửi!`);
        } else {
            await interaction.reply('Kênh đích không hợp lệ!');
        }
    }
});

client.login(process.env.TOKEN);
