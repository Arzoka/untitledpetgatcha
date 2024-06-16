const { SlashCommandBuilder } = require('discord.js');
const items = require('../../config/items.json');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('items')
		.setDescription('Gives a list of all items.'), async execute(interaction) {
		let response = '';

		for (let rarity in items) {
			if (Object.prototype.hasOwnProperty.call(items, rarity)) {
				response += `${ getEmojiFromRarity(rarity) } **${ rarity }**:\n`;


				items[rarity].forEach(item => {
					response += rarity === 'hidden' ? '- ???' : `- ${ item.name } ${ item.emoji }\n`;
				});


				response += '\n';
			}
		}

		await interaction.reply(response);
	},
};
