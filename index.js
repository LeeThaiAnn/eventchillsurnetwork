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

        // Tạo một webhook mới cho kênh đích
        const channelToSend = client.channels.cache.get('1291644635688599603'); // Thay ID_KÊNH_CẦN_GỬI bằng ID của kênh đích
        if (channelToSend.type === ChannelType.GuildText) {
            const webhook = await channelToSend.createWebhook(tenIngame, {
                avatar: 'https://example.com/avatar.png', // Tùy chỉnh avatar nếu cần
            });

            // Gửi tin nhắn từ webhook
            await webhook.send(`Người chơi ${tenIngame} đã tham gia event!`);

            // Phản hồi lại người dùng trong kênh gốc
            await interaction.reply(`Webhook cho **${tenIngame}** đã được tạo và gửi!`);
        } else {
            await interaction.reply('Kênh đích không hợp lệ!');
        }
    }
});
const { REST, Routes } = require('discord.js');
const commands = [
  {
    name: 'thamgiaevent',
    description: 'Tham gia sự kiện với tên ingame của bạn',
    options: [
      {
        name: 'teningame',
        type: 3, // TYPE_STRING
        description: 'Tên ingame của bạn',
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: '10' }).setToken('MTI5NDI1NjU1MzYwMzM2NjkzMg.GWH-dt.MhEZDmQ2KZShSbjScQv1ORJn1sJnsV85csS9HM');

(async () => {
  try {
    console.log('Bắt đầu đăng ký (/) lệnh.');

    await rest.put(
      Routes.applicationGuildCommands('1294256553603366932', '1254430599448494150'),
      { body: commands },
    );

    console.log('Đăng ký lệnh thành công.');
  } catch (error) {
    console.error(error);
  }
})();

client.login('MTI5NDI1NjU1MzYwMzM2NjkzMg.GWH-dt.MhEZDmQ2KZShSbjScQv1ORJn1sJnsV85csS9HM');
