const { SlashCommandBuilder } = require('discord.js');
const pets = require('../../config/pets.json');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pets')
		.setDescription('Gives a list of all pets.'), async execute(interaction) {
		let response = '';

		for (let rarity in pets) {
			if (Object.prototype.hasOwnProperty.call(pets, rarity)) {
				response += `${ getEmojiFromRarity(rarity) } **${ rarity }**:\n`;


				pets[rarity].forEach(pet => {
					response += rarity === 'hidden' ? '- ???' : `- ${ pet.name } ${ pet.emoji }\n`;
				});


				response += '\n';
			}
		}

		await interaction.reply(response);
	},
};
