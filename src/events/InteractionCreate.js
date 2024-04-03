const { Events} = require('discord.js');

const logs = require('../../utils/logs')


module.exports = {
	name: Events.InteractionCreate,
	async silicon(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(logs.errors.notFound);
				return;
			}
	
			try {
				await command.silicon(interaction);
			} catch (error) {
				console.error(error);
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: '> `Discordjs Silicon:`\nThere was an error while executing this command!', ephemeral: true });
				} else {
					await interaction.reply({ content: '> `Discordjs Silicon:`\nThere was an error while executing this command!', ephemeral: true });
				}
			}
		}
	},
};