const { SlashCommandBuilder } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async silicon(interaction) {
		await interaction.reply('Pong!');
	},
};