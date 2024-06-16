const { SlashCommandBuilder } = require('discord.js');
const handleGlobalInventory = require('../../handlers/handleGlobalInventory');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const administrators = require('../../config/administrators.json');
const getLocalItemData = require('../../util/getLocalItemData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('grant')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to grant the item to.')
			.setRequired(true))
		.addStringOption(option => option.setName('item')
			.setDescription('The itemId of the item to grant.')
			.setRequired(true))
		.setDescription('Grants specific item to specific user, can only be used by administrators.'),
	async execute(interaction) {
		if (!administrators.includes(interaction.user.id)) {
			await interaction.reply('You do not have permission to use this command.');
			return;
		}

		await interaction.reply('Granting item...');

		const user = interaction.options.getUser('user');
		const item = interaction.options.getString('item');

		if (!user) {
			await interaction.editReply('User not found.');
			return;
		}

		if (!item) {
			await interaction.editReply('Item not found.');
			return;
		}

		// Grant item to user

		const localEntityData = getLocalPetData(item) || getLocalItemData(item);
		if (!localEntityData) {
			await interaction.editReply('Item not found.');
			return;
		}

		await handleGlobalInventory.add(user.id, localEntityData.id);

		await interaction.editReply(`${ getEmojiFromRarity(localEntityData.rarity) } ${ localEntityData.name } ${ localEntityData.emoji } granted to ${ user.username }.`);
	},
};
