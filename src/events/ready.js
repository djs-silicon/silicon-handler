const { Events, REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const commands = [];
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);
const config = require('../../config');
const logs = require('../../utils/logs')
const {clientId, guildId} = config;


module.exports = {
	name: Events.ClientReady,
	once: true,
	silicon(client) {
		console.log(logs.messages.loggedIn);

		for (const folder of commandFolders) {
			const commandsPath = path.join(foldersPath, folder);
			const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
			for (const file of commandFiles) {
				const filePath = path.join(commandsPath, file);
				const command = require(filePath);
				if ('data' in command && 'silicon' in command || 'data' in command && 'autocomplete' in command) {
					commands.push(command.data.toJSON());
				} else {
					console.log(logs.warnings.commandsSetWarning);
				}
			}
		}

		const rest = new REST().setToken(config.token);

		(async () => {
			try {
				console.log(logs.messages.refreshing);

				await rest.put(
					Routes.applicationGuildCommands(clientId, guildId),
					{ body: commands },
				);

				console.log(logs.messages.finishedRefreshing);
			} catch (error) {
				console.error(error);
			}
		})();


	},
};