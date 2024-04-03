const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');
const loadCommands = require('./handlers/loadCommands');
const loadEvents = require('./handlers/loadEvents');
const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.commands = loadCommands(client);
client.login(config.token);
loadEvents(client);