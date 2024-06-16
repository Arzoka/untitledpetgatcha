const { SlashCommandBuilder } = require('discord.js');
const handlePetInventory = require('../../handlers/handlePetInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const handleItemInventory = require('../../handlers/handleItemInventory');
const getLocalItemData = require('../../util/getLocalItemData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('inventory')
		.setDescription('Gives a list of all items user owns.')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to get the inventory from.')
			.setRequired(false)), async execute(interaction) {
		await interaction.deferReply();

		const user = interaction.options.getUser('user') || interaction.user;

		const pets = await handlePetInventory.getAll(user.id);
		const items = await handleItemInventory.getAll(user.id);

		if (pets.length === 0 && items.length === 0) {
			return interaction.editReply(`${ user.username } does not own any items.`);
		}

		const text = pets.map(pet => {
			return `- **${ getEmojiFromRarity(pet.rarity) } ${ pet.name }** ${ getLocalPetData(pet.id).emoji } x${ pet.quantity }`;
		}).join('\n');

		const itemText = items.map(item => {
			return `- **${ getEmojiFromRarity(item.rarity) } ${ item.name }** ${ getLocalItemData(item.id).emoji } x${ item.quantity }`;
		}).join('\n');

		await interaction.editReply(`**${ user.username }'s inventory:**\n\npets:\n\n${ text }\n\nitems:\n\n${ itemText }`);
	},
};
