const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const readyPromise = new Promise((resolve) => {
  client.once('ready', () => {
    console.log(`bot is logged in as ${client.user.tag}`);
    resolve(); // Signal that client is ready
  });
});

client.login(process.env.BOT_TOKEN);

module.exports = { client, readyPromise };
