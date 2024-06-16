const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
const commands = fs.readdirSync(path.resolve(__dirname)).map(file => `/${ file.replace('.js', '') }`).sort();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('Returns a list of all commands.'), async execute(interaction) {
		await interaction.reply('```' + `\n\n${ commands.join('\n') }` + '```');
	},
};
