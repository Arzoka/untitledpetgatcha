const { SlashCommandBuilder } = require('discord.js');
const handlePetInventory = require('../../handlers/handlePetInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const getItemId = require('../../util/getItemId');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getidfrom')
		.addStringOption(option => option.setName('item')
			.setDescription('The item name or emoji to get the id from.')
			.setRequired(true))
		.setDescription('Gets id from specified item'), async execute(interaction) {
		await interaction.reply('Getting id...');

		const item = interaction.options.getString('item');

		if (!item) {
			await interaction.editReply('Item not found.');
			return;
		}

		const itemId = getItemId(item);

		if (!itemId) {
			await interaction.editReply('Item not found.');
			return;
		}

		await interaction.editReply(`${ itemId }`);

	},
};
