const { SlashCommandBuilder } = require('discord.js');
const getLocalPetData = require('../../util/getLocalPetData');
const getEmojiFromRarity = require('../../util/getEmojiFromRarity');
const handleGlobalInventory = require('../../handlers/handleGlobalInventory');
const isPet = require('../../util/isPet');
const isItem = require('../../util/isItem');
const getLocalItemData = require('../../util/getLocalItemData');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.addUserOption(option => option.setName('user')
			.setDescription('The user to give the item to.')
			.setRequired(true))
		.addStringOption(option => option.setName('item')
			.setDescription('The itemId of the item to grant.')
			.setRequired(true))
		.setDescription('Grants one of ur items to a specific user.'), async execute(interaction) {
		await interaction.deferReply();

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

		if (await handleGlobalInventory.get(interaction.user.id, { id: item }) === null) {
			await interaction.editReply(`You do not have the specified item to give.`);
			return;
		}

		await interaction.editReply('Giving item...');

		// Grant item to user

		if (isPet(item) && !getLocalPetData(item)) {
			await interaction.editReply('Item not found.');
			return;
		}

		if (isItem(item) && !getLocalItemData(item)) {
			await interaction.editReply('Item not found.');
			return;
		}

		const localEntityData = getLocalPetData(item) || getLocalItemData(item);

		await handleGlobalInventory.remove(interaction.user.id, item);

		await handleGlobalInventory.add(user.id, item);

		await interaction.editReply(`${ getEmojiFromRarity(localEntityData.rarity) } ${ localEntityData.name } ${ localEntityData.emoji } has succesfully been transfered from ${ interaction.user.username } to ${ user.username }.`);
	},
};
